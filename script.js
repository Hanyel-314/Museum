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
        name: 'Egyptian Gold Funerary Mask',
        description: 'Crafted from hammered and cast solid gold with lapis lazuli inlaid stripes, obsidian and quartz eyes. This masterwork (approx. 54-60 cm height) features delicate eyebrow ridge carving, subtle lip curve, pierced earlobes, braided ceremonial beard, and uraeus-vulture forehead crest. Surface shows fine chisel marks, subtle dents from hand-shaping, faint oxidation shadows on gold edges, and micro-scratches on cheek planes. The warm 24K gold with deep ultramarine lapis (with gold flecks) creates a polished yet aged patina. Symbolizes divine royalty, afterlife protection, and the unification of earthly king and god. Displayed on a matte black stone plinth with warm spotlight and soft back-rim glow emphasizing contours and gemstone reflections.'
    },
    'crown': {
        name: 'Medieval Royal Crown',
        description: '14th-century ceremonial masterpiece featuring a gold band with gothic arches, velvet inner cap, and claw-set sapphires, emeralds, rubies, and diamonds (approx. 20-22 cm diameter). The antique gold tone shows tarnished edges with micro chips in gemstones and hand-stitched gold thread slightly frayed inside rim. Deep royal velvet red exhibits slight sun-fading. Ornate details include fleur-de-lis motifs, central cross finial, and jewel settings with visible prongs. Symbolizes divine right of kings and military/spiritual authority. Displayed on a round silk-lined pedestal cushion with cool and warm mixed beams to enhance gem refractive sparkle.'
    },
    'scepter': {
        name: 'Ceremonial War Scepter',
        description: 'Commanding authority piece (110-120 cm length) crafted from ebony shaft with sculpted gold serpent head, garnet inset eyes, and rope-wrapped grip. The polished wood grain reveals hairline cracks, faint tool marks on gold serpent scales, and fraying fiber threads. Deep black ebony contrasts with rich gold (mild dulling at edges) and blood-red garnet glint. The coiled serpent motif represents authority, protection, intimidation, and divine command. Features balanced ceremonial proportions on a long slate base with transparent dual armature supports. Side rim accent lighting reveals serpent relief and garnet reflection.'
    },
    'trex': {
        name: 'Tyrannosaurus Rex Skull',
        description: 'Late Cretaceous apex predator (≈68 million years old). This fossilized bone skull (length 1.3-1.5 meters) features massive jaw hinge, predatory teeth with serration lines, and hollow orbital cavities. The surface displays erosion pits, porous bone texture, sediment filling cracks, and mineral deposits. Dark umber to ochre fossil tones show soil and calcite residue. Repaired fracture lines are visible throughout. Mounted on a matte steel frame with low side light and back glow for dramatic depth and shadows, emphasizing the power of Earth\'s most fearsome predator.'
    },
    'pterosaur': {
        name: 'Pteranodon Skeleton',
        description: 'Late Cretaceous flying reptile with wingspan approximately 6-7 meters. Light fossilized bone mounted with thin suspension wires showcases delicate bone pores, fragile wing phalanges, and patch repair seams. Pale tan to soft grey fossil hues with chalky matte finish reveal the hollow-bone aerodynamic structure. Features long beak and elongated wing bones designed for flight. First dominators of the skies, these magnificent creatures achieved flight through remarkably lightweight construction. Ceiling suspension with minimal ground anchors and top-down cool light enhances the "floating" silhouette effect.'
    },
    'mammoth': {
        name: 'Woolly Mammoth Skull',
        description: 'Pleistocene ice age giant featuring fossil bone and ivory tusks (skull width 0.9-1.1 m; tusk arc 1.5-2 m) with natural cracking and mineral staining. Layered dentine rings in tusks, weathered bone pores, and flaking calcified texture showcase millennia of preservation. Bone-toned grey-white with warm mineral streaks; ivory yellowed with age. Large molar sockets and curved tusks with smooth abrasion at tips demonstrate adaptation for defense and snow digging. Mounted on solid wood base with steel tusk brackets. Warm diagonal light emphasizes curvature and fossil density of this magnificent tundra dweller that went extinct around 4,000 years ago.'
    },
    'mona-lisa': {
        name: 'Mona Lisa',
        description: 'Leonardo da Vinci\'s revolutionary masterpiece (1503-1519), oil on wood panel using sfumato technique. Fine craquelure cracking, subtle glaze layers, and soft tonal transitions create the enigmatic expression. Aged varnish tint adds warmth to skin tones against cool misty landscape and earthy garments. The ambiguous smile, crossed hands, and atmospheric perspective background showcase humanist ideals and psychological ambiguity. Displayed in a gold-carved Renaissance frame with museum-grade glass. Soft diffused frontal lighting ensures no harsh reflections on this most famous painting, allowing viewers to experience the mystery that has captivated the world for centuries.'
    },
    'venus': {
        name: 'Venus de Milo',
        description: 'Ancient Greek sculpture (130-100 BC) carved from white Parian marble, standing approximately 2.0-2.1 meters tall. Smooth classical polish with slight grain texture, warm white with subtle yellow patina and mineral flecks. Notable features include chips at nose and hair, fractured arm stumps, draped classical garment folds, idealized anatomy, and graceful head tilt. Symbolizes feminine beauty and divine grace as Aphrodite, Greek goddess of love. Displayed on a circular stone base with low cord barrier. High directional spotlight creates sculptural shadow drama, revealing the extraordinary skill in depicting flowing fabric in stone despite the passage of millennia.'
    },
    'last-supper': {
        name: 'The Last Supper',
        description: 'Leonardo da Vinci\'s monumental composition (1495-1498), mural recreation on treated canvas. Visible restoration seams, fine pigment aging, and micro crackle reveal centuries of preservation efforts. Earth pigments create muted blues and reds with aged brightness. Linear perspective to rear window creates remarkable architectural depth, while expressive apostles display symbolic gestures capturing the moment of betrayal prophecy. The textile pattern on tablecloth and careful composition demonstrate da Vinci\'s genius in human emotional drama. Museum hanging with conservation notes and even wall-washer lighting plus soft overhead strip to avoid glare, preserving this masterwork of faith, betrayal, and human emotion for future generations.'
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
