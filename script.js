// --- 1. SÉQUENCE DE BOOT (Effet d'allumage) ---
const bootText = [
    "Initialisation du noyau...",
    "Chargement des modules réseau....... [OK]",
    "Vérification de l'interface eth0.... [OK]",
    "Établissement du tunnel Wireguard... [OK]",
    "Montage des systèmes de fichiers.... [OK]",
    "Démarrage du processus Bêta......... [OK]",
    "Accès Root accordé.",
    "Lancement de l'interface utilisateur..."
];

const bootScreen = document.getElementById('boot-screen');
const bootTextContainer = document.getElementById('boot-text');
const mainApp = document.getElementById('main-app');

let bootLine = 0;

function simulateBoot() {
    if (bootLine < bootText.length) {
        bootTextContainer.innerHTML += bootText[bootLine] + "<br>";
        bootLine++;
        // Vitesse de lecture aléatoire pour simuler un vrai chargement
        setTimeout(simulateBoot, Math.random() * 300 + 100);
    } else {
        setTimeout(() => {
            bootScreen.style.display = 'none';
            mainApp.style.display = 'block';
            startTypewriter(); // Lance le sous-titre une fois le boot fini
        }, 800);
    }
}

// Lancer le boot au chargement de la page
window.onload = simulateBoot;


// --- 2. PLUIE MATRIX ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// --- 3. EFFET MACHINE À ÉCRIRE ---
const subtitleText = "Analyse de paquets en cours... Prêt pour le déploiement.";
const typewriterElement = document.getElementById('typewriter');
let charIndex = 0;

function startTypewriter() {
    if (charIndex < subtitleText.length) {
        typewriterElement.innerHTML = subtitleText.substring(0, charIndex + 1) + '<span class="cursor">_</span>';
        charIndex++;
        setTimeout(startTypewriter, Math.random() * 50 + 30);
    } else {
        typewriterElement.innerHTML = subtitleText + '<span class="cursor blink">_</span>';
    }
}


// --- 4. NAVIGATION SPA ---
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.page-section');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        sections.forEach(s => {
            s.classList.remove('active-section');
            s.classList.add('hidden');
        });

        btn.classList.add('active');
        const targetSection = document.getElementById(btn.getAttribute('data-target'));
        targetSection.classList.remove('hidden');
        targetSection.classList.add('active-section');
    });
});