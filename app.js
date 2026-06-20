let tg;
try { tg = window.Telegram.WebApp; tg.expand(); } catch (e) { console.warn("Telegram API tidak ditemukan"); }

(function checkSecurity() {
    document.addEventListener('contextmenu', event => event.preventDefault());

    document.onkeydown = function(e) {
        if(e.keyCode == 123) return false;
        if(e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0))) return false;
        if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
    }

    const platform = (tg && tg.platform) ? tg.platform : "unknown";
    const allowedPlatforms = ["android", "ios"];
    
    const allowedDomain = "hexpkxc.github.io"; 
    const currentDomain = window.location.hostname;
    const isLocal = currentDomain === "localhost" || currentDomain === "127.0.0.1" || currentDomain === "";

    if (!allowedPlatforms.includes(platform) || (!isLocal && currentDomain !== allowedDomain)) {
        window.addEventListener('DOMContentLoaded', () => {
            const blocker = document.getElementById('security-blocker');
            if(blocker) {
                blocker.classList.remove('hidden');
                blocker.classList.add('flex');
                blocker.innerHTML = `
                    <i class="fas fa-shield-alt text-6xl text-red-500 mb-6 drop-shadow-lg"></i>
                    <h1 class="text-3xl font-bold text-white mb-2">Akses Ditolak</h1>
                    <p class="text-gray-300 text-center mb-6">Aplikasi ini hanya dapat diakses melalui<br>Aplikasi Telegram Mobile (Android/iOS).</p>
                    <button onclick="tg.close()" class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full shadow-lg transition-colors">Tutup WebApp</button>
                `;
            }
        });
        throw new Error("Akses tidak sah.");
    }
})();

const urlParams = new URLSearchParams(window.location.search);
const animId = urlParams.get('anim');
const isAutoText = urlParams.get('auto_text') === '1';

if (!animId) {
    document.body.innerHTML = '<div class="flex items-center justify-center h-screen bg-gray-900 text-white font-sans text-xl">ID Animasi tidak ditemukan.</div>';
    throw new Error("Missing animId");
}

let state = {
    bg: { isVisible: true, type: 'shape', content: 'bulat', color: '#000000', scale: 100, x: 0, y: 0, rotation: 0 },
    bg2: { isVisible: true, type: 'shape', content: 'bulat', color: '#FF0000', scale: 90, x: 0, y: 0, rotation: 0 },
    t1: { isVisible: true, type: 'text', content: 'Teks 1', color: '#FFFFFF', font: 'Arial', scale: 50, x: 0, y: 0, rotation: 0 },
    t2: { isVisible: false, type: 'text', content: 'Teks 2', color: '#FFFFFF', font: 'Arial', scale: 30, x: 0, y: 50, rotation: 0 },
    t3: { isVisible: false, type: 'text', content: 'Teks 3', color: '#FFFFFF', font: 'Arial', scale: 20, x: 0, y: 80, rotation: 0 },
    t4: { isVisible: false, type: 'text', content: 'Teks 4', color: '#FFFFFF', font: 'Arial', scale: 20, x: 0, y: 110, rotation: 0 }
};

let selectedLayer = 't1';
let shapesData = {};
let availableShapes = [];
let availableThemes = [];

const BASE_URL = isAutoText 
    ? "https://1138-103-124-115-46.ngrok-free.app"
    : "https://1138-103-124-115-46.ngrok-free.app";

const API_TEMPLATE = `${BASE_URL}/api/template/${animId}`;
const API_PREVIEW = `${BASE_URL}/api/preview/${animId}`;
const API_UPLOAD = `${BASE_URL}/api/upload`;
const API_SHAPES_LIST = `${BASE_URL}/api/shapes`;
const API_SHAPE_DATA = `${BASE_URL}/api/shapes`;
const API_THEMES = `${BASE_URL}/api/themes`;
const API_LIVE_PREVIEW = `${BASE_URL}/api/live_preview`;

const LOCAL_STORAGE_KEY = `emoji_editor_${animId}`;

let history = [];
let historyIndex = -1;

const API_TIMEOUT = 10000;
const MAX_RETRIES = 2;

async function fetchWithRetry(url, options = {}, retries = MAX_RETRIES) {
    for (let i = 0; i <= retries; i++) {
        try {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), API_TIMEOUT);
            const res = await fetch(url, { ...options, signal: controller.signal });
            clearTimeout(id);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res;
        } catch (e) {
            if (i === retries) throw e;
            await new Promise(r => setTimeout(r, 1000 * (i + 1))); 
        }
    }
}

async function loadShapesList() {
    try {
        const response = await fetchWithRetry(API_SHAPES_LIST);
        const data = await response.json();
        availableShapes = Object.keys(data).map(key => ({
            id: key,
            name: data[key]
        }));
        populateShapeSelects();
    } catch (error) {
        console.error("Gagal memuat daftar shape:", error);
    }
}

function populateShapeSelects() {
    const shapeSelects = ['content-bg', 'content-bg2'];
    shapeSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            select.innerHTML = '';
            availableShapes.forEach(shape => {
                const option = document.createElement('option');
                option.value = shape.id;
                option.textContent = shape.name;
                select.appendChild(option);
            });
            const layerId = selectId.split('-')[1];
            if (state[layerId].type === 'shape') {
                select.value = state[layerId].content;
            }
        }
    });
}

async function loadShapeData(shapeId) {
    if (shapesData[shapeId]) return shapesData[shapeId];
    try {
        const response = await fetchWithRetry(`${API_SHAPE_DATA}/${shapeId}`);
        const data = await response.json();
        shapesData[shapeId] = data;
        return data;
    } catch (error) {
        console.error(`Gagal memuat data shape ${shapeId}:`, error);
        return null;
    }
}

async function loadThemesList() {
    try {
        const response = await fetchWithRetry(API_THEMES);
        const data = await response.json();
        if (data.status === 'success') {
            availableThemes = data.themes;
            populateThemeSelect();
        }
    } catch (error) {
        console.error("Gagal memuat daftar tema warna:", error);
    }
}

function populateThemeSelect() {
    const select = document.getElementById('theme-select');
    if (!select) return;
    
    select.innerHTML = '<option value="none">Original (Tanpa Tema)</option>';
    availableThemes.forEach(theme => {
        const option = document.createElement('option');
        option.value = theme;
        
        let themeName = theme.replace(/_/g, ' ');
        themeName = themeName.replace(/\b\w/g, l => l.toUpperCase());
        
        option.textContent = themeName;
        select.appendChild(option);
    });
}

const UI = {
    canvasContainer: document.getElementById('canvas-container'),
    layerSelect: document.getElementById('layer-select'),
    visibilityToggle: document.getElementById('visibility-toggle'),
    visibilityIcon: document.getElementById('visibility-icon'),
    typeContainer: document.getElementById('type-container'),
    contentShapeContainer: document.getElementById('content-shape-container'),
    contentTextContainer: document.getElementById('content-text-container'),
    contentBg: document.getElementById('content-bg'),
    contentBg2: document.getElementById('content-bg2'),
    contentText: document.getElementById('content-text'),
    fontSelectContainer: document.getElementById('font-select-container'),
    fontSelect: document.getElementById('font-select'),
    colorPicker: document.getElementById('color-picker'),
    colorHex: document.getElementById('color-hex'),
    scaleSlider: document.getElementById('scale-slider'),
    xSlider: document.getElementById('x-slider'),
    ySlider: document.getElementById('y-slider'),
    rotationSlider: document.getElementById('rotation-slider'),
    btnReset: document.getElementById('btn-reset'),
    btnSend: document.getElementById('btn-send'),
    previewVideo: document.getElementById('preview-video'),
    previewLottie: document.getElementById('preview-lottie'),
    btnUndo: document.getElementById('btn-undo'),
    btnRedo: document.getElementById('btn-redo'),
    btnLivePreview: document.getElementById('btn-live-preview'),
    themeSelect: document.getElementById('theme-select'),
    
    loadingOverlay: document.getElementById('loading-overlay'),
    loadingText: document.getElementById('loading-text')
};

function showLoading(text = "Memuat...") {
    if (UI.loadingText) UI.loadingText.textContent = text;
    if (UI.loadingOverlay) UI.loadingOverlay.style.display = 'flex';
}

function hideLoading() {
    if (UI.loadingOverlay) UI.loadingOverlay.style.display = 'none';
}

function saveStateToHistory() {
    const currentState = JSON.stringify(state);
    if (historyIndex >= 0 && history[historyIndex] === currentState) return;
    
    history = history.slice(0, historyIndex + 1);
    history.push(currentState);
    historyIndex++;
    updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
    if (UI.btnUndo) UI.btnUndo.disabled = historyIndex <= 0;
    if (UI.btnRedo) UI.btnRedo.disabled = historyIndex >= history.length - 1;
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        state = JSON.parse(history[historyIndex]);
        updateUIFromState();
        renderCanvas();
        updateUndoRedoButtons();
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        state = JSON.parse(history[historyIndex]);
        updateUIFromState();
        renderCanvas();
        updateUndoRedoButtons();
    }
}

if (UI.btnUndo) UI.btnUndo.addEventListener('click', undo);
if (UI.btnRedo) UI.btnRedo.addEventListener('click', redo);

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

async function renderCanvas() {
    const width = 512;
    const height = 512;
    const cx = width / 2;
    const cy = height / 2;

    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">`;
    svgContent += `<defs>`;
    
    const layers = ['bg', 'bg2', 't1', 't2', 't3', 't4'];
    
    for (const layerId of layers) {
        const layer = state[layerId];
        if (layer.isVisible && layer.type === 'shape' && layer.content) {
            const shapeData = await loadShapeData(layer.content);
            if (shapeData && shapeData.paths) {
                const isBorder = layer.content.startsWith('border_');
                
                svgContent += `<g id="def_${layerId}">`;
                shapeData.paths.forEach((pathObj, index) => {
                    const originalColorHex = pathObj.color || '#FFFFFF';
                    
                    let finalColorHex = originalColorHex;
                    if (!isBorder) {
                        const originalColor = hexToRgb(originalColorHex);
                        const overlayColor = hexToRgb(layer.color);
                        
                        if (originalColor && overlayColor) {
                            const r = Math.round((originalColor.r * overlayColor.r) / 255);
                            const g = Math.round((originalColor.g * overlayColor.g) / 255);
                            const b = Math.round((originalColor.b * overlayColor.b) / 255);
                            finalColorHex = `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
                        } else {
                            finalColorHex = layer.color;
                        }
                    }
                    
                    svgContent += `<path d="${pathObj.d}" fill="${finalColorHex}"`;
                    if (pathObj.opacity !== undefined) {
                        svgContent += ` opacity="${pathObj.opacity}"`;
                    }
                    svgContent += ` />`;
                });
                svgContent += `</g>`;
            }
        }
    }
    
    svgContent += `</defs>`;

    for (const layerId of layers) {
        const layer = state[layerId];
        if (!layer.isVisible) continue;

        const posX = cx + parseFloat(layer.x);
        const posY = cy + parseFloat(layer.y);
        const scaleFactor = layer.scale / 100;
        const transform = `translate(${posX}, ${posY}) rotate(${layer.rotation}) scale(${scaleFactor})`;

        svgContent += `<g id="layer_${layerId}" transform="${transform}">`;

        if (layer.type === 'shape' && layer.content) {
            const isBorder = layer.content.startsWith('border_');
            const shapeData = shapesData[layer.content];
            if (shapeData) {
                const viewBox = shapeData.viewBox || "0 0 512 512";
                const vbParts = viewBox.split(' ');
                const vbW = parseFloat(vbParts[2]);
                const vbH = parseFloat(vbParts[3]);
                const offsetX = -vbW / 2;
                const offsetY = -vbH / 2;
                
                svgContent += `<use href="#def_${layerId}" x="${offsetX}" y="${offsetY}" width="${vbW}" height="${vbH}" />`;
            } else {
                svgContent += `<circle cx="0" cy="0" r="100" fill="${layer.color}" />`;
            }
        } else if (layer.type === 'text') {
            const fontStack = layer.font === 'Impact' ? 'Impact, sans-serif' : 
                              layer.font === 'Comic Sans MS' ? '"Comic Sans MS", cursive' : 
                              `"${layer.font}", sans-serif`;
            
            svgContent += `<text x="0" y="0" text-anchor="middle" dominant-baseline="central" font-family="${fontStack}" font-size="100" font-weight="bold" fill="${layer.color}">${layer.content}</text>`;
        }

        svgContent += `</g>`;
    }

    svgContent += `</svg>`;
    UI.canvasContainer.innerHTML = svgContent;
    
    attachDragEvents();
}

function updateUIFromState() {
    const layer = state[selectedLayer];
    
    UI.layerSelect.value = selectedLayer;
    
    if (layer.isVisible) {
        UI.visibilityIcon.classList.remove('fa-eye-slash', 'text-gray-500');
        UI.visibilityIcon.classList.add('fa-eye', 'text-blue-500');
    } else {
        UI.visibilityIcon.classList.remove('fa-eye', 'text-blue-500');
        UI.visibilityIcon.classList.add('fa-eye-slash', 'text-gray-500');
    }

    if (layer.type === 'shape') {
        UI.contentShapeContainer.style.display = 'block';
        UI.contentTextContainer.style.display = 'none';
        UI.fontSelectContainer.style.display = 'none';
        
        if (selectedLayer === 'bg') {
            UI.contentBg.style.display = 'block';
            UI.contentBg2.style.display = 'none';
            UI.contentBg.value = layer.content;
        } else if (selectedLayer === 'bg2') {
            UI.contentBg.style.display = 'none';
            UI.contentBg2.style.display = 'block';
            UI.contentBg2.value = layer.content;
        }
    } else {
        UI.contentShapeContainer.style.display = 'none';
        UI.contentTextContainer.style.display = 'block';
        UI.fontSelectContainer.style.display = 'block';
        UI.contentText.value = layer.content;
        UI.fontSelect.value = layer.font;
    }

    UI.colorPicker.value = layer.color;
    UI.colorHex.value = layer.color.toUpperCase();
    
    UI.scaleSlider.value = layer.scale;
    UI.xSlider.value = layer.x;
    UI.ySlider.value = layer.y;
    UI.rotationSlider.value = layer.rotation;
}

function handleControlChange() {
    const layer = state[selectedLayer];
    
    if (layer.type === 'shape') {
        if (selectedLayer === 'bg') {
            layer.content = UI.contentBg.value;
        } else if (selectedLayer === 'bg2') {
            layer.content = UI.contentBg2.value;
        }
    } else {
        layer.content = UI.contentText.value;
        layer.font = UI.fontSelect.value;
    }

    layer.color = UI.colorPicker.value;
    UI.colorHex.value = layer.color.toUpperCase();
    
    layer.scale = parseInt(UI.scaleSlider.value);
    layer.x = parseInt(UI.xSlider.value);
    layer.y = parseInt(UI.ySlider.value);
    layer.rotation = parseInt(UI.rotationSlider.value);

    renderCanvas();
    saveStateToHistory();
}

UI.layerSelect.addEventListener('change', (e) => {
    selectedLayer = e.target.value;
    updateUIFromState();
});

UI.visibilityToggle.addEventListener('click', () => {
    state[selectedLayer].isVisible = !state[selectedLayer].isVisible;
    updateUIFromState();
    renderCanvas();
    saveStateToHistory();
});

UI.contentBg.addEventListener('change', async (e) => {
    state['bg'].content = e.target.value;
    await loadShapeData(e.target.value);
    renderCanvas();
    saveStateToHistory();
});

UI.contentBg2.addEventListener('change', async (e) => {
    state['bg2'].content = e.target.value;
    await loadShapeData(e.target.value);
    renderCanvas();
    saveStateToHistory();
});

UI.contentText.addEventListener('input', handleControlChange);
UI.fontSelect.addEventListener('change', handleControlChange);
UI.colorPicker.addEventListener('input', handleControlChange);
UI.colorHex.addEventListener('change', (e) => {
    let hex = e.target.value;
    if (!hex.startsWith('#')) hex = '#' + hex;
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
        UI.colorPicker.value = hex;
        handleControlChange();
    } else {
        e.target.value = state[selectedLayer].color.toUpperCase();
    }
});
UI.scaleSlider.addEventListener('input', handleControlChange);
UI.xSlider.addEventListener('input', handleControlChange);
UI.ySlider.addEventListener('input', handleControlChange);
UI.rotationSlider.addEventListener('input', handleControlChange);

UI.btnReset.addEventListener('click', () => {
    if (confirm("Reset layer ini ke pengaturan awal?")) {
        const defaults = {
            bg: { isVisible: true, type: 'shape', content: 'bulat', color: '#000000', scale: 100, x: 0, y: 0, rotation: 0 },
            bg2: { isVisible: true, type: 'shape', content: 'bulat', color: '#FF0000', scale: 90, x: 0, y: 0, rotation: 0 },
            t1: { isVisible: true, type: 'text', content: 'Teks 1', color: '#FFFFFF', font: 'Arial', scale: 50, x: 0, y: 0, rotation: 0 },
            t2: { isVisible: false, type: 'text', content: 'Teks 2', color: '#FFFFFF', font: 'Arial', scale: 30, x: 0, y: 50, rotation: 0 },
            t3: { isVisible: false, type: 'text', content: 'Teks 3', color: '#FFFFFF', font: 'Arial', scale: 20, x: 0, y: 80, rotation: 0 },
            t4: { isVisible: false, type: 'text', content: 'Teks 4', color: '#FFFFFF', font: 'Arial', scale: 20, x: 0, y: 110, rotation: 0 }
        };
        state[selectedLayer] = { ...defaults[selectedLayer] };
        updateUIFromState();
        renderCanvas();
        saveStateToHistory();
    }
});

let isDragging = false;
let startMouseX, startMouseY;
let startLayerX, startLayerY;

function attachDragEvents() {
    const svg = UI.canvasContainer.querySelector('svg');
    if (!svg) return;

    let activeElement = null;

    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('touchstart', startDrag, {passive: false});

    function startDrag(e) {
        if (e.target.tagName === 'svg' || e.target.tagName === 'defs') return;
        
        let target = e.target;
        while (target && target.tagName !== 'g' && !target.id?.startsWith('layer_')) {
            target = target.parentNode;
        }

        if (target && target.id && target.id.startsWith('layer_')) {
            const layerId = target.id.replace('layer_', '');
            if (!state[layerId].isVisible) return;
            
            e.preventDefault();
            isDragging = true;
            activeElement = layerId;
            
            selectedLayer = layerId;
            updateUIFromState();

            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            startMouseX = clientX;
            startMouseY = clientY;
            startLayerX = state[layerId].x;
            startLayerY = state[layerId].y;

            document.addEventListener('mousemove', drag);
            document.addEventListener('touchmove', drag, {passive: false});
            document.addEventListener('mouseup', endDrag);
            document.addEventListener('touchend', endDrag);
        }
    }

    function drag(e) {
        if (!isDragging || !activeElement) return;
        e.preventDefault();

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const rect = svg.getBoundingClientRect();
        const viewBox = svg.viewBox.baseVal;
        const scaleX = viewBox.width / rect.width;
        const scaleY = viewBox.height / rect.height;

        const dx = (clientX - startMouseX) * scaleX;
        const dy = (clientY - startMouseY) * scaleY;

        state[activeElement].x = Math.round(startLayerX + dx);
        state[activeElement].y = Math.round(startLayerY + dy);
        
        if (selectedLayer === activeElement) {
            UI.xSlider.value = state[activeElement].x;
            UI.ySlider.value = state[activeElement].y;
        }

        renderCanvas();
    }

    function endDrag() {
        if (isDragging) {
            isDragging = false;
            activeElement = null;
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('mouseup', endDrag);
            document.removeEventListener('touchend', endDrag);
            saveStateToHistory();
        }
    }
}

async function loadTemplate() {
    showLoading("Memuat template...");
    try {
        const response = await fetchWithRetry(API_TEMPLATE);
        const data = await response.json();
        
        if (data.status === 'success' && data.state) {
            state = { ...state, ...data.state };
            
            if (data.allow_auto_center && isAutoText) {
                applyAutoCenterLogic();
            }

            validateShapes();
            updateUIFromState();
            
            await preloadActiveShapes();
            
            renderCanvas();
            saveStateToHistory();
        }
    } catch (error) {
        console.warn("Template tidak ditemukan atau gagal dimuat, menggunakan default.", error);
        
        const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedState) {
            try {
                state = { ...state, ...JSON.parse(savedState) };
                validateShapes();
                updateUIFromState();
                await preloadActiveShapes();
                renderCanvas();
                saveStateToHistory();
            } catch (e) {
                console.error("Gagal memuat dari local storage", e);
            }
        }
    } finally {
        hideLoading();
    }
}

function applyAutoCenterLogic() {
    const isT2Active = state.t2 && state.t2.isVisible && state.t2.content.trim() !== '';
    const isT3Active = state.t3 && state.t3.isVisible && state.t3.content.trim() !== '';
    const isT4Active = state.t4 && state.t4.isVisible && state.t4.content.trim() !== '';

    if (!isT2Active && !isT3Active && !isT4Active) {
        if (state.t1) {
            state.t1.y = 0; 
        }
        if (state.bg) {
            state.bg.y = 0; 
            state.bg.scale = Math.min(state.bg.scale * 1.2, 200); 
        }
        if (state.bg2 && state.bg2.isVisible) {
            state.bg2.y = 0;
            state.bg2.scale = Math.min(state.bg2.scale * 1.2, 200);
        }
    }
}


function validateShapes() {
    if (state.bg && state.bg.type === 'shape' && availableShapes.length > 0) {
        const exists = availableShapes.find(s => s.id === state.bg.content);
        if (!exists) state.bg.content = availableShapes[0].id;
    }
    if (state.bg2 && state.bg2.type === 'shape' && availableShapes.length > 0) {
        const exists = availableShapes.find(s => s.id === state.bg2.content);
        if (!exists) state.bg2.content = availableShapes[0].id;
    }
}

async function preloadActiveShapes() {
    const promises = [];
    if (state.bg && state.bg.type === 'shape' && state.bg.content) {
        promises.push(loadShapeData(state.bg.content));
    }
    if (state.bg2 && state.bg2.type === 'shape' && state.bg2.content) {
        promises.push(loadShapeData(state.bg2.content));
    }
    await Promise.all(promises);
}

function loadPreview() {
    UI.previewVideo.style.display = 'none';
    UI.previewLottie.style.display = 'none';
    
    if (window.lottieAnim) {
        window.lottieAnim.destroy();
        window.lottieAnim = null;
    }
    
    UI.previewLottie.innerHTML = '<div class="text-gray-400 text-sm mt-10">Memuat preview...</div>';
    UI.previewLottie.style.display = 'block';

    fetch(API_PREVIEW)
        .then(response => {
            if (!response.ok) throw new Error("Preview tidak tersedia");
            return response.blob();
        })
        .then(async blob => {
            UI.previewLottie.innerHTML = '';
            
            try {
                const arrayBuffer = await blob.arrayBuffer();
                const uint8Array = new Uint8Array(arrayBuffer);
                const decompressed = pako.inflate(uint8Array, { to: 'string' });
                const animationData = JSON.parse(decompressed);
                
                window.lottieAnim = lottie.loadAnimation({
                    container: UI.previewLottie,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: animationData
                });
                
            } catch (err) {
                console.error("Gagal decompress/parse TGS:", err);
                UI.previewLottie.innerHTML = '<div class="text-red-400 text-sm mt-10">Gagal merender preview animasi.</div>';
            }
        })
        .catch(error => {
            console.log(error);
            UI.previewLottie.innerHTML = '<div class="text-gray-500 text-sm mt-10 text-center px-4">Preview belum tersedia untuk animasi ini.</div>';
        });
}


async function pakoCompress(text) {
    try {
        const deflated = pako.deflate(text);
        let binaryString = '';
        for (let i = 0; i < deflated.length; i++) {
            binaryString += String.fromCharCode(deflated[i]);
        }
        return btoa(binaryString);
    } catch (e) {
        console.error("Pako compression failed:", e);
        return btoa(unescape(encodeURIComponent(text))); 
    }
}

async function requestLivePreview() {
    if (!tg) return;
    
    const svgElement = UI.canvasContainer.querySelector('svg');
    if (!svgElement) return;

    showLoading("Membuat Live Preview...");
    
    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);
    
    const compressedSvg = await pakoCompress(svgString);
    
    const payload = {
        init_data: tg.initData,
        svg_data: compressedSvg,
        is_compressed: true,
        anim_id: animId,
        app_state: state,
        theme: UI.themeSelect ? UI.themeSelect.value : 'none'
    };

    try {
        const response = await fetchWithRetry(API_LIVE_PREVIEW, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const blob = await response.blob();
            
            if (window.lottieAnim) {
                window.lottieAnim.destroy();
                window.lottieAnim = null;
            }
            UI.previewLottie.innerHTML = '';
            UI.previewLottie.style.display = 'block';
            
            try {
                const arrayBuffer = await blob.arrayBuffer();
                const uint8Array = new Uint8Array(arrayBuffer);
                const decompressed = pako.inflate(uint8Array, { to: 'string' });
                const animationData = JSON.parse(decompressed);
                
                window.lottieAnim = lottie.loadAnimation({
                    container: UI.previewLottie,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: animationData
                });
                
            } catch (err) {
                console.error("Gagal decompress TGS Live Preview:", err);
                UI.previewLottie.innerHTML = '<div class="text-red-400 text-sm mt-10">Gagal merender Live Preview.</div>';
            }
            
            if (document.getElementById('live-preview-modal')) {
                document.getElementById('live-preview-modal').classList.remove('hidden');
                document.getElementById('live-preview-modal').classList.add('flex');
            } else {
                tg.showAlert("Live Preview berhasil diperbarui! Silakan lihat di area atas.");
            }
        } else {
            const errData = await response.json().catch(()=>({}));
            tg.showAlert("Gagal memuat Live Preview: " + (errData.error || response.statusText));
        }
    } catch (error) {
        tg.showAlert("Terjadi kesalahan jaringan saat memuat Live Preview.");
        console.error(error);
    } finally {
        hideLoading();
    }
}

if (UI.btnLivePreview) {
    UI.btnLivePreview.addEventListener('click', requestLivePreview);
}

function closeLivePreviewModal() {
    const modal = document.getElementById('live-preview-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

async function getClientMetadata() {
    let ip = "unknown";
    let geo = "unknown";
    let geoSource = "ipapi";
    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
    let platform = (tg && tg.platform) ? tg.platform : "unknown";
    let deviceStr = navigator.userAgent;
    let lang = navigator.language || navigator.userLanguage;
    let screenRes = `${window.screen.width}x${window.screen.height}`;
    let connection = navigator.connection ? navigator.connection.effectiveType : "unknown";

    try {
        const res = await fetchWithRetry("https://ipapi.co/json/", {}, 1);
        const data = await res.json();
        if (data && data.ip) {
            ip = data.ip;
            geo = `${data.city}, ${data.region}, ${data.country_name}`;
        } else {
            throw new Error("ipapi failed");
        }
    } catch (e) {
        try {
            const res2 = await fetchWithRetry("https://api.ipify.org?format=json", {}, 1);
            const data2 = await res2.json();
            ip = data2.ip;
            geoSource = "ipify (IP Only)";
        } catch (e2) {
            console.log("Failed to get IP");
        }
    }

    return {
        ip: ip,
        geo: geo,
        geo_source: geoSource,
        timezone: timezone,
        platform: platform,
        device: deviceStr,
        lang: lang,
        screen: screenRes,
        connection: connection
    };
}

async function sendDataToBot() {
    if (!tg) return;

    const svgElement = UI.canvasContainer.querySelector('svg');
    if (!svgElement) {
        tg.showAlert("Canvas kosong!");
        return;
    }

    showLoading("Memproses & Mengirim...");

    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch(e) {}

    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);
    
    const compressedSvg = await pakoCompress(svgString);

    let clientMetadata = {};
    try {
        clientMetadata = await getClientMetadata();
    } catch (e) {
        console.error("Metadata fetch error:", e);
    }

    const payload = {
        init_data: tg.initData,
        svg_data: compressedSvg,
        is_compressed: true,
        app_state: state,
        is_auto: isAutoText,
        theme: UI.themeSelect ? UI.themeSelect.value : 'none',
        client_metadata: clientMetadata
    };
    
    if (isAutoText) {
        payload.auto_text = state.t1.content; 
    }

    try {
        const response = await fetchWithRetry(API_UPLOAD, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            tg.close();
        } else {
            const errData = await response.json().catch(()=>({}));
            tg.showAlert("Gagal mengirim data: " + (errData.error || response.statusText));
        }
    } catch (error) {
        tg.showAlert("Terjadi kesalahan jaringan.");
        console.error(error);
    } finally {
        hideLoading();
    }
}

UI.btnSend.addEventListener('click', () => sendDataToBot());

async function init() {
    if (isAutoText) {
        document.getElementById('app-container').style.display = 'none';
        showLoading("Menyiapkan Mode Otomatis...");
        
        await loadShapesList();
        
        try {
            const response = await fetchWithRetry(API_TEMPLATE);
            const data = await response.json();
            
            if (data.status === 'success' && data.state) {
                state = { ...state, ...data.state };
                validateShapes();
                await preloadActiveShapes();
            } else {
                tg.showAlert("Template belum tersedia untuk mode otomatis.");
                tg.close();
                return;
            }
        } catch (error) {
            tg.showAlert("Gagal memuat template otomatis.");
            tg.close();
            return;
        }
        
        hideLoading();
        
        const autoModal = document.createElement('div');
        autoModal.className = 'fixed inset-0 bg-gray-900 bg-opacity-95 flex items-center justify-center p-4 z-50';
        autoModal.innerHTML = `
            <div class="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-700">
                <div class="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                    <h2 class="text-xl font-bold text-white flex items-center">
                        <i class="fas fa-bolt text-yellow-400 mr-2"></i> Mode Otomatis
                    </h2>
                    <p class="text-blue-100 text-sm mt-1">Isi teks untuk animasi Anda</p>
                </div>
                
                <div class="p-6 space-y-4" id="auto-inputs-container">
                    <!-- Inputs will be generated here -->
                </div>
                
                <div class="px-6 py-4 bg-gray-900 flex gap-3">
                    <button id="btn-auto-cancel" class="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition-colors">
                        Batal
                    </button>
                    <button id="btn-auto-process" class="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center">
                        <i class="fas fa-paper-plane mr-2"></i> Proses
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(autoModal);
        
        const container = document.getElementById('auto-inputs-container');
        const layersToPrompt = ['t1', 't2', 't3', 't4'];
        
        let hasVisibleText = false;
        
        layersToPrompt.forEach(layerId => {
            if (state[layerId] && state[layerId].isVisible) {
                hasVisibleText = true;
                const label = layerId === 't1' ? 'Teks Utama' : 
                              layerId === 't2' ? 'Teks Baris 2' : 
                              layerId === 't3' ? 'Teks Baris 3' : 'Teks Baris 4';
                              
                const div = document.createElement('div');
                div.innerHTML = `
                    <label class="block text-sm font-medium text-gray-300 mb-1">${label}</label>
                    <input type="text" id="auto-input-${layerId}" class="w-full bg-gray-700 text-white border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" value="${state[layerId].content}">
                `;
                container.appendChild(div);
            }
        });
        
        if (!hasVisibleText) {
            container.innerHTML = '<p class="text-gray-400 text-center py-4">Template ini tidak menggunakan teks.</p>';
        }

        document.getElementById('btn-auto-cancel').addEventListener('click', () => {
            tg.close();
        });
        
        document.getElementById('btn-auto-process').addEventListener('click', async () => {
            layersToPrompt.forEach(layerId => {
                if (state[layerId] && state[layerId].isVisible) {
                    const inputEl = document.getElementById(`auto-input-${layerId}`);
                    if (inputEl) {
                        state[layerId].content = inputEl.value || " ";
                    }
                }
            });
            
            autoModal.innerHTML = `
                <div class="flex flex-col items-center justify-center p-10">
                    <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
                    <p class="text-white text-lg font-semibold">Memproses Animasi...</p>
                    <p class="text-gray-400 text-sm mt-2 text-center">Mohon tunggu sebentar, sedang merakit layer...</p>
                </div>
            `;
            
            applyAutoCenterLogic();
            
            renderCanvas();
            await sendDataToBot();
        });
        
    } else {
        await Promise.all([
            loadShapesList(),
            loadThemesList()
        ]);
        
        await loadTemplate();
        loadPreview();
        
        saveStateToHistory();
    }
}

document.getElementById('btn-open-templates').addEventListener('click', () => {
    if (!tg || !tg.CloudStorage) {
        alert("Fitur Cloud Storage tidak tersedia di perangkat Anda.");
        return;
    }
    
    const modal = document.getElementById('template-modal');
    const container = document.getElementById('template-list-container');
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    container.innerHTML = '<div class="text-center py-4"><i class="fas fa-spinner fa-spin text-blue-500 text-2xl"></i><p class="text-gray-400 mt-2">Memuat template...</p></div>';
    
    tg.CloudStorage.getKeys((err, keys) => {
        if (err) {
            container.innerHTML = '<p class="text-red-500">Gagal mengambil data dari Cloud Storage.</p>';
            return;
        }
        
        const templateKeys = keys.filter(k => k.startsWith('tmpl_'));
        
        if (templateKeys.length === 0) {
            container.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-4">Anda belum memiliki template tersimpan.</p>';
            return;
        }
        
        container.innerHTML = '';
        templateKeys.forEach(key => {
            const name = key.replace('tmpl_', '').replace(/_/g, ' ');
            const div = document.createElement('div');
            div.className = 'flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg';
            div.innerHTML = `
                <span class="text-sm font-medium text-gray-800 dark:text-white truncate flex-1">${name}</span>
                <div class="flex gap-2 ml-3">
                    <button onclick="loadTemplate('${key}')" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-md font-semibold transition-colors">Muat</button>
                    <button onclick="deleteTemplate('${key}', this.parentElement.parentElement)" class="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs rounded-md font-semibold transition-colors"><i class="fas fa-trash"></i></button>
                </div>
            `;
            container.appendChild(div);
        });
    });
});

document.getElementById('btn-save-template').addEventListener('click', () => {
    if (!tg || !tg.CloudStorage) {
        alert("Fitur Cloud Storage tidak tersedia.");
        return;
    }
    
    let name = prompt("Masukkan nama untuk template ini:");
    if (!name) return;
    
    name = name.replace(/[^a-zA-Z0-9 ]/g, "").trim().replace(/ /g, "_");
    if (name.length === 0) return;
    
    const key = `tmpl_${name}`;
    const value = JSON.stringify(state);
    
    tg.CloudStorage.setItem(key, value, (err, success) => {
        if (err) {
            alert("Gagal menyimpan template.");
        } else {
            alert("Template berhasil disimpan!");
        }
    });
});

window.loadTemplate = function(key) {
    if (!tg || !tg.CloudStorage) return;
    
    tg.CloudStorage.getItem(key, async (err, value) => {
        if (err || !value) {
            alert("Gagal memuat template ini.");
            return;
        }
        try {
            const loadedState = JSON.parse(value);
            state = { ...state, ...loadedState }; 
            
            validateShapes();
            updateUIFromState();
            
            await preloadActiveShapes();
            
            renderCanvas();
            saveStateToHistory();
            closeTemplateModal();
            alert("Template berhasil dimuat!");
        } catch(e) {
            alert("File template korup.");
        }
    });
}

window.deleteTemplate = function(key, htmlElement) {
    if (!tg || !tg.CloudStorage) return;
    
    if(confirm("Apakah Anda yakin ingin menghapus template ini?")) {
        tg.CloudStorage.removeItem(key, (err, success) => {
            if(!err) {
                htmlElement.remove();
                if(document.getElementById('template-list-container').children.length === 0) {
                     document.getElementById('template-list-container').innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400 text-center py-4">Anda belum memiliki template tersimpan.</p>';
                }
            }
        });
    }
}

window.closeTemplateModal = function() {
    const modal = document.getElementById('template-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

init();
