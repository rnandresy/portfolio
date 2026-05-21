// --- 1. SÉQUENCE DE BOOT ---
const bootText = [
    "Connexion au terminal distant...",
    "Décryptage des données RH............ [OK]",
    "Vérification des compétences techniques. [OK]",
    "Chargement du profil candidat........ [OK]",
    "Accès sécurisé accordé.",
    "Lancement de l'interface visuelle..."
];

const bootScreen = document.getElementById('boot-screen');
const bootTextContainer = document.getElementById('boot-text');
const mainApp = document.getElementById('main-app');

let bootLine = 0;

function simulateBoot() {
    if (bootLine < bootText.length) {
        bootTextContainer.innerHTML += bootText[bootLine] + "<br>";
        bootLine++;
        setTimeout(simulateBoot, Math.random() * 200 + 100);
    } else {
        setTimeout(() => {
            bootScreen.style.opacity = '0';
            setTimeout(() => {
                bootScreen.style.display = 'none';
                mainApp.style.display = 'block';
                startTypewriter();
            }, 500);
        }, 600);
    }
}

window.onload = simulateBoot;

// --- 2. PLUIE MATRIX ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '01'.split(''); // Code binaire pour être plus lisible en fond
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; // Plus sombre pour mieux lire le texte devant
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#005500'; // Vert plus foncé pour ne pas agresser les yeux des recruteurs
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 40);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// --- 3. EFFET MACHINE À ÉCRIRE ---
const subtitleText = "Analyse de profil en cours. Prêt pour l'entretien.";
const typewriterElement = document.getElementById('typewriter');
let charIndex = 0;

function startTypewriter() {
    if (charIndex < subtitleText.length) {
        typewriterElement.innerHTML = subtitleText.substring(0, charIndex + 1) + '<span style="animation: blink 1s infinite">_</span>';
        charIndex++;
        setTimeout(startTypewriter, Math.random() * 50 + 30);
    }
}

// --- 4. NAVIGATION SPA AVANCÉE ---
function navigateTo(targetId) {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.page-section');

    // Mise à jour des boutons du menu
    navButtons.forEach(btn => {
        if(btn.getAttribute('data-target') === targetId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Affichage de la section
    sections.forEach(s => {
        s.classList.remove('active-section');
        s.classList.add('hidden');
    });

    const targetSection = document.getElementById(targetId);
    if(targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('active-section');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Clics sur le menu
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        navigateTo(e.target.getAttribute('data-target'));
    });
});

// Clics sur les boutons d'appel à l'action (ex: bouton accueil vers profil)
document.querySelectorAll('.nav-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
        navigateTo(e.target.getAttribute('data-target'));
    });
});