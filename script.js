// Museum Portals Interactive Experience
// State Management
const state = {
    currentScene: 'entrance',
    currentMuseum: null,
    currentArtifact: null,
    rotationX: 0,
    rotationY: 0,
    isDragging: false,
    lastMouseX: 0,
    lastMouseY: 0,
    scale: 1
};

// Artifact Data
const artifactData = {
    'death-mask': {
        name: 'Egyptian Gold Death Mask',
        description: 'Golden funerary mask adorned with lapis-blue stripes, inlaid turquoise, and obsidian eye inlays. Symbol of eternal afterlife and pharaoh divinity. Dating back to ancient Egypt, this magnificent piece represents the belief in life after death and the divine right of pharaohs to rule in both the mortal and spiritual realms.'
    },
    'crown': {
        name: 'Royal Crown of Medieval Empire',
        description: 'A 14th-century ceremonial crown with a red velvet base, gold arches, sapphires and emeralds, cross and fleur-de-lis details. This crown symbolizing divine right and military power was worn by monarchs during coronations and important state ceremonies, representing the sacred bond between earthly rule and heavenly authority.'
    },
    'scepter': {
        name: 'Ceremonial War Scepter',
        description: 'High ruler\'s scepter used in coronation and battle blessings. Carved from ebony with a gold serpent head and red gemstone eyes. Represents command, law, and spiritual might. The serpent symbolizes wisdom and eternal power, while the staff represents the ruler\'s authority to govern and protect their people.'
    },
    'trex': {
        name: 'Tyrannosaurus Rex Skull Fossil',
        description: 'The apex predator of the Cretaceous period, approximately 68 million years old. This magnificent skull showcases the massive bone structure, cracked surfaces from millions of years of fossilization, broken teeth, and deep shadowed eye sockets. The T-Rex was one of the largest land carnivores ever to walk the Earth, reaching lengths of up to 40 feet.'
    },
    'pterosaur': {
        name: 'Pteranodon Skeleton',
        description: 'Ancient flying reptile with a wingspan reaching 7 meters. First dominators of the skies during the Late Cretaceous period. This specimen features thin, hollow bone wings, a long pointed beak, and a distinctive hollow skull structure designed for lightweight flight. Despite their impressive size, pterosaurs were remarkably light, weighing only about 50 pounds.'
    },
    'mammoth': {
        name: 'Woolly Mammoth Skull',
        description: 'Ice age giant with massive curved tusks used for defense and digging through snow to find vegetation. This skull exhibits thick bone structure and textured aging cracks from thousands of years of preservation in permafrost. Woolly mammoths roamed the northern tundra during the Pleistocene epoch and went extinct around 4,000 years ago.'
    },
    'mona-lisa': {
        name: 'Mona Lisa',
        description: 'Leonardo da Vinci\'s masterpiece, painted between 1503-1519. Renowned for the subject\'s mysterious expression and revolutionary realism. The painting demonstrates da Vinci\'s mastery of sfumato technique, creating soft, almost imperceptible transitions between colors and tones. The enigmatic smile has captivated viewers for centuries, making it the most famous painting in the world.'
    },
    'venus': {
        name: 'Venus de Milo',
        description: 'Ancient Greek sculpture created between 130 and 100 BC, carved from smooth white marble. Despite missing arms, this masterpiece symbolizes ideal beauty and divine femininity. The flowing Greek drapery demonstrates extraordinary skill in depicting fabric in stone. Believed to represent Aphrodite, the Greek goddess of love and beauty.'
    },
    'last-supper': {
        name: 'The Last Supper',
        description: 'Leonardo da Vinci\'s monumental fresco painted between 1495-1498. This masterwork depicts the moment Jesus announces that one of his disciples will betray him. The composition showcases da Vinci\'s genius in capturing human emotion, psychological drama, and the use of perspective to create architectural depth. A powerful story of faith, betrayal, and human emotion frozen in time.'
    }
};

// Audio Context
const sounds = {
    ambient: {
        entrance: null, // Bird chirping, soft wind
        lobby: null,    // Ethereal museum ambience
        history: null,  // Ancient temple music, soft drums
        nature: null,   // Bass rumble, echoes
        art: null       // Classical piano
    },
    sfx: {
        doorOpen: null,
        footsteps: null,
        portalEnter: null,
        artifactClick: null
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    playAmbientSound('entrance');
});

// Event Listeners Setup
function initializeEventListeners() {
    // Entrance Door
    const entranceDoor = document.getElementById('entrance-door');
    if (entranceDoor) {
        entranceDoor.addEventListener('click', openMuseumDoor);
    }

    // Portal Selection
    const portals = document.querySelectorAll('.portal');
    portals.forEach(portal => {
        portal.addEventListener('click', () => {
            const museum = portal.getAttribute('data-museum');
            enterMuseum(museum);
        });

        portal.addEventListener('mouseenter', () => {
            playSoundEffect('hover');
        });
    });

    // Artifact Selection
    const artifacts = document.querySelectorAll('.artifact-pedestal');
    artifacts.forEach(pedestal => {
        pedestal.addEventListener('click', () => {
            const artifact = pedestal.getAttribute('data-artifact');
            openArtifactViewer(artifact);
        });

        pedestal.addEventListener('mouseenter', () => {
            playSoundEffect('hover');
        });
    });

    // Return Buttons
    const returnBtns = document.querySelectorAll('.return-btn');
    returnBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const returnTo = btn.getAttribute('data-return');
            if (returnTo === 'lobby') {
                returnToLobby();
            }
        });
    });

    // Close Viewer
    const closeViewer = document.getElementById('close-viewer');
    if (closeViewer) {
        closeViewer.addEventListener('click', closeArtifactViewer);
    }

    // 3D Viewer Controls
    const viewerCanvas = document.querySelector('.viewer-canvas');
    if (viewerCanvas) {
        // Mouse events
        viewerCanvas.addEventListener('mousedown', startDrag);
        viewerCanvas.addEventListener('mousemove', drag);
        viewerCanvas.addEventListener('mouseup', endDrag);
        viewerCanvas.addEventListener('mouseleave', endDrag);
        viewerCanvas.addEventListener('wheel', zoom);

        // Touch events for mobile
        viewerCanvas.addEventListener('touchstart', handleTouchStart);
        viewerCanvas.addEventListener('touchmove', handleTouchMove);
        viewerCanvas.addEventListener('touchend', endDrag);
    }
}

// Scene Transitions
function switchScene(fromScene, toScene) {
    const scenes = document.querySelectorAll('.scene');
    scenes.forEach(scene => scene.classList.remove('active'));

    const targetScene = document.getElementById(toScene);
    if (targetScene) {
        setTimeout(() => {
            targetScene.classList.add('active');
            state.currentScene = toScene;
        }, 300);
    }
}

// Museum Door Opening
function openMuseumDoor() {
    const door = document.getElementById('entrance-door');
    const welcomeTitle = document.getElementById('welcome-title');

    // Play door opening sound
    playSoundEffect('doorOpen');

    // Animate door opening
    door.classList.add('opening');

    // Show welcome title
    setTimeout(() => {
        welcomeTitle.classList.remove('hidden');
    }, 800);

    // Transition to lobby
    setTimeout(() => {
        switchScene('entrance-scene', 'lobby-scene');
        playAmbientSound('lobby');
    }, 3000);
}

// Enter Museum
function enterMuseum(museumType) {
    playSoundEffect('portalEnter');

    let sceneId;
    switch(museumType) {
        case 'history':
            sceneId = 'history-museum';
            state.currentMuseum = 'history';
            break;
        case 'nature':
            sceneId = 'nature-museum';
            state.currentMuseum = 'nature';
            break;
        case 'art':
            sceneId = 'art-museum';
            state.currentMuseum = 'art';
            break;
    }

    setTimeout(() => {
        switchScene('lobby-scene', sceneId);
        playAmbientSound(museumType);
    }, 500);
}

// Return to Lobby
function returnToLobby() {
    playSoundEffect('footsteps');
    switchScene(state.currentMuseum + '-museum', 'lobby-scene');
    state.currentMuseum = null;
    playAmbientSound('lobby');
}

// Artifact Viewer
function openArtifactViewer(artifactId) {
    playSoundEffect('artifactClick');

    const viewer = document.getElementById('artifact-viewer');
    const title = document.getElementById('viewer-title');
    const description = document.getElementById('viewer-description');
    const artifact3d = document.getElementById('artifact-3d');

    const data = artifactData[artifactId];
    if (data) {
        title.textContent = data.name;
        description.textContent = data.description;

        // Clone the artifact for 3D viewing
        const originalArtifact = document.querySelector(`[data-artifact="${artifactId}"] .artifact`);
        if (originalArtifact) {
            artifact3d.innerHTML = '';
            const clone = originalArtifact.cloneNode(true);
            clone.style.width = '100%';
            clone.style.height = '100%';
            artifact3d.appendChild(clone);
        }

        // Reset rotation
        state.rotationX = 0;
        state.rotationY = 0;
        state.scale = 1;
        updateArtifact3D();

        viewer.classList.remove('hidden');
    }
}

function closeArtifactViewer() {
    const viewer = document.getElementById('artifact-viewer');
    viewer.classList.add('hidden');
    state.currentArtifact = null;
}

// 3D Rotation Controls
function startDrag(e) {
    state.isDragging = true;
    state.lastMouseX = e.clientX || e.touches[0].clientX;
    state.lastMouseY = e.clientY || e.touches[0].clientY;
}

function drag(e) {
    if (!state.isDragging) return;

    e.preventDefault();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    const deltaX = clientX - state.lastMouseX;
    const deltaY = clientY - state.lastMouseY;

    state.rotationY += deltaX * 0.5;
    state.rotationX -= deltaY * 0.5;

    // Clamp X rotation
    state.rotationX = Math.max(-90, Math.min(90, state.rotationX));

    state.lastMouseX = clientX;
    state.lastMouseY = clientY;

    updateArtifact3D();
}

function endDrag() {
    state.isDragging = false;
}

function zoom(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    state.scale += delta;
    state.scale = Math.max(0.5, Math.min(2, state.scale));
    updateArtifact3D();
}

function updateArtifact3D() {
    const artifact3d = document.getElementById('artifact-3d');
    if (artifact3d) {
        artifact3d.style.transform = `
            scale(${state.scale})
            rotateX(${state.rotationX}deg)
            rotateY(${state.rotationY}deg)
        `;
    }
}

// Touch Events for Mobile
let touchStartX = 0;
let touchStartY = 0;

function handleTouchStart(e) {
    if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        state.isDragging = true;
        state.lastMouseX = touchStartX;
        state.lastMouseY = touchStartY;
    }
}

function handleTouchMove(e) {
    if (!state.isDragging || e.touches.length !== 1) return;

    e.preventDefault();
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;

    const deltaX = touchX - state.lastMouseX;
    const deltaY = touchY - state.lastMouseY;

    state.rotationY += deltaX * 0.5;
    state.rotationX -= deltaY * 0.5;

    state.rotationX = Math.max(-90, Math.min(90, state.rotationX));

    state.lastMouseX = touchX;
    state.lastMouseY = touchY;

    updateArtifact3D();
}

// Audio System
function playAmbientSound(type) {
    // Stop current ambient sound
    const ambientAudio = document.getElementById('ambient-sound');
    if (ambientAudio) {
        ambientAudio.pause();
        ambientAudio.currentTime = 0;
    }

    // In a real implementation, you would load actual audio files here
    // For now, we'll simulate the audio system
    console.log(`Playing ambient sound: ${type}`);
}

function playSoundEffect(effect) {
    // In a real implementation, you would load and play actual sound effects
    // For now, we'll simulate the sound system
    console.log(`Playing sound effect: ${effect}`);

    // Simulate sound with Web Audio API (optional)
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Different frequencies for different effects
        switch(effect) {
            case 'doorOpen':
                oscillator.frequency.value = 200;
                gainNode.gain.value = 0.1;
                break;
            case 'portalEnter':
                oscillator.frequency.value = 400;
                gainNode.gain.value = 0.1;
                break;
            case 'artifactClick':
                oscillator.frequency.value = 600;
                gainNode.gain.value = 0.05;
                break;
            case 'hover':
                oscillator.frequency.value = 800;
                gainNode.gain.value = 0.02;
                break;
            default:
                oscillator.frequency.value = 440;
                gainNode.gain.value = 0.05;
        }

        oscillator.type = 'sine';
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        // Audio API not supported, silently fail
        console.log('Web Audio API not supported');
    }
}

// Particle Effects (for enhanced visual feedback)
function createParticles(x, y, color) {
    const particleCount = 10;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = color;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 2 + Math.random() * 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        animateParticle(particle, vx, vy);
    }
}

function animateParticle(particle, vx, vy) {
    let x = parseFloat(particle.style.left);
    let y = parseFloat(particle.style.top);
    let opacity = 1;

    function update() {
        x += vx;
        y += vy;
        opacity -= 0.02;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = opacity;

        if (opacity > 0) {
            requestAnimationFrame(update);
        } else {
            particle.remove();
        }
    }

    requestAnimationFrame(update);
}

// Add click particle effects to interactive elements
document.addEventListener('click', (e) => {
    if (e.target.closest('.portal, .artifact-pedestal, .entrance-door')) {
        createParticles(e.clientX, e.clientY, '#ffd700');
    }
});

// Keyboard Navigation (accessibility)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!document.getElementById('artifact-viewer').classList.contains('hidden')) {
            closeArtifactViewer();
        }
    }
});

// Performance optimization: Pause animations when not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause ambient sounds
        const ambientAudio = document.getElementById('ambient-sound');
        if (ambientAudio) ambientAudio.pause();
    } else {
        // Resume ambient sounds
        const ambientAudio = document.getElementById('ambient-sound');
        if (ambientAudio && state.currentScene !== 'entrance') {
            ambientAudio.play().catch(() => {});
        }
    }
});

// Console welcome message
console.log(`
╔════════════════════════════════════════════════╗
║  Welcome to Museum Portals                     ║
║  An Interactive Multi-Gallery Experience       ║
║                                                ║
║  Click the entrance door to begin your journey ║
╚════════════════════════════════════════════════╝
`);
