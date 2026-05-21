// --- 1. Animation de la Pluie Matrix ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Caractères (Katakana + Alphabet latin + Chiffres)
const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charArray = chars.split('');

const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];

// Initialiser les gouttes
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    // Fond noir semi-transparent pour créer la traînée (fade effect)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0'; // Vert néon
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        // Caractère aléatoire
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Dessiner le caractère
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Réinitialiser la goutte aléatoirement ou la faire descendre
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Boucle d'animation
setInterval(drawMatrix, 33);

// Redimensionnement dynamique du canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// --- 2. Effet Machine à Écrire (Typewriter) ---
const subtitleText = "Initialisation du système... Chargement des protocoles administrateur...";
const typewriterElement = document.getElementById('typewriter');
let charIndex = 0;

function typeWriter() {
    if (charIndex < subtitleText.length) {
        typewriterElement.innerHTML = subtitleText.substring(0, charIndex + 1) + '<span class="cursor"></span>';
        charIndex++;
        setTimeout(typeWriter, Math.random() * 50 + 50); // Vitesse aléatoire pour faire plus humain/machine
    } else {
        // Laisser le curseur clignoter à la fin
        typewriterElement.innerHTML = subtitleText + '<span class="cursor"></span>';
    }
}

// Lancer l'effet après un court délai
setTimeout(typeWriter, 1000);

// --- 3. Gestion de la Navigation ---
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.page-section');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons et sections
        navButtons.forEach(b => b.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active-section'));
        sections.forEach(s => s.classList.add('hidden'));

        // Ajouter la classe active au bouton cliqué et à la section correspondante
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        
        targetSection.classList.remove('hidden');
        targetSection.classList.add('active-section');
    });
});