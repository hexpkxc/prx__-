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
                    <h1 class="text-3xl font-bold text-white mb-3">Akses Ditolak</h1>
                    <p class="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto">
                        Editor ini dilindungi. Akses hanya diizinkan melalui aplikasi <b>Telegram resmi di Handphone</b> dan dari server yang sah.
                    </p>
                `;
            }
            const allAppElements = document.querySelectorAll('.app-content');
            allAppElements.forEach(el => el.style.display = 'none');
        });
        throw new Error("Akses diblokir oleh sistem keamanan.");
    }
})();

const _apiPart1 = "https://unreal-deceptive";
const _apiPart2 = "-finished.ngrok-free.dev";
const NGROK_API_URL = _apiPart1 + _apiPart2 + "/api/upload";

const FONT_LIST = {
    "Luckiest Guy": "https://cdn.jsdelivr.net/npm/@fontsource/luckiest-guy/files/luckiest-guy-latin-400-normal.woff",
    "Bangers": "https://cdn.jsdelivr.net/npm/@fontsource/bangers/files/bangers-latin-400-normal.woff",
    "Poppins Bold": "https://cdn.jsdelivr.net/npm/@fontsource/poppins/files/poppins-latin-700-normal.woff",
    "Creepster": "https://cdn.jsdelivr.net/npm/@fontsource/creepster/files/creepster-latin-400-normal.woff",
    "Sigmar One": "https://cdn.jsdelivr.net/npm/@fontsource/sigmar-one/files/sigmar-one-latin-400-normal.woff",
    "Pacifico": "https://cdn.jsdelivr.net/npm/@fontsource/pacifico/files/pacifico-latin-400-normal.woff",
    "Fredoka One": "https://cdn.jsdelivr.net/npm/@fontsource/fredoka-one/files/fredoka-one-latin-400-normal.woff",
    "Russo One": "https://cdn.jsdelivr.net/npm/@fontsource/russo-one/files/russo-one-latin-400-normal.woff",
    "Carter One": "https://cdn.jsdelivr.net/npm/@fontsource/carter-one/files/carter-one-latin-400-normal.woff",
    "Chewy": "https://cdn.jsdelivr.net/npm/@fontsource/chewy/files/chewy-latin-400-normal.woff",
    "Black Ops One": "https://cdn.jsdelivr.net/npm/@fontsource/black-ops-one/files/black-ops-one-latin-400-normal.woff",
    "Dancing Script": "https://cdn.jsdelivr.net/npm/@fontsource/dancing-script/files/dancing-script-latin-700-normal.woff",
    "Gloria Hallelujah": "https://cdn.jsdelivr.net/npm/@fontsource/gloria-hallelujah/files/gloria-hallelujah-latin-400-normal.woff",
    "Righteous": "https://cdn.jsdelivr.net/npm/@fontsource/righteous/files/righteous-latin-400-normal.woff",
    "Press Start 2P": "https://cdn.jsdelivr.net/npm/@fontsource/press-start-2p/files/press-start-2p-latin-400-normal.woff",
    "Shrikhand": "https://cdn.jsdelivr.net/npm/@fontsource/shrikhand/files/shrikhand-latin-400-normal.woff",
    "Permanent Marker": "https://cdn.jsdelivr.net/npm/@fontsource/permanent-marker/files/permanent-marker-latin-400-normal.woff",
    "Alfa Slab One": "https://cdn.jsdelivr.net/npm/@fontsource/alfa-slab-one/files/alfa-slab-one-latin-400-normal.woff",
    "Bebas Neue": "https://cdn.jsdelivr.net/npm/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff",
    "Lobster": "https://cdn.jsdelivr.net/npm/@fontsource/lobster/files/lobster-latin-400-normal.woff",
    "Orbitron Bold": "https://cdn.jsdelivr.net/npm/@fontsource/orbitron/files/orbitron-latin-700-normal.woff",
    "Bungee": "https://cdn.jsdelivr.net/npm/@fontsource/bungee/files/bungee-latin-400-normal.woff",
    "Frijole": "https://cdn.jsdelivr.net/npm/@fontsource/frijole/files/frijole-latin-400-normal.woff",
    "Vampiro One": "https://cdn.jsdelivr.net/npm/@fontsource/vampiro-one/files/vampiro-one-latin-400-normal.woff",
    "Teko Bold": "https://cdn.jsdelivr.net/npm/@fontsource/teko/files/teko-latin-700-normal.woff",
    "Bree Serif": "https://cdn.jsdelivr.net/npm/@fontsource/bree-serif/files/bree-serif-latin-400-normal.woff",
    "Abril Fatface": "https://cdn.jsdelivr.net/npm/@fontsource/abril-fatface/files/abril-fatface-latin-400-normal.woff",
    "Anton": "https://cdn.jsdelivr.net/npm/@fontsource/anton/files/anton-latin-400-normal.woff",
    "Lilita One": "https://cdn.jsdelivr.net/npm/@fontsource/lilita-one/files/lilita-one-latin-400-normal.woff",
    "Titan One": "https://cdn.jsdelivr.net/npm/@fontsource/titan-one/files/titan-one-latin-400-normal.woff",
    "Fugaz One": "https://cdn.jsdelivr.net/npm/@fontsource/fugaz-one/files/fugaz-one-latin-400-normal.woff",
    "Chango": "https://cdn.jsdelivr.net/npm/@fontsource/chango/files/chango-latin-400-normal.woff",
    "Pattaya": "https://cdn.jsdelivr.net/npm/@fontsource/pattaya/files/pattaya-latin-400-normal.woff",
    "Bowlby One SC": "https://cdn.jsdelivr.net/npm/@fontsource/bowlby-one-sc/files/bowlby-one-sc-latin-400-normal.woff",
    "Archivo Black": "https://cdn.jsdelivr.net/npm/@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff",
    "Passion One": "https://cdn.jsdelivr.net/npm/@fontsource/passion-one/files/passion-one-latin-400-normal.woff",
    "Paytone One": "https://cdn.jsdelivr.net/npm/@fontsource/paytone-one/files/paytone-one-latin-400-normal.woff",
    "Rubik Mono One": "https://cdn.jsdelivr.net/npm/@fontsource/rubik-mono-one/files/rubik-mono-one-latin-400-normal.woff",
    "Squada One": "https://cdn.jsdelivr.net/npm/@fontsource/squada-one/files/squada-one-latin-400-normal.woff",
    "Francois One": "https://cdn.jsdelivr.net/npm/@fontsource/francois-one/files/francois-one-latin-400-normal.woff",
    "Racing Sans One": "https://cdn.jsdelivr.net/npm/@fontsource/racing-sans-one/files/racing-sans-one-latin-400-normal.woff",
    "Bungee Inline": "https://cdn.jsdelivr.net/npm/@fontsource/bungee-inline/files/bungee-inline-latin-400-normal.woff",
    "Bungee Shade": "https://cdn.jsdelivr.net/npm/@fontsource/bungee-shade/files/bungee-shade-latin-400-normal.woff",
    "Ceviche One": "https://cdn.jsdelivr.net/npm/@fontsource/ceviche-one/files/ceviche-one-latin-400-normal.woff",
    "Rampart One": "https://cdn.jsdelivr.net/npm/@fontsource/rampart-one/files/rampart-one-latin-400-normal.woff",
    "Sniglet": "https://cdn.jsdelivr.net/npm/@fontsource/sniglet/files/sniglet-latin-400-normal.woff",
    "Cherry Cream Soda": "https://cdn.jsdelivr.net/npm/@fontsource/cherry-cream-soda/files/cherry-cream-soda-latin-400-normal.woff",
    "Slackey": "https://cdn.jsdelivr.net/npm/@fontsource/slackey/files/slackey-latin-400-normal.woff",
    "Henny Penny": "https://cdn.jsdelivr.net/npm/@fontsource/henny-penny/files/henny-penny-latin-400-normal.woff",
    "Kavoon": "https://cdn.jsdelivr.net/npm/@fontsource/kavoon/files/kavoon-latin-400-normal.woff",
    "Gochi Hand": "https://cdn.jsdelivr.net/npm/@fontsource/gochi-hand/files/gochi-hand-latin-400-normal.woff",
    "Varela Round": "https://cdn.jsdelivr.net/npm/@fontsource/varela-round/files/varela-round-latin-400-normal.woff",
    "Shojumaru": "https://cdn.jsdelivr.net/npm/@fontsource/shojumaru/files/shojumaru-latin-400-normal.woff",
    "Sancreek": "https://cdn.jsdelivr.net/npm/@fontsource/sancreek/files/sancreek-latin-400-normal.woff",
    "Ewert": "https://cdn.jsdelivr.net/npm/@fontsource/ewert/files/ewert-latin-400-normal.woff",
    "Ribeye": "https://cdn.jsdelivr.net/npm/@fontsource/ribeye/files/ribeye-latin-400-normal.woff",
    "Diplomata": "https://cdn.jsdelivr.net/npm/@fontsource/diplomata/files/diplomata-latin-400-normal.woff",
    "Rye": "https://cdn.jsdelivr.net/npm/@fontsource/rye/files/rye-latin-400-normal.woff",
    "Spicy Rice": "https://cdn.jsdelivr.net/npm/@fontsource/spicy-rice/files/spicy-rice-latin-400-normal.woff",
    "Margarine": "https://cdn.jsdelivr.net/npm/@fontsource/margarine/files/margarine-latin-400-normal.woff",
    "Modak": "https://cdn.jsdelivr.net/npm/@fontsource/modak/files/modak-latin-400-normal.woff",
    "VT323": "https://cdn.jsdelivr.net/npm/@fontsource/vt323/files/vt323-latin-400-normal.woff",
    "Silkscreen": "https://cdn.jsdelivr.net/npm/@fontsource/silkscreen/files/silkscreen-latin-400-normal.woff",
    "Wallpoet": "https://cdn.jsdelivr.net/npm/@fontsource/wallpoet/files/wallpoet-latin-400-normal.woff",
    "Quantico": "https://cdn.jsdelivr.net/npm/@fontsource/quantico/files/quantico-latin-400-normal.woff",
    "Michroma": "https://cdn.jsdelivr.net/npm/@fontsource/michroma/files/michroma-latin-400-normal.woff",
    "Audiowide": "https://cdn.jsdelivr.net/npm/@fontsource/audiowide/files/audiowide-latin-400-normal.woff",
    "Comfortaa Bold": "https://cdn.jsdelivr.net/npm/@fontsource/comfortaa/files/comfortaa-latin-700-normal.woff",
    "Balsamiq Sans Bold": "https://cdn.jsdelivr.net/npm/@fontsource/balsamiq-sans/files/balsamiq-sans-latin-700-normal.woff",
    "Kalam Bold": "https://cdn.jsdelivr.net/npm/@fontsource/kalam/files/kalam-latin-700-normal.woff",
    "Mali Bold": "https://cdn.jsdelivr.net/npm/@fontsource/mali/files/mali-latin-700-normal.woff",
    "Comic Neue Bold": "https://cdn.jsdelivr.net/npm/@fontsource/comic-neue/files/comic-neue-latin-700-normal.woff",
    "Sedgwick Ave": "https://cdn.jsdelivr.net/npm/@fontsource/sedgwick-ave/files/sedgwick-ave-latin-400-normal.woff",
    "Rock Salt": "https://cdn.jsdelivr.net/npm/@fontsource/rock-salt/files/rock-salt-latin-400-normal.woff",
    "Caveat Brush": "https://cdn.jsdelivr.net/npm/@fontsource/caveat-brush/files/caveat-brush-latin-400-normal.woff",
    "Knewave": "https://cdn.jsdelivr.net/npm/@fontsource/knewave/files/knewave-latin-400-normal.woff",
    "Amatic SC Bold": "https://cdn.jsdelivr.net/npm/@fontsource/amatic-sc/files/amatic-sc-latin-700-normal.woff",
    "Patrick Hand": "https://cdn.jsdelivr.net/npm/@fontsource/patrick-hand/files/patrick-hand-latin-400-normal.woff",
    "Nosifer": "https://cdn.jsdelivr.net/npm/@fontsource/nosifer/files/nosifer-latin-400-normal.woff",
    "Butcherman": "https://cdn.jsdelivr.net/npm/@fontsource/butcherman/files/butcherman-latin-400-normal.woff",
    "Flavors": "https://cdn.jsdelivr.net/npm/@fontsource/flavors/files/flavors-latin-400-normal.woff",
    "Oswald Bold": "https://cdn.jsdelivr.net/npm/@fontsource/oswald/files/oswald-latin-700-normal.woff",
    "Playfair Display Bold": "https://cdn.jsdelivr.net/npm/@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff",
    "Yeseva One": "https://cdn.jsdelivr.net/npm/@fontsource/yeseva-one/files/yeseva-one-latin-400-normal.woff",
    "Ranchers": "https://cdn.jsdelivr.net/npm/@fontsource/ranchers/files/ranchers-latin-400-normal.woff",
    "Fontdiner Swanky": "https://cdn.jsdelivr.net/npm/@fontsource/fontdiner-swanky/files/fontdiner-swanky-latin-400-normal.woff",
    "Kranky": "https://cdn.jsdelivr.net/npm/@fontsource/kranky/files/kranky-latin-400-normal.woff",
    "Smokum": "https://cdn.jsdelivr.net/npm/@fontsource/smokum/files/smokum-latin-400-normal.woff",
    "Macondo": "https://cdn.jsdelivr.net/npm/@fontsource/macondo/files/macondo-latin-400-normal.woff",
    "Aladin": "https://cdn.jsdelivr.net/npm/@fontsource/aladin/files/aladin-latin-400-normal.woff",
    "Erica One": "https://cdn.jsdelivr.net/npm/@fontsource/erica-one/files/erica-one-latin-400-normal.woff",
    "Fascinate Inline": "https://cdn.jsdelivr.net/npm/@fontsource/fascinate-inline/files/fascinate-inline-latin-400-normal.woff",
    "Jolly Lodger": "https://cdn.jsdelivr.net/npm/@fontsource/jolly-lodger/files/jolly-lodger-latin-400-normal.woff",
    "Pirata One": "https://cdn.jsdelivr.net/npm/@fontsource/pirata-one/files/pirata-one-latin-400-normal.woff",
    "Plaster": "https://cdn.jsdelivr.net/npm/@fontsource/plaster/files/plaster-latin-400-normal.woff",
    "Poller One": "https://cdn.jsdelivr.net/npm/@fontsource/poller-one/files/poller-one-latin-400-normal.woff",
    "UnifrakturMaguntia": "https://cdn.jsdelivr.net/npm/@fontsource/unifrakturmaguntia/files/unifrakturmaguntia-latin-400-normal.woff",
    "Vast Shadow": "https://cdn.jsdelivr.net/npm/@fontsource/vast-shadow/files/vast-shadow-latin-400-normal.woff",
    "Emilys Candy": "https://cdn.jsdelivr.net/npm/@fontsource/emilys-candy/files/emilys-candy-latin-400-normal.woff",
    "Eater": "https://cdn.jsdelivr.net/npm/@fontsource/eater/files/eater-latin-400-normal.woff",
    "Special Elite": "https://cdn.jsdelivr.net/npm/@fontsource/special-elite/files/special-elite-latin-400-normal.woff",
    "Cabin Sketch Bold": "https://cdn.jsdelivr.net/npm/@fontsource/cabin-sketch/files/cabin-sketch-latin-700-normal.woff",
    "Love Ya Like A Sister": "https://cdn.jsdelivr.net/npm/@fontsource/love-ya-like-a-sister/files/love-ya-like-a-sister-latin-400-normal.woff",
    "Monoton": "https://cdn.jsdelivr.net/npm/@fontsource/monoton/files/monoton-latin-400-normal.woff"
};

const loadedFonts = {};
const shapeCache = {}; 

let state = {
    layerOrder: ['bg', 'bg2', 't4', 't3', 't2', 't1'], // <-- Inisiasi Urutan Z-Index default
    bg: { active: true, shape: "", x: -59, y: 31, w: 630, h: 450, colorType: "gradient", color: "#161417", color2: "#0000ff", color3: "#201833", rotate: 0, outlineOnly: false, strokeW: 8 },
    bg2: { active: false, mergeToBg1: false, shape: "", x: 156, y: 50, w: 200, h: 200, colorType: "original", color: "#FFD700", color2: "#FFA500", color3: "#FF4500", rotate: 0, outlineOnly: false, strokeW: 8 },
    t1: { active: true, text: "HEX", font: "Plaster", size: 231, x: 256, y: 280, curve: 0, depth3d: 30, angle3d: 45, color3d: "#1f2937", fillType: "gradient", fill: "#6b3200", fill2: "#ff1b00", fill3: "#692800", stroke: "#000000", strokeW: 8, fillNone: false, strokeNone: false, rotate: 0, effect: "shadow" },
    t2: { active: false, mergeToT1: false, text: "TERBATAS!", font: "Luckiest Guy", size: 60, x: 256, y: 340, curve: 0, depth3d: 20, angle3d: 45, color3d: "#1f2937", fillType: "solid", fill: "#FFEB3B", fill2: "#FF8800", fill3: "#FF0000", stroke: "#000000", strokeW: 4, fillNone: false, strokeNone: false, rotate: 0, effect: "none" },
    t3: { active: false, mergeToT1: false, text: "SPESIAL!", font: "Bangers", size: 50, x: 256, y: 400, curve: 0, depth3d: 20, angle3d: 45, color3d: "#1f2937", fillType: "solid", fill: "#00FF00", fill2: "#0088FF", fill3: "#0000FF", stroke: "#000000", strokeW: 4, fillNone: false, strokeNone: false, rotate: 0, effect: "none" },
    t4: { active: false, mergeToT1: false, text: "EKSTRA!", font: "Bangers", size: 50, x: 256, y: 460, curve: 0, depth3d: 20, angle3d: 45, color3d: "#1f2937", fillType: "solid", fill: "#FF00FF", fill2: "#0088FF", fill3: "#0000FF", stroke: "#000000", strokeW: 4, fillNone: false, strokeNone: false, rotate: 0, effect: "none" }
};

let historyStack = [], currentHistoryIndex = -1, selectedObject = null, isRendering = false, renderQueued = false;
let currentSvgCode = ""; 
let isDarkMode = false;
let canvas; 

let colorPicker;
let activeColorStatePath = null;
let activeColorBtnElement = null;

async function ensureLottieLoaded() {
    if (window.lottie) return true;
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";
        script.onload = () => resolve(true);
        script.onerror = () => {
            console.warn("Gagal meload Lottie Web");
            resolve(false);
        };
        document.head.appendChild(script);
    });
}

async function init() {
    canvas = document.getElementById('svg-canvas'); 
    
    // --- DOM INJECTION UNTUK TOMBOL Z-INDEX (AGAR INDEX.HTML TIDAK PERLU DIUBAH) ---
    const selectedInfo = document.getElementById('selected-info');
    if (selectedInfo && selectedInfo.parentNode && !document.getElementById('btn-layer-up')) {
        const layerControls = document.createElement('div');
        layerControls.className = "flex gap-1 ml-auto mr-2";
        layerControls.innerHTML = `
            <button onclick="moveLayer('down')" class="text-[10px] font-bold text-gray-700 bg-white hover:bg-gray-50 px-2 py-1 rounded shadow-sm border border-gray-200 transition-colors disabled:opacity-40 flex items-center" id="btn-layer-down" disabled><i class="fas fa-layer-group mr-1"></i> <i class="fas fa-arrow-down"></i></button>
            <button onclick="moveLayer('up')" class="text-[10px] font-bold text-gray-700 bg-white hover:bg-gray-50 px-2 py-1 rounded shadow-sm border border-gray-200 transition-colors disabled:opacity-40 flex items-center" id="btn-layer-up" disabled><i class="fas fa-layer-group mr-1"></i> <i class="fas fa-arrow-up"></i></button>
        `;
        selectedInfo.parentNode.insertBefore(layerControls, selectedInfo.nextSibling);
    }
    // --------------------------------------------------------------------------------
    
    const selects = [
        document.getElementById('t1-font'), 
        document.getElementById('t2-font'), 
        document.getElementById('t3-font'),
        document.getElementById('t4-font')
    ];
    
    selects.forEach(select => {
        if (!select) return;
        for (let fontName in FONT_LIST) {
            let opt = document.createElement('option');
            opt.value = fontName; opt.innerHTML = fontName;
            select.appendChild(opt);
        }
    });
    
    if(document.getElementById('t1-font')) document.getElementById('t1-font').value = state.t1.font; 
    if(document.getElementById('t2-font')) document.getElementById('t2-font').value = state.t2.font;
    if(document.getElementById('t3-font')) document.getElementById('t3-font').value = state.t3.font;
    if(document.getElementById('t4-font')) document.getElementById('t4-font').value = state.t4.font;
    
    const urlParams = new URLSearchParams(window.location.search);
    const animId = urlParams.get('anim');
    if (animId && animId !== "None" && animId !== "undefined") {
        loadLottiePreview(animId);
    }
    
    await fetchShapeList();
    
    initColorPicker();
    setupEventListeners(); 
    
    if (tg && tg.CloudStorage) {
        tg.CloudStorage.getItem('last_state', async (err, value) => {
            if (!err && value) {
                try {
                    const savedState = JSON.parse(value);
                    state = { ...state, ...savedState };
                    console.log("Last state loaded dari CloudStorage");
                } catch (e) { console.error("Gagal parse last_state", e); }
            }
            await preloadActiveShapes();
            finishInit();
        });
    } else {
        await preloadActiveShapes();
        finishInit();
    }
}

function finishInit() {
    updateUIFromState(); 
    saveStateToHistory(); 
    renderCanvas();
}

async function fetchShapeList() {
    try {
        const baseUrl = NGROK_API_URL.replace('/api/upload', '');
        const res = await fetch(`${baseUrl}/api/shapes`, {
            headers: { "ngrok-skip-browser-warning": "true" }
        });
        if(res.ok) {
            const shapes = await res.json();
            populateShapeSelects(shapes);
        }
    } catch(e) {
        console.warn("Gagal mengambil daftar shape dari bot:", e);
    }
}

function populateShapeSelects(shapes) {
    const selects = [document.getElementById('bg-shape'), document.getElementById('bg2-shape')];
    selects.forEach(select => {
        if(!select) return;
        const currentVal = select.value;
        
        select.innerHTML = '<option value="" disabled selected>Pilih Bentuk...</option>';
        
        for(let key in shapes) {
            let opt = document.createElement('option');
            opt.value = key;
            opt.innerHTML = shapes[key];
            select.appendChild(opt);
        }
        
        if(shapes[currentVal]) {
            select.value = currentVal;
        }
    });
}

async function loadShapeData(shapeId) {
    if(!shapeId) return; 
    if(shapeCache[shapeId]) return; 
    
    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loader-text');
    if(loader && loaderText) {
        loaderText.innerText = "Memuat Shape...";
        loader.classList.remove('hidden');
    }
    
    try {
        const baseUrl = NGROK_API_URL.replace('/api/upload', '');
        const res = await fetch(`${baseUrl}/api/shapes/${shapeId}`, {
            headers: { "ngrok-skip-browser-warning": "true" }
        });
        
        if(res.ok) {
            const cShape = await res.json();
            
            if (cShape.v && (cShape.layers || cShape.assets)) {
                const lottieReady = await ensureLottieLoaded();
                if (lottieReady) {
                    const hiddenDiv = document.createElement('div');
                    hiddenDiv.style.display = 'none';
                    document.body.appendChild(hiddenDiv);

                    try {
                        const anim = lottie.loadAnimation({
                            container: hiddenDiv,
                            renderer: 'svg',
                            loop: false,
                            autoplay: false,
                            animationData: cShape
                        });

                        await new Promise(resolve => {
                            anim.addEventListener('DOMLoaded', () => {
                                setTimeout(() => {
                                    const svgEl = hiddenDiv.querySelector('svg');
                                    if (svgEl) {
                                        shapeCache[shapeId] = {
                                            isLottieCompiled: true,
                                            viewBox: svgEl.getAttribute('viewBox'),
                                            svgContent: svgEl.innerHTML,
                                            width: cShape.w || 512,
                                            height: cShape.h || 512
                                        };
                                    } else {
                                        shapeCache[shapeId] = cShape;
                                    }
                                    try { anim.destroy(); } catch(e){}
                                    hiddenDiv.remove();
                                    resolve();
                                }, 50); 
                            });
                            
                            setTimeout(() => {
                                if (!shapeCache[shapeId]) {
                                    shapeCache[shapeId] = cShape;
                                    try { anim.destroy(); } catch(e){}
                                    hiddenDiv.remove();
                                    resolve();
                                }
                            }, 2000);
                        });
                    } catch(err) {
                        console.error("Lottie Render Error:", err);
                        shapeCache[shapeId] = cShape;
                        hiddenDiv.remove();
                    }
                } else {
                    shapeCache[shapeId] = cShape;
                }
            } else {
                shapeCache[shapeId] = cShape;
            }
        } else {
            console.warn(`Shape ${shapeId} tidak ditemukan di server.`);
        }
    } catch(e) {
        console.error("Gagal load shape data:", e);
    } finally {
        if(loader) loader.classList.add('hidden');
    }
}

async function preloadActiveShapes() {
    if(state.bg.active && state.bg.shape) await loadShapeData(state.bg.shape);
    if(state.bg2.active && state.bg2.shape) await loadShapeData(state.bg2.shape);
}

async function loadLottiePreview(animId) {
    const baseUrl = NGROK_API_URL.replace('/api/upload', '');
    const tgsUrl = `${baseUrl}/api/preview/${animId}`;
    
    const loadScript = (src) => new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });

    try {
        await loadScript("https://cdnjs.cloudflare.com/ajax/libs/pako/2.1.0/pako.min.js");
        await ensureLottieLoaded();

        const response = await fetch(tgsUrl, {
            method: 'GET',
            headers: {
                "ngrok-skip-browser-warning": "true"
            }
        });
        
        if (!response.ok) throw new Error("File TGS tidak ditemukan di server lokal.");
        
        const arrayBuffer = await response.arrayBuffer();
        
        const uint8Array = new Uint8Array(arrayBuffer);
        const decompressedArray = window.pako.inflate(uint8Array);
        const decompressedString = new TextDecoder('utf-8').decode(decompressedArray);
        const animationData = JSON.parse(decompressedString);

        const canvasContainer = document.getElementById('canvas-container');
        
        const oldLottie = document.getElementById('lottie-bg');
        if (oldLottie) oldLottie.remove();

        let lottieContainer = document.createElement('div');
        lottieContainer.id = 'lottie-bg';
        lottieContainer.style.position = 'absolute';
        lottieContainer.style.inset = '0';
        lottieContainer.style.width = '100%';
        lottieContainer.style.height = '100%';
        lottieContainer.style.zIndex = '0';
        lottieContainer.style.pointerEvents = 'none'; 
        lottieContainer.style.opacity = '0.85'; 
        
        const svgCanvas = document.getElementById('svg-canvas');
        svgCanvas.style.position = 'relative';
        svgCanvas.style.zIndex = '10';
        svgCanvas.classList.remove('bg-checkered');

        canvasContainer.classList.add('bg-checkered');

        canvasContainer.insertBefore(lottieContainer, canvasContainer.firstChild);

        lottie.loadAnimation({
            container: lottieContainer,
            renderer: 'canvas',
            loop: true,
            autoplay: true,
            animationData: animationData
        });
        
        const toggleBtn = document.getElementById('btn-toggle-anim-layer');
        if (toggleBtn) toggleBtn.classList.remove('hidden');
        
    } catch (err) {
        console.warn("Preview animasi diabaikan:", err.message);
    }
}

let isLottieInFront = false;
function toggleLottieLayer() {
    const lottieBg = document.getElementById('lottie-bg');
    const layerText = document.getElementById('anim-layer-text');
    
    if (!lottieBg) return;

    isLottieInFront = !isLottieInFront;
    
    if (isLottieInFront) {
        lottieBg.style.zIndex = '20';
        if (layerText) layerText.innerText = "Di Depan";
    } else {
        lottieBg.style.zIndex = '0';
        if (layerText) layerText.innerText = "Di Belakang";
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    if(isDarkMode) {
        document.body.classList.add('dark');
        document.getElementById('theme-icon').classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.classList.remove('dark');
        document.getElementById('theme-icon').classList.replace('fa-sun', 'fa-moon');
    }
}

function initColorPicker() {
    colorPicker = new iro.ColorPicker("#iro-picker-container", {
        width: 220,
        color: "#ffffff",
        borderWidth: 2,
        borderColor: "#374151",
        layout: [
            { component: iro.ui.Wheel, options: {} },
            { component: iro.ui.Slider, options: { sliderType: 'saturation' } },
            { component: iro.ui.Slider, options: { sliderType: 'value' } },
        ]
    });
    colorPicker.on('color:change', function(color) {
        document.getElementById('color-hex-display').innerText = color.hexString;
        if(activeColorStatePath && activeColorBtnElement) {
            const path = activeColorStatePath.split('.');
            state[path[0]][path[1]] = color.hexString;
            activeColorBtnElement.style.backgroundColor = color.hexString;
            renderCanvas(); scheduleHistorySave();
        }
    });
}

function openColorPicker(statePath, element) {
    activeColorStatePath = statePath; activeColorBtnElement = element;
    const path = statePath.split('.'); const hexColor = state[path[0]][path[1]];
    colorPicker.color.hexString = hexColor;
    document.getElementById('color-hex-display').innerText = hexColor;
    const modal = document.getElementById('color-picker-modal');
    modal.classList.remove('hidden'); modal.classList.add('flex');
}

function closeColorPicker() {
    const modal = document.getElementById('color-picker-modal');
    modal.classList.add('hidden'); modal.classList.remove('flex');
    activeColorStatePath = null; activeColorBtnElement = null;
}

function cloneState(obj) { return JSON.parse(JSON.stringify(obj)); }

function saveStateToHistory() {
    if (currentHistoryIndex < historyStack.length - 1) historyStack = historyStack.slice(0, currentHistoryIndex + 1);
    historyStack.push(cloneState(state));
    if (historyStack.length > 20) historyStack.shift(); else currentHistoryIndex++;
    updateHistoryButtons();
}

function undo() { if (currentHistoryIndex > 0) { currentHistoryIndex--; state = cloneState(historyStack[currentHistoryIndex]); updateUIFromState(); renderCanvas(); updateHistoryButtons(); } }
function redo() { if (currentHistoryIndex < historyStack.length - 1) { currentHistoryIndex++; state = cloneState(historyStack[currentHistoryIndex]); updateUIFromState(); renderCanvas(); updateHistoryButtons(); } }
function updateHistoryButtons() { document.getElementById('btn-undo').disabled = currentHistoryIndex <= 0; document.getElementById('btn-redo').disabled = currentHistoryIndex >= historyStack.length - 1; }
function scheduleHistorySave() { clearTimeout(window.historyTimeout); window.historyTimeout = setTimeout(() => { saveStateToHistory(); }, 400); }

async function loadFont(fontName) {
    if (loadedFonts[fontName]) return loadedFonts[fontName];
    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loader-text');
    loaderText.innerText = `Mengunduh Font: ${fontName}...`;
    loader.classList.remove('hidden');
    return new Promise((resolve, reject) => { 
        opentype.load(FONT_LIST[fontName], function(err, font) { 
            loader.classList.add('hidden');
            if (err) { 
                alert(`Gagal mengunduh font "${fontName}". Koneksi mungkin bermasalah. Mengembalikan ke font sebelumnya.`);
                reject(new Error("FontLoadError")); 
            } else { 
                loadedFonts[fontName] = font; 
                resolve(font); 
            } 
        }); 
    });
}

function warpPathData(path, curveValue, bbox) {
    if (curveValue === 0 || !curveValue) return path.toPathData(4);
    const width = bbox.x2 - bbox.x1;
    const cx = (bbox.x1 + bbox.x2) / 2;
    const cy = bbox.y2; 
    const sign = curveValue > 0 ? 1 : -1;
    const intensity = Math.abs(curveValue) / 100; 
    const R = sign * (width / 2) * (1 / Math.max(0.05, intensity));

    let newPathStr = "";
    path.commands.forEach(cmd => {
        if (cmd.type === 'Z') { newPathStr += 'Z '; return; }
        const transformPoint = (x, y) => {
            const dx = x - cx; const dy = y - cy; 
            const theta = dx / R;
            const circleCx = cx; const circleCy = cy + R;
            const dist = R - dy;
            const nx = circleCx + dist * Math.sin(theta);
            const ny = circleCy - dist * Math.cos(theta);
            return {x: nx, y: ny};
        };

        if (cmd.type === 'M' || cmd.type === 'L') {
            const pt = transformPoint(cmd.x, cmd.y);
            newPathStr += `${cmd.type} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)} `;
        } else if (cmd.type === 'Q') {
            const p1 = transformPoint(cmd.x1, cmd.y1);
            const p = transformPoint(cmd.x, cmd.y);
            newPathStr += `Q ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} ${p.x.toFixed(2)} ${p.y.toFixed(2)} `;
        } else if (cmd.type === 'C') {
            const p1 = transformPoint(cmd.x1, cmd.y1);
            const p2 = transformPoint(cmd.x2, cmd.y2);
            const p = transformPoint(cmd.x, cmd.y);
            newPathStr += `C ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} ${p.x.toFixed(2)} ${p.y.toFixed(2)} `;
        }
    });
    return newPathStr.trim();
}

function getBgShape(bg, fillAttr) {
    const {x, y, w, h, shape, outlineOnly, strokeW, colorType} = bg; 
    const isOrig = colorType === 'original';
    const fillStr = outlineOnly ? 'transparent' : fillAttr;
    const strokeStr = outlineOnly ? fillAttr : 'none';
    const strokeWAttr = outlineOnly ? (parseInt(strokeW) || 0) : (parseInt(strokeW) || 0);
    
    if (!shape || !shapeCache[shape]) return '';
    
    const cShape = shapeCache[shape];
    
    if (cShape.isLottieCompiled) {
        let origW = cShape.width || 512;
        let origH = cShape.height || 512;
        if (cShape.viewBox) {
            const vbParts = String(cShape.viewBox).trim().split(/[ ,]+/);
            if (vbParts.length >= 4) {
                origW = parseFloat(vbParts[2]) || origW;
                origH = parseFloat(vbParts[3]) || origH;
            }
        }
        const sx = w / origW;
        const sy = h / origH;
        
        let content = cShape.svgContent;
        
        if (!isOrig) {
            content = content.replace(/fill="([^"]+)"/gi, (match, p1) => {
                if (p1.toLowerCase() === 'none' || p1.toLowerCase() === 'transparent') return match;
                return `fill="${fillStr}"`;
            });
            content = content.replace(/stroke="([^"]+)"/gi, (match, p1) => {
                if (p1.toLowerCase() === 'none' || p1.toLowerCase() === 'transparent') return match;
                return `stroke="${strokeStr}"`;
            });
        }
        
        return `<g transform="translate(${x}, ${y}) scale(${sx}, ${sy})">
            ${content}
        </g>`;
    }

    let origW = 512;
    let origH = 512;
    
    if (cShape.w !== undefined) origW = parseFloat(cShape.w);
    else if (cShape.width !== undefined) origW = parseFloat(cShape.width);
    
    if (cShape.h !== undefined) origH = parseFloat(cShape.h);
    else if (cShape.height !== undefined) origH = parseFloat(cShape.height);
    
    if (cShape.viewBox) {
        const vbParts = String(cShape.viewBox).trim().split(/[ ,]+/);
        if (vbParts.length >= 4) {
            origW = parseFloat(vbParts[2]) || origW;
            origH = parseFloat(vbParts[3]) || origH;
        }
    }

    const sx = w / origW;
    const sy = h / origH;
    
    let gMinX = Infinity, gMinY = Infinity, gMaxX = -Infinity, gMaxY = -Infinity;
    let hasLottiePaths = false;
    
    function extractAllPaths(obj) {
        let foundPaths = [];
        
        if (typeof obj === 'string') {
            if (/^[Mm]\s*[-.\d]/.test(obj.trim())) foundPaths.push(obj.trim());
        } else if (Array.isArray(obj)) {
            obj.forEach(item => {
                foundPaths = foundPaths.concat(extractAllPaths(item));
            });
        } else if (obj !== null && typeof obj === 'object') {
            if (obj.v && Array.isArray(obj.v) && obj.i && Array.isArray(obj.i) && obj.o && Array.isArray(obj.o)) {
                hasLottiePaths = true;
                let dStr = "";
                for (let j = 0; j < obj.v.length; j++) {
                    let vx = obj.v[j][0], vy = obj.v[j][1];
                    let ix = vx + obj.i[j][0], iy = vy + obj.i[j][1];
                    let ox = vx + obj.o[j][0], oy = vy + obj.o[j][1];

                    gMinX = Math.min(gMinX, vx, ix, ox);
                    gMinY = Math.min(gMinY, vy, iy, oy);
                    gMaxX = Math.max(gMaxX, vx, ix, ox);
                    gMaxY = Math.max(gMaxY, vy, iy, oy);

                    if (j === 0) {
                        dStr += `M ${vx} ${vy} `;
                    } else {
                        let prev = j - 1;
                        let cp1x = obj.v[prev][0] + obj.o[prev][0];
                        let cp1y = obj.v[prev][1] + obj.o[prev][1];
                        let cp2x = vx + obj.i[j][0];
                        let cp2y = vy + obj.i[j][1];
                        dStr += `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${vx} ${vy} `;
                    }
                }
                if (obj.c && obj.v.length > 0) {
                    let prev = obj.v.length - 1;
                    let cp1x = obj.v[prev][0] + obj.o[prev][0];
                    let cp1y = obj.v[prev][1] + obj.o[prev][1];
                    let cp2x = obj.v[0][0] + obj.i[0][0];
                    let cp2y = obj.v[0][1] + obj.i[0][1];
                    dStr += `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${obj.v[0][0]} ${obj.v[0][1]} Z`;
                }
                if (dStr.trim() !== "") foundPaths.push(dStr.trim());
            } 
            else if (obj.d && typeof obj.d === 'string' && /^[Mm]/.test(obj.d.trim())) {
                foundPaths.push(obj.d.trim());
            } else if (obj.path && typeof obj.path === 'string' && /^[Mm]/.test(obj.path.trim())) {
                foundPaths.push(obj.path.trim());
            } else {
                for (let key in obj) {
                    foundPaths = foundPaths.concat(extractAllPaths(obj[key]));
                }
            }
        }
        return foundPaths;
    }

    let pathsToRender = extractAllPaths(cShape);
    let subPaths = '';
    
    let lottieTransform = "";
    if (hasLottiePaths && gMinX !== Infinity) {
        let rawW = gMaxX - gMinX;
        let rawH = gMaxY - gMinY;
        if (rawW === 0) rawW = 1;
        if (rawH === 0) rawH = 1;

        let scaleFit = Math.min(origW / rawW, origH / rawH) * 0.95;
        let rawCx = gMinX + rawW / 2;
        let rawCy = gMinY + rawH / 2;
        let targetCx = origW / 2;
        let targetCy = origH / 2;
        let tx = targetCx - (rawCx * scaleFit);
        let ty = targetCy - (rawCy * scaleFit);

        lottieTransform = `transform="translate(${tx}, ${ty}) scale(${scaleFit})"`;
    }

    if (pathsToRender.length > 0) {
        subPaths += `<g ${lottieTransform}>`;
        pathsToRender.forEach(pD => {
            subPaths += `<path d="${pD}" fill="${fillStr}" stroke="${strokeStr}" stroke-width="${strokeWAttr}" stroke-linejoin="round" vector-effect="non-scaling-stroke" />`;
        });
        subPaths += `</g>`;
    } 
    
    return `<g transform="translate(${x}, ${y}) scale(${sx}, ${sy})">
        ${subPaths}
    </g>`;
}

async function renderCanvas() {
    if (isRendering) { renderQueued = true; return; } isRendering = true;
    
    let safeState = null;
    if (historyStack.length > 0 && currentHistoryIndex >= 0) { safeState = JSON.stringify(historyStack[currentHistoryIndex]); } else { safeState = JSON.stringify(state); }

    try {
        if (state.t1.active && state.t1.text.trim() !== "") await loadFont(state.t1.font);
        if (state.t2.active && state.t2.text.trim() !== "") await loadFont(state.t2.font);
        if (state.t3.active && state.t3.text.trim() !== "") await loadFont(state.t3.font);
        if (state.t4.active && state.t4.text.trim() !== "") await loadFont(state.t4.font);
        
        let defsContent = '<defs>\n';
        
        defsContent += `<filter id="neon-glow" filterUnits="userSpaceOnUse" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur3" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur8" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur15" />
            <feMerge>
                <feMergeNode in="blur15" />
                <feMergeNode in="blur8" />
                <feMergeNode in="blur3" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>\n`;

        if (state.bg.colorType === 'gradient') {
            defsContent += `<linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">\n  <stop offset="0%" stop-color="${state.bg.color}"/>\n  <stop offset="50%" stop-color="${state.bg.color2}"/>\n  <stop offset="100%" stop-color="${state.bg.color3}"/>\n</linearGradient>\n`;
        }
        if (state.bg2.colorType === 'gradient') {
            defsContent += `<linearGradient id="bg2-grad" x1="0%" y1="0%" x2="100%" y2="100%">\n  <stop offset="0%" stop-color="${state.bg2.color}"/>\n  <stop offset="50%" stop-color="${state.bg2.color2}"/>\n  <stop offset="100%" stop-color="${state.bg2.color3}"/>\n</linearGradient>\n`;
        }
        if (state.t1.fillType === 'gradient') {
            defsContent += `<linearGradient id="t1-grad" x1="0%" y1="0%" x2="100%" y2="100%">\n  <stop offset="0%" stop-color="${state.t1.fill}"/>\n  <stop offset="50%" stop-color="${state.t1.fill2}"/>\n  <stop offset="100%" stop-color="${state.t1.fill3}"/>\n</linearGradient>\n`;
        }
        if (state.t2.fillType === 'gradient') {
            defsContent += `<linearGradient id="t2-grad" x1="0%" y1="0%" x2="100%" y2="100%">\n  <stop offset="0%" stop-color="${state.t2.fill}"/>\n  <stop offset="50%" stop-color="${state.t2.fill2}"/>\n  <stop offset="100%" stop-color="${state.t2.fill3}"/>\n</linearGradient>\n`;
        }
        if (state.t3.fillType === 'gradient') {
            defsContent += `<linearGradient id="t3-grad" x1="0%" y1="0%" x2="100%" y2="100%">\n  <stop offset="0%" stop-color="${state.t3.fill}"/>\n  <stop offset="50%" stop-color="${state.t3.fill2}"/>\n  <stop offset="100%" stop-color="${state.t3.fill3}"/>\n</linearGradient>\n`;
        }
        if (state.t4.fillType === 'gradient') {
            defsContent += `<linearGradient id="t4-grad" x1="0%" y1="0%" x2="100%" y2="100%">\n  <stop offset="0%" stop-color="${state.t4.fill}"/>\n  <stop offset="50%" stop-color="${state.t4.fill2}"/>\n  <stop offset="100%" stop-color="${state.t4.fill3}"/>\n</linearGradient>\n`;
        }
        defsContent += '</defs>\n';

        let svgContent = defsContent;
        
        // --- LOGIKA NESTING BACKGROUND & TEXT YANG DISUSUN ULANG BERDASARKAN ARRAY Z-INDEX ---
        let layerContents = {};

        // 1. BG Utama
        let bgLayerContent = "";
        if (state.bg.active) {
            const isSelected = selectedObject === 'bg';
            const bgFill = state.bg.colorType === 'gradient' ? 'url(#bg-grad)' : state.bg.color;
            bgLayerContent += `
            <g class="clickable" data-id="bg" transform="rotate(${state.bg.rotate}, ${state.bg.x + state.bg.w/2}, ${state.bg.y + state.bg.h/2})">
                ${getBgShape(state.bg, bgFill)}
                ${isSelected ? `<rect x="${state.bg.x-4}" y="${state.bg.y-4}" width="${state.bg.w+8}" height="${state.bg.h+8}" class="focus-ring" />` : ''}
            </g>`;
        }
        
        if (state.bg2.active && state.bg2.mergeToBg1) {
            const isSelected = selectedObject === 'bg2';
            const bg2Fill = state.bg2.colorType === 'gradient' ? 'url(#bg2-grad)' : state.bg2.color;
            bgLayerContent += `
            <g class="clickable" data-id="bg2" transform="rotate(${state.bg2.rotate}, ${state.bg2.x + state.bg2.w/2}, ${state.bg2.y + state.bg2.h/2})">
                ${getBgShape(state.bg2, bg2Fill)}
                ${isSelected ? `<rect x="${state.bg2.x-4}" y="${state.bg2.y-4}" width="${state.bg2.w+8}" height="${state.bg2.h+8}" class="focus-ring" />` : ''}
            </g>`;
        }
        if (bgLayerContent) layerContents['bg'] = `<g id="layer_bg">${bgLayerContent}</g>`;

        // 2. BG2 Mandiri (Tidak Digabung)
        if (state.bg2.active && !state.bg2.mergeToBg1) {
            const isSelected = selectedObject === 'bg2';
            const bg2Fill = state.bg2.colorType === 'gradient' ? 'url(#bg2-grad)' : state.bg2.color;
            layerContents['bg2'] = `
            <g id="layer_bg2">
                <g class="clickable" data-id="bg2" transform="rotate(${state.bg2.rotate}, ${state.bg2.x + state.bg2.w/2}, ${state.bg2.y + state.bg2.h/2})">
                    ${getBgShape(state.bg2, bg2Fill)}
                    ${isSelected ? `<rect x="${state.bg2.x-4}" y="${state.bg2.y-4}" width="${state.bg2.w+8}" height="${state.bg2.h+8}" class="focus-ring" />` : ''}
                </g>
            </g>`;
        }
        
        // 3. Teks 1 (Induk)
        let t1LayerContent = "";
        if (state.t1.active && state.t1.text.trim() !== "") t1LayerContent += generateTextGroup(state.t1, 't1');
        if (state.t2.active && state.t2.text.trim() !== "" && state.t2.mergeToT1) t1LayerContent += generateTextGroup(state.t2, 't2');
        if (state.t3.active && state.t3.text.trim() !== "" && state.t3.mergeToT1) t1LayerContent += generateTextGroup(state.t3, 't3');
        if (state.t4.active && state.t4.text.trim() !== "" && state.t4.mergeToT1) t1LayerContent += generateTextGroup(state.t4, 't4');
        if (t1LayerContent) layerContents['t1'] = `<g id="layer_t1">${t1LayerContent}</g>`;

        // 4. Teks Mandiri
        if (state.t2.active && state.t2.text.trim() !== "" && !state.t2.mergeToT1) {
            layerContents['t2'] = `<g id="layer_t2">${generateTextGroup(state.t2, 't2')}</g>`;
        }
        if (state.t3.active && state.t3.text.trim() !== "" && !state.t3.mergeToT1) {
            layerContents['t3'] = `<g id="layer_t3">${generateTextGroup(state.t3, 't3')}</g>`;
        }
        if (state.t4.active && state.t4.text.trim() !== "" && !state.t4.mergeToT1) {
            layerContents['t4'] = `<g id="layer_t4">${generateTextGroup(state.t4, 't4')}</g>`;
        }
        
        // Menerapkan Algoritma Pelukis berdasarkan state.layerOrder
        const currentOrder = state.layerOrder || ['bg', 'bg2', 't4', 't3', 't2', 't1'];
        currentOrder.forEach(layerId => {
            if (layerContents[layerId]) {
                svgContent += layerContents[layerId];
            }
        });
        
        canvas.innerHTML = svgContent;
        
        const tempSvg = canvas.cloneNode(true);
        tempSvg.querySelectorAll('.focus-ring, rect[fill="transparent"]').forEach(el => el.remove());
        tempSvg.removeAttribute('id');
        tempSvg.removeAttribute('class');
        currentSvgCode = new XMLSerializer().serializeToString(tempSvg);
        
        updateDPadButtons();
    } catch(e) { 
        console.error("Render Error:", e); 
        if (e.message === "FontLoadError" && safeState) {
            state = JSON.parse(safeState);
            updateUIFromState(); 
        }
    } finally { 
        isRendering = false; 
        if (renderQueued) { renderQueued = false; renderCanvas(); } 
    }
}

function generateTextGroup(tState, idTag) {
    const font = loadedFonts[tState.font]; if (!font) return '';
    const path = font.getPath(tState.text, 0, 0, parseInt(tState.size));
    const box = path.getBoundingBox(); 
    const w = box.x2 - box.x1; const h = box.y2 - box.y1;
    const offsetX = -w / 2 - box.x1; const offsetY = h / 2;
    
    const warpedPathStr = warpPathData(path, parseInt(tState.curve) || 0, box);

    const activeFillColor = tState.fillType === 'gradient' ? `url(#${idTag}-grad)` : tState.fill;
    const baseFill = tState.fillNone ? 'none' : activeFillColor;
    const baseStroke = tState.strokeNone ? 'none' : tState.stroke;
    const baseStrokeW = tState.strokeNone ? 0 : (parseInt(tState.strokeW) || 0);
    
    const isSelected = selectedObject === idTag;
    
    const makePath = (fColor, sColor, swValue, dx=0, dy=0) => {
        return `<path d="${warpedPathStr}" transform="translate(${offsetX + dx}, ${offsetY + dy})" fill="${fColor}" stroke="${sColor}" stroke-width="${swValue}" stroke-linejoin="round" />`;
    };

    let renderedPaths = '';
    
    if (tState.effect === 'shadow') {
        renderedPaths += makePath('rgba(0,0,0,0.4)', 'none', 0, 8, 8);
    } else if (tState.effect === 'border') {
        renderedPaths += makePath(baseFill, '#FFFFFF', baseStrokeW + 16); 
    } else if (tState.effect === 'extrude') {
        const depth = parseInt(tState.depth3d) || 20;
        const angle = (parseInt(tState.angle3d) || 45) * (Math.PI / 180);
        const extColor = tState.color3d || '#1f2937';
        
        const dxStep = Math.cos(angle);
        const dyStep = Math.sin(angle);
        
        let extStrokeW = Math.max(baseStrokeW, 2);
        let stepSize = Math.max(1, depth / 30); 
        
        for (let i = depth; i >= 1; i -= stepSize) {
            renderedPaths += makePath(extColor, extColor, extStrokeW, dxStep * i, dyStep * i);
        }
    }

    renderedPaths += makePath(baseFill, baseStroke, baseStrokeW);
    
    return `
    <g transform="translate(${tState.x}, ${tState.y}) rotate(${tState.rotate})" class="clickable" data-id="${idTag}">
        <rect x="${-w/2 - 10}" y="${-h/2 - (h*0.2) - 10}" width="${w + 20}" height="${h*1.4 + 20}" fill="transparent" />
        ${isSelected ? `<rect x="${-w/2 - 10}" y="${-h/2 - (h*0.2) - 10}" width="${w + 20}" height="${h*1.4 + 20}" class="focus-ring" />` : ''}
        ${renderedPaths}
    </g>`;
}

// --- FUNGSI BARU UNTUK MERUBAH POSISI Z-INDEX ---
function moveLayer(direction) {
    if (!selectedObject) return;
    
    // Cari Induk Utamanya jika layer tersebut sedang dalam mode gabungan (Merge)
    let targetId = selectedObject;
    if (targetId === 'bg2' && state.bg2.mergeToBg1) targetId = 'bg';
    if (['t2', 't3', 't4'].includes(targetId) && state[targetId].mergeToT1) targetId = 't1';
    
    if (!state.layerOrder) state.layerOrder = ['bg', 'bg2', 't4', 't3', 't2', 't1'];
    
    const idx = state.layerOrder.indexOf(targetId);
    if (idx === -1) return;
    
    if (direction === 'up' && idx < state.layerOrder.length - 1) {
        // Pindah ke indeks yang lebih tinggi = dilukis belakangan (Di Depan/Atas)
        const temp = state.layerOrder[idx + 1];
        state.layerOrder[idx + 1] = state.layerOrder[idx];
        state.layerOrder[idx] = temp;
    } else if (direction === 'down' && idx > 0) {
        // Pindah ke indeks yang lebih rendah = dilukis duluan (Di Belakang/Bawah)
        const temp = state.layerOrder[idx - 1];
        state.layerOrder[idx - 1] = state.layerOrder[idx];
        state.layerOrder[idx] = temp;
    }
    
    renderCanvas();
    scheduleHistorySave();
}
// ------------------------------------------------

function selectObject(id) { 
    selectedObject = id; let name = "Pilih objek"; 
    if (id === 'bg') name = "Bentuk 1"; 
    if (id === 'bg2') name = "Bentuk 2"; 
    if (id === 't1') name = "Teks Atas"; 
    if (id === 't2') name = "Teks Tengah"; 
    if (id === 't3') name = "Teks Bawah"; 
    if (id === 't4') name = "Teks 4 (Ekstra)"; 
    document.getElementById('selected-info').innerText = name; renderCanvas(); 
}

function moveSelected(dx, dy) { if (!selectedObject) return; state[selectedObject].x = parseFloat(state[selectedObject].x) + dx; state[selectedObject].y = parseFloat(state[selectedObject].y) + dy; renderCanvas(); scheduleHistorySave(); }
function rotateSelected(deg) { if (!selectedObject) return; state[selectedObject].rotate = parseFloat(state[selectedObject].rotate || 0) + deg; renderCanvas(); scheduleHistorySave(); }

function updateDPadButtons() { 
    const hasSel = selectedObject !== null; 
    ['btn-up','btn-down','btn-left','btn-right','btn-rot-l','btn-rot-r', 'btn-layer-up', 'btn-layer-down'].forEach(id => { 
        const el = document.getElementById(id);
        if(el) el.disabled = !hasSel; 
    }); 
}

function setupEventListeners() {
    canvas.addEventListener('click', (e) => { const target = e.target.closest('.clickable'); if (target) { selectObject(target.getAttribute('data-id')); } else { selectObject(null); } });

    const dragHandle = document.getElementById('canvas-drag-handle');
    const canvasContainer = document.getElementById('canvas-container');
    let isDraggingCanvas = false; let startY = 0; let startWidth = 0;

    const startDrag = (e) => {
        isDraggingCanvas = true;
        startY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        startWidth = canvasContainer.getBoundingClientRect().width;
    };

    const moveDrag = (e) => {
        if (!isDraggingCanvas) return;
        if (e.cancelable) e.preventDefault(); 
        const currentY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        const deltaY = currentY - startY;
        let newWidth = startWidth + deltaY;
        const maxW = Math.min(window.innerWidth - 16, 384); 
        const minW = 150; 
        if (newWidth > maxW) newWidth = maxW;
        if (newWidth < minW) newWidth = minW;
        canvasContainer.style.maxWidth = newWidth + 'px';
        canvasContainer.style.width = newWidth + 'px';
    };

    const endDrag = () => { isDraggingCanvas = false; };

    dragHandle.addEventListener('mousedown', startDrag); dragHandle.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('mousemove', moveDrag); window.addEventListener('touchmove', moveDrag, { passive: false });
    window.addEventListener('mouseup', endDrag); window.addEventListener('touchend', endDrag);

    const bindInput = (id, statePath, isNum = false) => {
        const el = document.getElementById(id); if(!el) return;
        el.addEventListener(el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input', async (e) => {
            let val = el.type === 'checkbox' ? e.target.checked : e.target.value; if(isNum) val = parseInt(val) || 0;
            const path = statePath.split('.'); state[path[0]][path[1]] = val;
            
            if(id.includes('size') || id.includes('curve') || id.includes('-w') || id.includes('-h')) {
                const valSpan = document.getElementById(id + '-val');
                if (valSpan) valSpan.innerText = val;
            }
            
            if (id.includes('effect')) {
                const ctrls = document.getElementById(`${path[0]}-3d-controls`);
                if (ctrls) ctrls.style.display = (val === 'extrude') ? 'block' : 'none';
            }
            
            if (id.includes('-shape')) {
                await loadShapeData(val);
            }
            
            renderCanvas(); scheduleHistorySave();
        });
    };
    
    ['bg', 'bg2'].forEach(id => {
        const activeCheckbox = document.getElementById(`${id}-active`);
        if(activeCheckbox) {
            activeCheckbox.addEventListener('change', (e) => {
                state[id].active = e.target.checked; 
                document.getElementById(`${id}-controls`).style.opacity = e.target.checked ? '1' : '0.5'; 
                document.getElementById(`${id}-controls`).style.pointerEvents = e.target.checked ? 'auto' : 'none'; 
                renderCanvas(); scheduleHistorySave(); 
            });
        }
        
        bindInput(`${id}-shape`, `${id}.shape`); bindInput(`${id}-w`, `${id}.w`, true); bindInput(`${id}-h`, `${id}.h`, true); 
        bindInput(`${id}-colorType`, `${id}.colorType`); 
        bindInput(`${id}-outlineOnly`, `${id}.outlineOnly`); bindInput(`${id}-strokeW`, `${id}.strokeW`, true); 
        
        if(id === 'bg2') {
            bindInput(`bg2-merge`, `bg2.mergeToBg1`);
        }
        
        const typeEl = document.getElementById(`${id}-colorType`);
        if(typeEl) {
            typeEl.addEventListener('change', (e) => {
                const isGrad = e.target.value === 'gradient';
                const isOrig = e.target.value === 'original';
                const wrapper = document.getElementById(`${id}-color-wrapper`);
                if(wrapper) wrapper.style.display = isOrig ? 'none' : 'block';
                
                const c2 = document.getElementById(`${id}-color2-container`);
                const c3 = document.getElementById(`${id}-color3-container`);
                if(c2) c2.style.display = isGrad && !isOrig ? 'flex' : 'none'; 
                if(c3) c3.style.display = isGrad && !isOrig ? 'flex' : 'none';
            });
        }
    });
    
    ['t1', 't2', 't3', 't4'].forEach(p => { 
        const activeCheckbox = document.getElementById(`${p}-active`);
        if(activeCheckbox) {
            activeCheckbox.addEventListener('change', (e) => {
                state[p].active = e.target.checked;
                const controls = document.getElementById(`${p}-controls`);
                if(controls) {
                    controls.style.opacity = e.target.checked ? '1' : '0.5';
                    controls.style.pointerEvents = e.target.checked ? 'auto' : 'none';
                }
                renderCanvas(); scheduleHistorySave();
            });
        }
        bindInput(`${p}-text`, `${p}.text`); bindInput(`${p}-font`, `${p}.font`); bindInput(`${p}-size`, `${p}.size`, true); 
        bindInput(`${p}-curve`, `${p}.curve`, true); 
        bindInput(`${p}-depth3d`, `${p}.depth3d`, true); bindInput(`${p}-angle3d`, `${p}.angle3d`, true); 
        bindInput(`${p}-fillType`, `${p}.fillType`); bindInput(`${p}-fill-none`, `${p}.fillNone`); 
        bindInput(`${p}-stroke-none`, `${p}.strokeNone`); bindInput(`${p}-strokeW`, `${p}.strokeW`, true); 
        bindInput(`${p}-effect`, `${p}.effect`);
        
        if(p !== 't1') {
            bindInput(`${p}-merge`, `${p}.mergeToT1`);
        }
        
        const typeEl = document.getElementById(`${p}-fillType`);
        if(typeEl) {
            typeEl.addEventListener('change', (e) => {
                const isGrad = e.target.value === 'gradient';
                const c2 = document.getElementById(`${p}-fill2-container`);
                const c3 = document.getElementById(`${p}-fill3-container`);
                if(c2) c2.style.display = isGrad ? 'flex' : 'none'; if(c3) c3.style.display = isGrad ? 'flex' : 'none';
            });
        }
    });
}

function updateUIFromState() {
    ['bg', 'bg2'].forEach(id => {
        document.getElementById(`${id}-active`).checked = state[id].active; 
        const controls = document.getElementById(`${id}-controls`);
        if(controls) {
            controls.style.opacity = state[id].active ? '1' : '0.5';
            controls.style.pointerEvents = state[id].active ? 'auto' : 'none';
        }
        
        if (id === 'bg2') {
             const mergeEl = document.getElementById(`bg2-merge`);
             if(mergeEl) mergeEl.checked = state.bg2.mergeToBg1 || false;
        }
        
        const shapeSelect = document.getElementById(`${id}-shape`);
        if (shapeSelect) shapeSelect.value = state[id].shape; 
        
        document.getElementById(`${id}-w`).value = state[id].w; document.getElementById(`${id}-w-val`).innerText = state[id].w; 
        document.getElementById(`${id}-h`).value = state[id].h; document.getElementById(`${id}-h-val`).innerText = state[id].h;
        document.getElementById(`${id}-colorType`).value = state[id].colorType;
        document.getElementById(`${id}-outlineOnly`).checked = state[id].outlineOnly; 
        document.getElementById(`${id}-strokeW`).value = state[id].strokeW;
        
        document.getElementById(`${id}-color-btn`).style.backgroundColor = state[id].color; 
        document.getElementById(`${id}-color2-btn`).style.backgroundColor = state[id].color2; 
        document.getElementById(`${id}-color3-btn`).style.backgroundColor = state[id].color3;
        
        const isBgGrad = state[id].colorType === 'gradient';
        const isBgOrig = state[id].colorType === 'original';
        
        const wrapper = document.getElementById(`${id}-color-wrapper`);
        if(wrapper) wrapper.style.display = isBgOrig ? 'none' : 'block';
        
        const color2Container = document.getElementById(`${id}-color2-container`);
        const color3Container = document.getElementById(`${id}-color3-container`);
        if (color2Container) color2Container.style.display = isBgGrad && !isBgOrig ? 'flex' : 'none'; 
        if (color3Container) color3Container.style.display = isBgGrad && !isBgOrig ? 'flex' : 'none';
    });

    ['t1', 't2', 't3', 't4'].forEach(id => { 
        if(!document.getElementById(`${id}-active`)) return;

        document.getElementById(`${id}-active`).checked = state[id].active;
        const controls = document.getElementById(`${id}-controls`);
        if(controls) {
            controls.style.opacity = state[id].active ? '1' : '0.5';
            controls.style.pointerEvents = state[id].active ? 'auto' : 'none';
        }
        
        if (id !== 't1') {
             const mergeEl = document.getElementById(`${id}-merge`);
             if(mergeEl) mergeEl.checked = state[id].mergeToT1 || false;
        }

        document.getElementById(`${id}-text`).value = state[id].text; document.getElementById(`${id}-font`).value = state[id].font; 
        document.getElementById(`${id}-size`).value = state[id].size; document.getElementById(`${id}-size-val`).innerText = state[id].size; 
        
        document.getElementById(`${id}-curve`).value = state[id].curve || 0; 
        document.getElementById(`${id}-curve-val`).innerText = state[id].curve || 0;
        
        document.getElementById(`${id}-depth3d`).value = state[id].depth3d || 30; 
        document.getElementById(`${id}-angle3d`).value = state[id].angle3d || 45; 
        document.getElementById(`${id}-color3d-btn`).style.backgroundColor = state[id].color3d || '#1f2937';

        document.getElementById(`${id}-fillType`).value = state[id].fillType; 
        document.getElementById(`${id}-fill-btn`).style.backgroundColor = state[id].fill; document.getElementById(`${id}-fill2-btn`).style.backgroundColor = state[id].fill2; document.getElementById(`${id}-fill3-btn`).style.backgroundColor = state[id].fill3; 
        
        const isGrad = state[id].fillType === 'gradient';
        document.getElementById(`${id}-fill2-container`).style.display = isGrad ? 'flex' : 'none'; document.getElementById(`${id}-fill3-container`).style.display = isGrad ? 'flex' : 'none';
        
        document.getElementById(`${id}-fill-none`).checked = state[id].fillNone; 
        document.getElementById(`${id}-stroke-btn`).style.backgroundColor = state[id].stroke; document.getElementById(`${id}-stroke-none`).checked = state[id].strokeNone; document.getElementById(`${id}-strokeW`).value = state[id].strokeW; 
        
        const effectVal = state[id].effect || "none";
        document.getElementById(`${id}-effect`).value = effectVal;
        const ctrls3d = document.getElementById(`${id}-3d-controls`);
        if(ctrls3d) ctrls3d.style.display = (effectVal === 'extrude') ? 'block' : 'none';
    });
}

function toggleSection(id) { 
    const sec = document.getElementById(id), icon = document.getElementById('icon-' + id); 
    sec.classList.toggle('hidden'); icon.classList.toggle('rotate-180'); 
}

function switchInduk(tab) {
    const btnEditor = document.getElementById('btn-induk-editor');
    const btnDpad = document.getElementById('btn-induk-dpad');
    const dpadContent = document.getElementById('induk-dpad-content');

    if (tab === 'editor') {
        btnEditor.className = "flex-1 py-1.5 text-[11px] font-bold bg-white shadow-sm rounded text-blue-600 transition transition-colors";
        btnDpad.className = "flex-1 py-1.5 text-[11px] font-bold text-gray-500 rounded hover:text-gray-700 transition transition-colors";
        dpadContent.classList.add('hidden');
    } else {
        btnDpad.className = "flex-1 py-1.5 text-[11px] font-bold bg-white shadow-sm rounded text-blue-600 transition transition-colors";
        btnEditor.className = "flex-1 py-1.5 text-[11px] font-bold text-gray-500 rounded hover:text-gray-700 transition transition-colors";
        dpadContent.classList.remove('hidden');
    }
}

async function sendToBot() {
    if(!currentSvgCode || currentSvgCode.trim() === "") return alert("Desain masih kosong!");
    try {
        if (!tg || !tg.initData) {
            alert("Data otentikasi Telegram tidak ditemukan. Pastikan membuka WebApp ini melalui tombol Menu di Telegram.");
            return;
        }

        if (tg.CloudStorage) {
            tg.CloudStorage.setItem('last_state', JSON.stringify(state), (err, success) => {
                if(err) console.warn("Gagal menyimpan last state", err);
            });
        }

        const initData = tg.initData;
        document.getElementById('loader').classList.remove('hidden'); document.getElementById('loader-text').innerText = "Sedang mengirim...";
        const response = await fetch(NGROK_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ init_data: initData, svg_data: currentSvgCode })
        });
        if (response.ok) {
            if (tg && typeof tg.close === 'function') {
                tg.showAlert("Desain berhasil dikirim! Silakan kembali ke chat Bot untuk melihat hasilnya.", function() { tg.close(); });
            } else { alert("Desain berhasil dikirim! Silakan kembali ke chat Bot untuk melihat hasilnya."); }
        } else {
            const errData = await response.json();
            alert("Gagal mengirim: " + (errData.error || "Server Error"));
        }
    } catch(err) {
        alert("Gagal menghubungi server backend Ngrok. Detail: " + err.message);
    } finally {
        document.getElementById('loader').classList.add('hidden');
    }
}

window.onload = init;

function saveCurrentAsTemplate() {
    if (!tg || !tg.CloudStorage) return alert("Hanya berfungsi di dalam aplikasi Telegram.");
    
    let templateName = prompt("Masukkan nama untuk template ini (maks 20 huruf):", "Desain " + new Date().getHours() + ":" + new Date().getMinutes());
    if (!templateName || templateName.trim() === "") return;
    
    templateName = templateName.substring(0, 20).replace(/[^a-zA-Z0-9 ]/g, "");
    const key = `tpl_${Date.now()}_${templateName}`;
    
    const dataToSave = JSON.stringify(state);
    
    tg.CloudStorage.setItem(key, dataToSave, (err, success) => {
        if (err) {
            alert("Gagal menyimpan template.");
        } else {
            alert(`Template "${templateName}" berhasil disimpan!`);
        }
    });
}

function showTemplateList() {
    if (!tg || !tg.CloudStorage) return alert("Hanya berfungsi di dalam aplikasi Telegram.");
    
    const container = document.getElementById('template-list-container');
    container.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400">Memuat template...</p>';
    
    const modal = document.getElementById('template-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    tg.CloudStorage.getKeys((err, keys) => {
        if (err) {
            container.innerHTML = '<p class="text-red-500 text-sm">Gagal mengambil daftar template.</p>';
            return;
        }
        
        const templateKeys = keys.filter(k => k.startsWith('tpl_'));
        
        if (templateKeys.length === 0) {
            container.innerHTML = '<p class="text-sm text-gray-500 dark:text-gray-400">Anda belum memiliki template tersimpan.</p>';
            return;
        }
        
        container.innerHTML = '';
        
        templateKeys.forEach(key => {
            const parts = key.split('_');
            const displayName = parts.slice(2).join(' ') || "Template Tanpa Nama";
            
            const itemDiv = document.createElement('div');
            itemDiv.className = "flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded";
            
            const nameSpan = document.createElement('span');
            nameSpan.className = "text-sm font-semibold truncate flex-1 dark:text-white";
            nameSpan.innerText = displayName;
            
            const btnBox = document.createElement('div');
            btnBox.className = "flex gap-2 ml-2";
            
            const loadBtn = document.createElement('button');
            loadBtn.className = "bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1.5 rounded transition shadow-sm";
            loadBtn.innerText = "Pakai";
            loadBtn.onclick = () => loadTemplate(key);
            
            const delBtn = document.createElement('button');
            delBtn.className = "bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded transition shadow-sm";
            delBtn.innerText = "Hapus";
            delBtn.onclick = () => deleteTemplate(key, itemDiv);
            
            btnBox.appendChild(loadBtn);
            btnBox.appendChild(delBtn);
            itemDiv.appendChild(nameSpan);
            itemDiv.appendChild(btnBox);
            
            container.appendChild(itemDiv);
        });
    });
}

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
