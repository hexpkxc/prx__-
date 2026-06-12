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
                    <h1 class="text-3xl font-bold text-white mb-2 tracking-wide">AKSES DITOLAK</h1>
                    <p class="text-gray-300 text-center max-w-sm">Halaman ini hanya dapat diakses melalui aplikasi resmi Telegram di perangkat mobile (Android/iOS).</p>
                `;
            }
        });
    }
})();

const API_BASE_URL = 'https://sought-topical-lark.ngrok-free.app';
let availableShapes = {};
let availableThemes = [];

// --- VARIABEL BARU UNTUK EFEK CAHAYA ---
let availableLightEffects = {};

// Konstanta Konfigurasi
const MAX_UNDO_HISTORY = 10;
const PREVIEW_UPDATE_DELAY = 300; 

// State Aplikasi
let state = {
    canvas: { 
        width: 512, 
        height: 512, 
        backgroundColor: '#ffffff', 
        transparentBg: true 
    },
    layers: { 
        bg: { 
            type: 'shape', 
            isVisible: true, 
            itemType: 'preset', 
            itemValue: 'basic_square', 
            position: { x: 256, y: 256 }, 
            rotation: 0, 
            scale: 1, 
            strokeWidth: 0, 
            strokeColor: '#000000', 
            fillColor: '#ff0000', 
            svgContent: '', 
            aspectRatio: 1, 
            width: 200, 
            height: 200 
        }, 
        bg2: { 
            type: 'shape', 
            isVisible: false, 
            itemType: 'preset', 
            itemValue: 'basic_circle', 
            position: { x: 256, y: 256 }, 
            rotation: 0, 
            scale: 1, 
            strokeWidth: 0, 
            strokeColor: '#000000', 
            fillColor: '#00ff00', 
            svgContent: '', 
            aspectRatio: 1, 
            width: 200, 
            height: 200 
        }, 
        t1: { type: 'text', isVisible: true, text: 'TEXT 1', fontId: 'BebasNeue', position: { x: 256, y: 256 }, rotation: 0, scale: 1, strokeWidth: 0, strokeColor: '#000000', fillColor: '#0000ff' }, 
        t2: { type: 'text', isVisible: false, text: 'TEXT 2', fontId: 'TitanOne', position: { x: 256, y: 350 }, rotation: 0, scale: 1, strokeWidth: 0, strokeColor: '#000000', fillColor: '#ffff00' }, 
        t3: { type: 'text', isVisible: false, text: 'TEXT 3', fontId: 'PermanentMarker', position: { x: 256, y: 450 }, rotation: 0, scale: 1, strokeWidth: 0, strokeColor: '#000000', fillColor: '#ff00ff' }, 
        t4: { type: 'text', isVisible: false, text: 'TEXT 4', fontId: 'BebasNeue', position: { x: 256, y: 150 }, rotation: 0, scale: 1, strokeWidth: 0, strokeColor: '#000000', fillColor: '#00ffff' } 
    }
};

const SHAPE_PRESETS = { 
    'basic_square': '<rect x="-100" y="-100" width="200" height="200"/>', 
    'basic_circle': '<circle cx="0" cy="0" r="100"/>', 
    'basic_triangle': '<polygon points="0,-100 100,100 -100,100"/>', 
    'basic_star': '<polygon points="0,-100 22,-31 95,-31 36,12 59,81 0,38 -59,81 -36,12 -95,-31 -22,-31"/>', 
    'basic_heart': '<path d="M0,30 C0,30 -100,-30 -100,-80 C-100,-130 -40,-150 0,-100 C40,-150 100,-130 100,-80 C100,-30 0,30 0,30 Z"/>' 
};

const fonts = [ 
    { id: 'TitanOne', name: 'Titan One', file: 'fonts/TitanOne.woff' }, 
    { id: 'BebasNeue', name: 'Bebas Neue', file: 'fonts/BebasNeue.woff' }, 
    { id: 'PermanentMarker', name: 'Permanent Marker', file: 'fonts/PermanentMarker.woff' }, 
    { id: 'Anton', name: 'Anton', file: 'fonts/Anton.woff' }, 
    { id: 'Righteous', name: 'Righteous', file: 'fonts/Righteous.woff' }, 
    { id: 'CarterOne', name: 'Carter One', file: 'fonts/CarterOne.woff' }, 
    { id: 'FredokaOne', name: 'Fredoka One', file: 'fonts/FredokaOne.woff' }, 
    { id: 'Bangers', name: 'Bangers', file: 'fonts/Bangers.woff' }, 
    { id: 'Lobster', name: 'Lobster', file: 'fonts/Lobster.woff' }, 
    { id: 'SigmarOne', name: 'Sigmar One', file: 'fonts/SigmarOne.woff' } 
];

let history = [];
let historyIndex = -1;
let opentypeFonts = {};
let isDragging = false;
let activeDragLayer = null;
let startDragPos = { x: 0, y: 0 };
let activeLayer = 'bg';

// ==========================================
// INISIALISASI
// ==========================================
async function init() {
    showLoading("Memuat Data & Font...");
    await fetchShapesList();
    await fetchThemesList();
    await fetchLightEffects(); // --- FETCH EFEK CAHAYA ---
    
    // Auto Mode Check
    const urlParams = new URLSearchParams(window.location.search);
    const isAutoText = urlParams.get('auto_text');
    const animId = urlParams.get('anim');
    
    if (isAutoText === '1' && animId) {
        document.getElementById('app-container').classList.add('hidden');
        document.getElementById('auto-mode-container').classList.remove('hidden');
        
        await loadOwnerTemplateForAuto(animId);
        hideLoading();
        return; 
    }

    try {
        const fontPromises = fonts.map(async f => {
            try {
                const response = await fetch(f.file);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const buffer = await response.arrayBuffer();
                opentypeFonts[f.id] = opentype.parse(buffer);
            } catch (err) { console.error(`Gagal muat font ${f.name}:`, err); }
        });
        await Promise.all(fontPromises);
        
        await preloadActiveShapes();
        setupUI();
        validateShapes(); 
        updateUIFromState();
        renderCanvas();
        saveStateToHistory();
        setupCanvasInteractions();
    } catch (error) {
        console.error("Inisialisasi gagal:", error);
        alert("Gagal memuat aplikasi. Periksa koneksi internet Anda.");
    } finally {
        hideLoading();
    }
}

async function loadOwnerTemplateForAuto(animId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/template/${animId}`, {
            headers: { "ngrok-skip-browser-warning": "69420" }
        });
        const data = await response.json();
        
        if (data.status === 'success' && data.state) {
            state = { ...state, ...data.state };
            
            const container = document.getElementById('auto-inputs-container');
            container.innerHTML = ''; 
            
            const orderedLayers = ['t1', 't2', 't3', 't4'];
            let hasActiveText = false;
            
            orderedLayers.forEach(layerId => {
                const layer = state.layers[layerId];
                if (layer && layer.isVisible && layer.type === 'text') {
                    hasActiveText = true;
                    
                    const labelText = layerId === 't1' ? 'TEKS UTAMA (T1)' : 
                                      layerId === 't2' ? 'TEKS KEDUA (T2)' : 
                                      layerId === 't3' ? 'TEKS KETIGA (T3)' : 'TEKS KEEMPAT (T4)';
                                      
                    const html = `
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-400 mb-1">${labelText}</label>
                            <input type="text" id="auto-input-${layerId}" value="${layer.text}" class="w-full bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="Masukkan teks di sini...">
                        </div>
                    `;
                    container.innerHTML += html;
                }
            });
            
            if (!hasActiveText) {
                container.innerHTML = '<p class="text-yellow-400 text-sm text-center">Template ini tidak menggunakan layer teks. Anda dapat langsung memprosesnya.</p>';
            }
            
            document.getElementById('auto-submit-btn').dataset.animId = animId;
            document.getElementById('auto-submit-btn').dataset.allowCenter = data.allow_auto_center ? 'true' : 'false';
            
            await preloadActiveShapes();
            
        } else {
            alert("Template otomatis untuk animasi ini belum disetup oleh admin.");
            tg.close();
        }
    } catch (e) {
        console.error(e);
        alert("Gagal memuat template dari server.");
    }
}

// ==========================================
// FUNGSI API DATA
// ==========================================
async function fetchShapesList() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/shapes`, { headers: { "ngrok-skip-browser-warning": "69420" }});
        if(response.ok) availableShapes = await response.json();
    } catch (e) { console.warn("Gagal ambil daftar shape:", e); }
}

async function fetchThemesList() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/themes`, { headers: { "ngrok-skip-browser-warning": "69420" }});
        if(response.ok) {
            const data = await response.json();
            if(data.themes) availableThemes = data.themes;
        }
    } catch (e) { console.warn("Gagal ambil daftar tema:", e); }
}

// --- FUNGSI FETCH EFEK CAHAYA ---
async function fetchLightEffects() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/effects`, { headers: { "ngrok-skip-browser-warning": "69420" }});
        if(response.ok) {
            const data = await response.json();
            if(data.status === 'success' && data.effects) {
                availableLightEffects = data.effects;
            }
        }
    } catch (e) { console.warn("Gagal ambil daftar efek cahaya:", e); }
}

async function preloadActiveShapes() {
    const promises = [];
    ['bg', 'bg2'].forEach(lid => {
        const l = state.layers[lid];
        if (l.isVisible && l.itemType === 'server' && !l.svgContent) {
            promises.push(loadShapeFromServer(lid, l.itemValue));
        }
    });
    await Promise.all(promises);
}

async function loadShapeFromServer(layerId, shapeId) {
    try {
        const res = await fetch(`${API_BASE_URL}/api/shapes/${shapeId}`, { headers: { "ngrok-skip-browser-warning": "69420" }});
        if(!res.ok) throw new Error("Shape tidak ditemukan");
        const data = await res.json();
        if(data.svg) {
            state.layers[layerId].svgContent = data.svg;
            
            if(data.viewBox) {
                const parts = data.viewBox.split(' ').map(Number);
                if(parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
                    state.layers[layerId].aspectRatio = parts[2] / parts[3];
                }
            }
            
            if(state.layers[layerId].aspectRatio !== 1) {
                let w = 200, h = 200;
                if(state.layers[layerId].aspectRatio > 1) h = w / state.layers[layerId].aspectRatio;
                else w = h * state.layers[layerId].aspectRatio;
                
                state.layers[layerId].width = w;
                state.layers[layerId].height = h;
            }
        }
    } catch(e) {
        console.error(`Gagal load shape ${shapeId}:`, e);
        state.layers[layerId].itemType = 'preset';
        state.layers[layerId].itemValue = 'basic_square';
    }
}

// ==========================================
// UI SETUP & BINDING
// ==========================================
function setupUI() {
    // Populate Fonts
    const fontSelects = document.querySelectorAll('select[id$="-font"]');
    fontSelects.forEach(select => {
        fonts.forEach(f => {
            const opt = document.createElement('option');
            opt.value = f.id; opt.textContent = f.name;
            select.appendChild(opt);
        });
    });

    // Populate Shapes
    const shapeSelects = document.querySelectorAll('select[id$="-shape-type"]');
    shapeSelects.forEach(select => {
        const grpPreset = document.createElement('optgroup'); grpPreset.label = "Bentuk Dasar";
        Object.keys(SHAPE_PRESETS).forEach(k => {
            const opt = document.createElement('option');
            opt.value = `preset|${k}`; opt.textContent = k.replace('basic_', '').toUpperCase();
            grpPreset.appendChild(opt);
        });
        select.appendChild(grpPreset);

        if(Object.keys(availableShapes).length > 0) {
            const grpServer = document.createElement('optgroup'); grpServer.label = "Premium Shapes";
            for (const [id, name] of Object.entries(availableShapes)) {
                const opt = document.createElement('option');
                opt.value = `server|${id}`; opt.textContent = name;
                grpServer.appendChild(opt);
            }
            select.appendChild(grpServer);
        }
    });

    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target.closest('.tab-btn').dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => {
                b.classList.remove('bg-gray-700', 'text-white', 'border-gray-500');
                b.classList.add('bg-gray-800', 'text-gray-400', 'border-transparent');
            });
            e.target.closest('.tab-btn').classList.add('bg-gray-700', 'text-white', 'border-gray-500');
            e.target.closest('.tab-btn').classList.remove('bg-gray-800', 'text-gray-400', 'border-transparent');
            
            document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
            document.getElementById(`${target}-tab`).classList.remove('hidden');
            activeLayer = target;
            updateUIFromState();
        });
    });

    // Color Pickers
    document.querySelectorAll('input[type="color"]').forEach(el => {
        const id = el.id;
        const textInputId = id + '-text';
        const textInput = document.getElementById(textInputId);
        
        el.addEventListener('input', (e) => {
            if(textInput) textInput.value = e.target.value.toUpperCase();
            handleInput(e);
        });
        
        if(textInput) {
            textInput.addEventListener('change', (e) => {
                let val = e.target.value;
                if(!val.startsWith('#')) val = '#' + val;
                if(/^#[0-9A-F]{6}$/i.test(val)) {
                    el.value = val;
                    handleInput({target: {id: id, value: val}});
                } else {
                    e.target.value = el.value.toUpperCase(); 
                }
            });
        }
    });

    // Regular Inputs
    document.querySelectorAll('input[type="range"], input[type="text"]:not([id$="-text"]), select').forEach(el => {
        el.addEventListener('input', (e) => {
            if(e.target.type === 'range') {
                const displayId = e.target.id + '-val';
                const displayEl = document.getElementById(displayId);
                if(displayEl) displayEl.textContent = e.target.value;
            }
            handleInput(e);
        });
        
        if(el.type === 'range') {
             el.addEventListener('change', () => saveStateToHistory());
        }
    });
    
    document.querySelectorAll('input[type="text"], select').forEach(el => {
        el.addEventListener('change', () => saveStateToHistory());
    });

    // Checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(el => {
        el.addEventListener('change', (e) => {
            if(e.target.id === 'bg-transparent') {
                state.canvas.transparentBg = e.target.checked;
            } else if(e.target.id.endsWith('-visible')) {
                const layer = e.target.id.split('-')[0];
                state.layers[layer].isVisible = e.target.checked;
            }
            renderCanvas();
            saveStateToHistory();
        });
    });

    // Buttons
    document.getElementById('undo-btn').addEventListener('click', undo);
    document.getElementById('redo-btn').addEventListener('click', redo);
    document.getElementById('reset-btn').addEventListener('click', () => {
        if(confirm("Reset semua pengaturan ke awal?")) {
            init(); 
        }
    });

    // Position Buttons
    document.querySelectorAll('.pos-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnEl = e.target.closest('.pos-btn');
            const dir = btnEl.dataset.dir;
            const layerId = btnEl.closest('.tab-content').id.replace('-tab', '');
            
            const step = 5;
            if(dir === 'up') state.layers[layerId].position.y -= step;
            if(dir === 'down') state.layers[layerId].position.y += step;
            if(dir === 'left') state.layers[layerId].position.x -= step;
            if(dir === 'right') state.layers[layerId].position.x += step;
            if(dir === 'center') { state.layers[layerId].position.x = 256; state.layers[layerId].position.y = 256; }
            
            updateUIFromState();
            renderCanvas();
        });
    });

    document.getElementById('btn-show-preview').addEventListener('click', showPreviewModal);
    document.getElementById('btn-show-final').addEventListener('click', showFinalRenderModal);
}

function validateShapes() {
    ['bg', 'bg2'].forEach(lid => {
        const l = state.layers[lid];
        if (l.itemType === 'server' && !availableShapes[l.itemValue]) {
            console.warn(`Shape ${l.itemValue} tidak ditemukan di server, reset ke basic`);
            l.itemType = 'preset';
            l.itemValue = 'basic_square';
            l.svgContent = '';
        }
    });
}

function updateUIFromState() {
    document.getElementById('bg-color').value = state.canvas.backgroundColor;
    document.getElementById('bg-color-text').value = state.canvas.backgroundColor.toUpperCase();
    document.getElementById('bg-transparent').checked = state.canvas.transparentBg;

    Object.keys(state.layers).forEach(layerId => {
        const layer = state.layers[layerId];
        const prefix = `${layerId}-`;
        
        const visEl = document.getElementById(prefix + 'visible');
        if(visEl) visEl.checked = layer.isVisible;
        
        if (layer.type === 'text') {
            const textEl = document.getElementById(prefix + 'text-val');
            if(textEl) textEl.value = layer.text;
            
            const fontEl = document.getElementById(prefix + 'font');
            if(fontEl) fontEl.value = layer.fontId;
        } else if (layer.type === 'shape') {
            const shapeEl = document.getElementById(prefix + 'shape-type');
            if(shapeEl) shapeEl.value = `${layer.itemType}|${layer.itemValue}`;
        }

        ['scale', 'rotation', 'stroke-width'].forEach(prop => {
            const el = document.getElementById(`${prefix}${prop}`);
            const valEl = document.getElementById(`${prefix}${prop}-val`);
            let stateProp = prop;
            if(prop === 'stroke-width') stateProp = 'strokeWidth';
            
            if(el) el.value = layer[stateProp];
            if(valEl) valEl.textContent = layer[stateProp];
        });

        ['fill', 'stroke'].forEach(prop => {
            const el = document.getElementById(`${prefix}${prop}`);
            const textEl = document.getElementById(`${prefix}${prop}-text`);
            const stateProp = prop + 'Color';
            
            if(el) el.value = layer[stateProp];
            if(textEl) textEl.value = layer[stateProp].toUpperCase();
        });
    });
}

async function handleInput(e) {
    const id = e.target.id;
    const value = e.target.value;

    if (id === 'bg-color') {
        state.canvas.backgroundColor = value;
    } else {
        const parts = id.split('-');
        if(parts.length < 2) return;
        const layerId = parts[0];
        const prop = parts.slice(1).join('-');
        
        if (!state.layers[layerId]) return;

        if (prop === 'text-val') state.layers[layerId].text = value;
        else if (prop === 'font') state.layers[layerId].fontId = value;
        else if (prop === 'shape-type') {
            const [type, val] = value.split('|');
            state.layers[layerId].itemType = type;
            state.layers[layerId].itemValue = val;
            
            if(type === 'server') {
                showLoading();
                await loadShapeFromServer(layerId, val);
                hideLoading();
            } else {
                state.layers[layerId].aspectRatio = 1;
                state.layers[layerId].width = 200;
                state.layers[layerId].height = 200;
            }
        }
        else if (prop === 'scale') state.layers[layerId].scale = parseFloat(value);
        else if (prop === 'rotation') state.layers[layerId].rotation = parseInt(value);
        else if (prop === 'stroke-width') state.layers[layerId].strokeWidth = parseInt(value);
        else if (prop === 'fill') state.layers[layerId].fillColor = value;
        else if (prop === 'stroke') state.layers[layerId].strokeColor = value;
    }
    
    renderCanvas();
}

// ==========================================
// RENDER CANVAS
// ==========================================
function renderCanvas() {
    const canvas = document.getElementById('preview-canvas');
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!state.canvas.transparentBg) {
        ctx.fillStyle = state.canvas.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const orderedLayers = ['bg', 'bg2', 't4', 't3', 't2', 't1']; 
    
    orderedLayers.forEach(layerId => {
        const layer = state.layers[layerId];
        if (!layer.isVisible) return;
        
        ctx.save();
        ctx.translate(layer.position.x, layer.position.y);
        ctx.rotate(layer.rotation * Math.PI / 180);
        ctx.scale(layer.scale, layer.scale);
        
        if (layer.type === 'shape') {
            renderShape(ctx, layer);
        } else if (layer.type === 'text') {
            renderText(ctx, layer);
        }
        
        ctx.restore();
    });
}

function renderShape(ctx, layer) {
    if (layer.itemType === 'preset') {
        const pathData = SHAPE_PRESETS[layer.itemValue];
        if (!pathData) return;
        
        const path = new Path2D();
        
        if (layer.itemValue === 'basic_square') {
            path.rect(-100, -100, 200, 200);
        } else if (layer.itemValue === 'basic_circle') {
            path.arc(0, 0, 100, 0, Math.PI * 2);
        } else if (layer.itemValue === 'basic_triangle') {
            path.moveTo(0, -100); path.lineTo(100, 100); path.lineTo(-100, 100); path.closePath();
        } else if (layer.itemValue === 'basic_star') {
            path.moveTo(0, -100); path.lineTo(22, -31); path.lineTo(95, -31); path.lineTo(36, 12);
            path.lineTo(59, 81); path.lineTo(0, 38); path.lineTo(-59, 81); path.lineTo(-36, 12);
            path.lineTo(-95, -31); path.lineTo(-22, -31); path.closePath();
        } else if (layer.itemValue === 'basic_heart') {
            path.moveTo(0, 30);
            path.bezierCurveTo(-100, 30, -100, -80, -100, -80);
            path.bezierCurveTo(-100, -130, -40, -150, 0, -100);
            path.bezierCurveTo(40, -150, 100, -130, 100, -80);
            path.bezierCurveTo(100, -30, 0, 30, 0, 30);
        }

        ctx.fillStyle = layer.fillColor;
        ctx.fill(path);
        
        if (layer.strokeWidth > 0) {
            ctx.lineWidth = layer.strokeWidth;
            ctx.strokeStyle = layer.strokeColor;
            ctx.stroke(path);
        }
    } else if (layer.itemType === 'server' && layer.svgContent) {
        renderSVGLayer(ctx, layer);
    }
}

function renderSVGLayer(ctx, layer) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(layer.svgContent, "image/svg+xml");
    const paths = doc.querySelectorAll('path, rect, circle, polygon, ellipse');
    
    const w = layer.width || 200;
    const h = layer.height || 200;
    
    ctx.translate(-w/2, -h/2);

    paths.forEach(el => {
        const path2d = new Path2D(el.getAttribute('d') || '');
        
        if(el.tagName === 'rect') {
            path2d.rect(el.getAttribute('x')||0, el.getAttribute('y')||0, el.getAttribute('width')||0, el.getAttribute('height')||0);
        } else if(el.tagName === 'circle') {
             path2d.arc(el.getAttribute('cx')||0, el.getAttribute('cy')||0, el.getAttribute('r')||0, 0, 2*Math.PI);
        }
        
        const cFill = el.getAttribute('fill');
        if (cFill && cFill !== 'none') {
            ctx.fillStyle = layer.fillColor;
            ctx.fill(path2d);
        }
        
        const cStroke = el.getAttribute('stroke');
        const defaultStrokeW = el.getAttribute('stroke-width') ? parseFloat(el.getAttribute('stroke-width')) : 0;
        
        if ((cStroke && cStroke !== 'none') || layer.strokeWidth > 0) {
            ctx.lineWidth = layer.strokeWidth > 0 ? layer.strokeWidth : defaultStrokeW;
            if(ctx.lineWidth > 0) {
                 ctx.strokeStyle = layer.strokeColor;
                 ctx.stroke(path2d);
            }
        }
    });
}

function renderText(ctx, layer) {
    const font = opentypeFonts[layer.fontId];
    if (!font || !layer.text) return;

    let fontSize = 100;
    const path = font.getPath(layer.text, 0, 0, fontSize);
    const bbox = path.getBoundingBox();
    const width = bbox.x2 - bbox.x1;
    const height = bbox.y2 - bbox.y1;

    let currentFontSize = fontSize;
    if (width > 400) {
        currentFontSize = fontSize * (400 / width);
    }
    
    const adjustedPath = font.getPath(layer.text, 0, 0, currentFontSize);
    const aBbox = adjustedPath.getBoundingBox();
    const xOffset = -(aBbox.x1 + (aBbox.x2 - aBbox.x1) / 2);
    const yOffset = -(aBbox.y1 + (aBbox.y2 - aBbox.y1) / 2);

    ctx.translate(xOffset, yOffset);

    if (layer.strokeWidth > 0) {
        ctx.lineWidth = layer.strokeWidth * 2; 
        ctx.lineJoin = 'round';
        ctx.miterLimit = 2;
        ctx.strokeStyle = layer.strokeColor;
        
        adjustedPath.commands.forEach(cmd => {
            if (cmd.type === 'M') ctx.moveTo(cmd.x, cmd.y);
            else if (cmd.type === 'L') ctx.lineTo(cmd.x, cmd.y);
            else if (cmd.type === 'C') ctx.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
            else if (cmd.type === 'Q') ctx.quadraticCurveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
            else if (cmd.type === 'Z') ctx.closePath();
        });
        ctx.stroke();
    }

    ctx.fillStyle = layer.fillColor;
    ctx.beginPath();
    adjustedPath.commands.forEach(cmd => {
        if (cmd.type === 'M') ctx.moveTo(cmd.x, cmd.y);
        else if (cmd.type === 'L') ctx.lineTo(cmd.x, cmd.y);
        else if (cmd.type === 'C') ctx.bezierCurveTo(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        else if (cmd.type === 'Q') ctx.quadraticCurveTo(cmd.x1, cmd.y1, cmd.x, cmd.y);
        else if (cmd.type === 'Z') ctx.closePath();
    });
    ctx.fill();
}

// ==========================================
// INTERAKSI CANVAS (DRAG)
// ==========================================
function setupCanvasInteractions() {
    const canvas = document.getElementById('preview-canvas');
    
    function getPointerPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    }

    function handleStart(e) {
        e.preventDefault();
        const pos = getPointerPos(e);
        
        activeDragLayer = activeLayer;
        
        if (state.layers[activeDragLayer] && state.layers[activeDragLayer].isVisible) {
            isDragging = true;
            startDragPos = {
                x: pos.x - state.layers[activeDragLayer].position.x,
                y: pos.y - state.layers[activeDragLayer].position.y
            };
        }
    }

    function handleMove(e) {
        if (!isDragging || !activeDragLayer) return;
        e.preventDefault();
        
        const pos = getPointerPos(e);
        state.layers[activeDragLayer].position.x = Math.round(pos.x - startDragPos.x);
        state.layers[activeDragLayer].position.y = Math.round(pos.y - startDragPos.y);
        
        renderCanvas();
    }

    function handleEnd() {
        if (isDragging) {
            isDragging = false;
            saveStateToHistory();
        }
    }

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);

    canvas.addEventListener('touchstart', handleStart, {passive: false});
    canvas.addEventListener('touchmove', handleMove, {passive: false});
    window.addEventListener('touchend', handleEnd);
}

// ==========================================
// HISTORY & UNDO/REDO
// ==========================================
function saveStateToHistory() {
    const stateStr = JSON.stringify(state);
    
    if (historyIndex >= 0 && history[historyIndex] === stateStr) {
        return;
    }
    
    history = history.slice(0, historyIndex + 1);
    history.push(stateStr);
    
    if (history.length > MAX_UNDO_HISTORY) {
        history.shift();
    } else {
        historyIndex++;
    }
    updateHistoryButtons();
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        state = JSON.parse(history[historyIndex]);
        updateUIFromState();
        renderCanvas();
        updateHistoryButtons();
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        state = JSON.parse(history[historyIndex]);
        updateUIFromState();
        renderCanvas();
        updateHistoryButtons();
    }
}

function updateHistoryButtons() {
    const undoBtn = document.getElementById('undo-btn');
    const redoBtn = document.getElementById('redo-btn');
    
    if (historyIndex > 0) {
        undoBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        undoBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
    
    if (historyIndex < history.length - 1) {
        redoBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        redoBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

// ==========================================
// EXPORT SVG 
// ==========================================
function generateFullSVG() {
    const urlParams = new URLSearchParams(window.location.search);
    const animId = urlParams.get('anim') || "none";
    
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" data-anim="${animId}">\n`;
    
    if (!state.canvas.transparentBg) {
        svg += `  <rect width="100%" height="100%" fill="${state.canvas.backgroundColor}" />\n`;
    }

    const orderedLayers = ['bg', 'bg2', 't4', 't3', 't2', 't1'];
    
    orderedLayers.forEach(layerId => {
        const layer = state.layers[layerId];
        if (!layer.isVisible) return;

        svg += `  <g id="layer_${layerId}">\n`;
        svg += `    <g transform="translate(${layer.position.x}, ${layer.position.y}) rotate(${layer.rotation}) scale(${layer.scale})">\n`;

        if (layer.type === 'shape') {
            if (layer.itemType === 'preset') {
                const pathData = SHAPE_PRESETS[layer.itemValue];
                if(pathData) {
                    let injectStr = `fill="${layer.fillColor}"`;
                    if (layer.strokeWidth > 0) {
                        injectStr += ` stroke="${layer.strokeColor}" stroke-width="${layer.strokeWidth}"`;
                    }
                    const injectedPath = pathData.replace('<path ', `<path ${injectStr} `)
                                                 .replace('<rect ', `<rect ${injectStr} `)
                                                 .replace('<circle ', `<circle ${injectStr} `)
                                                 .replace('<polygon ', `<polygon ${injectStr} `);
                    svg += `      ${injectedPath}\n`;
                }
            } else if (layer.itemType === 'server' && layer.svgContent) {
                const w = layer.width || 200;
                const h = layer.height || 200;
                svg += `      <g transform="translate(${-w/2}, ${-h/2})">\n`;
                
                const parser = new DOMParser();
                const doc = parser.parseFromString(layer.svgContent, "image/svg+xml");
                const paths = doc.querySelectorAll('path, rect, circle, polygon, ellipse');
                
                paths.forEach(el => {
                    let clone = el.cloneNode(true);
                    const cFill = clone.getAttribute('fill');
                    if (cFill && cFill !== 'none') {
                        clone.setAttribute('fill', layer.fillColor);
                    }
                    
                    const cStroke = clone.getAttribute('stroke');
                    if ((cStroke && cStroke !== 'none') || layer.strokeWidth > 0) {
                        if(layer.strokeWidth > 0) {
                             clone.setAttribute('stroke', layer.strokeColor);
                             clone.setAttribute('stroke-width', layer.strokeWidth);
                        }
                    }
                    svg += `        ${clone.outerHTML}\n`;
                });
                svg += `      </g>\n`;
            }
        } else if (layer.type === 'text') {
            const font = opentypeFonts[layer.fontId];
            if (font && layer.text) {
                let fontSize = 100;
                const path = font.getPath(layer.text, 0, 0, fontSize);
                const bbox = path.getBoundingBox();
                const width = bbox.x2 - bbox.x1;
                
                let currentFontSize = fontSize;
                if (width > 400) currentFontSize = fontSize * (400 / width);
                
                const adjustedPath = font.getPath(layer.text, 0, 0, currentFontSize);
                const aBbox = adjustedPath.getBoundingBox();
                const xOffset = -(aBbox.x1 + (aBbox.x2 - aBbox.x1) / 2);
                const yOffset = -(aBbox.y1 + (aBbox.y2 - aBbox.y1) / 2);

                svg += `      <g transform="translate(${xOffset}, ${yOffset})">\n`;
                
                const svgPathData = adjustedPath.toPathData(2);
                
                svg += `        <path d="${svgPathData}" fill="${layer.fillColor}" `;
                if (layer.strokeWidth > 0) {
                    svg += `stroke="${layer.strokeColor}" stroke-width="${layer.strokeWidth * 2}" stroke-linejoin="round" `;
                }
                svg += `/>\n`;
                svg += `      </g>\n`;
            }
        }

        svg += `    </g>\n`;
        svg += `  </g>\n`;
    });

    svg += `</svg>`;
    return svg;
}

// ==========================================
// MODAL & SUBMIT KE BACKEND
// ==========================================
function showLoading(text = "Memproses...") {
    const el = document.getElementById('loading-overlay');
    document.getElementById('loading-text').textContent = text;
    el.classList.remove('hidden');
    el.classList.add('flex');
}

function hideLoading() {
    document.getElementById('loading-overlay').classList.add('hidden');
    document.getElementById('loading-overlay').classList.remove('flex');
}

function getClientMetadata() {
    const getPlatform = () => {
        let p = (tg && tg.platform) ? tg.platform : "unknown";
        if (p === "unknown") {
            const ua = navigator.userAgent.toLowerCase();
            if (ua.includes('android')) p = 'android (web)';
            else if (ua.includes('iphone') || ua.includes('ipad')) p = 'ios (web)';
            else if (ua.includes('windows')) p = 'windows';
            else if (ua.includes('mac')) p = 'macos';
            else p = 'web';
        }
        return p;
    };

    return {
        platform: getPlatform(),
        device: navigator.userAgent,
        lang: navigator.language || "unknown",
        screen: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown",
        connection: (navigator.connection ? navigator.connection.effectiveType : "unknown")
    };
}

// --- MODIFIKASI FUNGSI PREVIEW MODAL UNTUK MENAMPILKAN EFEK CAHAYA ---
function showPreviewModal() {
    const modal = document.getElementById('preview-modal');
    const container = document.getElementById('preview-modal-content');
    
    const urlParams = new URLSearchParams(window.location.search);
    const animId = urlParams.get('anim');
    
    if(!animId) {
        alert("Mode Live Preview hanya tersedia jika Anda mengedit template animasi dari bot.");
        return;
    }
    
    let themeOptions = `<option value="none">Original (Sesuai Racikan)</option>`;
    availableThemes.forEach(t => {
        const tName = t.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        themeOptions += `<option value="${t}">${tName}</option>`;
    });

    // --- PEMBUATAN OPSI EFEK CAHAYA ---
    let effectOptions = `<option value="none">Tanpa Efek Tambahan</option>`;
    if (Object.keys(availableLightEffects).length > 0) {
        for (const [key, name] of Object.entries(availableLightEffects)) {
            if (key !== 'light_none') {
                effectOptions += `<option value="${key}">${name.replace('❌ ', '')}</option>`;
            }
        }
    } else {
        effectOptions += `<option value="none" disabled>Gagal memuat efek</option>`;
    }

    container.innerHTML = `
        <div class="mb-4 text-center">
            <h3 class="text-xl font-bold text-white mb-2">Live Preview (Animasi)</h3>
            <p class="text-sm text-gray-400">Lihat hasil animasi sebelum menyimpannya ke bot.</p>
        </div>
        
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-400 mb-1">Tema Warna (Opsional)</label>
            <select id="preview-theme-select" class="w-full bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-blue-500">
                ${themeOptions}
            </select>
        </div>

        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-400 mb-1">Efek Tambahan (Cahaya)</label>
            <select id="extra-effect-select" class="w-full bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-blue-500">
                ${effectOptions}
            </select>
        </div>
        
        <div id="live-preview-box" class="w-full h-64 bg-gray-900 rounded-lg border border-gray-700 flex items-center justify-center mb-4 relative overflow-hidden">
             <i class="fas fa-play-circle text-4xl text-gray-600 cursor-pointer hover:text-blue-500 transition-colors" id="btn-play-live"></i>
             <div id="live-loading" class="hidden absolute inset-0 bg-gray-900/80 flex items-center justify-center z-10">
                 <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
             </div>
             <div id="player-container" class="w-full h-full"></div>
        </div>
        
        <div class="flex justify-end gap-3 mt-4">
            <button id="btn-close-preview" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded font-bold transition-colors">Tutup</button>
            <button id="btn-use-preview" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold transition-colors shadow-[0_0_10px_rgba(37,99,235,0.5)] hidden">Gunakan Hasil Ini</button>
        </div>
    `;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    document.getElementById('btn-close-preview').addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.getElementById('player-container').innerHTML = '';
    });
    
    document.getElementById('btn-play-live').addEventListener('click', applyLivePreview);
    
    document.getElementById('btn-use-preview').addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.getElementById('player-container').innerHTML = '';
        
        const selectedTheme = document.getElementById('preview-theme-select').value;
        const selectedExtraEffect = document.getElementById('extra-effect-select').value;
        submitToBot(selectedTheme, selectedExtraEffect);
    });
}

// --- MODIFIKASI FUNGSI APPLY LIVE PREVIEW (KIRIM PAYLOAD EFEK) ---
async function applyLivePreview() {
    if (!tg || !tg.initData) {
        alert("Hanya bisa preview dari dalam Telegram.");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const animId = urlParams.get('anim');
    const selectedTheme = document.getElementById('preview-theme-select').value;
    const selectedExtraEffect = document.getElementById('extra-effect-select').value; // --- TANGKAP NILAI EFEK ---

    document.getElementById('btn-play-live').classList.add('hidden');
    document.getElementById('live-loading').classList.remove('hidden');
    document.getElementById('btn-use-preview').classList.add('hidden');
    
    const svgContent = generateFullSVG();
    
    try {
        const compressedSvgData = pako.gzip(svgContent);
        const base64Svg = btoa(String.fromCharCode.apply(null, new Uint8Array(compressedSvgData)));
        
        const payload = {
            init_data: tg.initData,
            svg_data: base64Svg,
            anim_id: animId,
            app_state: state,
            is_compressed: true,
            theme: selectedTheme,
            extra_effect: selectedExtraEffect, // --- MASUKKAN KE PAYLOAD ---
            client_metadata: getClientMetadata()
        };

        const response = await fetch(`${API_BASE_URL}/api/live_preview`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            
            const container = document.getElementById('player-container');
            container.innerHTML = `<tgs-player autoplay loop mode="normal" src="${url}" class="w-full h-full"></tgs-player>`;
            
            document.getElementById('btn-use-preview').classList.remove('hidden');
        } else {
            const err = await response.json();
            alert("Gagal memuat preview: " + (err.error || "Server Error"));
            document.getElementById('btn-play-live').classList.remove('hidden');
        }
    } catch (e) {
        console.error("Live Preview Error:", e);
        alert("Koneksi gagal atau proses terputus.");
        document.getElementById('btn-play-live').classList.remove('hidden');
    } finally {
        document.getElementById('live-loading').classList.add('hidden');
    }
}

// --- MODIFIKASI FINAL RENDER MODAL UNTUK MENAMPILKAN EFEK CAHAYA ---
function showFinalRenderModal() {
    const modal = document.getElementById('preview-modal');
    const container = document.getElementById('preview-modal-content');
    
    let themeOptions = `<option value="none">Original (Sesuai Racikan)</option>`;
    availableThemes.forEach(t => {
        const tName = t.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        themeOptions += `<option value="${t}">${tName}</option>`;
    });

    // --- PEMBUATAN OPSI EFEK CAHAYA ---
    let effectOptions = `<option value="none">Tanpa Efek Tambahan</option>`;
    if (Object.keys(availableLightEffects).length > 0) {
        for (const [key, name] of Object.entries(availableLightEffects)) {
            if (key !== 'light_none') {
                effectOptions += `<option value="${key}">${name.replace('❌ ', '')}</option>`;
            }
        }
    } else {
        effectOptions += `<option value="none" disabled>Gagal memuat efek</option>`;
    }

    container.innerHTML = `
        <div class="mb-4 text-center">
            <h3 class="text-xl font-bold text-white mb-2">Kirim ke Bot</h3>
            <p class="text-sm text-gray-400">Desain Anda sudah siap. Ingin mengubah palet warna atau menambahkan efek cahaya sebelum dikirim?</p>
        </div>
        
        <div class="mb-4">
            <label class="block text-sm font-medium text-gray-400 mb-1">Pilih Tema Warna Baru (Opsional)</label>
            <select id="final-theme-select" class="w-full bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-blue-500">
                ${themeOptions}
            </select>
        </div>

        <div class="mb-6">
            <label class="block text-sm font-medium text-gray-400 mb-1">Efek Tambahan (Cahaya)</label>
            <select id="extra-effect-select-final" class="w-full bg-gray-700 text-white rounded p-2 border border-gray-600 focus:border-blue-500">
                ${effectOptions}
            </select>
        </div>
        
        <div class="flex justify-end gap-3 mt-4">
            <button id="btn-close-final" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded font-bold transition-colors">Batal</button>
            <button id="btn-submit-final" class="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded font-bold transition-colors shadow-[0_0_15px_rgba(37,99,235,0.5)]">Proses & Kirim</button>
        </div>
    `;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    document.getElementById('btn-close-final').addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    });
    
    document.getElementById('btn-submit-final').addEventListener('click', () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        const selectedTheme = document.getElementById('final-theme-select').value;
        const selectedExtraEffect = document.getElementById('extra-effect-select-final').value;
        submitToBot(selectedTheme, selectedExtraEffect);
    });
}

// --- MODIFIKASI SUBMIT TO BOT ---
async function submitToBot(theme = "none", extraEffect = "none") {
    if (!tg || !tg.initData) {
        alert("Aplikasi ini hanya dapat digunakan melalui Telegram.");
        return;
    }

    showLoading("Mengompresi Vector...");
    const svgContent = generateFullSVG();

    try {
        const compressedSvgData = pako.gzip(svgContent);
        const base64Svg = btoa(String.fromCharCode.apply(null, new Uint8Array(compressedSvgData)));

        showLoading("Mengunggah ke Server...");
        
        const payload = {
            init_data: tg.initData,
            svg_data: base64Svg,
            is_compressed: true,
            app_state: state,
            theme: theme,
            extra_effect: extraEffect, // --- MASUKKAN KE PAYLOAD ---
            client_metadata: getClientMetadata()
        };

        const response = await fetch(`${API_BASE_URL}/api/upload`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            tg.close();
        } else {
            const errData = await response.json();
            alert("Gagal mengunggah: " + (errData.error || "Unknown Error"));
        }
    } catch (error) {
        console.error("Upload error:", error);
        alert("Gagal terhubung ke server. Pastikan bot Anda aktif.");
    } finally {
        hideLoading();
    }
}

// --- MODIFIKASI AUTO MODE SUBMIT ---
document.getElementById('auto-submit-btn').addEventListener('click', async (e) => {
    if (!tg || !tg.initData) {
        alert("Aplikasi ini hanya dapat digunakan melalui Telegram.");
        return;
    }
    
    const animId = e.target.dataset.animId;
    const allowCenter = e.target.dataset.allowCenter === 'true';
    
    let hasInput = false;
    let onlyT1Filled = true;
    let t1Text = "";
    
    const orderedLayers = ['t1', 't2', 't3', 't4'];
    
    orderedLayers.forEach(layerId => {
        const inputEl = document.getElementById(`auto-input-${layerId}`);
        if(inputEl) {
            const val = inputEl.value.trim();
            state.layers[layerId].text = val;
            if(val) {
                hasInput = true;
                if(layerId === 't1') t1Text = val;
                else onlyT1Filled = false;
            } else {
                state.layers[layerId].isVisible = false; 
            }
        }
    });
    
    if (allowCenter && hasInput && onlyT1Filled) {
        state.layers['t1'].position.x = 256;
        state.layers['t1'].position.y = 256;
        
        if(state.layers['bg'] && state.layers['bg'].isVisible) {
            state.layers['bg'].position.x = 256;
            state.layers['bg'].position.y = 256;
        }
        if(state.layers['bg2'] && state.layers['bg2'].isVisible) {
            state.layers['bg2'].position.x = 256;
            state.layers['bg2'].position.y = 256;
        }
    }
    
    renderCanvas();

    showLoading("Memproses Otomatis...");
    const svgContent = generateFullSVG();

    try {
        const compressedSvgData = pako.gzip(svgContent);
        const base64Svg = btoa(String.fromCharCode.apply(null, new Uint8Array(compressedSvgData)));
        
        // --- TANGKAP NILAI EFEK DARI AUTO MODE ---
        const autoTheme = document.getElementById('auto-theme-select') ? document.getElementById('auto-theme-select').value : 'none';
        
        // --- JIKA NANTINYA ANDA MENAMBAHKAN DROPDOWN EFEK DI HTML MODE OTOMATIS ---
        const autoEffect = document.getElementById('auto-effect-select') ? document.getElementById('auto-effect-select').value : 'none';

        const payload = {
            init_data: tg.initData,
            svg_data: base64Svg,
            is_compressed: true,
            is_auto: true,
            anim_id: animId,
            theme: autoTheme,
            extra_effect: autoEffect, // --- MASUKKAN KE PAYLOAD ---
            client_metadata: getClientMetadata()
        };

        const response = await fetch(`${API_BASE_URL}/api/upload`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            tg.close();
        } else {
            const errData = await response.json();
            alert("Gagal memproses mode otomatis: " + (errData.error || "Unknown Error"));
        }
    } catch (error) {
        console.error("Auto Submit error:", error);
        alert("Gagal terhubung ke server.");
    } finally {
        hideLoading();
    }
});


// ==========================================
// TEMPLATE MANAJER 
// ==========================================
document.getElementById('btn-save-template').addEventListener('click', () => {
    document.getElementById('save-template-modal').classList.remove('hidden');
    document.getElementById('save-template-modal').classList.add('flex');
});

document.getElementById('btn-cancel-save-template').addEventListener('click', () => {
    document.getElementById('save-template-modal').classList.add('hidden');
    document.getElementById('save-template-modal').classList.remove('flex');
});

document.getElementById('btn-confirm-save-template').addEventListener('click', () => {
    const name = document.getElementById('template-name-input').value.trim();
    if(!name) {
        alert("Silakan masukkan nama template.");
        return;
    }
    
    if (!tg || !tg.CloudStorage) {
        alert("Fitur penyimpanan template tidak tersedia di platform ini.");
        return;
    }
    
    const templateKey = `tpl_${Date.now()}`;
    const templateData = JSON.stringify(state);
    
    tg.CloudStorage.setItem(templateKey, templateData, (err, success) => {
        if(err) {
            alert("Gagal menyimpan template: " + err);
        } else {
            tg.CloudStorage.setItem(`${templateKey}_name`, name, () => {
                alert("Template berhasil disimpan!");
                document.getElementById('save-template-modal').classList.add('hidden');
                document.getElementById('template-name-input').value = '';
            });
        }
    });
});

document.getElementById('btn-load-template').addEventListener('click', () => {
    if (!tg || !tg.CloudStorage) {
        alert("Fitur template tidak tersedia.");
        return;
    }
    
    const modal = document.getElementById('template-modal');
    const container = document.getElementById('template-list-container');
    container.innerHTML = '<p class="text-sm text-gray-400">Memuat daftar template...</p>';
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    tg.CloudStorage.getKeys((err, keys) => {
        if (err || !keys || keys.length === 0) {
            container.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400">Anda belum memiliki template tersimpan.</p>';
            return;
        }
        
        const templateKeys = keys.filter(k => k.startsWith('tpl_') && !k.endsWith('_name'));
        if(templateKeys.length === 0) {
            container.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400">Anda belum memiliki template tersimpan.</p>';
            return;
        }
        
        container.innerHTML = '';
        
        templateKeys.forEach(key => {
            tg.CloudStorage.getItem(`${key}_name`, (errName, nameVal) => {
                const displayName = nameVal || `Template ${key.replace('tpl_', '')}`;
                
                const item = document.createElement('div');
                item.className = 'flex justify-between items-center bg-gray-800 p-3 rounded border border-gray-700 mb-2';
                item.innerHTML = `
                    <span class="text-white font-medium truncate flex-1 mr-2">${displayName}</span>
                    <div class="flex gap-2">
                        <button class="btn-load-item px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-sm transition-colors" data-key="${key}">Muat</button>
                        <button class="btn-del-item px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-sm transition-colors" data-key="${key}">Hapus</button>
                    </div>
                `;
                container.appendChild(item);
                
                item.querySelector('.btn-load-item').addEventListener('click', () => loadTemplate(key));
                item.querySelector('.btn-del-item').addEventListener('click', () => deleteTemplate(key, item));
            });
        });
    });
});

document.getElementById('btn-close-template-modal').addEventListener('click', closeTemplateModal);

function loadTemplate(key) {
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

function deleteTemplate(key, htmlElement) {
    if (!tg || !tg.CloudStorage) return;
    
    if(confirm("Apakah Anda yakin ingin menghapus template ini?")) {
        tg.CloudStorage.removeItem(key, (err, success) => {
            if(!err) {
                htmlElement.remove();
                if(document.getElementById('template-list-container').children.length === 0) {
                     document.getElementById('template-list-container').innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400">Anda belum memiliki template tersimpan.</p>';
                }
            }
        });
    }
}

function closeTemplateModal() {
    const modal = document.getElementById('template-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Mulai Aplikasi
init();
