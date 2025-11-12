// Museum Artifacts 3D Rendering System
// Using Three.js for photorealistic 3D models

class Artifact3DRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.currentModel = null;
        this.lights = [];
        this.animationId = null;

        this.init();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a1a);

        // Camera setup
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
        this.camera.position.z = 5;

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;

        // Clear container and add renderer
        this.container.innerHTML = '';
        this.container.appendChild(this.renderer.domElement);

        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    onWindowResize() {
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    clearScene() {
        // Remove current model
        if (this.currentModel) {
            this.scene.remove(this.currentModel);
            this.currentModel = null;
        }

        // Remove all lights
        this.lights.forEach(light => this.scene.remove(light));
        this.lights = [];
    }

    setupLighting(lightingSpec) {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
        this.scene.add(ambientLight);
        this.lights.push(ambientLight);

        // Main directional light
        const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
        mainLight.position.set(5, 10, 7.5);
        mainLight.castShadow = true;
        this.scene.add(mainLight);
        this.lights.push(mainLight);

        // Rim light
        const rimLight = new THREE.DirectionalLight(0x8888ff, 0.6);
        rimLight.position.set(-5, 3, -5);
        this.scene.add(rimLight);
        this.lights.push(rimLight);

        // Fill light
        const fillLight = new THREE.DirectionalLight(0xffffcc, 0.4);
        fillLight.position.set(0, -5, 5);
        this.scene.add(fillLight);
        this.lights.push(fillLight);
    }

    // ============ ARTIFACT MODELS ============

    createEgyptianMask() {
        const group = new THREE.Group();

        // Main face geometry
        const faceGeometry = new THREE.SphereGeometry(1, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.5);
        faceGeometry.scale(0.8, 1.0, 0.6);

        // Gold material with PBR properties
        const goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xD7B56D,
            metalness: 1.0,
            roughness: 0.25,
            envMapIntensity: 1.0
        });

        const face = new THREE.Mesh(faceGeometry, goldMaterial);
        group.add(face);

        // Headdress stripes (lapis lazuli)
        for (let i = 0; i < 8; i++) {
            const stripeGeometry = new THREE.BoxGeometry(1.6, 0.05, 0.7);
            const stripeMaterial = new THREE.MeshStandardMaterial({
                color: i % 2 === 0 ? 0x1D3B73 : 0xD7B56D,
                metalness: i % 2 === 0 ? 0.0 : 1.0,
                roughness: i % 2 === 0 ? 0.35 : 0.25
            });
            const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
            stripe.position.y = 1.0 + (i * 0.12);
            stripe.rotation.x = -0.2;
            group.add(stripe);
        }

        // Eyes
        const eyeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
        const eyeMaterial = new THREE.MeshStandardMaterial({
            color: 0x111111,
            metalness: 0.0,
            roughness: 0.1
        });

        const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        leftEye.position.set(-0.25, 0.3, 0.5);
        group.add(leftEye);

        const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        rightEye.position.set(0.25, 0.3, 0.5);
        group.add(rightEye);

        // Ceremonial beard
        const beardGeometry = new THREE.BoxGeometry(0.15, 0.6, 0.15);
        const beard = new THREE.Mesh(beardGeometry, goldMaterial);
        beard.position.set(0, -0.5, 0.4);
        beard.rotation.x = 0.2;
        group.add(beard);

        group.scale.set(0.8, 0.8, 0.8);
        return group;
    }

    createMedievalCrown() {
        const group = new THREE.Group();

        // Crown band
        const bandGeometry = new THREE.CylinderGeometry(1, 1, 0.3, 32);
        const goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xC7A45A,
            metalness: 1.0,
            roughness: 0.28
        });
        const band = new THREE.Mesh(bandGeometry, goldMaterial);
        group.add(band);

        // Crown arches
        const archGeometry = new THREE.TorusGeometry(0.7, 0.05, 16, 32, Math.PI);
        for (let i = 0; i < 4; i++) {
            const arch = new THREE.Mesh(archGeometry, goldMaterial);
            arch.rotation.z = (i * Math.PI / 2);
            arch.position.y = 0.3;
            group.add(arch);
        }

        // Cross on top
        const crossVertical = new THREE.BoxGeometry(0.08, 0.5, 0.08);
        const crossHorizontal = new THREE.BoxGeometry(0.3, 0.08, 0.08);
        const crossV = new THREE.Mesh(crossVertical, goldMaterial);
        const crossH = new THREE.Mesh(crossHorizontal, goldMaterial);
        crossV.position.y = 1.0;
        crossH.position.y = 1.1;
        group.add(crossV);
        group.add(crossH);

        // Gemstones around the band
        const gemColors = [0x0000ff, 0x00ff00, 0xff0000, 0xffffff];
        for (let i = 0; i < 8; i++) {
            const gemGeometry = new THREE.SphereGeometry(0.1, 16, 16);
            const gemMaterial = new THREE.MeshStandardMaterial({
                color: gemColors[i % 4],
                metalness: 0.0,
                roughness: 0.1,
                transparent: true,
                opacity: 0.9,
                envMapIntensity: 2.0
            });
            const gem = new THREE.Mesh(gemGeometry, gemMaterial);
            const angle = (i / 8) * Math.PI * 2;
            gem.position.x = Math.cos(angle) * 1.1;
            gem.position.z = Math.sin(angle) * 1.1;
            gem.position.y = 0;
            group.add(gem);
        }

        // Red velvet inner cap
        const velvetGeometry = new THREE.CylinderGeometry(0.9, 0.9, 0.2, 32);
        const velvetMaterial = new THREE.MeshStandardMaterial({
            color: 0x7B0E1A,
            metalness: 0.0,
            roughness: 0.9
        });
        const velvet = new THREE.Mesh(velvetGeometry, velvetMaterial);
        velvet.position.y = -0.1;
        group.add(velvet);

        group.scale.set(0.6, 0.6, 0.6);
        return group;
    }

    createCeremonialScepter() {
        const group = new THREE.Group();

        // Ebony shaft
        const shaftGeometry = new THREE.CylinderGeometry(0.08, 0.08, 4, 32);
        const ebonyMaterial = new THREE.MeshStandardMaterial({
            color: 0x1A1A1A,
            metalness: 0.1,
            roughness: 0.45
        });
        const shaft = new THREE.Mesh(shaftGeometry, ebonyMaterial);
        shaft.rotation.z = Math.PI / 2;
        group.add(shaft);

        // Gold serpent head
        const headGeometry = new THREE.SphereGeometry(0.25, 32, 32);
        const goldMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFD700,
            metalness: 1.0,
            roughness: 0.3
        });
        const head = new THREE.Mesh(headGeometry, goldMaterial);
        head.position.x = 2.2;
        head.scale.set(1.2, 1.0, 0.8);
        group.add(head);

        // Serpent eyes (garnets)
        const eyeGeometry = new THREE.SphereGeometry(0.06, 16, 16);
        const garnetMaterial = new THREE.MeshStandardMaterial({
            color: 0x6A0F17,
            metalness: 0.0,
            roughness: 0.2,
            transparent: true,
            opacity: 0.8
        });

        const leftEye = new THREE.Mesh(eyeGeometry, garnetMaterial);
        leftEye.position.set(2.3, 0.1, 0.15);
        group.add(leftEye);

        const rightEye = new THREE.Mesh(eyeGeometry, garnetMaterial);
        rightEye.position.set(2.3, 0.1, -0.15);
        group.add(rightEye);

        // Hemp wrap grip
        for (let i = 0; i < 10; i++) {
            const wrapGeometry = new THREE.TorusGeometry(0.1, 0.02, 8, 16);
            const hempMaterial = new THREE.MeshStandardMaterial({
                color: 0x8B7355,
                metalness: 0.0,
                roughness: 0.8
            });
            const wrap = new THREE.Mesh(wrapGeometry, hempMaterial);
            wrap.position.x = -0.5 + (i * 0.1);
            wrap.rotation.y = Math.PI / 2;
            group.add(wrap);
        }

        group.scale.set(0.4, 0.4, 0.4);
        return group;
    }

    createTRexSkull() {
        const group = new THREE.Group();

        // Main skull shape
        const skullGeometry = new THREE.BoxGeometry(2.5, 1.2, 1.5);
        const fossilMaterial = new THREE.MeshStandardMaterial({
            color: 0x8B7355,
            metalness: 0.0,
            roughness: 0.9
        });
        const skull = new THREE.Mesh(skullGeometry, fossilMaterial);
        skull.position.x = 0.5;
        group.add(skull);

        // Upper jaw
        const upperJawGeometry = new THREE.ConeGeometry(0.6, 1.5, 4);
        const upperJaw = new THREE.Mesh(upperJawGeometry, fossilMaterial);
        upperJaw.rotation.z = -Math.PI / 2;
        upperJaw.position.set(1.5, 0.3, 0);
        group.add(upperJaw);

        // Lower jaw
        const lowerJawGeometry = new THREE.ConeGeometry(0.5, 1.3, 4);
        const lowerJaw = new THREE.Mesh(lowerJawGeometry, fossilMaterial);
        lowerJaw.rotation.z = -Math.PI / 2;
        lowerJaw.position.set(1.4, -0.4, 0);
        group.add(lowerJaw);

        // Teeth
        const toothGeometry = new THREE.ConeGeometry(0.05, 0.3, 8);
        const toothMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFFFF0,
            metalness: 0.0,
            roughness: 0.7
        });

        for (let i = 0; i < 20; i++) {
            const tooth = new THREE.Mesh(toothGeometry, toothMaterial);
            tooth.position.set(
                1.0 + (i * 0.08),
                i % 2 === 0 ? 0.15 : -0.2,
                (i % 3 - 1) * 0.2
            );
            tooth.rotation.z = i % 2 === 0 ? Math.PI : 0;
            group.add(tooth);
        }

        // Eye sockets
        const socketGeometry = new THREE.SphereGeometry(0.25, 16, 16);
        const socketMaterial = new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            metalness: 0.0,
            roughness: 1.0
        });

        const leftSocket = new THREE.Mesh(socketGeometry, socketMaterial);
        leftSocket.position.set(0.8, 0.5, 0.6);
        group.add(leftSocket);

        const rightSocket = new THREE.Mesh(socketGeometry, socketMaterial);
        rightSocket.position.set(0.8, 0.5, -0.6);
        group.add(rightSocket);

        group.scale.set(0.5, 0.5, 0.5);
        return group;
    }

    createPteranodonSkeleton() {
        const group = new THREE.Group();

        const boneMaterial = new THREE.MeshStandardMaterial({
            color: 0xC8B895,
            metalness: 0.0,
            roughness: 0.85
        });

        // Body
        const bodyGeometry = new THREE.CylinderGeometry(0.15, 0.2, 0.8, 16);
        const body = new THREE.Mesh(bodyGeometry, boneMaterial);
        group.add(body);

        // Head with crest
        const headGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const head = new THREE.Mesh(headGeometry, boneMaterial);
        head.position.y = 0.6;
        head.scale.set(0.8, 1.0, 0.7);
        group.add(head);

        // Crest
        const crestGeometry = new THREE.ConeGeometry(0.1, 0.6, 8);
        const crest = new THREE.Mesh(crestGeometry, boneMaterial);
        crest.position.set(0, 0.9, -0.1);
        crest.rotation.x = -Math.PI / 4;
        group.add(crest);

        // Beak
        const beakGeometry = new THREE.ConeGeometry(0.05, 0.5, 8);
        const beak = new THREE.Mesh(beakGeometry, boneMaterial);
        beak.position.set(0, 0.6, 0.4);
        beak.rotation.x = Math.PI / 2;
        group.add(beak);

        // Wings
        const wingBoneGeometry = new THREE.CylinderGeometry(0.03, 0.03, 3, 8);

        // Left wing
        const leftWingUpper = new THREE.Mesh(wingBoneGeometry, boneMaterial);
        leftWingUpper.position.set(-1.5, 0.3, 0);
        leftWingUpper.rotation.z = Math.PI / 3;
        group.add(leftWingUpper);

        const leftWingLower = new THREE.Mesh(wingBoneGeometry, boneMaterial);
        leftWingLower.position.set(-3.5, -0.5, 0);
        leftWingLower.rotation.z = -Math.PI / 6;
        group.add(leftWingLower);

        // Right wing
        const rightWingUpper = new THREE.Mesh(wingBoneGeometry, boneMaterial);
        rightWingUpper.position.set(1.5, 0.3, 0);
        rightWingUpper.rotation.z = -Math.PI / 3;
        group.add(rightWingUpper);

        const rightWingLower = new THREE.Mesh(wingBoneGeometry, boneMaterial);
        rightWingLower.position.set(3.5, -0.5, 0);
        rightWingLower.rotation.z = Math.PI / 6;
        group.add(rightWingLower);

        group.scale.set(0.3, 0.3, 0.3);
        return group;
    }

    createMammothSkull() {
        const group = new THREE.Group();

        const boneMaterial = new THREE.MeshStandardMaterial({
            color: 0xD8D0C0,
            metalness: 0.0,
            roughness: 0.8
        });

        // Main skull
        const skullGeometry = new THREE.BoxGeometry(1.5, 1.2, 1.0);
        const skull = new THREE.Mesh(skullGeometry, boneMaterial);
        group.add(skull);

        // Tusks
        const tuskCurve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0.5, -0.5, 0.5),
            new THREE.Vector3(1.0, -0.5, 1.2),
            new THREE.Vector3(1.2, 0, 1.8)
        ]);

        const tuskGeometry = new THREE.TubeGeometry(tuskCurve, 20, 0.12, 8, false);
        const ivoryMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFF8DC,
            metalness: 0.0,
            roughness: 0.55
        });

        // Left tusk
        const leftTusk = new THREE.Mesh(tuskGeometry, ivoryMaterial);
        leftTusk.position.set(-0.3, -0.3, 0.5);
        group.add(leftTusk);

        // Right tusk (mirrored)
        const rightTusk = new THREE.Mesh(tuskGeometry, ivoryMaterial);
        rightTusk.position.set(0.3, -0.3, 0.5);
        rightTusk.scale.z = -1;
        group.add(rightTusk);

        // Eye sockets
        const socketGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const socketMaterial = new THREE.MeshStandardMaterial({
            color: 0x3a3a3a,
            metalness: 0.0,
            roughness: 1.0
        });

        const leftSocket = new THREE.Mesh(socketGeometry, socketMaterial);
        leftSocket.position.set(-0.5, 0.3, 0.4);
        group.add(leftSocket);

        const rightSocket = new THREE.Mesh(socketGeometry, socketMaterial);
        rightSocket.position.set(0.5, 0.3, 0.4);
        group.add(rightSocket);

        group.scale.set(0.6, 0.6, 0.6);
        return group;
    }

    createMonaLisa() {
        const group = new THREE.Group();

        // Try to load real image texture, fallback to procedural if not available
        const textureLoader = new THREE.TextureLoader();
        let paintingMaterial;

        // Array to track procedural elements for hiding when texture loads
        const proceduralElements = [];

        // Canvas with texture support
        const canvasGeometry = new THREE.PlaneGeometry(1.5, 2);
        paintingMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF, // White for texture
            metalness: 0.0,
            roughness: 0.3,
            side: THREE.DoubleSide
        });
        const canvas = new THREE.Mesh(canvasGeometry, paintingMaterial);
        group.add(canvas);

        // Fallback procedural representation (will be visible if image doesn't load)
        // Face outline (simplified representation)
        const faceGeometry = new THREE.CircleGeometry(0.3, 32);
        const faceMaterial = new THREE.MeshStandardMaterial({
            color: 0xF5CBA7,
            metalness: 0.0,
            roughness: 0.3,
            transparent: true,
            opacity: 0.8
        });
        const face = new THREE.Mesh(faceGeometry, faceMaterial);
        face.position.set(0, 0.4, 0.01);
        group.add(face);
        proceduralElements.push(face);

        // Hair
        const hairGeometry = new THREE.CircleGeometry(0.35, 32, 0, Math.PI);
        const hairMaterial = new THREE.MeshStandardMaterial({
            color: 0x3E2723,
            metalness: 0.0,
            roughness: 0.8,
            transparent: true,
            opacity: 0.8
        });
        const hair = new THREE.Mesh(hairGeometry, hairMaterial);
        hair.position.set(0, 0.65, 0.01);
        group.add(hair);
        proceduralElements.push(hair);

        // Dress
        const dressGeometry = new THREE.PlaneGeometry(0.8, 1.0);
        const dressMaterial = new THREE.MeshStandardMaterial({
            color: 0x5D4E37,
            metalness: 0.0,
            roughness: 0.7,
            transparent: true,
            opacity: 0.8
        });
        const dress = new THREE.Mesh(dressGeometry, dressMaterial);
        dress.position.set(0, -0.5, 0.01);
        group.add(dress);
        proceduralElements.push(dress);

        // Hands
        const handGeometry = new THREE.BoxGeometry(0.15, 0.1, 0.05);
        const handMaterial = new THREE.MeshStandardMaterial({
            color: 0xF5CBA7,
            metalness: 0.0,
            roughness: 0.4,
            transparent: true,
            opacity: 0.8
        });

        const leftHand = new THREE.Mesh(handGeometry, handMaterial);
        leftHand.position.set(-0.2, -0.3, 0.02);
        group.add(leftHand);
        proceduralElements.push(leftHand);

        const rightHand = new THREE.Mesh(handGeometry, handMaterial);
        rightHand.position.set(0.15, -0.35, 0.02);
        group.add(rightHand);
        proceduralElements.push(rightHand);

        // Attempt to load the uploaded Mona Lisa image
        const imagePath = 'images/mona-lisa.jpg'; // Or .png
        textureLoader.load(
            imagePath,
            // Success callback
            (texture) => {
                console.log('Mona Lisa texture loaded successfully');
                paintingMaterial.map = texture;
                paintingMaterial.needsUpdate = true;
                // Hide procedural elements when real image loads
                for (let i = 0; i < proceduralElements.length; i++) {
                    proceduralElements[i].visible = false;
                }
            },
            // Progress callback
            undefined,
            // Error callback
            (error) => {
                console.log('Using procedural Mona Lisa (no image found at ' + imagePath + ')');
            }
        );

        // Ornate frame
        const frameThickness = 0.15;
        const frameDepth = 0.1;
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0xDAA520,
            metalness: 0.8,
            roughness: 0.3
        });

        // Frame pieces
        const topFrame = new THREE.BoxGeometry(1.8, frameThickness, frameDepth);
        const bottomFrame = new THREE.BoxGeometry(1.8, frameThickness, frameDepth);
        const leftFrame = new THREE.BoxGeometry(frameThickness, 2.3, frameDepth);
        const rightFrame = new THREE.BoxGeometry(frameThickness, 2.3, frameDepth);

        const top = new THREE.Mesh(topFrame, frameMaterial);
        top.position.set(0, 1.075, -0.05);
        group.add(top);

        const bottom = new THREE.Mesh(bottomFrame, frameMaterial);
        bottom.position.set(0, -1.075, -0.05);
        group.add(bottom);

        const left = new THREE.Mesh(leftFrame, frameMaterial);
        left.position.set(-0.825, 0, -0.05);
        group.add(left);

        const right = new THREE.Mesh(rightFrame, frameMaterial);
        right.position.set(0.825, 0, -0.05);
        group.add(right);

        group.scale.set(0.7, 0.7, 0.7);
        return group;
    }

    createVenusStatue() {
        const group = new THREE.Group();

        const marbleMaterial = new THREE.MeshStandardMaterial({
            color: 0xF5F5DC,
            metalness: 0.0,
            roughness: 0.35
        });

        // Torso
        const torsoGeometry = new THREE.CylinderGeometry(0.4, 0.45, 1.2, 32);
        const torso = new THREE.Mesh(torsoGeometry, marbleMaterial);
        torso.position.y = 0.5;
        group.add(torso);

        // Head
        const headGeometry = new THREE.SphereGeometry(0.25, 32, 32);
        const head = new THREE.Mesh(headGeometry, marbleMaterial);
        head.position.y = 1.35;
        head.scale.set(0.9, 1.1, 0.9);
        group.add(head);

        // Neck
        const neckGeometry = new THREE.CylinderGeometry(0.15, 0.18, 0.25, 16);
        const neck = new THREE.Mesh(neckGeometry, marbleMaterial);
        neck.position.y = 1.15;
        group.add(neck);

        // Hips/Lower body
        const hipsGeometry = new THREE.SphereGeometry(0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6);
        const hips = new THREE.Mesh(hipsGeometry, marbleMaterial);
        hips.position.y = -0.2;
        hips.rotation.x = Math.PI;
        group.add(hips);

        // Draped cloth
        const clothGeometry = new THREE.CylinderGeometry(0.48, 0.52, 0.8, 32);
        const cloth = new THREE.Mesh(clothGeometry, marbleMaterial);
        cloth.position.y = -0.5;
        group.add(cloth);

        // Base
        const baseGeometry = new THREE.CylinderGeometry(0.6, 0.65, 0.3, 32);
        const baseMaterial = new THREE.MeshStandardMaterial({
            color: 0xA0A0A0,
            metalness: 0.0,
            roughness: 0.7
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.y = -1.0;
        group.add(base);

        group.scale.set(0.6, 0.6, 0.6);
        return group;
    }

    createLastSupper() {
        const group = new THREE.Group();

        // Try to load real image texture
        const textureLoader = new THREE.TextureLoader();
        let muralMaterial;

        // Attempt to load the Last Supper image
        const imagePath = 'images/last-supper.jpg';
        textureLoader.load(
            imagePath,
            // Success callback
            (texture) => {
                console.log('Last Supper texture loaded successfully');
                muralMaterial.map = texture;
                muralMaterial.needsUpdate = true;
                // Hide procedural elements when texture loads
                table.visible = false;
                wall.visible = false;
                for (let i = 0; i < figures.length; i++) {
                    figures[i].visible = false;
                }
            },
            // Progress callback
            undefined,
            // Error callback
            (error) => {
                console.log('Using procedural Last Supper (no image found at ' + imagePath + ')');
            }
        );

        // Main canvas with texture support
        const canvasGeometry = new THREE.PlaneGeometry(4, 2);
        muralMaterial = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF, // White for texture
            metalness: 0.0,
            roughness: 0.6,
            side: THREE.DoubleSide
        });
        const canvas = new THREE.Mesh(canvasGeometry, muralMaterial);
        group.add(canvas);

        // Fallback procedural elements
        // Table (simplified)
        const tableGeometry = new THREE.BoxGeometry(3.5, 0.15, 0.6);
        const tableMaterial = new THREE.MeshStandardMaterial({
            color: 0x5D4E37,
            metalness: 0.0,
            roughness: 0.7,
            transparent: true,
            opacity: 0.8
        });
        const table = new THREE.Mesh(tableGeometry, tableMaterial);
        table.position.set(0, -0.3, 0.01);
        group.add(table);

        // Simplified figures (13 rectangles representing people)
        const figureMaterial = new THREE.MeshStandardMaterial({
            color: 0x6B4423,
            metalness: 0.0,
            roughness: 0.6,
            transparent: true,
            opacity: 0.8
        });

        const figures = [];
        for (let i = 0; i < 13; i++) {
            const figureGeometry = new THREE.BoxGeometry(0.25, 0.6, 0.05);
            const figure = new THREE.Mesh(figureGeometry, figureMaterial);
            figure.position.set(-1.5 + (i * 0.25), 0.3, 0.02);

            // Central figure (Jesus) slightly larger
            if (i === 6) {
                figure.scale.set(1.2, 1.2, 1);
                figure.material = new THREE.MeshStandardMaterial({
                    color: 0x8B6914,
                    metalness: 0.0,
                    roughness: 0.5,
                    transparent: true,
                    opacity: 0.8
                });
            }

            figures.push(figure);
            group.add(figure);
        }

        // Back wall with perspective
        const wallGeometry = new THREE.PlaneGeometry(3.8, 1.5);
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: 0x9E7D5A,
            metalness: 0.0,
            roughness: 0.8,
            transparent: true,
            opacity: 0.8
        });
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(0, 0.5, -0.01);
        group.add(wall);

        // Frame
        const frameThickness = 0.2;
        const frameDepth = 0.15;
        const frameMaterial = new THREE.MeshStandardMaterial({
            color: 0x8B7355,
            metalness: 0.2,
            roughness: 0.5
        });

        const topFrame = new THREE.BoxGeometry(4.4, frameThickness, frameDepth);
        const bottomFrame = new THREE.BoxGeometry(4.4, frameThickness, frameDepth);
        const leftFrame = new THREE.BoxGeometry(frameThickness, 2.4, frameDepth);
        const rightFrame = new THREE.BoxGeometry(frameThickness, 2.4, frameDepth);

        const top = new THREE.Mesh(topFrame, frameMaterial);
        top.position.set(0, 1.1, -0.08);
        group.add(top);

        const bottom = new THREE.Mesh(bottomFrame, frameMaterial);
        bottom.position.set(0, -1.1, -0.08);
        group.add(bottom);

        const left = new THREE.Mesh(leftFrame, frameMaterial);
        left.position.set(-2.1, 0, -0.08);
        group.add(left);

        const right = new THREE.Mesh(rightFrame, frameMaterial);
        right.position.set(2.1, 0, -0.08);
        group.add(right);

        group.scale.set(0.5, 0.5, 0.5);
        return group;
    }

    // ============ MAIN LOADING FUNCTION ============

    loadArtifact(artifactId, data) {
        this.clearScene();
        this.setupLighting(data.lighting_notes);

        // Create appropriate model based on artifact ID
        let model;
        switch(artifactId) {
            case 'death-mask':
                model = this.createEgyptianMask();
                this.camera.position.set(0, 0, 3);
                break;
            case 'crown':
                model = this.createMedievalCrown();
                this.camera.position.set(0, 1, 3);
                break;
            case 'scepter':
                model = this.createCeremonialScepter();
                this.camera.position.set(0, 0, 4);
                break;
            case 'trex':
                model = this.createTRexSkull();
                this.camera.position.set(2, 1, 4);
                break;
            case 'pterosaur':
                model = this.createPteranodonSkeleton();
                this.camera.position.set(0, 1, 5);
                break;
            case 'mammoth':
                model = this.createMammothSkull();
                this.camera.position.set(0, 0, 4);
                break;
            case 'mona-lisa':
                model = this.createMonaLisa();
                this.camera.position.set(0, 0, 3);
                break;
            case 'venus':
                model = this.createVenusStatue();
                this.camera.position.set(0, 0.5, 4);
                break;
            case 'last-supper':
                model = this.createLastSupper();
                this.camera.position.set(0, 0, 4);
                break;
            default:
                console.error('Unknown artifact:', artifactId);
                return;
        }

        if (model) {
            this.currentModel = model;
            this.scene.add(model);
            this.startAnimation();
        }
    }

    startAnimation() {
        const animate = () => {
            this.animationId = requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }

    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    // Rotation control for user interaction
    rotateModel(deltaX, deltaY) {
        if (this.currentModel) {
            this.currentModel.rotation.y += deltaX * 0.01;
            this.currentModel.rotation.x += deltaY * 0.01;
        }
    }

    // Zoom control
    zoomModel(delta) {
        this.camera.position.z += delta;
        this.camera.position.z = Math.max(1, Math.min(10, this.camera.position.z));
    }
}

// Make it globally accessible
window.Artifact3DRenderer = Artifact3DRenderer;
