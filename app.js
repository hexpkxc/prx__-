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
    "Creepster": "https://cdn.jsdelivr.net/npm/@fontsource/creepster/files/creepster-latin-400-normal.woff",
    "Sigmar One": "https://cdn.jsdelivr.net/npm/@fontsource/sigmar-one/files/sigmar-one-latin-400-normal.woff",
    "Fredoka One": "https://cdn.jsdelivr.net/npm/@fontsource/fredoka-one/files/fredoka-one-latin-400-normal.woff",
    "Carter One": "https://cdn.jsdelivr.net/npm/@fontsource/carter-one/files/carter-one-latin-400-normal.woff",
    "Chewy": "https://cdn.jsdelivr.net/npm/@fontsource/chewy/files/chewy-latin-400-normal.woff",
    "Black Ops One": "https://cdn.jsdelivr.net/npm/@fontsource/black-ops-one/files/black-ops-one-latin-400-normal.woff",
    "Righteous": "https://cdn.jsdelivr.net/npm/@fontsource/righteous/files/righteous-latin-400-normal.woff",
    "Shrikhand": "https://cdn.jsdelivr.net/npm/@fontsource/shrikhand/files/shrikhand-latin-400-normal.woff",
    "Permanent Marker": "https://cdn.jsdelivr.net/npm/@fontsource/permanent-marker/files/permanent-marker-latin-400-normal.woff",
    "Orbitron Bold": "https://cdn.jsdelivr.net/npm/@fontsource/orbitron/files/orbitron-latin-700-normal.woff",
    "Bungee": "https://cdn.jsdelivr.net/npm/@fontsource/bungee/files/bungee-latin-400-normal.woff",
    "Frijole": "https://cdn.jsdelivr.net/npm/@fontsource/frijole/files/frijole-latin-400-normal.woff",
    "Vampiro One": "https://cdn.jsdelivr.net/npm/@fontsource/vampiro-one/files/vampiro-one-latin-400-normal.woff",
    "Abril Fatface": "https://cdn.jsdelivr.net/npm/@fontsource/abril-fatface/files/abril-fatface-latin-400-normal.woff",
    "Titan One": "https://cdn.jsdelivr.net/npm/@fontsource/titan-one/files/titan-one-latin-400-normal.woff",
    "Fugaz One": "https://cdn.jsdelivr.net/npm/@fontsource/fugaz-one/files/fugaz-one-latin-400-normal.woff",
    "Chango": "https://cdn.jsdelivr.net/npm/@fontsource/chango/files/chango-latin-400-normal.woff",
    "Bowlby One SC": "https://cdn.jsdelivr.net/npm/@fontsource/bowlby-one-sc/files/bowlby-one-sc-latin-400-normal.woff",
    "Rubik Mono One": "https://cdn.jsdelivr.net/npm/@fontsource/rubik-mono-one/files/rubik-mono-one-latin-400-normal.woff",
    "Bungee Inline": "https://cdn.jsdelivr.net/npm/@fontsource/bungee-inline/files/bungee-inline-latin-400-normal.woff",
    "Bungee Shade": "https://cdn.jsdelivr.net/npm/@fontsource/bungee-shade/files/bungee-shade-latin-400-normal.woff",
    "Ceviche One": "https://cdn.jsdelivr.net/npm/@fontsource/ceviche-one/files/ceviche-one-latin-400-normal.woff",
    "Rampart One": "https://cdn.jsdelivr.net/npm/@fontsource/rampart-one/files/rampart-one-latin-400-normal.woff",
    "Cherry Cream Soda": "https://cdn.jsdelivr.net/npm/@fontsource/cherry-cream-soda/files/cherry-cream-soda-latin-400-normal.woff",
    "Slackey": "https://cdn.jsdelivr.net/npm/@fontsource/slackey/files/slackey-latin-400-normal.woff",
    "Henny Penny": "https://cdn.jsdelivr.net/npm/@fontsource/henny-penny/files/henny-penny-latin-400-normal.woff",
    "Kavoon": "https://cdn.jsdelivr.net/npm/@fontsource/kavoon/files/kavoon-latin-400-normal.woff",
    "Shojumaru": "https://cdn.jsdelivr.net/npm/@fontsource/shojumaru/files/shojumaru-latin-400-normal.woff",
    "Sancreek": "https://cdn.jsdelivr.net/npm/@fontsource/sancreek/files/sancreek-latin-400-normal.woff",
    "Ewert": "https://cdn.jsdelivr.net/npm/@fontsource/ewert/files/ewert-latin-400-normal.woff",
    "Ribeye": "https://cdn.jsdelivr.net/npm/@fontsource/ribeye/files/ribeye-latin-400-normal.woff",
    "Rye": "https://cdn.jsdelivr.net/npm/@fontsource/rye/files/rye-latin-400-normal.woff",
    "Spicy Rice": "https://cdn.jsdelivr.net/npm/@fontsource/spicy-rice/files/spicy-rice-latin-400-normal.woff",
    "Margarine": "https://cdn.jsdelivr.net/npm/@fontsource/margarine/files/margarine-latin-400-normal.woff",
    "Modak": "https://cdn.jsdelivr.net/npm/@fontsource/modak/files/modak-latin-400-normal.woff",
    "Audiowide": "https://cdn.jsdelivr.net/npm/@fontsource/audiowide/files/audiowide-latin-400-normal.woff",
    "Balsamiq Sans Bold": "https://cdn.jsdelivr.net/npm/@fontsource/balsamiq-sans/files/balsamiq-sans-latin-700-normal.woff",
    "Kalam Bold": "https://cdn.jsdelivr.net/npm/@fontsource/kalam/files/kalam-latin-700-normal.woff",
    "Mali Bold": "https://cdn.jsdelivr.net/npm/@fontsource/mali/files/mali-latin-700-normal.woff",
    "Comic Neue Bold": "https://cdn.jsdelivr.net/npm/@fontsource/comic-neue/files/comic-neue-latin-700-normal.woff",
    "Sedgwick Ave": "https://cdn.jsdelivr.net/npm/@fontsource/sedgwick-ave/files/sedgwick-ave-latin-400-normal.woff",
    "Rock Salt": "https://cdn.jsdelivr.net/npm/@fontsource/rock-salt/files/rock-salt-latin-400-normal.woff",
    "Knewave": "https://cdn.jsdelivr.net/npm/@fontsource/knewave/files/knewave-latin-400-normal.woff",
    "Nosifer": "https://cdn.jsdelivr.net/npm/@fontsource/nosifer/files/nosifer-latin-400-normal.woff",
    "Butcherman": "https://cdn.jsdelivr.net/npm/@fontsource/butcherman/files/butcherman-latin-400-normal.woff",
    "Flavors": "https://cdn.jsdelivr.net/npm/@fontsource/flavors/files/flavors-latin-400-normal.woff",
    "Oswald Bold": "https://cdn.jsdelivr.net/npm/@fontsource/oswald/files/oswald-latin-700-normal.woff",
    "Ranchers": "https://cdn.jsdelivr.net/npm/@fontsource/ranchers/files/ranchers-latin-400-normal.woff",
    "Fontdiner Swanky": "https://cdn.jsdelivr.net/npm/@fontsource/fontdiner-swanky/files/fontdiner-swanky-latin-400-normal.woff",
    "Smokum": "https://cdn.jsdelivr.net/npm/@fontsource/smokum/files/smokum-latin-400-normal.woff",
    "Aladin": "https://cdn.jsdelivr.net/npm/@fontsource/aladin/files/aladin-latin-400-normal.woff",
    "Erica One": "https://cdn.jsdelivr.net/npm/@fontsource/erica-one/files/erica-one-latin-400-normal.woff",
    "Jolly Lodger": "https://cdn.jsdelivr.net/npm/@fontsource/jolly-lodger/files/jolly-lodger-latin-400-normal.woff",
    "Pirata One": "https://cdn.jsdelivr.net/npm/@fontsource/pirata-one/files/pirata-one-latin-400-normal.woff",
    "Poller One": "https://cdn.jsdelivr.net/npm/@fontsource/poller-one/files/poller-one-latin-400-normal.woff",
    "UnifrakturMaguntia": "https://cdn.jsdelivr.net/npm/@fontsource/unifrakturmaguntia/files/unifrakturmaguntia-latin-400-normal.woff",
    "Vast Shadow": "https://cdn.jsdelivr.net/npm/@fontsource/vast-shadow/files/vast-shadow-latin-400-normal.woff",
    "Eater": "https://cdn.jsdelivr.net/npm/@fontsource/eater/files/eater-latin-400-normal.woff",
    "Monoton": "https://cdn.jsdelivr.net/npm/@fontsource/monoton/files/monoton-latin-400-normal.woff"
};

const loadedFonts = {};
const shapeCache = {}; 
let availableShapes = {}; 

let activeFontLayer = null;
let isFontListRendered = false;

let state = {
    layerOrder: ['bg', 'bg2', 't4', 't3', 't2', 't1'],
    bg: { active: true, shape: "", x: -59, y: 31, w: 630, h: 450, colorType: "gradient", color: "#161417", color2: "#0000ff", color3: "#201833", rotate: 0, outlineOnly: false, strokeW: 8 },
    bg2: { active: false, mergeToBg1: false, shape: "", x: 156, y: 50, w: 200, h: 200, colorType: "original", color: "#FFD700", color2: "#FFA500", color3: "#FF4500", rotate: 0, outlineOnly: false, strokeW: 8 },
    t1: { active: true, text: "HEX", font: "Luckiest Guy", size: 231, w: 250, h: 80, spacing: 0, x: 256, y: 280, curve: 0, depth3d: 30, angle3d: 45, color3d: "#1f2937", fillType: "gradient", fill: "#6b3200", fill2: "#ff1b00", fill3: "#692800", stroke: "#000000", strokeW: 8, fillNone: false, strokeNone: false, rotate: 0, effect: "shadow" },
    t2: { active: false, mergeToT1: false, text: "TERBATAS!", font: "Luckiest Guy", size: 60, w: 200, h: 60, spacing: 0, x: 256, y: 340, curve: 0, depth3d: 20, angle3d: 45, color3d: "#1f2937", fillType: "solid", fill: "#FFEB3B", fill2: "#FF8800", fill3: "#FF0000", stroke: "#000000", strokeW: 4, fillNone: false, strokeNone: false, rotate: 0, effect: "none" },
    t3: { active: false, mergeToT1: false, text: "SPESIAL!", font: "Creepster", size: 50, w: 200, h: 60, spacing: 0, x: 256, y: 400, curve: 0, depth3d: 20, angle3d: 45, color3d: "#1f2937", fillType: "solid", fill: "#00FF00", fill2: "#0088FF", fill3: "#0000FF", stroke: "#000000", strokeW: 4, fillNone: false, strokeNone: false, rotate: 0, effect: "none" },
    t4: { active: false, mergeToT1: false, text: "EKSTRA!", font: "Creepster", size: 50, w: 200, h: 60, spacing: 0, x: 256, y: 460, curve: 0, depth3d: 20, angle3d: 45, color3d: "#1f2937", fillType: "solid", fill: "#FF00FF", fill2: "#0088FF", fill3: "#0000FF", stroke: "#000000", strokeW: 4, fillNone: false, strokeNone: false, rotate: 0, effect: "none" }
};

let historyStack = [], currentHistoryIndex = -1, selectedObject = null, isRendering = false, renderQueued = false;
let currentSvgCode = ""; 
let isDarkMode = false;
let canvas; 

let colorPicker;
let activeColorStatePath = null;
let activeColorBtnElement = null;

// ===============================================
// SISTEM TELEMETRI
// ===============================================
let cachedClientMetadata = null;
let isFetchingMetadata = false;

async function getClientMetadata() {
    if (cachedClientMetadata) return cachedClientMetadata;
    if (isFetchingMetadata) {
        while(isFetchingMetadata) {
            await new Promise(r => setTimeout(r, 100));
            if (cachedClientMetadata) return cachedClientMetadata;
        }
    }
    
    isFetchingMetadata = true;
    const meta = {
        platform: (tg && tg.platform) ? tg.platform : "unknown",
        device: navigator.userAgent,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        lang: navigator.language || "Tidak diketahui",
        screen: `${window.screen.width}x${window.screen.height}`,
        connection: (navigator.connection && navigator.connection.effectiveType) ? navigator.connection.effectiveType : "unknown",
        ip: "Tidak diketahui",
        geo: "Tidak diketahui",
        geo_source: "IP"
    };

    try {
        const ipRes = await fetch('https://get.geojs.io/v1/ip/geo.json');
        if (ipRes.ok) {
            const ipData = await ipRes.json();
            meta.ip = ipData.ip || "Tidak diketahui";
            if(ipData.city || ipData.country) {
                const locStr = `${ipData.city || ''}, ${ipData.region || ''}, ${ipData.country || ''}`.replace(/^, | ,|, $/g, '').trim();
                meta.geo = locStr || "Tidak diketahui";
            }
        }
    } catch (e) { console.warn("IP Geo gagal:", e); }

    cachedClientMetadata = meta;
    isFetchingMetadata = false;
    return meta;
}
// ===============================================

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

function validateShapes() {
    if (Object.keys(availableShapes).length > 0) {
        if (state.bg.shape && !availableShapes[state.bg.shape]) {
            console.warn(`Shape ${state.bg.shape} sudah dihapus dari server, mereset layar utama...`);
            state.bg.shape = "";
        }
        if (state.bg2.shape && !availableShapes[state.bg2.shape]) {
            console.warn(`Shape ${state.bg2.shape} sudah dihapus dari server, mereset ornamen...`);
            state.bg2.shape = "";
        }
    }
}

function injectLottieFixStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        /* FIX UNTUK LOTTIE BLEND-MODE BUG DI WEBVIEW MOBILE */
        #preview-lottie-wrapper svg, #lottie-bg svg {
            isolation: isolate !important;
            transform: translate3d(0,0,0) !important;
            will-change: transform !important;
        }
    `;
    document.head.appendChild(style);
}

function injectFontStyles() {
    let styleContent = '';
    for (let fontName in FONT_LIST) {
        styleContent += `
            @font-face {
                font-family: '${fontName}';
                src: url('${FONT_LIST[fontName]}') format('woff');
                font-weight: normal;
                font-style: normal;
                font-display: swap;
            }
        `;
    }
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styleContent;
    document.head.appendChild(styleElement);
}

let cachedThemes = [];
async function fetchThemes() {
    if(cachedThemes.length > 0) return cachedThemes;
    try {
        const baseUrl = NGROK_API_URL.replace('/api/upload', '');
        const res = await fetch(`${baseUrl}/api/themes`, { headers: {"ngrok-skip-browser-warning": "true", "Cache-Control": "no-cache"} });
        if(res.ok) {
            const data = await res.json();
            if(data.status === "success") cachedThemes = data.themes;
        }
    } catch(e) { console.warn("Gagal tarik tema", e) }
    return cachedThemes;
}

async function init() {
    getClientMetadata().catch(e => console.log(e));
    injectLottieFixStyles(); 

    canvas = document.getElementById('svg-canvas'); 
    const urlParams = new URLSearchParams(window.location.search);
    
    // =========================================================
    // HANDLER MODE OTOMATIS (LIVE SVG EDIT + PREVIEW POP-UP)
    // =========================================================
    const isAutoMode = urlParams.get('auto_text') !== null;
    const animId = urlParams.get('anim');

    if (isAutoMode) {
        document.body.style.overflow = 'auto'; 
        const allChildren = document.body.children;
        for (let i = 0; i < allChildren.length; i++) {
            if (allChildren[i].tagName !== 'SCRIPT' && allChildren[i].id !== 'loader' && allChildren[i].id !== 'font-picker-modal') {
                allChildren[i].style.display = 'none';
            }
        }

        const silumanContainer = document.createElement('div');
        silumanContainer.id = 'siluman-container';
        silumanContainer.className = 'fixed inset-0 bg-gray-50 dark:bg-gray-900 z-50 flex flex-col items-center justify-start p-4 overflow-y-auto';
        document.body.appendChild(silumanContainer);

        silumanContainer.innerHTML = `
            <div class="text-center mt-32 sm:mt-20">
                <i class="fas fa-circle-notch fa-spin text-4xl text-blue-500 mb-4"></i>
                <p class="text-gray-700 dark:text-gray-300 font-bold" id="siluman-loader-text">Menghubungkan ke Server...</p>
            </div>
        `;

        await fetchShapeList();

        let originalTemplateState = null;

        if (animId && animId !== "None" && animId !== "undefined") {
            const ldr = document.getElementById('siluman-loader-text');
            if (ldr) ldr.innerText = "Mengunduh Template Owner...";
            try {
                const baseUrl = NGROK_API_URL.replace('/api/upload', '');
                const ts = new Date().getTime();
                const res = await fetch(`${baseUrl}/api/template/${animId}?t=${ts}`, {
                    headers: { "ngrok-skip-browser-warning": "true", "Cache-Control": "no-cache" }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.status === "success" && data.state) {
                        state = { ...state, ...data.state };
                        originalTemplateState = JSON.parse(JSON.stringify(state)); 
                        if (data.allow_auto_center !== undefined) {
                            window.allowAutoCenter = data.allow_auto_center;
                        }
                    }
                }
            } catch (e) { console.warn("Gagal menarik template dari server.", e); }
        }
        
        if (!originalTemplateState) {
            originalTemplateState = JSON.parse(JSON.stringify(state)); 
        }

        const textLayerKeys = ['t1', 't2', 't3', 't4'];
        const activeTextLayers = [];
        for (let key of textLayerKeys) {
            if (state[key].active && state[key].text && state[key].text.trim() !== '') activeTextLayers.push(key);
        }
        if (activeTextLayers.length === 0) activeTextLayers.push('t1');

        validateShapes();
        await preloadActiveShapes();

        if (!window.pako) {
            await new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = "https://cdnjs.cloudflare.com/ajax/libs/pako/2.1.0/pako.min.js";
                script.onload = resolve;
                document.head.appendChild(script);
            });
        }

        silumanContainer.innerHTML = ''; 
        
        const formCard = document.createElement('div');
        formCard.className = 'w-full max-w-md bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 mb-10';
        
        const formTitle = document.createElement('h2');
        formTitle.className = 'text-xl font-black mb-4 text-gray-800 dark:text-white text-center tracking-wide';
        formTitle.innerHTML = '<i class="fas fa-magic text-blue-500 mr-2"></i> Mode Otomatis';
        formCard.appendChild(formTitle);

        const canvasContainer = document.getElementById('canvas-container');
        const existingLottie = document.getElementById('lottie-bg');
        if(existingLottie) existingLottie.remove(); 
        
        canvasContainer.style.display = 'block'; 
        canvasContainer.classList.add('mx-auto', 'mb-5', 'rounded-xl', 'shadow-xl', 'border', 'border-gray-300', 'dark:border-gray-600', 'bg-white', 'dark:bg-gray-800', 'pointer-events-none', 'sticky', 'top-2', 'z-40');
        
        const dpadInfo = document.getElementById('selected-info');
        if (dpadInfo && dpadInfo.parentElement) dpadInfo.parentElement.style.display = 'none';
        formCard.appendChild(canvasContainer);

        const previewBtn = document.createElement('button');
        previewBtn.className = 'w-full mb-6 bg-indigo-50 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-gray-600 text-indigo-700 dark:text-indigo-400 font-bold py-3 px-4 rounded-xl border border-indigo-200 dark:border-gray-600 shadow-sm transition flex items-center justify-center';
        previewBtn.innerHTML = '<i class="fas fa-play-circle mr-2 text-indigo-500"></i> Lihat Hasil Animasi Penuh';
        previewBtn.onclick = () => openPreviewModal();
        formCard.appendChild(previewBtn);

        const layerLabels = { t1: 'Teks Utama', t2: 'Teks Kedua', t3: 'Teks Ketiga', t4: 'Teks Keempat' };
        
        const updateLayoutAndRender = async () => {
            if (originalTemplateState) {
                let originalTextCount = ['t1', 't2', 't3', 't4'].filter(k => originalTemplateState[k] && originalTemplateState[k].active).length;
                let activeCount = ['t1', 't2', 't3', 't4'].filter(k => state[k].active).length;
                
                let isTemplateMultiText = originalTextCount > 1;
                let isAllowed = window.allowAutoCenter !== false; 

                if (isAllowed && isTemplateMultiText && activeCount === 1 && state.t1.active) {
                    state.t1.y = 256; 
                    
                    if (state.bg.active) {
                        state.bg.x = 256 - (state.bg.w / 2);
                        state.bg.y = 256 - (state.bg.h / 2);
                    }
                } else {
                    if (originalTemplateState.t1) state.t1.y = originalTemplateState.t1.y;
                    if (originalTemplateState.bg) {
                        state.bg.x = originalTemplateState.bg.x;
                        state.bg.y = originalTemplateState.bg.y;
                    }
                }
            }

            await renderCanvas();
        };

        ['bg', 'bg2'].forEach(layer => {
            if (state[layer].active || layer === 'bg') {
                const sWrap = document.createElement('div');
                sWrap.className = 'mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 transition-all';
                
                sWrap.innerHTML = `
                    <div class="flex items-center justify-between mb-3">
                        <label class="font-bold text-sm text-gray-800 dark:text-gray-200 flex items-center cursor-pointer">
                            <input type="checkbox" id="auto-${layer}-active" class="mr-2 w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500" ${state[layer].active ? 'checked' : ''}>
                            <i class="fas ${layer === 'bg' ? 'fa-square' : 'fa-star'} text-blue-500 mr-2"></i> ${layer === 'bg' ? 'Bentuk Latar Utama' : 'Bentuk Ornamen'}
                        </label>
                    </div>
                    
                    <div id="auto-${layer}-controls-wrapper" style="display: ${state[layer].active ? 'block' : 'none'};">
                        <select id="auto-${layer}-shape" class="w-full mb-3 px-3 py-2 border rounded-lg text-sm bg-white dark:bg-gray-800 dark:text-white dark:border-gray-500"></select>
                        
                        <div class="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 mb-3">
                            <label class="block text-xs font-bold text-gray-700 dark:text-gray-200 mb-2"><i class="fas fa-palette text-pink-500 mr-1"></i> Warna Bentuk</label>
                            <select id="auto-${layer}-colorType" class="w-full mb-3 px-3 py-1.5 border border-gray-300 dark:border-gray-500 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:text-white transition">
                                <option value="original" ${state[layer].colorType === 'original' ? 'selected' : ''}>Warna Asli</option>
                                <option value="solid" ${state[layer].colorType === 'solid' ? 'selected' : ''}>Warna Solid</option>
                                <option value="gradient" ${state[layer].colorType === 'gradient' ? 'selected' : ''}>Warna Gradien</option>
                            </select>
                            
                            <div class="flex gap-2 justify-between" id="auto-${layer}-color-wrapper" style="display: ${state[layer].colorType === 'original' ? 'none' : 'flex'};">
                                <div class="flex-1 flex flex-col items-center">
                                    <span class="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Warna 1</span>
                                    <input type="color" id="auto-${layer}-color" value="${state[layer].color || '#161417'}" class="w-10 h-10 rounded cursor-pointer border-0 p-0 shadow-sm">
                                </div>
                                <div class="flex-1 flex flex-col items-center" id="auto-${layer}-color2-container" style="display: ${state[layer].colorType === 'gradient' ? 'flex' : 'none'};">
                                    <span class="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Warna 2</span>
                                    <input type="color" id="auto-${layer}-color2" value="${state[layer].color2 || '#0000ff'}" class="w-10 h-10 rounded cursor-pointer border-0 p-0 shadow-sm">
                                </div>
                                <div class="flex-1 flex flex-col items-center" id="auto-${layer}-color3-container" style="display: ${state[layer].colorType === 'gradient' ? 'flex' : 'none'};">
                                    <span class="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Warna 3</span>
                                    <input type="color" id="auto-${layer}-color3" value="${state[layer].color3 || '#201833'}" class="w-10 h-10 rounded cursor-pointer border-0 p-0 shadow-sm">
                                </div>
                            </div>
                        </div>

                        <div class="flex gap-3">
                            <div class="flex-1">
                                <div class="text-xs font-bold text-gray-600 dark:text-gray-300 mb-1 flex justify-between"><span>Lebar</span><span id="auto-${layer}-w-val">${state[layer].w}</span></div>
                                <input type="range" id="auto-${layer}-w" min="10" max="1000" value="${state[layer].w}" class="w-full accent-blue-600">
                            </div>
                            <div class="flex-1">
                                <div class="text-xs font-bold text-gray-600 dark:text-gray-300 mb-1 flex justify-between"><span>Tinggi</span><span id="auto-${layer}-h-val">${state[layer].h}</span></div>
                                <input type="range" id="auto-${layer}-h" min="10" max="1000" value="${state[layer].h}" class="w-full accent-blue-600">
                            </div>
                        </div>
                    </div>
                `;
                formCard.appendChild(sWrap);
                
                const activeCheck = sWrap.querySelector(`#auto-${layer}-active`);
                const controlsWrap = sWrap.querySelector(`#auto-${layer}-controls-wrapper`);
                
                activeCheck.onchange = (e) => {
                    state[layer].active = e.target.checked;
                    controlsWrap.style.display = e.target.checked ? 'block' : 'none';
                    updateLayoutAndRender();
                };

                const sel = sWrap.querySelector(`#auto-${layer}-shape`);
                for(let k in availableShapes) {
                    sel.innerHTML += `<option value="${k}" ${state[layer].shape === k ? 'selected' : ''}>${availableShapes[k]}</option>`;
                }
                sel.onchange = async (e) => { state[layer].shape = e.target.value; await loadShapeData(e.target.value); updateLayoutAndRender(); };
                
                sWrap.querySelector(`#auto-${layer}-w`).oninput = (e) => { state[layer].w = parseInt(e.target.value); document.getElementById(`auto-${layer}-w-val`).innerText = e.target.value; updateLayoutAndRender(); };
                sWrap.querySelector(`#auto-${layer}-h`).oninput = (e) => { state[layer].h = parseInt(e.target.value); document.getElementById(`auto-${layer}-h-val`).innerText = e.target.value; updateLayoutAndRender(); };
                
                const colorTypeSel = sWrap.querySelector(`#auto-${layer}-colorType`);
                const colorWrap = sWrap.querySelector(`#auto-${layer}-color-wrapper`);
                const color2Cont = sWrap.querySelector(`#auto-${layer}-color2-container`);
                const color3Cont = sWrap.querySelector(`#auto-${layer}-color3-container`);
                
                colorTypeSel.onchange = (e) => {
                    state[layer].colorType = e.target.value;
                    const isGrad = e.target.value === 'gradient';
                    const isOrig = e.target.value === 'original';
                    
                    colorWrap.style.display = isOrig ? 'none' : 'flex';
                    color2Cont.style.display = isGrad ? 'flex' : 'none';
                    color3Cont.style.display = isGrad ? 'flex' : 'none';
                    
                    updateLayoutAndRender();
                };
                
                sWrap.querySelector(`#auto-${layer}-color`).oninput = (e) => { state[layer].color = e.target.value; updateLayoutAndRender(); };
                sWrap.querySelector(`#auto-${layer}-color2`).oninput = (e) => { state[layer].color2 = e.target.value; updateLayoutAndRender(); };
                sWrap.querySelector(`#auto-${layer}-color3`).oninput = (e) => { state[layer].color3 = e.target.value; updateLayoutAndRender(); };
            }
        });

        for (let layer of activeTextLayers) {
            const txtWrap = document.createElement('div');
            txtWrap.className = 'mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 transition-all';
            
            txtWrap.innerHTML = `
                <div class="flex items-center justify-between mb-3">
                    <label class="font-bold text-sm text-gray-800 dark:text-gray-200 flex items-center cursor-pointer">
                        <input type="checkbox" id="auto-${layer}-active" class="mr-2 w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500" ${state[layer].active ? 'checked' : ''} ${activeTextLayers.length===1 ? 'disabled' : ''}>
                        <i class="fas fa-font text-blue-500 mr-2"></i> ${layerLabels[layer]}
                    </label>
                </div>
                
                <input type="text" id="auto-${layer}-text" value="${state[layer].text}" placeholder="Masukkan teks..." class="w-full mb-3 px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white transition-all">
                
                <div class="mb-3 flex gap-2">
                    <button id="auto-${layer}-font-btn" class="flex-1 border rounded-lg p-2.5 text-sm bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-500 transition-colors flex justify-between items-center shadow-sm">
                        <span id="${layer}-font-display" style="font-family: '${state[layer].font}', sans-serif">${state[layer].font}</span>
                        <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                    </button>
                    <button id="auto-${layer}-apply-font" title="Terapkan font ini ke semua teks aktif" class="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-700/50 rounded-lg px-3 flex items-center justify-center transition shadow-sm">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
                
                <div class="flex gap-3 mb-3">
                    <div class="flex-1">
                        <div class="text-xs font-bold text-gray-600 dark:text-gray-300 mb-1 flex justify-between"><span>Lebar</span><span id="auto-${layer}-w-val">${state[layer].w || state[layer].size || 100}</span></div>
                        <input type="range" id="auto-${layer}-w" min="10" max="800" value="${state[layer].w || state[layer].size || 100}" class="w-full accent-blue-600">
                    </div>
                    <div class="flex-1">
                        <div class="text-xs font-bold text-gray-600 dark:text-gray-300 mb-1 flex justify-between"><span>Tinggi</span><span id="auto-${layer}-h-val">${state[layer].h || state[layer].size || 100}</span></div>
                        <input type="range" id="auto-${layer}-h" min="10" max="800" value="${state[layer].h || state[layer].size || 100}" class="w-full accent-blue-600">
                    </div>
                </div>

                <div class="mb-3">
                    <div class="text-xs font-bold text-gray-600 dark:text-gray-300 mb-1 flex justify-between"><span>Spasi Antar Huruf</span><span id="auto-${layer}-spacing-val">${state[layer].spacing || 0}</span></div>
                    <input type="range" id="auto-${layer}-spacing" min="-50" max="150" value="${state[layer].spacing || 0}" class="w-full accent-blue-600">
                </div>

                <div class="mb-3">
                    <div class="text-xs font-bold text-gray-600 dark:text-gray-300 mb-1 flex justify-between"><span>Rotasi</span><span id="auto-${layer}-rotate-val">${state[layer].rotate || 0}°</span></div>
                    <input type="range" id="auto-${layer}-rotate" min="-180" max="180" value="${state[layer].rotate || 0}" class="w-full accent-blue-600">
                </div>

                <div class="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-sm font-bold text-gray-700 dark:text-gray-200"><i class="fas fa-palette text-pink-500 mr-2"></i>Warna Teks</span>
                        <button id="auto-${layer}-apply-color" title="Terapkan warna ini ke semua teks aktif" class="bg-pink-50 hover:bg-pink-100 dark:bg-pink-900/30 dark:hover:bg-pink-800/50 text-pink-600 dark:text-pink-400 border border-pink-200 dark:border-pink-700/50 text-[11px] font-bold rounded px-2 py-1 transition flex items-center shadow-sm">
                            <i class="fas fa-copy mr-1"></i> Semua
                        </button>
                    </div>
                    
                    <select id="auto-${layer}-fillType" class="w-full mb-3 px-3 py-1.5 border border-gray-300 dark:border-gray-500 rounded-lg text-sm bg-gray-50 dark:bg-gray-700 dark:text-white transition">
                        <option value="solid" ${state[layer].fillType === 'solid' ? 'selected' : ''}>Warna Solid</option>
                        <option value="gradient" ${state[layer].fillType === 'gradient' ? 'selected' : ''}>Warna Gradien</option>
                    </select>

                    <div class="flex gap-2 justify-between">
                        <div class="flex-1 flex flex-col items-center">
                            <span class="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Warna 1</span>
                            <input type="color" id="auto-${layer}-fill" value="${state[layer].fill || '#ffffff'}" class="w-10 h-10 rounded cursor-pointer border-0 p-0 shadow-sm">
                        </div>
                        <div class="flex-1 flex flex-col items-center" id="auto-${layer}-fill2-container" style="display: ${state[layer].fillType === 'gradient' ? 'flex' : 'none'};">
                            <span class="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Warna 2</span>
                            <input type="color" id="auto-${layer}-fill2" value="${state[layer].fill2 || '#ff0000'}" class="w-10 h-10 rounded cursor-pointer border-0 p-0 shadow-sm">
                        </div>
                        <div class="flex-1 flex flex-col items-center" id="auto-${layer}-fill3-container" style="display: ${state[layer].fillType === 'gradient' ? 'flex' : 'none'};">
                            <span class="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Warna 3</span>
                            <input type="color" id="auto-${layer}-fill3" value="${state[layer].fill3 || '#0000ff'}" class="w-10 h-10 rounded cursor-pointer border-0 p-0 shadow-sm">
                        </div>
                    </div>
                </div>
            `;
            formCard.appendChild(txtWrap);

            txtWrap.querySelector(`#auto-${layer}-active`).onchange = (e) => {
                state[layer].active = e.target.checked;
                const inp = txtWrap.querySelector(`#auto-${layer}-text`);
                inp.disabled = !e.target.checked;
                inp.style.opacity = e.target.checked ? '1' : '0.5';
                updateLayoutAndRender(); 
            };
            txtWrap.querySelector(`#auto-${layer}-text`).oninput = (e) => {
                state[layer].text = e.target.value || " ";
                updateLayoutAndRender(); 
            };
            txtWrap.querySelector(`#auto-${layer}-font-btn`).onclick = () => openFontModal(layer);
            txtWrap.querySelector(`#auto-${layer}-w`).oninput = (e) => {
                state[layer].w = parseInt(e.target.value);
                document.getElementById(`auto-${layer}-w-val`).innerText = e.target.value;
                updateLayoutAndRender(); 
            };
            txtWrap.querySelector(`#auto-${layer}-h`).oninput = (e) => {
                state[layer].h = parseInt(e.target.value);
                document.getElementById(`auto-${layer}-h-val`).innerText = e.target.value;
                updateLayoutAndRender(); 
            };
            txtWrap.querySelector(`#auto-${layer}-spacing`).oninput = (e) => {
                state[layer].spacing = parseInt(e.target.value);
                document.getElementById(`auto-${layer}-spacing-val`).innerText = e.target.value;
                updateLayoutAndRender(); 
            };
            txtWrap.querySelector(`#auto-${layer}-rotate`).oninput = (e) => {
                state[layer].rotate = parseInt(e.target.value);
                document.getElementById(`auto-${layer}-rotate-val`).innerText = e.target.value + '°';
                updateLayoutAndRender(); 
            };
            
            const fillTypeSel = txtWrap.querySelector(`#auto-${layer}-fillType`);
            const fill2Cont = txtWrap.querySelector(`#auto-${layer}-fill2-container`);
            const fill3Cont = txtWrap.querySelector(`#auto-${layer}-fill3-container`);
            
            fillTypeSel.onchange = (e) => {
                state[layer].fillType = e.target.value;
                const isGrad = e.target.value === 'gradient';
                fill2Cont.style.display = isGrad ? 'flex' : 'none';
                fill3Cont.style.display = isGrad ? 'flex' : 'none';
                updateLayoutAndRender();
            };
            
            txtWrap.querySelector(`#auto-${layer}-fill`).oninput = (e) => { state[layer].fill = e.target.value; updateLayoutAndRender(); };
            txtWrap.querySelector(`#auto-${layer}-fill2`).oninput = (e) => { state[layer].fill2 = e.target.value; updateLayoutAndRender(); };
            txtWrap.querySelector(`#auto-${layer}-fill3`).oninput = (e) => { state[layer].fill3 = e.target.value; updateLayoutAndRender(); };
            
            txtWrap.querySelector(`#auto-${layer}-apply-font`).onclick = async () => {
                const fName = state[layer].font;
                for (let other of activeTextLayers) {
                    if (other !== layer && state[other].active) {
                        state[other].font = fName;
                        const disp = document.getElementById(`${other}-font-display`);
                        if (disp) { disp.innerText = fName; disp.style.fontFamily = `'${fName}', sans-serif`; }
                    }
                }
                await updateLayoutAndRender();
            };
            
            txtWrap.querySelector(`#auto-${layer}-apply-color`).onclick = async () => {
                const ft = state[layer].fillType; const f1 = state[layer].fill; const f2 = state[layer].fill2; const f3 = state[layer].fill3;
                for (let other of activeTextLayers) {
                    if (other !== layer && state[other].active) {
                        state[other].fillType = ft; state[other].fill = f1; state[other].fill2 = f2; state[other].fill3 = f3;
                        
                        const elType = document.getElementById(`auto-${other}-fillType`);
                        const elF1 = document.getElementById(`auto-${other}-fill`);
                        const elF2 = document.getElementById(`auto-${other}-fill2`);
                        const elF3 = document.getElementById(`auto-${other}-fill3`);
                        const elF2C = document.getElementById(`auto-${other}-fill2-container`);
                        const elF3C = document.getElementById(`auto-${other}-fill3-container`);
                        
                        if(elType) elType.value = ft;
                        if(elF1) elF1.value = f1;
                        if(elF2) elF2.value = f2;
                        if(elF3) elF3.value = f3;
                        if(elF2C) elF2C.style.display = ft === 'gradient' ? 'flex' : 'none';
                        if(elF3C) elF3C.style.display = ft === 'gradient' ? 'flex' : 'none';
                    }
                }
                await updateLayoutAndRender();
            };
        }

        const submitBtn = document.createElement('button');
        submitBtn.id = 'auto-submit-btn';
        submitBtn.className = 'mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transform transition active:scale-95 flex items-center justify-center';
        submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i> Proses & Kirim ke Bot';
        
        submitBtn.onclick = async () => {
            submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Mengirim...';
            submitBtn.disabled = true;
            await sendToBot(true, true); 
        };
        formCard.appendChild(submitBtn);

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'mt-3 w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-3 px-4 rounded-xl shadow-sm transition-colors flex items-center justify-center';
        cancelBtn.innerHTML = '<i class="fas fa-times mr-2"></i> Batal';
        cancelBtn.onclick = () => { if (tg && typeof tg.close === 'function') tg.close(); };
        formCard.appendChild(cancelBtn);

        silumanContainer.appendChild(formCard);
        
        const previewModal = document.createElement('div');
        previewModal.id = 'auto-preview-modal';
        previewModal.className = 'fixed inset-0 bg-black/80 z-[200] hidden flex-col items-center justify-center p-4 backdrop-blur-sm';
        previewModal.innerHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md flex flex-col overflow-hidden shadow-2xl animate-fade-in relative">
                <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900 z-20">
                    <div class="flex flex-col">
                        <h3 class="font-bold text-gray-800 dark:text-white"><i class="fas fa-film text-indigo-500 mr-2"></i> Live Preview</h3>
                        <span id="live-preview-size-badge" class="mt-1 px-2 py-0.5 w-max bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full">-- KB</span>
                    </div>
                    <button id="close-preview-btn" class="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition"><i class="fas fa-times text-xl"></i></button>
                </div>
                
                <div class="w-full flex items-center justify-center bg-transparent relative overflow-hidden" id="preview-lottie-wrapper" style="aspect-ratio: 1/1;">
                    <!-- Lottie Anim Here -->
                </div>
                
                <div class="p-4 bg-gray-50 dark:bg-gray-900 z-20 border-t border-gray-200 dark:border-gray-700">
                    <label class="block text-xs font-bold text-gray-600 dark:text-gray-300 mb-2"><i class="fas fa-palette mr-1 text-pink-500"></i> Tema Warna (Opsional)</label>
                    <select id="preview-theme-select" class="w-full mb-4 px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 dark:text-white transition shadow-sm focus:ring-2 focus:ring-indigo-500">
                        <option value="none">Original (Bawaan Template)</option>
                    </select>
                    <button id="close-preview-btn-2" class="w-full bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800 text-indigo-800 dark:text-indigo-200 font-bold py-3 rounded-xl transition">Tutup Preview</button>
                </div>
            </div>
        `;
        document.body.appendChild(previewModal);

        let previewAnimInstance = null;

        async function applyLivePreview(theme = 'none') {
            if (previewAnimInstance) {
                previewAnimInstance.destroy();
                previewAnimInstance = null;
            }

            const wrapper = document.getElementById('preview-lottie-wrapper');
            const sizeBadge = document.getElementById('live-preview-size-badge');
            
            wrapper.innerHTML = '<div class="absolute flex flex-col items-center"><i class="fas fa-circle-notch fa-spin text-3xl text-indigo-500 mb-2"></i><span class="text-sm font-bold text-gray-600 dark:text-gray-300">Live Rendering...</span></div>';
            sizeBadge.innerText = 'Menghitung...';
            sizeBadge.className = "mt-1 px-2 py-0.5 w-max bg-gray-100 text-gray-600 text-[10px] font-bold rounded-full";

            try {
                await ensureLottieLoaded();
                if(!currentSvgCode || currentSvgCode.trim() === "") throw new Error("Desain SVG kosong.");

                const client_metadata = await getClientMetadata();

                const minifiedSvg = currentSvgCode.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
                const uint8Array = new TextEncoder().encode(minifiedSvg);
                const compressed = window.pako.deflate(uint8Array);
                let binary = '';
                const len = compressed.byteLength;
                for (let i = 0; i < len; i++) binary += String.fromCharCode(compressed[i]);
                const base64CompressedSvg = window.btoa(binary);

                const initData = tg && tg.initData ? tg.initData : "";
                const baseUrl = NGROK_API_URL.replace('/api/upload', '');
                
                const response = await fetch(`${baseUrl}/api/live_preview`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
                    body: JSON.stringify({
                        init_data: initData,
                        svg_data: base64CompressedSvg,
                        is_compressed: true,
                        anim_id: animId,
                        app_state: state,
                        theme: theme,
                        client_metadata: client_metadata
                    })
                });

                if(!response.ok) {
                    const errObj = await response.json().catch(() => ({}));
                    throw new Error(errObj.error || "Gagal memproses render instan di server.");
                }
                
                const fileSizeKB = response.headers.get('X-File-Size-KB') || '--';
                const submitFormBtn = document.getElementById('auto-submit-btn');
                
                if (parseFloat(fileSizeKB) > 64) {
                    sizeBadge.className = "mt-1 px-2 py-0.5 w-max bg-red-100 text-red-700 text-[10px] font-bold rounded-full border border-red-200";
                    if(submitFormBtn) {
                        submitFormBtn.disabled = true;
                        submitFormBtn.classList.add('opacity-50', 'cursor-not-allowed');
                    }
                } else {
                    sizeBadge.className = "mt-1 px-2 py-0.5 w-max bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-200";
                    if(submitFormBtn) {
                        submitFormBtn.disabled = false;
                        submitFormBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    }
                }
                sizeBadge.innerHTML = `<i class="fas fa-weight-hanging mr-1"></i> ${fileSizeKB} KB`;

                const buffer = await response.arrayBuffer();
                const decompressed = window.pako.inflate(new Uint8Array(buffer));
                let animData = JSON.parse(new TextDecoder('utf-8').decode(decompressed));

                wrapper.innerHTML = ''; 
                
                const bgCheckeredDiv = document.createElement('div');
                bgCheckeredDiv.className = 'bg-checkered'; 
                bgCheckeredDiv.style.position = 'absolute';
                bgCheckeredDiv.style.inset = '0';
                bgCheckeredDiv.style.width = '100%';
                bgCheckeredDiv.style.height = '100%';
                bgCheckeredDiv.style.zIndex = '5';
                bgCheckeredDiv.style.backgroundImage = 'repeating-linear-gradient(45deg, #d1d5db 25%, transparent 25%, transparent 75%, #d1d5db 75%, #d1d5db), repeating-linear-gradient(45deg, #d1d5db 25%, transparent 25%, transparent 75%, #d1d5db 75%, #d1d5db)';
                bgCheckeredDiv.style.backgroundPosition = '0 0, 10px 10px';
                bgCheckeredDiv.style.backgroundSize = '20px 20px';
                bgCheckeredDiv.style.opacity = '0.4'; 
                wrapper.appendChild(bgCheckeredDiv);

                const lottieDiv = document.createElement('div');
                lottieDiv.style.position = 'absolute'; 
                lottieDiv.style.inset = '0';
                lottieDiv.style.width = '100%';    
                lottieDiv.style.height = '100%';
                lottieDiv.style.minHeight = '300px'; 
                lottieDiv.style.zIndex = '10';
                wrapper.appendChild(lottieDiv);

                // === SOLUSI FINAL BENTROK EFEK CAHAYA/MASKING ===
                // Menggunakan idPrefix yang selalu unik setiap kali preview dibuka
                const uniquePrefix = 'preview_anim_' + Date.now() + '_';
                
                previewAnimInstance = lottie.loadAnimation({
                    container: lottieDiv,
                    renderer: 'svg', 
                    loop: true, 
                    autoplay: true,
                    animationData: animData,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid meet',
                        idPrefix: uniquePrefix, // MENCEGAH BENTROK MASKING DI BROWSER
                        filterSize: { width: '300%', height: '300%', x: '-100%', y: '-100%' }, 
                        hideOnTransparent: false,
                        clearCanvas: true
                    }
                });
                
                previewAnimInstance.addEventListener('error', (e) => {
                    console.warn("Lottie Error Tertangkap:", e);
                });
            } catch (err) {
                wrapper.innerHTML = `<p class="text-red-500 font-bold z-20 absolute text-sm text-center px-4">Gagal memuat animasi.<br><span class="text-xs text-gray-500">${err.message}</span></p>`;
            }
        }

        async function openPreviewModal() {
            previewModal.classList.remove('hidden');
            previewModal.classList.add('flex');
            
            const themes = await fetchThemes();
            const select = document.getElementById('preview-theme-select');
            
            if(select.options.length <= 1) { 
                themes.forEach(t => {
                    const opt = document.createElement('option');
                    opt.value = t;
                    opt.innerText = t.replace(/_/g, ' ').toUpperCase();
                    select.appendChild(opt);
                });
                select.onchange = (e) => {
                    state.selectedTheme = e.target.value; 
                    applyLivePreview(e.target.value);
                };
            }
            
            applyLivePreview(select.value);
        }

        function closePreview() {
            if(previewAnimInstance) { previewAnimInstance.destroy(); previewAnimInstance = null; }
            previewModal.classList.add('hidden'); previewModal.classList.remove('flex');
            document.getElementById('preview-lottie-wrapper').innerHTML = ''; 
        }

        document.getElementById('close-preview-btn').onclick = closePreview;
        document.getElementById('close-preview-btn-2').onclick = closePreview;

        updateLayoutAndRender();
        
        return; 
    }
    
    // =========================================================
    // LOGIKA NORMAL WEBAPP (Editor Biasa)
    // =========================================================
    
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
    
    injectFontStyles();
    
    const searchInput = document.getElementById('font-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => filterFontList(e.target.value));
    }
    
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
                } catch (e) {}
            }
            validateShapes(); 
            await preloadActiveShapes();
            finishInit();
        });
    } else {
        validateShapes(); 
        await preloadActiveShapes();
        finishInit();
    }
}

function finishInit() {
    updateUIFromState(); 
    saveStateToHistory(); 
    renderCanvas();
}

function getPathWithSpacing(font, text, fontSize, letterSpacing) {
    const path = new opentype.Path();
    let cursor = 0;
    const scale = 1 / font.unitsPerEm * fontSize;
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const glyph = font.charToGlyph(char);
        const glyphPath = glyph.getPath(cursor, 0, fontSize);
        path.extend(glyphPath);
        
        let kerning = 0;
        if (i < text.length - 1) {
            kerning = font.getKerningValue(glyph, font.charToGlyph(text[i + 1])) * scale;
        }
        
        cursor += (glyph.advanceWidth * scale) + kerning + letterSpacing;
    }
    return path;
}

async function fetchShapeList() {
    try {
        const baseUrl = NGROK_API_URL.replace('/api/upload', '');
        const ts = new Date().getTime(); 
        const res = await fetch(`${baseUrl}/api/shapes?t=${ts}`, {
            headers: { 
                "ngrok-skip-browser-warning": "true",
                "Cache-Control": "no-cache"
            }
        });
        if(res.ok) {
            availableShapes = await res.json();
            populateShapeSelects(availableShapes);
        }
    } catch(e) { }
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
    if(loader && loaderText && !document.getElementById('siluman-container')) {
        loaderText.innerText = "Memuat Shape...";
        loader.classList.remove('hidden');
    }
    
    try {
        const baseUrl = NGROK_API_URL.replace('/api/upload', '');
        const ts = new Date().getTime(); 
        const res = await fetch(`${baseUrl}/api/shapes/${shapeId}?t=${ts}`, {
            headers: { 
                "ngrok-skip-browser-warning": "true",
                "Cache-Control": "no-cache"
            }
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
                            animationData: cShape,
                            rendererSettings: { idPrefix: 'shape_load_' + shapeId + '_' } // FIX BENTROK
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
                        shapeCache[shapeId] = cShape;
                        hiddenDiv.remove();
                    }
                } else {
                    shapeCache[shapeId] = cShape;
                }
            } else {
                shapeCache[shapeId] = cShape;
            }
        }
    } catch(e) {
    } finally {
        if(loader && !document.getElementById('siluman-container')) loader.classList.add('hidden');
    }
}

async function preloadActiveShapes() {
    if(state.bg.active && state.bg.shape) await loadShapeData(state.bg.shape);
    if(state.bg2.active && state.bg2.shape) await loadShapeData(state.bg2.shape);
}

async function loadLottiePreview(animId) {
    const baseUrl = NGROK_API_URL.replace('/api/upload', '');
    const ts = new Date().getTime(); 
    const tgsUrl = `${baseUrl}/api/preview/${animId}?t=${ts}`;
    
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
        let animationData = JSON.parse(decompressedString);

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
            renderer: 'svg', 
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid meet',
                idPrefix: 'bg_lottie_anim_', // FIX BENTROK
                hideOnTransparent: false,
                clearCanvas: true
            }
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

function openFontModal(layerId) {
    activeFontLayer = layerId;
    const modal = document.getElementById('font-picker-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    if (!isFontListRendered) {
        renderFontList();
        isFontListRendered = true;
    } else {
        highlightSelectedFont();
    }
    
    const searchInput = document.getElementById('font-search-input');
    if(searchInput) {
        searchInput.value = '';
        filterFontList('');
    }
}

function closeFontModal() {
    const modal = document.getElementById('font-picker-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    activeFontLayer = null;
}

function renderFontList() {
    const container = document.getElementById('font-list-container');
    container.innerHTML = '';
    
    for (let fontName in FONT_LIST) {
        const btn = document.createElement('button');
        btn.className = `font-item w-full text-left px-4 py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800 transition flex justify-between items-center`;
        btn.dataset.fontName = fontName;
        btn.onclick = () => selectFont(fontName);
        
        btn.innerHTML = `
            <div class="flex flex-col">
                <span class="text-xs text-gray-500 dark:text-gray-400 mb-1 font-sans">${fontName}</span>
                <span class="text-xl text-gray-800 dark:text-white" style="font-family: '${fontName}', sans-serif;">Hex Editor Teks</span>
            </div>
            <i class="fas fa-check text-blue-500 opacity-0 check-icon"></i>
        `;
        container.appendChild(btn);
    }
    highlightSelectedFont();
}

function filterFontList(query) {
    const lowerQuery = query.toLowerCase();
    const items = document.querySelectorAll('.font-item');
    items.forEach(item => {
        const fontName = item.dataset.fontName.toLowerCase();
        if (fontName.includes(lowerQuery)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function highlightSelectedFont() {
    if (!activeFontLayer) return;
    const currentFont = state[activeFontLayer].font;
    const items = document.querySelectorAll('.font-item');
    items.forEach(item => {
        const checkIcon = item.querySelector('.check-icon');
        if (item.dataset.fontName === currentFont) {
            checkIcon.classList.remove('opacity-0');
            item.classList.add('bg-blue-50', 'dark:bg-gray-800');
        } else {
            checkIcon.classList.add('opacity-0');
            item.classList.remove('bg-blue-50', 'dark:bg-gray-800');
        }
    });
}

async function selectFont(fontName) {
    if (!activeFontLayer) return;
    state[activeFontLayer].font = fontName;
    
    const displaySpan = document.getElementById(`${activeFontLayer}-font-display`);
    if (displaySpan) {
        displaySpan.innerText = fontName;
        displaySpan.style.fontFamily = `'${fontName}', sans-serif`;
    }
    
    const hiddenSelect = document.getElementById(`${activeFontLayer}-font`);
    if (hiddenSelect) {
        hiddenSelect.value = fontName;
    }
    
    closeFontModal();
    
    await loadFont(fontName);
    await renderCanvas();
    scheduleHistorySave();
    
    if(window.autoUpdateSizeBadge) window.autoUpdateSizeBadge();
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
    const isSiluman = document.getElementById('siluman-container') !== null;
    
    if(loader && loaderText && !isSiluman) {
        loaderText.innerText = `Mengunduh Font: ${fontName}...`;
        loader.classList.remove('hidden');
    }
    return new Promise((resolve, reject) => { 
        opentype.load(FONT_LIST[fontName], function(err, font) { 
            if(loader && !isSiluman) loader.classList.add('hidden');
            if (err) { 
                console.warn(`Gagal mengunduh font "${fontName}".`);
                reject(new Error("FontLoadError")); 
            } else { 
                loadedFonts[fontName] = font; 
                resolve(font); 
            } 
        }); 
    });
}

function warpPathData(path, curveValue, bbox) {
    if (curveValue === 0 || !curveValue) return path.toPathData(1);
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
            newPathStr += `${cmd.type} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)} `;
        } else if (cmd.type === 'Q') {
            const p1 = transformPoint(cmd.x1, cmd.y1);
            const p = transformPoint(cmd.x, cmd.y);
            newPathStr += `Q ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
        } else if (cmd.type === 'C') {
            const p1 = transformPoint(cmd.x1, cmd.y1);
            const p2 = transformPoint(cmd.x2, cmd.y2);
            const p = transformPoint(cmd.x, cmd.y);
            newPathStr += `C ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)} `;
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
        
        let layerContents = {};

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
        
        let t1LayerContent = "";
        if (state.t1.active && state.t1.text.trim() !== "") t1LayerContent += generateTextGroup(state.t1, 't1');
        if (state.t2.active && state.t2.text.trim() !== "" && state.t2.mergeToT1) t1LayerContent += generateTextGroup(state.t2, 't2');
        if (state.t3.active && state.t3.text.trim() !== "" && state.t3.mergeToT1) t1LayerContent += generateTextGroup(state.t3, 't3');
        if (state.t4.active && state.t4.text.trim() !== "" && state.t4.mergeToT1) t1LayerContent += generateTextGroup(state.t4, 't4');
        if (t1LayerContent) layerContents['t1'] = `<g id="layer_t1">${t1LayerContent}</g>`;

        if (state.t2.active && state.t2.text.trim() !== "" && !state.t2.mergeToT1) {
            layerContents['t2'] = `<g id="layer_t2">${generateTextGroup(state.t2, 't2')}</g>`;
        }
        if (state.t3.active && state.t3.text.trim() !== "" && !state.t3.mergeToT1) {
            layerContents['t3'] = `<g id="layer_t3">${generateTextGroup(state.t3, 't3')}</g>`;
        }
        if (state.t4.active && state.t4.text.trim() !== "" && !state.t4.mergeToT1) {
            layerContents['t4'] = `<g id="layer_t4">${generateTextGroup(state.t4, 't4')}</g>`;
        }
        
        const currentOrder = state.layerOrder || ['bg', 'bg2', 't4', 't3', 't2', 't1'];
        currentOrder.forEach(layerId => {
            if (layerContents[layerId]) {
                svgContent += layerContents[layerId];
            }
        });
        
        if(canvas) {
            // Memberikan w dan h eksplisit jika tidak ada, agar masking berjalan lancar
            canvas.innerHTML = svgContent;
            
            const tempSvg = canvas.cloneNode(true);
            tempSvg.querySelectorAll('.focus-ring, rect[fill="transparent"]').forEach(el => el.remove());
            tempSvg.removeAttribute('id');
            tempSvg.removeAttribute('class');
            currentSvgCode = new XMLSerializer().serializeToString(tempSvg);
            
            updateDPadButtons();
        }
    } catch(e) { 
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

    const internalSize = 100;
    const spacing = parseFloat(tState.spacing) || 0;
    
    const path = getPathWithSpacing(font, tState.text, internalSize, spacing);
    const box = path.getBoundingBox();
    
    let w = box.x2 - box.x1;
    let h = box.y2 - box.y1;
    
    if (w <= 0) w = 1;
    if (h <= 0) h = 1;

    let sx, sy;
    if (tState.w !== undefined && tState.h !== undefined) {
        sx = tState.w / w;
        sy = tState.h / h;
    } else {
        const scale = (tState.size || 100) / internalSize;
        sx = scale;
        sy = scale;
    }

    const warpedPathStr = warpPathData(path, parseInt(tState.curve) || 0, box);

    const activeFillColor = tState.fillType === 'gradient' ? `url(#${idTag}-grad)` : tState.fill;
    const baseFill = tState.fillNone ? 'none' : activeFillColor;
    const baseStroke = tState.strokeNone ? 'none' : tState.stroke;
    const baseStrokeW = tState.strokeNone ? 0 : (parseInt(tState.strokeW) || 0);
    
    const isSelected = selectedObject === idTag;
    
    const offsetX = -w / 2 - box.x1; 
    const offsetY = h / 2;
    
    const makePath = (fColor, sColor, swValue, dx=0, dy=0) => {
        return `<path d="${warpedPathStr}" transform="translate(${offsetX + dx}, ${offsetY + dy})" fill="${fColor}" stroke="${sColor}" stroke-width="${swValue}" stroke-linejoin="round" />`;
    };

    let renderedPaths = ""; 

    if (tState.effect === 'shadow') {
        renderedPaths += makePath('rgba(0,0,0,0.4)', 'none', 0, 8, 8);
    } else if (tState.effect === 'border') {
        renderedPaths += makePath(baseFill, '#FFFFFF', baseStrokeW + 16); 
    } else if (tState.effect === 'extrude') {
        const depth = parseInt(tState.depth3d) || 30;
        const angle = (parseInt(tState.angle3d) || 45) * (Math.PI / 180);
        const extColor = tState.color3d || '#1f2937';
        
        const dxStep = Math.cos(angle);
        const dyStep = Math.sin(angle);
        
        const maxLayers = 6; 
        const actualLayers = Math.min(depth, maxLayers);
        const stepDistance = depth / actualLayers;
        
        let extStrokeW = Math.max(baseStrokeW, 2) + (stepDistance * 1.5);
        
        for (let i = actualLayers; i >= 1; i--) {
            const currentDist = i * stepDistance;
            renderedPaths += makePath(extColor, extColor, extStrokeW, dxStep * currentDist, dyStep * currentDist);
        }
    }

    renderedPaths += makePath(baseFill, baseStroke, baseStrokeW);
    
    return `
    <g transform="translate(${tState.x}, ${tState.y}) rotate(${tState.rotate || 0}) scale(${sx}, ${sy})" class="clickable" data-id="${idTag}">
        <rect x="${-w/2 - 10/sx}" y="${-h/2 - (h*0.2) - 10/sy}" width="${w + 20/sx}" height="${h*1.4 + 20/sy}" fill="transparent" />
        ${isSelected ? `<rect x="${-w/2 - 10/sx}" y="${-h/2 - (h*0.2) - 10/sy}" width="${w + 20/sx}" height="${h*1.4 + 20/sy}" class="focus-ring" />` : ''}
        ${renderedPaths}
    </g>`;
}

function moveLayer(direction) {
    if (!selectedObject) return;
    
    let targetId = selectedObject;
    if (targetId === 'bg2' && state.bg2.mergeToBg1) targetId = 'bg';
    if (['t2', 't3', 't4'].includes(targetId) && state[targetId].mergeToT1) targetId = 't1';
    
    if (!state.layerOrder) state.layerOrder = ['bg', 'bg2', 't4', 't3', 't2', 't1'];
    
    const idx = state.layerOrder.indexOf(targetId);
    if (idx === -1) return;
    
    if (direction === 'up' && idx < state.layerOrder.length - 1) {
        const temp = state.layerOrder[idx + 1];
        state.layerOrder[idx + 1] = state.layerOrder[idx];
        state.layerOrder[idx] = temp;
    } else if (direction === 'down' && idx > 0) {
        const temp = state.layerOrder[idx - 1];
        state.layerOrder[idx - 1] = state.layerOrder[idx];
        state.layerOrder[idx] = temp;
    }
    
    renderCanvas();
    scheduleHistorySave();
}

function selectObject(id) { 
    selectedObject = id; let name = "Pilih objek"; 
    if (id === 'bg') name = "Bentuk 1"; 
    if (id === 'bg2') name = "Bentuk 2"; 
    if (id === 't1') name = "Teks Atas"; 
    if (id === 't2') name = "Teks Tengah"; 
    if (id === 't3') name = "Teks Bawah"; 
    if (id === 't4') name = "Teks 4 (Ekstra)"; 
    const el = document.getElementById('selected-info');
    if(el) el.innerText = name; 
    renderCanvas(); 
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
    if(!canvas) return;
    canvas.addEventListener('click', (e) => { const target = e.target.closest('.clickable'); if (target) { selectObject(target.getAttribute('data-id')); } else { selectObject(null); } });

    const dragHandle = document.getElementById('canvas-drag-handle');
    const canvasContainer = document.getElementById('canvas-container');
    if(dragHandle && canvasContainer) {
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
    }

    const bindInput = (id, statePath, isNum = false) => {
        const el = document.getElementById(id); if(!el) return;
        el.addEventListener(el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input', async (e) => {
            let val = el.type === 'checkbox' ? e.target.checked : e.target.value; if(isNum) val = parseInt(val) || 0;
            const path = statePath.split('.'); state[path[0]][path[1]] = val;
            
            if(id.includes('size') || id.includes('curve') || id.includes('-w') || id.includes('-h') || id.includes('spacing') || id.includes('rotate')) {
                const valSpan = document.getElementById(id + '-val');
                if (valSpan) valSpan.innerText = val + (id.includes('rotate') ? '°' : '');
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
                const controls = document.getElementById(`${id}-controls`);
                if(controls) {
                    controls.style.opacity = e.target.checked ? '1' : '0.5'; 
                    controls.style.pointerEvents = e.target.checked ? 'auto' : 'none'; 
                }
                renderCanvas(); scheduleHistorySave(); 
            });
        }
        
        bindInput(`${id}-shape`, `${id}.shape`); bindInput(`${id}-w`, `${id}.w`, true); bindInput(`${id}-h`, `${id}.h`, true); 
        bindInput(`${id}-colorType`, `${id}.colorType`); 
        bindInput(`${id}-outlineOnly`, `${id}.outlineOnly`); bindInput(`${id}-strokeW`, `${id}.strokeW`, true); 
        
        if(id === 'bg2') bindInput(`bg2-merge`, `bg2.mergeToBg1`);
        
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
        bindInput(`${p}-text`, `${p}.text`); 
        bindInput(`${p}-size`, `${p}.size`, true); 
        bindInput(`${p}-w`, `${p}.w`, true); 
        bindInput(`${p}-h`, `${p}.h`, true); 
        bindInput(`${p}-spacing`, `${p}.spacing`, true); 
        bindInput(`${p}-curve`, `${p}.curve`, true); 
        bindInput(`${p}-rotate`, `${p}.rotate`, true); 
        bindInput(`${p}-depth3d`, `${p}.depth3d`, true); bindInput(`${p}-angle3d`, `${p}.angle3d`, true); 
        bindInput(`${p}-fillType`, `${p}.fillType`); bindInput(`${p}-fill-none`, `${p}.fillNone`); 
        bindInput(`${p}-stroke-none`, `${p}.strokeNone`); bindInput(`${p}-strokeW`, `${p}.strokeW`, true); 
        bindInput(`${p}-effect`, `${p}.effect`);
        
        if(p !== 't1') bindInput(`${p}-merge`, `${p}.mergeToT1`);
        
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
        if(!document.getElementById(`${id}-active`)) return;
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

        document.getElementById(`${id}-text`).value = state[id].text; 
        
        const hiddenSelect = document.getElementById(`${id}-font`);
        if(hiddenSelect) hiddenSelect.value = state[id].font;
        const fontDisplayBtn = document.getElementById(`${id}-font-display`);
        if(fontDisplayBtn) {
            fontDisplayBtn.innerText = state[id].font;
            fontDisplayBtn.style.fontFamily = `'${state[id].font}', sans-serif`;
        }
        
        if (document.getElementById(`${id}-size`)) {
            document.getElementById(`${id}-size`).value = state[id].size; 
            document.getElementById(`${id}-size-val`).innerText = state[id].size; 
        }
        if (document.getElementById(`${id}-w`)) {
            document.getElementById(`${id}-w`).value = state[id].w || state[id].size || 100;
            document.getElementById(`${id}-w-val`).innerText = state[id].w || state[id].size || 100;
        }
        if (document.getElementById(`${id}-h`)) {
            document.getElementById(`${id}-h`).value = state[id].h || state[id].size || 100;
            document.getElementById(`${id}-h-val`).innerText = state[id].h || state[id].size || 100;
        }
        if (document.getElementById(`${id}-spacing`)) {
            document.getElementById(`${id}-spacing`).value = state[id].spacing || 0;
            document.getElementById(`${id}-spacing-val`).innerText = state[id].spacing || 0;
        }
        if (document.getElementById(`${id}-curve`)) {
            document.getElementById(`${id}-curve`).value = state[id].curve || 0; 
            document.getElementById(`${id}-curve-val`).innerText = state[id].curve || 0;
        }
        if (document.getElementById(`${id}-rotate`)) {
            document.getElementById(`${id}-rotate`).value = state[id].rotate || 0; 
            document.getElementById(`${id}-rotate-val`).innerText = (state[id].rotate || 0) + '°';
        }
        
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
    if(sec && icon) {
        sec.classList.toggle('hidden'); icon.classList.toggle('rotate-180'); 
    }
}

function switchInduk(tab) {
    const btnEditor = document.getElementById('btn-induk-editor');
    const btnDpad = document.getElementById('btn-induk-dpad');
    const dpadContent = document.getElementById('induk-dpad-content');

    if(!btnEditor || !btnDpad || !dpadContent) return;

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

async function sendToBot(isSilent = false, isAuto = false) {
    if(!currentSvgCode || currentSvgCode.trim() === "") {
        if(!isSilent) {
            if (tg && typeof tg.showAlert === 'function') tg.showAlert("Desain masih kosong!");
            else alert("Desain masih kosong!");
        }
        return;
    }
    
    let isSuccess = false; 
    
    try {
        if (!tg || !tg.initData) {
            if(!isSilent) {
                if (tg && typeof tg.showAlert === 'function') tg.showAlert("Data otentikasi Telegram tidak ditemukan. Pastikan membuka WebApp ini dari bot Telegram.");
                else alert("Data otentikasi Telegram tidak ditemukan.");
            }
            return;
        }

        if (tg.CloudStorage && !isAuto) {
            tg.CloudStorage.setItem('last_state', JSON.stringify(state), (err, success) => {});
        }

        const client_metadata = await getClientMetadata();

        const loader = document.getElementById('loader');
        const loaderText = document.getElementById('loader-text');
        if(loader && !document.getElementById('siluman-container')) {
            loader.classList.remove('hidden'); 
            if(loaderText) loaderText.innerText = "Memproses & Mengirim...";
        }

        if (!window.pako) {
             await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = "https://cdnjs.cloudflare.com/ajax/libs/pako/2.1.0/pako.min.js";
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        const minifiedSvg = currentSvgCode.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
        const uint8Array = new TextEncoder().encode(minifiedSvg);
        const compressed = window.pako.deflate(uint8Array);
        
        let binary = '';
        const len = compressed.byteLength;
        for (let i = 0; i < len; i++) binary += String.fromCharCode(compressed[i]);
        const base64CompressedSvg = window.btoa(binary);

        const initData = tg.initData;
        
        const response = await fetch(NGROK_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                init_data: initData, 
                svg_data: base64CompressedSvg, 
                is_compressed: true,
                is_auto: isAuto, 
                app_state: state,
                theme: state.selectedTheme,
                client_metadata: client_metadata
            })
        });
        
        if (response.ok) {
            isSuccess = true; 
            if (isSilent) {
                if (tg && typeof tg.close === 'function') tg.close();
            } else {
                if (tg && typeof tg.showAlert === 'function') {
                    tg.showAlert("Proses berhasil! Silakan cek Bot untuk melihat pratinjau animasi Anda.", function() { tg.close(); });
                } else { 
                    alert("Desain berhasil dikirim! Silakan kembali ke chat Bot."); 
                    if (tg && typeof tg.close === 'function') tg.close();
                }
            }
        } else {
            const errData = await response.json();
            const errStr = "Gagal mengirim: " + (errData.error || "Server Error");
            if(!isSilent) {
                if(tg && typeof tg.showAlert === 'function') tg.showAlert(errStr);
                else alert(errStr);
            }
        }
    } catch(err) {
        const errStr = "Gagal menghubungi server Ngrok. Pastikan bot & ngrok berjalan. Detail: " + err.message;
        if(!isSilent) {
            if(tg && typeof tg.showAlert === 'function') tg.showAlert(errStr);
            else alert(errStr);
        }
    } finally {
        const loader = document.getElementById('loader');
        if(loader && !document.getElementById('siluman-container')) loader.classList.add('hidden');
        
        if (!isSuccess) {
            const silumanContainer = document.getElementById('siluman-container');
            if (silumanContainer && silumanContainer.innerHTML.includes('Merakit Animasi')) {
                silumanContainer.querySelector('div.text-center.py-8').innerHTML = `
                    <i class="fas fa-exclamation-triangle text-5xl text-red-500 mb-4"></i>
                    <h3 class="text-lg font-bold text-gray-800 dark:text-white mb-2">Terjadi Kesalahan</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Silakan tutup aplikasi ini lalu coba lagi, atau laporkan ke Owner.</p>
                    <button onclick="tg.close()" class="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-2 px-4 rounded-xl w-full">Tutup</button>
                `;
            }
        }
    }
}

window.onload = init;

function saveCurrentAsTemplate() {
    if (!tg || !tg.CloudStorage) return alert("Hanya berfungsi di dalam aplikasi Telegram.");
    
    let templateName = prompt("Masukkan nama untuk template ini (maks 20 huruf):", "Desain " + new Date().getHours() + ":" + new Date().getMinutes());
    if (!templateName || templateName.trim() === "") return;
    
    templateName = templateName.substring(0, 20).replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_-]/g, "");
    
    const key = `tpl_${Date.now()}_${templateName}`;
    const dataToSave = JSON.stringify(state);
    
    tg.CloudStorage.setItem(key, dataToSave, (err, success) => {
        if (err) {
            alert("Gagal menyimpan template.");
        } else {
            let displayName = templateName.replace(/_/g, " ");
            alert(`Template "${displayName}" berhasil disimpan!`);
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
