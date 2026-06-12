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
                    <h1 class="text-3xl font-bold text-white mb-4">Akses Ditolak</h1>
                    <p class="text-gray-300 text-center text-lg">Aplikasi ini hanya dapat dijalankan melalui Telegram Client Resmi di perangkat Android atau iOS.</p>
                `;
            }
        });
    }
})();

// ==========================================
// KONFIGURASI API DAN DOMAIN
// ==========================================
const API_BASE_URL = "https://11ea-103-241-205-89.ngrok-free.app"; 

// ==========================================
// DAFTAR SHAPE (Ditarik Otomatis dari Bot)
// ==========================================
let ALL_SHAPES_LIST = {}; 

const FONT_LIST = [
    "TitanOne", "AlfaSlabOne", "BebasNeue", "CherryBombOne",
    "Chewy", "FredokaOne", "FugazOne", "LilitaOne",
    "LuckiestGuy", "Modak", "MochiyPopOne", "OleoScript",
    "Pattaya", "PaytoneOne", "Ranchers", "Righteous",
    "RussoOne", "SeymourOne", "Shrikhand", "SigmarOne",
    "Sniglet", "SquadaOne", "Staatliches", "SuezOne",
    "Bungee", "BowlbyOne", "CarterOne", "CevicheOne",
    "ChangaOne", "CodaCaption", "Coiny", "Creepster",
    "EricaOne", "FascinateInline", "Frijole", "GeostarFill",
    "Gluten", "GoblinOne", "Knewave", "KumarOne",
    "LondrinaSolid", "MaShanZheng", "Mina", "NewRocker",
    "Nosifer", "PirataOne", "Plaster", "PollerOne",
    "RammettoOne", "RampartOne", "RubikBurned", "RubikGlitch",
    "RubikMicrobe", "RubikPuddles", "RubikWetPaint", "SairaStencilOne",
    "Shojumaru", "SirinStencil", "Slackey", "Smokum",
    "SonsieOne", "SpicyRice", "StalinistOne", "VampiroOne",
    "VastShadow", "Wallpoet", "ZhiMangXing", "ZillaSlabHighlight"
];

let state = {
    canvasColor: "#000000",
    canvasOpacity: 0,
    layers: {
        layer_bg: {
            active: true, type: "shape", text: "", fontFamily: FONT_LIST[0], shape: "json_none",
            fill: "#FFFFFF", stroke: "#000000", strokeWidth: 10,
            x: 256, y: 256, scale: 1, rotation: 0
        },
        layer_bg2: { 
            active: false, type: "shape", text: "", fontFamily: FONT_LIST[0], shape: "json_none",
            fill: "#FFFFFF", stroke: "#000000", strokeWidth: 10,
            x: 256, y: 256, scale: 1, rotation: 0
        },
        layer_t1: {
            active: true, type: "text", text: "Teks 1", fontFamily: FONT_LIST[0], shape: "json_none",
            fill: "#FFFFFF", stroke: "#000000", strokeWidth: 10,
            x: 256, y: 256, scale: 1, rotation: 0
        },
        layer_t2: {
            active: false, type: "text", text: "Teks 2", fontFamily: FONT_LIST[0], shape: "json_none",
            fill: "#FFFFFF", stroke: "#000000", strokeWidth: 10,
            x: 256, y: 256, scale: 1, rotation: 0
        },
        layer_t3: {
            active: false, type: "text", text: "Teks 3", fontFamily: FONT_LIST[0], shape: "json_none",
            fill: "#FFFFFF", stroke: "#000000", strokeWidth: 10,
            x: 256, y: 256, scale: 1, rotation: 0
        },
        layer_t4: {
            active: false, type: "text", text: "Teks 4", fontFamily: FONT_LIST[0], shape: "json_none",
            fill: "#FFFFFF", stroke: "#000000", strokeWidth: 10,
            x: 256, y: 256, scale: 1, rotation: 0
        }
    }
};

let currentLayer = "layer_t1";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const urlParams = new URLSearchParams(window.location.search);
const animId = urlParams.get('anim');
const isAutoText = urlParams.get('auto_text') === '1';

// ==========================================
// STATE UNTUK FITUR FINISHING (LIVE PREVIEW)
// ==========================================
let activeTheme = "none";
let activeExtraEffect = "none";
let isLivePreviewOpen = false;

const EXTRA_EFFECTS = {
    "none": "❌ Original (Sesuai Template)",
    "light_sweep": "✨ Light Sweep",
    "wobble": "🥴 Wobble Effect",
    "pulse": "💓 Pulse Glow",
    "rainbow": "🌈 Rainbow Aura"
};

let autoCenterEnabled = false;

// ==========================================
// VARIABEL CACHE UNTUK SHAPE & FONT
// ==========================================
let preloadedShapes = {};
let fontsLoaded = {};

let history = [];
let historyIndex = -1;
let isUndoRedoAction = false;

// ==========================================
// VARIABEL ANIMASI LOKAL (PREVIEW MURNI)
// ==========================================
let autoAnimPlayer = null; 
let tgsAnimPlayer = null;
let customPreviewData = null; 
let isLocalPreviewPlaying = false; 
let isCloudPreviewPlaying = false;

function loadFonts() {
    FONT_LIST.forEach(font => {
        const fontFace = new FontFace(font, `url(fonts/${font}.woff)`);
        fontFace.load().then(loadedFace => {
            document.fonts.add(loadedFace);
            fontsLoaded[font] = true;
            renderCanvas();
        }).catch(err => console.error(`Gagal memuat font ${font}`, err));
    });
}

function updateURLParams() {
    if (animId && !isAutoText) {
        history.replaceState(null, '', `?anim=${animId}`);
    } else if (animId && isAutoText) {
        history.replaceState(null, '', `?anim=${animId}&auto_text=1`);
    } else {
        history.replaceState(null, '', window.location.pathname);
    }
}

async function loadShapesFromBot() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/shapes`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                "Cache-Control": "no-cache"
            }
        });
        if (!response.ok) throw new Error("Gagal mengambil daftar shape");
        
        const shapesData = await response.json();
        
        ALL_SHAPES_LIST = {};
        
        ALL_SHAPES_LIST["json_none"] = "❌ Tanpa Bentuk";
        
        for (const [id, name] of Object.entries(shapesData)) {
            ALL_SHAPES_LIST[id] = name;
        }

        populateShapeDropdown("layer_bg_shape");
        populateShapeDropdown("layer_bg2_shape");
        
        if (!ALL_SHAPES_LIST[state.layers.layer_bg.shape]) {
            state.layers.layer_bg.shape = "json_none";
        }
        if (!ALL_SHAPES_LIST[state.layers.layer_bg2.shape]) {
            state.layers.layer_bg2.shape = "json_none";
        }

        document.getElementById("layer_bg_shape").value = state.layers.layer_bg.shape;
        document.getElementById("layer_bg2_shape").value = state.layers.layer_bg2.shape;
        
    } catch (error) {
        console.error("Error loading shapes dari bot:", error);
        alert("Gagal memuat daftar bentuk dari server. Silakan muat ulang halaman.");
        ALL_SHAPES_LIST["json_none"] = "❌ Tanpa Bentuk";
    }
}

function populateShapeDropdown(dropdownId) {
    const sel = document.getElementById(dropdownId);
    if (!sel) return;
    
    sel.innerHTML = "";
    
    for (const [val, label] of Object.entries(ALL_SHAPES_LIST)) {
        const opt = document.createElement("option");
        opt.value = val;
        opt.text = label;
        sel.appendChild(opt);
    }
}

async function fetchThemesFromBot() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/themes`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                "Cache-Control": "no-cache"
            }
        });
        if (!response.ok) throw new Error("Gagal mengambil daftar tema");
        
        const data = await response.json();
        if (data.status === "success" && data.themes) {
            // Container lama untuk manual mode (jika ada)
            const themeContainer = document.getElementById('theme-buttons-container');
            if (themeContainer) {
                themeContainer.innerHTML = '';
                
                const btnNone = document.createElement('button');
                btnNone.className = `px-3 py-1.5 rounded-full text-xs font-medium border ${activeTheme === 'none' ? 'bg-primary border-primary text-white' : 'bg-gray-100 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'}`;
                btnNone.innerText = "Ori";
                btnNone.onclick = () => selectTheme('none');
                themeContainer.appendChild(btnNone);
                
                data.themes.forEach(theme => {
                    const btn = document.createElement('button');
                    btn.className = `px-3 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap ${activeTheme === theme ? 'bg-primary border-primary text-white' : 'bg-gray-100 border-gray-200 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300'}`;
                    btn.innerText = theme.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    btn.onclick = () => selectTheme(theme);
                    themeContainer.appendChild(btn);
                });
            }

            // Container baru untuk UI Modal Live Preview
            const lpColorContainer = document.getElementById('lp-color-list');
            if (lpColorContainer) {
                lpColorContainer.innerHTML = '';
                const btnNone = document.createElement('button');
                btnNone.className = `px-4 py-2 rounded-xl text-sm font-semibold border ${activeTheme === 'none' ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'bg-gray-100 text-gray-700 border-transparent dark:bg-gray-700 dark:text-gray-300'} transition-all`;
                btnNone.innerText = "Original";
                btnNone.onclick = () => { closeColorMenu(); applyLivePreviewTheme('none'); };
                lpColorContainer.appendChild(btnNone);

                data.themes.forEach(theme => {
                    const btn = document.createElement('button');
                    btn.className = `px-4 py-2 rounded-xl text-sm font-semibold border whitespace-nowrap ${activeTheme === theme ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'bg-gray-100 text-gray-700 border-transparent dark:bg-gray-700 dark:text-gray-300'} transition-all`;
                    btn.innerText = theme.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    btn.onclick = () => { closeColorMenu(); applyLivePreviewTheme(theme); };
                    lpColorContainer.appendChild(btn);
                });
            }
        }
    } catch (error) {
        console.error("Error loading themes:", error);
    }
}

function selectTheme(themeId) {
    activeTheme = themeId;
    fetchThemesFromBot(); 
}

// FUNGSI KHUSUS ITERASI LIVE PREVIEW (MODAL)
function applyLivePreviewTheme(theme) {
    activeTheme = theme;
    fetchThemesFromBot(); // Update state button
    if (isLivePreviewOpen) triggerLivePreview(true); // Refresh background
}

function applyLivePreviewEffect(effect) {
    activeExtraEffect = effect;
    renderEffectButtons(); // Update state button
    if (isLivePreviewOpen) triggerLivePreview(true); // Refresh background
}


async function checkAutoTemplate() {
    if (animId) {
        try {
            document.getElementById('loading-overlay').classList.remove('hidden');
            
            const response = await fetch(`${API_BASE_URL}/api/template/${animId}`, {
                headers: {
                    "ngrok-skip-browser-warning": "true",
                    "Cache-Control": "no-cache"
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.status === 'success' && data.state) {
                    state = data.state;
                    
                    if (data.allow_auto_center !== undefined) {
                        autoCenterEnabled = data.allow_auto_center;
                    }
                    
                    if (!state.layers.layer_bg2) {
                        state.layers.layer_bg2 = { 
                            active: false, type: "shape", text: "", fontFamily: FONT_LIST[0], shape: "json_none",
                            fill: "#FFFFFF", stroke: "#000000", strokeWidth: 10,
                            x: 256, y: 256, scale: 1, rotation: 0
                        };
                    }
                    
                    validateShapes();
                    updateUIFromState();
                    
                    await preloadActiveShapes();
                    
                    renderCanvas();
                    saveStateToHistory(); 
                    console.log(`Template untuk animasi ${animId} dimuat (Mode Teks: ${isAutoText ? 'Otomatis' : 'Manual'}, Auto-Center: ${autoCenterEnabled})`);
                    
                    if (isAutoText) {
                        setupAutoModeUI();
                    } else {
                        checkAndPlayCloudPreview();
                    }
                    
                    document.getElementById('loading-overlay').classList.add('hidden');
                    return true;
                }
            } else if (isAutoText) {
                alert("Template tidak ditemukan. Membuka mode manual.");
                history.replaceState(null, '', `?anim=${animId}`);
                setupManualModeUI();
            }
        } catch (error) {
            console.error("Gagal menarik template:", error);
            if (isAutoText) {
                alert("Gagal menghubungi server. Membuka mode manual.");
                history.replaceState(null, '', `?anim=${animId}`);
                setupManualModeUI();
            }
        }
        document.getElementById('loading-overlay').classList.add('hidden');
    }
    
    if (isAutoText) {
        alert("Parameter animasi tidak valid.");
        setupManualModeUI();
        return false;
    }
    
    setupManualModeUI();
    return false;
}

function validateShapes() {
    for (const l in state.layers) {
        if (state.layers[l].type === "shape") {
            if (!ALL_SHAPES_LIST[state.layers[l].shape]) {
                state.layers[l].shape = "json_none";
            }
        }
    }
}

async function preloadActiveShapes() {
    for (const l in state.layers) {
        const layer = state.layers[l];
        if (layer.active && layer.type === "shape" && layer.shape !== "json_none") {
            await fetchShapeData(layer.shape);
        }
    }
}


function setupAutoModeUI() {
    document.getElementById('manual-ui-container').classList.add('hidden');
    document.getElementById('auto-ui-container').classList.remove('hidden');
    
    document.body.classList.remove('bg-gray-50', 'dark:bg-gray-900');
    document.body.classList.add('bg-white', 'dark:bg-gray-800');
    
    document.querySelector('.canvas-container').classList.add('hidden');
    
    const layerInputsContainer = document.getElementById('auto-layer-inputs');
    layerInputsContainer.innerHTML = '';
    
    const activeLayers = Object.keys(state.layers).filter(l => state.layers[l].active && state.layers[l].type === "text");
    
    if (activeLayers.length === 0) {
        layerInputsContainer.innerHTML = '<p class="text-center text-gray-500 py-4">Template ini tidak memiliki layer teks aktif.</p>';
    } else {
        activeLayers.forEach(l => {
            const layer = state.layers[l];
            let layerLabel = l.replace('layer_t', 'Teks ');
            
            const div = document.createElement('div');
            div.className = 'bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm';
            
            div.innerHTML = `
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">${layerLabel}</label>
                <div class="relative">
                    <input type="text" id="auto_input_${l}" class="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-800 dark:text-white transition-all shadow-sm" value="${layer.text}" placeholder="Masukkan ${layerLabel}">
                </div>
            `;
            layerInputsContainer.appendChild(div);
            
            document.getElementById(`auto_input_${l}`).addEventListener('input', (e) => {
                state.layers[l].text = e.target.value;
                if (autoCenterEnabled) {
                    applyAutoCenterLogic();
                }
            });
        });
    }

    if (animId) {
        const previewUrl = `${API_BASE_URL}/api/preview/${animId}`;
        const container = document.getElementById('auto-anim-preview-container');
        
        container.innerHTML = `
            <div class="relative w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-700/30">
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                    <i class="fas fa-spinner fa-spin text-3xl text-gray-400 dark:text-gray-500 mb-2"></i>
                    <span class="text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wide">MEMUAT PREVIEW</span>
                </div>
                <tgs-player id="auto-tgs-preview" class="w-[85%] h-[85%] relative z-10" autoplay loop mode="normal" style="display:none;"></tgs-player>
            </div>
        `;
        
        const player = document.getElementById('auto-tgs-preview');
        autoAnimPlayer = player; 
        
        fetch(previewUrl, { headers: { "ngrok-skip-browser-warning": "true" } })
            .then(res => {
                if (res.ok) {
                    player.load(previewUrl);
                    player.addEventListener('ready', () => {
                        player.style.display = 'block';
                        const loader = container.querySelector('div > div.absolute');
                        if (loader) loader.style.display = 'none';
                    });
                } else {
                    container.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700 border-dashed rounded-xl">
                            <div class="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm mb-3">
                                <i class="fas fa-eye-slash text-xl text-gray-400"></i>
                            </div>
                            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Preview belum tersedia</span>
                        </div>
                    `;
                }
            })
            .catch(() => {
                container.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700 border-dashed rounded-xl">
                            <div class="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm mb-3">
                                <i class="fas fa-eye-slash text-xl text-gray-400"></i>
                            </div>
                            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Preview belum tersedia</span>
                        </div>
                `;
            });
    }

    // Sambungkan tombol "Proses & Kirim" (di app utama) agar membuka Live Preview Modal saja, bukan mengirim final
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        // Ganti teks tombol untuk menyesuaikan dengan fitur Live Preview
        submitBtn.innerHTML = `<i class="fas fa-play mr-2"></i> Lihat Live Preview`;
        submitBtn.onclick = () => triggerLivePreview(false);
    }
}

function applyAutoCenterLogic() {
    if (!autoCenterEnabled) return;

    const t1HasText = state.layers.layer_t1.text.trim().length > 0;
    const t2HasText = state.layers.layer_t2.text.trim().length > 0;
    const t3HasText = state.layers.layer_t3.text.trim().length > 0;
    const t4HasText = state.layers.layer_t4.text.trim().length > 0;

    const onlyT1Active = t1HasText && !t2HasText && !t3HasText && !t4HasText;

    if (onlyT1Active) {
        state.layers.layer_t1.y = 256;
        
        if (state.layers.layer_bg.active && state.layers.layer_bg.shape !== "json_none") {
            state.layers.layer_bg.y = 256;
        }
        if (state.layers.layer_bg2.active && state.layers.layer_bg2.shape !== "json_none") {
            state.layers.layer_bg2.y = 256;
        }
    }
}


function setupManualModeUI() {
    document.getElementById('manual-ui-container').classList.remove('hidden');
    document.getElementById('auto-ui-container').classList.add('hidden');
    
    document.body.classList.remove('bg-white', 'dark:bg-gray-800');
    document.body.classList.add('bg-gray-50', 'dark:bg-gray-900');
    
    document.querySelector('.canvas-container').classList.remove('hidden');
    
    updateUIFromState();
    
    FONT_LIST.forEach(f => {
        let opt = document.createElement("option");
        opt.value = f;
        opt.text = f;
        opt.style.fontFamily = f;
        document.getElementById("font").appendChild(opt);
    });

    changeLayer('layer_t1');
    initDragAndDrop();
    saveStateToHistory(); 
}

function updateUIFromState() {
    if(isAutoText) return; 

    document.getElementById("canvas_color").value = state.canvasColor;
    document.getElementById("canvas_opacity").value = state.canvasOpacity;

    for (let i = 1; i <= 4; i++) {
        document.getElementById(`toggle_layer_t${i}`).checked = state.layers[`layer_t${i}`].active;
    }
    document.getElementById("toggle_layer_bg").checked = state.layers.layer_bg.active;
    document.getElementById("toggle_layer_bg2").checked = state.layers.layer_bg2.active;

    const cur = state.layers[currentLayer];
    if (cur.type === "text") {
        document.getElementById("text").value = cur.text;
        document.getElementById("font").value = cur.fontFamily;
    } else {
        const shapeSelectId = currentLayer === "layer_bg" ? "layer_bg_shape" : "layer_bg2_shape";
        const shapeSel = document.getElementById(shapeSelectId);
        if (shapeSel) {
            shapeSel.value = cur.shape;
        }
    }
    
    document.getElementById("fill").value = cur.fill;
    document.getElementById("stroke").value = cur.stroke;
    document.getElementById("strokeWidth").value = cur.strokeWidth;
}

function changeLayer(l) {
    if(isAutoText) return;
    
    currentLayer = l;
    document.querySelectorAll(".tab-btn").forEach(b => {
        b.classList.remove("border-primary", "text-primary", "bg-primary/5", "font-bold");
        b.classList.add("border-transparent", "text-gray-500", "dark:text-gray-400");
    });
    
    const activeTab = document.getElementById(`tab_${l}`);
    if (activeTab) {
        activeTab.classList.remove("border-transparent", "text-gray-500", "dark:text-gray-400");
        activeTab.classList.add("border-primary", "text-primary", "bg-primary/5", "font-bold");
    }

    if (l.startsWith('layer_bg')) {
        document.getElementById("text-controls").classList.add("hidden");
        
        if (l === "layer_bg") {
            document.getElementById("bg-controls").classList.remove("hidden");
            document.getElementById("bg2-controls").classList.add("hidden");
        } else {
            document.getElementById("bg-controls").classList.add("hidden");
            document.getElementById("bg2-controls").classList.remove("hidden");
        }
        
    } else {
        document.getElementById("text-controls").classList.remove("hidden");
        document.getElementById("bg-controls").classList.add("hidden");
        document.getElementById("bg2-controls").classList.add("hidden");
    }

    updateUIFromState();
}

function saveStateToHistory() {
    if (isUndoRedoAction) return; 

    const currentStateStr = JSON.stringify(state);
    
    if (historyIndex >= 0 && JSON.stringify(history[historyIndex]) === currentStateStr) {
        return; 
    }

    history = history.slice(0, historyIndex + 1);
    history.push(JSON.parse(currentStateStr));
    historyIndex++;

    if (history.length > 50) { 
        history.shift();
        historyIndex--;
    }
    
    updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
    if(isAutoText) return;
    const btnUndo = document.getElementById('btn-undo');
    const btnRedo = document.getElementById('btn-redo');
    
    if (btnUndo) {
        if (historyIndex > 0) {
            btnUndo.classList.remove('opacity-50', 'cursor-not-allowed');
            btnUndo.disabled = false;
        } else {
            btnUndo.classList.add('opacity-50', 'cursor-not-allowed');
            btnUndo.disabled = true;
        }
    }
    
    if (btnRedo) {
        if (historyIndex < history.length - 1) {
            btnRedo.classList.remove('opacity-50', 'cursor-not-allowed');
            btnRedo.disabled = false;
        } else {
            btnRedo.classList.add('opacity-50', 'cursor-not-allowed');
            btnRedo.disabled = true;
        }
    }
}

async function performUndo() {
    if (historyIndex > 0) {
        isUndoRedoAction = true;
        historyIndex--;
        state = JSON.parse(JSON.stringify(history[historyIndex]));
        
        validateShapes();
        updateUIFromState();
        await preloadActiveShapes();
        renderCanvas();
        updateUndoRedoButtons();
        isUndoRedoAction = false;
    }
}

async function performRedo() {
    if (historyIndex < history.length - 1) {
        isUndoRedoAction = true;
        historyIndex++;
        state = JSON.parse(JSON.stringify(history[historyIndex]));
        
        validateShapes();
        updateUIFromState();
        await preloadActiveShapes();
        renderCanvas();
        updateUndoRedoButtons();
        isUndoRedoAction = false;
    }
}


function applyInput(key, isHistoryEvent = true) {
    if(isAutoText) return;
    
    let val;
    if (key === 'canvasColor' || key === 'canvasOpacity') {
        val = document.getElementById(key === 'canvasColor' ? 'canvas_color' : 'canvas_opacity').value;
        if (key === 'canvasOpacity') val = parseFloat(val);
        state[key] = val;
    } else {
        const el = document.getElementById(key);
        if(!el) {
             const shapeSelectId = currentLayer === "layer_bg" ? "layer_bg_shape" : "layer_bg2_shape";
             if(key === 'shape' && document.getElementById(shapeSelectId)) {
                  val = document.getElementById(shapeSelectId).value;
             } else {
                  return;
             }
        } else {
             val = el.type === "checkbox" ? el.checked : el.value;
             if (el.type === "number" || el.type === "range") val = parseFloat(val);
        }

        if (key.startsWith("toggle_")) {
            state.layers[key.replace("toggle_", "")].active = val;
        } else {
            state.layers[currentLayer][key] = val;
        }
    }
    
    renderCanvas();
    if(isHistoryEvent) saveStateToHistory();
}

async function fetchShapeData(shapeId) {
    if (shapeId === "json_none" || preloadedShapes[shapeId]) return;
    try {
        const response = await fetch(`${API_BASE_URL}/api/shapes/${shapeId}`, {
            headers: {
                "ngrok-skip-browser-warning": "true",
                "Cache-Control": "public, max-age=3600" 
            }
        });
        if (!response.ok) throw new Error("Gagal mengambil shape JSON");
        
        const data = await response.json();
        
        if (data.paths) {
            preloadedShapes[shapeId] = data;
        } else {
            console.error("Format JSON tidak didukung untuk shape:", shapeId);
        }
    } catch (error) {
        console.error("Error fetching shape:", error);
    }
}

async function renderCanvas() {
    ctx.clearRect(0, 0, 512, 512);

    if (state.canvasOpacity > 0) {
        ctx.fillStyle = hexToRgba(state.canvasColor, state.canvasOpacity);
        ctx.fillRect(0, 0, 512, 512);
    }

    const order = ["layer_bg2", "layer_bg", "layer_t4", "layer_t3", "layer_t2", "layer_t1"];
    
    for (const l of order) {
        const layer = state.layers[l];
        if (!layer.active) continue;

        ctx.save();
        ctx.translate(layer.x, layer.y);
        ctx.rotate(layer.rotation * Math.PI / 180);
        ctx.scale(layer.scale, layer.scale);

        if (layer.type === "text") {
            if (!fontsLoaded[layer.fontFamily]) {
                 ctx.restore();
                 continue;
            }
            
            ctx.font = `100px ${layer.fontFamily}`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.lineJoin = "round";

            if (layer.strokeWidth > 0) {
                ctx.lineWidth = layer.strokeWidth;
                ctx.strokeStyle = layer.stroke;
                ctx.strokeText(layer.text, 0, 0);
            }
            ctx.fillStyle = layer.fill;
            ctx.fillText(layer.text, 0, 0);
            
        } else if (layer.type === "shape" && layer.shape !== "json_none") {
            if (!preloadedShapes[layer.shape]) {
                await fetchShapeData(layer.shape);
            }
            
            const shapeData = preloadedShapes[layer.shape];
            if (shapeData && shapeData.paths) {
                const sw = shapeData.original_width || 512;
                const sh = shapeData.original_height || 512;
                
                ctx.scale(512 / sw, 512 / sh);
                ctx.translate(-sw / 2, -sh / 2);

                shapeData.paths.forEach(p => {
                    const path2d = new Path2D(p.d);
                    
                    if (layer.strokeWidth > 0) {
                        ctx.lineWidth = layer.strokeWidth * (sw / 512); 
                        ctx.strokeStyle = layer.stroke;
                        ctx.lineJoin = "round";
                        ctx.stroke(path2d);
                    }
                    
                    ctx.fillStyle = layer.fill;
                    ctx.fill(path2d);
                });
            }
        }
        ctx.restore();
    }
}

// ==========================================
// KONTROL DRAG, ZOOM, DAN ROTASI (Touch & Mouse)
// ==========================================
let isDragging = false;
let startX, startY;
let activeTransformLayer = null;

let initialPinchDistance = null;
let initialScale = 1;
let initialPinchAngle = null;
let initialRotation = 0;

function getEventPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    if (e.touches && e.touches.length > 0) {
        return {
            x: (e.touches[0].clientX - rect.left) * scaleX,
            y: (e.touches[0].clientY - rect.top) * scaleY
        };
    } else {
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }
}

function getPinchDistance(e) {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

function getPinchAngle(e) {
    const dx = e.touches[1].clientX - e.touches[0].clientX;
    const dy = e.touches[1].clientY - e.touches[0].clientY;
    return Math.atan2(dy, dx) * 180 / Math.PI;
}

function initDragAndDrop() {
    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('touchstart', handleStart, { passive: false });

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: false });

    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);
}

function handleStart(e) {
    if(isAutoText) return;
    if (e.touches && e.touches.length === 2) {
        e.preventDefault();
        initialPinchDistance = getPinchDistance(e);
        initialPinchAngle = getPinchAngle(e);
        if (state.layers[currentLayer].active) {
            initialScale = state.layers[currentLayer].scale;
            initialRotation = state.layers[currentLayer].rotation;
            activeTransformLayer = currentLayer;
        }
        return;
    }

    if (e.touches && e.touches.length > 1) return;

    const pos = getEventPos(e);
    if (!state.layers[currentLayer].active) return;

    if (e.type === 'touchstart') e.preventDefault(); 

    isDragging = true;
    activeTransformLayer = currentLayer;
    startX = pos.x;
    startY = pos.y;
}

function handleMove(e) {
    if(isAutoText) return;
    if (!activeTransformLayer) return;

    if (e.touches && e.touches.length === 2) {
        e.preventDefault();
        if (initialPinchDistance) {
            const currentDistance = getPinchDistance(e);
            const scaleFactor = currentDistance / initialPinchDistance;
            state.layers[activeTransformLayer].scale = Math.max(0.1, Math.min(5, initialScale * scaleFactor));
        }
        if (initialPinchAngle !== null) {
            const currentAngle = getPinchAngle(e);
            let angleDiff = currentAngle - initialPinchAngle;
            state.layers[activeTransformLayer].rotation = (initialRotation + angleDiff) % 360;
        }
        requestAnimationFrame(renderCanvas);
        return;
    }

    if (!isDragging) return;
    if (e.type === 'touchmove') e.preventDefault(); 

    const pos = getEventPos(e);
    const dx = pos.x - startX;
    const dy = pos.y - startY;

    state.layers[activeTransformLayer].x += dx;
    state.layers[activeTransformLayer].y += dy;

    startX = pos.x;
    startY = pos.y;

    requestAnimationFrame(renderCanvas);
}

function handleEnd(e) {
    if(isAutoText) return;
    if (isDragging || activeTransformLayer) {
        isDragging = false;
        activeTransformLayer = null;
        initialPinchDistance = null;
        initialPinchAngle = null;
        saveStateToHistory(); 
    }
}

// ==========================================
// SISTEM CLOUD STORAGE TEMPLATE (HANYA MANUAL MODE)
// ==========================================
function openTemplateModal() {
    if(isAutoText) return;
    if (!tg || !tg.CloudStorage) {
        alert("Fitur ini membutuhkan Telegram versi terbaru.");
        return;
    }
    
    const modal = document.getElementById('template-modal');
    const container = document.getElementById('template-list-container');
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    container.innerHTML = '<p class="text-gray-500 flex items-center justify-center py-4"><i class="fas fa-spinner fa-spin mr-2"></i> Memuat...</p>';

    tg.CloudStorage.getKeys((err, keys) => {
        if (err || !keys || keys.length === 0) {
            container.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400">Anda belum memiliki template tersimpan.</p>';
            return;
        }

        const templateKeys = keys.filter(k => k.startsWith('tmpl_'));
        if(templateKeys.length === 0) {
            container.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400">Anda belum memiliki template tersimpan.</p>';
            return;
        }

        container.innerHTML = '';
        templateKeys.forEach(key => {
            const name = key.replace('tmpl_', '');
            const div = document.createElement('div');
            div.className = 'flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600';
            div.innerHTML = `
                <span class="font-medium text-gray-700 dark:text-gray-200 truncate pr-2 max-w-[60%]">${name}</span>
                <div class="flex gap-2 flex-shrink-0">
                    <button onclick="loadTemplate('${key}')" class="px-3 py-1.5 bg-blue-500 text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition-colors shadow-sm">
                        <i class="fas fa-download mr-1"></i> Muat
                    </button>
                    <button onclick="deleteTemplate('${key}', this.parentElement.parentElement)" class="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-colors shadow-sm">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            container.appendChild(div);
        });
    });
}

function saveTemplate() {
    if(isAutoText) return;
    if (!tg || !tg.CloudStorage) {
        alert("Fitur ini membutuhkan Telegram versi terbaru.");
        return;
    }
    
    const name = prompt("Masukkan nama untuk template ini:");
    if (!name) return;
    
    const safeName = name.replace(/[^a-zA-Z0-9 _-]/g, '').trim();
    if(safeName.length === 0) {
        alert("Nama tidak valid.");
        return;
    }
    
    const key = `tmpl_${safeName}`;
    const value = JSON.stringify(state);
    
    tg.CloudStorage.setItem(key, value, (err, success) => {
        if (err) {
            alert("Gagal menyimpan template.");
        } else {
            alert("Template berhasil disimpan!");
        }
    });
}

function loadTemplate(key) {
    if(isAutoText) return;
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
    if(isAutoText) return;
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

// ==========================================
// EKSPOR KE SVG STRING
// ==========================================
function generateSVG() {
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">\n`;
    
    if (state.canvasOpacity > 0) {
        svg += `  <rect width="512" height="512" fill="${state.canvasColor}" fill-opacity="${state.canvasOpacity}" />\n`;
    }

    const order = ["layer_bg2", "layer_bg", "layer_t4", "layer_t3", "layer_t2", "layer_t1"];
    
    order.forEach(l => {
        const layer = state.layers[l];
        if (!layer.active) return;
        
        svg += `  <g id="${l}">\n`;
        svg += `    <g transform="translate(${layer.x}, ${layer.y}) rotate(${layer.rotation}) scale(${layer.scale})">\n`;
        
        if (layer.type === "text") {
            const safeText = layer.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
            svg += `      <text x="0" y="0" font-family="${layer.fontFamily}" font-size="100" text-anchor="middle" dominant-baseline="central" fill="${layer.fill}"`;
            if (layer.strokeWidth > 0) {
                svg += ` stroke="${layer.stroke}" stroke-width="${layer.strokeWidth}" stroke-linejoin="round"`;
            }
            svg += `>${safeText}</text>\n`;
        } else if (layer.type === "shape" && layer.shape !== "json_none") {
             const shapeData = preloadedShapes[layer.shape];
             if (shapeData && shapeData.paths) {
                 const sw = shapeData.original_width || 512;
                 const sh = shapeData.original_height || 512;
                 
                 svg += `      <g transform="scale(${512/sw}, ${512/sh}) translate(${-sw/2}, ${-sh/2})">\n`;
                 
                 shapeData.paths.forEach(p => {
                     svg += `        <path d="${p.d}" fill="${layer.fill}"`;
                     if (layer.strokeWidth > 0) {
                         const scaledStrokeWidth = layer.strokeWidth * (sw / 512);
                         svg += ` stroke="${layer.stroke}" stroke-width="${scaledStrokeWidth}" stroke-linejoin="round"`;
                     }
                     svg += ` />\n`;
                 });
                 
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
// PREVIEW CLOUD MURNI (Untuk Manual Mode dengan Preset)
// ==========================================
function checkAndPlayCloudPreview() {
    if (isAutoText || !animId) return;
    
    const previewUrl = `${API_BASE_URL}/api/preview/${animId}`;
    const container = document.getElementById('manual-cloud-preview-container');
    const player = document.getElementById('manual-tgs-preview');
    
    if (!container || !player) return;
    
    fetch(previewUrl, { headers: { "ngrok-skip-browser-warning": "true" } })
        .then(res => {
            if (res.ok) {
                tgsAnimPlayer = player;
                player.load(previewUrl);
                container.classList.remove('hidden');
                
                player.addEventListener('ready', () => {
                    isCloudPreviewPlaying = true;
                    player.play();
                });
            } else {
                container.classList.add('hidden');
            }
        })
        .catch(() => {
            container.classList.add('hidden');
        });
}

function stopCloudPreview() {
    if (isCloudPreviewPlaying && tgsAnimPlayer) {
        tgsAnimPlayer.stop();
        tgsAnimPlayer.seek(0);
        isCloudPreviewPlaying = false;
        
        const container = document.getElementById('manual-cloud-preview-container');
        if (container) container.classList.add('hidden');
    }
}

// ==========================================
// PEMBANGUNAN MODAL LIVE PREVIEW UI (HTML Injection)
// ==========================================
function createLivePreviewModal() {
    if (document.getElementById('live-preview-modal')) return;
    const modalHtml = `
        <div id="live-preview-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 hidden backdrop-blur-sm transition-opacity">
            <div class="bg-white dark:bg-gray-800 w-11/12 max-w-md rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                <!-- Header -->
                <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
                    <h3 class="text-lg font-bold text-gray-800 dark:text-white"><i class="fas fa-eye text-primary mr-2"></i> Live Preview</h3>
                    <button onclick="closeLivePreviewModal()" class="text-gray-500 hover:text-red-500 transition-colors p-2">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <!-- Player Area -->
                <div id="lp-player-container" class="relative w-full aspect-square bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                    <div id="lp-loading" class="absolute inset-0 flex flex-col items-center justify-center bg-white/70 dark:bg-gray-900/70 z-20 backdrop-blur-sm transition-opacity">
                        <i class="fas fa-circle-notch fa-spin text-4xl text-primary mb-3"></i>
                        <span class="text-sm font-bold text-gray-700 dark:text-gray-200 tracking-wide">MERAKIT ANIMASI...</span>
                    </div>
                    <tgs-player id="lp-tgs-player" autoplay loop mode="normal" class="w-[90%] h-[90%] relative z-10 hidden drop-shadow-2xl"></tgs-player>
                </div>
                
                <!-- Controls Area -->
                <div class="p-4 bg-white dark:bg-gray-800 flex flex-col gap-4 border-t border-gray-100 dark:border-gray-700">
                    <div class="grid grid-cols-2 gap-3">
                        <button onclick="openEffectMenu()" class="flex flex-col items-center justify-center gap-1 py-3 px-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-xl font-semibold border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">
                            <i class="fas fa-magic text-lg"></i> 
                            <span class="text-xs">Tambah Animasi</span>
                        </button>
                        <button onclick="openColorMenu()" class="flex flex-col items-center justify-center gap-1 py-3 px-2 bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400 rounded-xl font-semibold border border-pink-100 dark:border-pink-800 hover:bg-pink-100 dark:hover:bg-pink-900/50 transition-colors">
                            <i class="fas fa-palette text-lg"></i> 
                            <span class="text-xs">Rubah Warna</span>
                        </button>
                    </div>
                    <button id="lp-save-btn" onclick="sendToBot()" class="w-full py-3.5 bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl font-bold text-base shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                        <i class="fas fa-paper-plane"></i> Simpan ke Bot
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Modal Menu Warna -->
        <div id="lp-color-menu" class="fixed inset-x-0 bottom-0 z-[60] bg-white dark:bg-gray-800 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.3)] transform translate-y-full transition-transform duration-300 p-5">
            <div class="flex justify-between items-center mb-5">
                <h4 class="font-bold text-gray-800 dark:text-white text-lg"><i class="fas fa-palette text-pink-500 mr-2"></i> Pilih Warna Tema</h4>
                <button onclick="closeColorMenu()" class="text-gray-400 hover:text-gray-600 dark:hover:text-white bg-gray-100 dark:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center"><i class="fas fa-times"></i></button>
            </div>
            <div id="lp-color-list" class="flex flex-wrap gap-2 max-h-60 overflow-y-auto pb-6 custom-scrollbar">
                <!-- Data dimuat dari fetchThemesFromBot -->
            </div>
        </div>

        <!-- Modal Menu Tambah Animasi (Efek Tambahan) -->
        <div id="lp-effect-menu" class="fixed inset-x-0 bottom-0 z-[60] bg-white dark:bg-gray-800 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.3)] transform translate-y-full transition-transform duration-300 p-5">
            <div class="flex justify-between items-center mb-5">
                <h4 class="font-bold text-gray-800 dark:text-white text-lg"><i class="fas fa-magic text-indigo-500 mr-2"></i> Tambah Efek Animasi</h4>
                <button onclick="closeEffectMenu()" class="text-gray-400 hover:text-gray-600 dark:hover:text-white bg-gray-100 dark:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center"><i class="fas fa-times"></i></button>
            </div>
            <div id="lp-effect-list" class="flex flex-col gap-2 max-h-60 overflow-y-auto pb-6">
                <!-- Akan dirender via JS -->
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    renderEffectButtons();
}

function renderEffectButtons() {
    const list = document.getElementById('lp-effect-list');
    if (!list) return;
    list.innerHTML = '';
    
    Object.entries(EXTRA_EFFECTS).forEach(([key, label]) => {
        const btn = document.createElement('button');
        const isActive = activeExtraEffect === key;
        btn.className = `w-full text-left px-4 py-3 rounded-xl text-sm font-semibold border transition-all ${isActive ? 'bg-indigo-500 text-white border-indigo-500 shadow-md' : 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'}`;
        btn.innerHTML = isActive ? `<i class="fas fa-check-circle mr-2"></i> ${label}` : label;
        btn.onclick = () => {
            closeEffectMenu();
            applyLivePreviewEffect(key);
        };
        list.appendChild(btn);
    });
}

function openColorMenu() {
    document.getElementById('lp-color-menu').classList.remove('translate-y-full');
}
function closeColorMenu() {
    document.getElementById('lp-color-menu').classList.add('translate-y-full');
}
function openEffectMenu() {
    document.getElementById('lp-effect-menu').classList.remove('translate-y-full');
}
function closeEffectMenu() {
    document.getElementById('lp-effect-menu').classList.add('translate-y-full');
}
function closeLivePreviewModal() {
    isLivePreviewOpen = false;
    document.getElementById('live-preview-modal').classList.add('hidden');
    // Matikan player untuk hemat memori
    const player = document.getElementById('lp-tgs-player');
    if(player) {
        player.stop();
        player.classList.add('hidden');
    }
}

// ==========================================
// TRIGGER LOGIKA LIVE PREVIEW (ITERASI FRONTEND - BACKEND)
// ==========================================
function triggerLivePreview(isUpdate = false) {
    if (!tg) {
        alert("Harap buka aplikasi melalui Telegram!");
        return;
    }

    if (isAutoText && autoCenterEnabled) {
        applyAutoCenterLogic();
    }

    // 1. Tampilkan modal utama (Jika ini baru pertama dipanggil)
    if (!isUpdate) {
        isLivePreviewOpen = true;
        document.getElementById('live-preview-modal').classList.remove('hidden');
    }

    // 2. Tampilkan Loading Spinner
    const loadingOverlay = document.getElementById('lp-loading');
    if (loadingOverlay) loadingOverlay.classList.remove('hidden', 'opacity-0');
    
    // 3. Sembunyikan player saat pertama kali load agar tidak jelek
    const player = document.getElementById('lp-tgs-player');
    if (player && !isUpdate) player.classList.add('hidden');

    // 4. Bangun data payload seperti biasa
    const svgString = generateSVG();
    const initData = tg.initData || "";
    
    const compressedRaw = pako.deflate(svgString, { to: 'string' });
    const b64Data = btoa(compressedRaw);
    
    const clientMetadata = {
        platform: tg.platform || 'unknown',
        device: navigator.userAgent,
        screen: `${window.screen.width}x${window.screen.height}`,
        lang: navigator.language || 'id-ID',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        connection: navigator.connection ? navigator.connection.effectiveType : 'unknown'
    };

    const payload = {
        init_data: initData,
        svg_data: b64Data,
        is_compressed: true,
        app_state: state,
        is_auto: isAutoText,
        theme: activeTheme,
        extra_effect: activeExtraEffect, // Fitur tambahan live preview
        live_preview: true,              // Flag khusus backend untuk kembalikan URL statis
        client_metadata: clientMetadata
    };

    fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).then(r => r.json()).then(res => {
        if (res.error) {
            alert("Error rendering: " + res.error);
            if (loadingOverlay) loadingOverlay.classList.add('hidden');
        } else {
            // Karena backend belum dimodifikasi, kita asumsikan backend nanti akan merespons dengan format:
            // { status: "success", preview_url: "/api/userpreview/file_name.tgs" }
            if (res.preview_url) {
                if (player) {
                    player.load(res.preview_url + "?t=" + new Date().getTime()); // Menghindari cache browser
                    player.addEventListener('ready', () => {
                        player.classList.remove('hidden');
                        if (loadingOverlay) loadingOverlay.classList.add('hidden');
                        player.play();
                    }, { once: true });
                }
            } else {
                // Fallback sementara jika API bot belum direvisi: tutup animasi loading
                if (loadingOverlay) loadingOverlay.classList.add('hidden');
                // Simulasi seolah-olah sukses (agar UI tidak stuck selama testing)
                console.warn("Backend belum mengembalikan 'preview_url'. Pastikan bot.py sudah diupdate.");
            }
        }
    }).catch(e => {
        alert("Gagal memuat live preview: " + e.message);
        if (loadingOverlay) loadingOverlay.classList.add('hidden');
    });
}


// ==========================================
// PENGIRIMAN FINAL KE BOT (UPLOAD UNTUK DISIMPAN)
// ==========================================
function closeFormAndAddAnimationButton() {
    // 1. Kunci (disable) form input (auto_input_x)
    const inputs = document.querySelectorAll('input[id^="auto_input_"]');
    inputs.forEach(input => {
        input.disabled = true;
        input.classList.add('opacity-50', 'cursor-not-allowed');
    });

    // 2. Sembunyikan tombol utama
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.classList.add('hidden');
    }
    const loadingBtn = document.getElementById('loading-btn');
    if (loadingBtn) {
        loadingBtn.classList.add('hidden');
    }

    // 3. Tampilkan tombol "Tambah Animasi" (Khusus mode ori Auto jika dibutuhkan)
    const addAnimBtn = document.getElementById('add-anim-btn');
    if (addAnimBtn) {
        addAnimBtn.classList.remove('hidden');
    }
}

function resetFormForNewAnimation() {
    // 1. Buka (enable) form input kembali
    const inputs = document.querySelectorAll('input[id^="auto_input_"]');
    inputs.forEach(input => {
        input.disabled = false;
        input.classList.remove('opacity-50', 'cursor-not-allowed');
        input.value = ""; 
    });

    // 2. Sembunyikan tombol "Tambah Animasi"
    const addAnimBtn = document.getElementById('add-anim-btn');
    if (addAnimBtn) {
        addAnimBtn.classList.add('hidden');
    }

    // 3. Tampilkan kembali tombol "Proses & Kirim"
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
}


function sendToBot() {
    if (!tg) {
        alert("Buka melalui Telegram!");
        return;
    }

    if (isAutoText && autoCenterEnabled) {
        applyAutoCenterLogic();
    }

    // Handle UI Modal Button jika sedang di Live Preview
    const lpSaveBtn = document.getElementById('lp-save-btn');
    let originalLpSaveBtnHtml = "";
    if (isLivePreviewOpen && lpSaveBtn) {
        originalLpSaveBtnHtml = lpSaveBtn.innerHTML;
        lpSaveBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Menyimpan...';
        lpSaveBtn.disabled = true;
        lpSaveBtn.classList.add('opacity-80', 'cursor-wait');
    }

    // Handle UI tombol di belakang layar (Form Utama)
    const submitBtn = document.getElementById('submit-btn');
    const loadingBtn = document.getElementById('loading-btn');
    
    if (submitBtn && loadingBtn && !isLivePreviewOpen) {
        submitBtn.classList.add('hidden');
        loadingBtn.classList.remove('hidden');
    }

    if (isCloudPreviewPlaying) {
        stopCloudPreview();
    }

    const svgString = generateSVG();
    const initData = tg.initData || "";
    
    const compressedRaw = pako.deflate(svgString, { to: 'string' });
    const b64Data = btoa(compressedRaw);
    
    const clientMetadata = {
        platform: tg.platform || 'unknown',
        device: navigator.userAgent,
        screen: `${window.screen.width}x${window.screen.height}`,
        lang: navigator.language || 'id-ID',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        connection: navigator.connection ? navigator.connection.effectiveType : 'unknown'
    };

    const payload = {
        init_data: initData,
        svg_data: b64Data,
        is_compressed: true,
        app_state: state,
        is_auto: isAutoText,
        theme: activeTheme,
        extra_effect: activeExtraEffect, // Dikirim ke bot untuk hasil rill
        live_preview: false,             // Flag memproses sebagai final (kirim pesan)
        client_metadata: clientMetadata
    };

    fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).then(r => r.json()).then(res => {
        if (res.error) {
            alert("Error: " + res.error);
            resetSendUiStates();
        } else {
            alert("Data berhasil diproses! Silakan periksa pesan di bot.");
            
            if (isLivePreviewOpen) {
                closeLivePreviewModal();
                resetSendUiStates();
            }

            if (isAutoText) {
                closeFormAndAddAnimationButton();
            } else {
                tg.close();
            }
        }
    }).catch(e => {
        alert("Gagal menghubungi server: " + e.message);
        resetSendUiStates();
    });

    // Helper mereset UI internal
    function resetSendUiStates() {
        if (isLivePreviewOpen && lpSaveBtn) {
            lpSaveBtn.innerHTML = originalLpSaveBtnHtml;
            lpSaveBtn.disabled = false;
            lpSaveBtn.classList.remove('opacity-80', 'cursor-wait');
        }
        if (submitBtn && loadingBtn && !isLivePreviewOpen) {
            loadingBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        }
    }
}

function hexToRgba(hex, alpha) {
    let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// ==========================================
// INISIALISASI
// ==========================================
window.onload = async () => {
    // Bangun Modal UI Live Preview segera setelah halaman dimuat
    createLivePreviewModal();

    loadFonts();
    await loadShapesFromBot();
    await fetchThemesFromBot(); 
    
    await checkAutoTemplate(); 
    
    updateURLParams();

    if (tg) {
        tg.ready();
    }
    
    // Setup event listener untuk tombol "Tambah Animasi" (Mode Auto original, form belakang)
    const addAnimBtn = document.getElementById('add-anim-btn');
    if(addAnimBtn) {
        addAnimBtn.addEventListener('click', resetFormForNewAnimation);
    }
}
