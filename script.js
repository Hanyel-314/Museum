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
    scale: 1,
    renderer3D: null
};

// Artifact Data with Museum-Quality Specifications
const artifactData = {
    'death-mask': {
        name: 'Egyptian Gold Funerary Mask',
        category: 'History/Artifact',
        scale_real_world: {height_cm: 57, width_cm: 39, depth_cm: 24},
        proportions: '接近成人脸型；颧骨略高，鼻梁笔直，假胡子前端微弯；额饰占面高的~18%',
        materials: [
            {type: 'gold_24k', percent: 0.85, pbr: {metallic: 1.0, roughness: 0.25, normal: 'hammered subtle', anisotropy: 0.1}},
            {type: 'lapis_lazuli_inlay', percent: 0.08, pbr: {metallic: 0.0, roughness: 0.35, normal: 'polished stone'}},
            {type: 'obsidian_pupil_quartz_sclera', percent: 0.04, pbr: {ior: 1.52, specular: 0.6}},
            {type: 'adhesive_resin_backing', percent: 0.03}
        ],
        colors_finish: '主体温暖金色(#D7B56D)；发箍条纹为深群青(#1D3B73)与金色交替；眼白微乳白；轻度古旧晕染',
        micro_details: [
            '金箔手锤痕呈非均匀橘皮，密度在颊与下颌更明显',
            '眉弓与唇线锐利倒角<0.4mm',
            '耳垂穿孔边缘轻微变钝',
            '额前双神兽（眼镜蛇+秃鹫）刻线细至0.2mm；边缘有低频划痕',
            '青金石内含金色黄铁矿点，随机分布'
        ],
        iconography_meaning: '王权、神性与来世守护；假胡子象征人与神合一',
        geometry_notes: '整体为薄壁壳体(壁厚1.2–1.8mm)；鼻翼双曲面过渡自然；颈缘内翻3–5mm形成加劲',
        texture_notes: '金面分2层：基底清洁金+上层\'三明治\'式污渍遮罩(晕影于边缘与凹部)；青金石使用点片遮罩模拟矿物闪点；眼部使用多层清漆高光贴图',
        lighting_notes: '主灯3200K自上35°强度1.2；背缘冷光5600K强度0.6；前方软箱填充强度0.4避免刺眼高光',
        display_mount: '黑色玄武岩台座+金色英文铭牌；隐形针脚从后颅内撑',
        camera_turntable: {pivot: '面部中心(鼻梁中点)', radius_cm: 85, elevation_deg: 10, step_deg: 5},
        interaction: '鼠标拖拽全向旋转；滚轮±80%缩放；热点：额饰/假胡子/眼部，悬停显示注解',
        description: 'Crafted from hammered and cast solid gold with lapis lazuli inlaid stripes, obsidian and quartz eyes. This masterwork (approx. 54-60 cm height) features delicate eyebrow ridge carving, subtle lip curve, pierced earlobes, braided ceremonial beard, and uraeus-vulture forehead crest. Surface shows fine chisel marks, subtle dents from hand-shaping, faint oxidation shadows on gold edges, and micro-scratches on cheek planes. The warm 24K gold with deep ultramarine lapis (with gold flecks) creates a polished yet aged patina. Symbolizes divine royalty, afterlife protection, and the unification of earthly king and god. Displayed on a matte black stone plinth with warm spotlight and soft back-rim glow emphasizing contours and gemstone reflections.'
    },
    'rosetta-stone': {
        name: 'Rosetta Stone',
        category: 'History/Ancient Artifact',
        scale_real_world: {height_cm: 112.3, width_cm: 75.7, thickness_cm: 28.4},
        proportions: '比例约3:2:0.75；顶部残缺约1/3；左侧略有缺损',
        materials: [
            {type: 'granodiorite', pbr: {metallic: 0.1, roughness: 0.85}},
            {type: 'inscribed_surface', pbr: {roughness: 0.9, normal: 'carved deep'}}
        ],
        colors_finish: '深灰至黑色(#2C2C2C)；铭文浅灰(#505050)；部分区域褐色风化',
        micro_details: [
            '顶部右角破损呈不规则碎片状',
            '铭文雕刻深度1-2mm，边缘略有磨损',
            '表面有细微裂纹与古代风化痕迹'
        ],
        iconography_meaning: '解密古埃及文字的钥匙；三种文字记载托勒密五世诏书',
        geometry_notes: '不规则矩形石碑；厚度不均；刻面略凹；三段文字区域明显',
        texture_notes: '玄武岩基底+雕刻法线贴图；顶部14行象形文字+中部32行通俗体+底部54行希腊文',
        lighting_notes: '侧光强调铭文阴影与浮雕深度；顶部柔光减少反光',
        display_mount: '黑色展台+玻璃防护罩',
        camera_turntable: {pivot: '石碑中心', radius_cm: 150, elevation_deg: 10, step_deg: 6},
        interaction: '旋转/缩放；点击文字区域显示三种文字对照与翻译',
        description: 'Ancient Egyptian granodiorite stele (196 BC) featuring the same decree in three scripts: hieroglyphic Egyptian (14 lines), Demotic script (32 lines), and ancient Greek (54 lines). Discovered in 1799 near Rosetta (Rashid), Egypt. The stone is dark gray to black basalt-like rock, measuring 112.3 cm high, 75.7 cm wide, and 28.4 cm thick, with the top right corner broken off. The inscriptions are deeply carved (1-2mm depth) with slight weathering. This artifact became the key to deciphering Egyptian hieroglyphs through comparison of the three parallel texts. Displayed on a black pedestal with directional lighting to emphasize the carved inscriptions.'
    },
    'scepter': {
        name: 'Ceremonial War Scepter',
        category: 'History/Regalia',
        scale_real_world: {length_cm: 118, shaft_diameter_cm: 3.2, head_length_cm: 14},
        proportions: '杆身与蛇首体积比约9:1；蛇首微俯视2°',
        materials: [
            {type: 'ebony_wood', pbr: {roughness: 0.45, specular: 0.35, normal: 'tight grain'}},
            {type: 'gold_serpent_head', pbr: {metallic: 1.0, roughness: 0.3}},
            {type: 'garnet_inlays', pbr: {ior: 1.83, absorption: 'deep red'}},
            {type: 'hemp_wrap', pbr: {roughness: 0.8}}
        ],
        colors_finish: '黑檀近黑(#1A1A1A)带油光；金色中亮；榴石酒红(#6A0F17)',
        micro_details: [
            '木材纵纹清晰，端部干裂0.2–0.5mm',
            '蛇鳞浮雕间可见打磨方向性',
            '麻绳纤维毛刺可见，末端胶封略泛黄'
        ],
        iconography_meaning: '守护与威慑，权力与号令的外化',
        geometry_notes: '杆身细长圆柱；蛇首NURBS样条形成连续曲面；眼窝镶嵌槽0.8mm倒角',
        texture_notes: '木材使用三层贴图：基色+法线(细纹) + 光泽变化遮罩；金件添加微凹坑与拉丝混合',
        lighting_notes: '侧逆光5600K加强轮廓；低位暖点光在蛇眼制造高光点',
        display_mount: '长条岩板+透明双臂支撑夹杆',
        camera_turntable: {pivot: '杆身几何中心', radius_cm: 140, elevation_deg: 8, step_deg: 8},
        interaction: '旋转/缩放；点击蛇眼触发红宝石折射放大视图',
        description: 'Commanding authority piece (110-120 cm length) crafted from ebony shaft with sculpted gold serpent head, garnet inset eyes, and rope-wrapped grip. The polished wood grain reveals hairline cracks, faint tool marks on gold serpent scales, and fraying fiber threads. Deep black ebony contrasts with rich gold (mild dulling at edges) and blood-red garnet glint. The coiled serpent motif represents authority, protection, intimidation, and divine command. Features balanced ceremonial proportions on a long slate base with transparent dual armature supports. Side rim accent lighting reveals serpent relief and garnet reflection.'
    },
    'trex': {
        name: 'Tyrannosaurus Rex Skull',
        category: 'Natural History/Fossil',
        scale_real_world: {length_cm: 145, width_cm: 95, height_cm: 105},
        proportions: '上颌体量大于下颌约1.25倍；颧弓外扩，眶孔深',
        materials: [
            {type: 'fossilized_bone', pbr: {roughness: 0.9, normal: 'porous high', ao: 1.0}},
            {type: 'calcite_deposits', pbr: {roughness: 0.6}}
        ],
        colors_finish: '赭褐到土黄分层；裂缝与孔洞内偏深灰；修复填充略偏浅',
        micro_details: [
            '牙齿有细密锯齿，部分缺口与磨耗平面',
            '缝合线交错呈\'Z\'形，宽0.5–2mm',
            '沉积物条带与钙华结壳随机分布'
        ],
        iconography_meaning: '顶级掠食者证据与地质时间的痕迹',
        geometry_notes: '空腔丰富、薄厚不均；保证鼻骨孔洞连通；齿列略内倾',
        texture_notes: '分物理层：基岩色+沉积遮罩+修复腻子颜色差异；厚度贴图用于边缘磨损',
        lighting_notes: '低位侧光制造强阴影；背光勾边；少量体积尘粒',
        display_mount: '暗灰金属骨架支撑，铭牌含地层信息',
        camera_turntable: {pivot: '颅骨质心(接近眶后)', radius_cm: 220, elevation_deg: 12, step_deg: 6},
        interaction: '旋转/缩放；热点：牙齿/缝合线/修复带，显示放大微观',
        description: 'Late Cretaceous apex predator (≈68 million years old). This fossilized bone skull (length 1.3-1.5 meters) features massive jaw hinge, predatory teeth with serration lines, and hollow orbital cavities. The surface displays erosion pits, porous bone texture, sediment filling cracks, and mineral deposits. Dark umber to ochre fossil tones show soil and calcite residue. Repaired fracture lines are visible throughout. Mounted on a matte steel frame with low side light and back glow for dramatic depth and shadows, emphasizing the power of Earth\'s most fearsome predator.'
    },
    'pterosaur': {
        name: 'Pteranodon Skeleton',
        category: 'Natural History/Fossil',
        scale_real_world: {wingspan_cm: 680, body_length_cm: 180},
        proportions: '翼指极长，翼骨截面薄；头冠与喙成流线',
        materials: [
            {type: 'fossil_bone_thin', pbr: {roughness: 0.85, normal: 'fine porous'}},
            {type: 'steel_suspension_wires', pbr: {metallic: 1.0, roughness: 0.5}}
        ],
        colors_finish: '浅褐—灰黄；骨面粉化哑光',
        micro_details: [
            '关节处补片线可见',
            '薄骨处半透效果，边缘轻度缺损',
            '喙端细微崩裂'
        ],
        iconography_meaning: '早期天空统治者的轻量结构',
        geometry_notes: '整体悬吊，翼骨需保持轻薄(<6mm)；喙为长锥体+细曲面过渡',
        texture_notes: '骨色底图叠加粉化遮罩；AO 强化翼骨孔洞',
        lighting_notes: '顶光冷白提升悬浮感；地面弱投影拉开空间',
        display_mount: '天花吊线+地面细杆定位，铭牌注明\'非恐龙\'',
        camera_turntable: {pivot: '胸带处', radius_cm: 380, elevation_deg: 20, step_deg: 10},
        interaction: '旋转/缩放；切换\'俯视/仰视\'两种相机预设',
        description: 'Late Cretaceous flying reptile with wingspan approximately 6-7 meters. Light fossilized bone mounted with thin suspension wires showcases delicate bone pores, fragile wing phalanges, and patch repair seams. Pale tan to soft grey fossil hues with chalky matte finish reveal the hollow-bone aerodynamic structure. Features long beak and elongated wing bones designed for flight. First dominators of the skies, these magnificent creatures achieved flight through remarkably lightweight construction. Ceiling suspension with minimal ground anchors and top-down cool light enhances the "floating" silhouette effect.'
    },
    'mammoth': {
        name: 'Woolly Mammoth Skull',
        category: 'Natural History/Fossil',
        scale_real_world: {skull_width_cm: 100, tusk_arc_cm: 180},
        proportions: '头骨厚重，颧骨外张；象牙对称外旋弧度',
        materials: [
            {type: 'fossil_bone_dense', pbr: {roughness: 0.8, normal: 'pitted'}},
            {type: 'ivory_tusks', pbr: {subsurface: 0.15, roughness: 0.55}}
        ],
        colors_finish: '骨灰白夹赭；象牙泛黄并具年轮状层理；泥渍色条带',
        micro_details: [
            '象牙尖端磨圆光滑；根部有修复抛光带',
            '骨面孔洞边缘脆化崩角',
            '细微盐析结晶点散布'
        ],
        iconography_meaning: '冰河纪巨兽与适应环境的形态证据',
        geometry_notes: '象牙为大半径样条旋转体；牙槽与象牙榫接需同心',
        texture_notes: '象牙层理用环向渐变+细裂纹遮罩；骨体AO加深孔洞',
        lighting_notes: '暖白斜射强调弧度；冷补光提骨面层级',
        display_mount: '橡木基座+金属支架固定象牙',
        camera_turntable: {pivot: '两牙弧线中点', radius_cm: 250, elevation_deg: 10, step_deg: 8},
        interaction: '旋转/缩放；热点：象牙层理/修复带/牙槽',
        description: 'Pleistocene ice age giant featuring fossil bone and ivory tusks (skull width 0.9-1.1 m; tusk arc 1.5-2 m) with natural cracking and mineral staining. Layered dentine rings in tusks, weathered bone pores, and flaking calcified texture showcase millennia of preservation. Bone-toned grey-white with warm mineral streaks; ivory yellowed with age. Large molar sockets and curved tusks with smooth abrasion at tips demonstrate adaptation for defense and snow digging. Mounted on solid wood base with steel tusk brackets. Warm diagonal light emphasizes curvature and fossil density of this magnificent tundra dweller that went extinct around 4,000 years ago.'
    },
    'mona-lisa': {
        name: 'Mona Lisa',
        category: 'Fine Art/Painting',
        scale_real_world: {height_cm: 77, width_cm: 53, frame_depth_cm: 6},
        proportions: '三分构图；人物上半身居中，双手叠置；背景远山透视',
        materials: [
            {type: 'oil_on_poplar_panel', pbr: {roughness: 0.3, sheen: 0.1}},
            {type: 'aged_varnish', pbr: {tint: 'slight amber'}}
        ],
        colors_finish: '肤色暖；衣物土色；背景冷绿与雾蓝；整体轻度棕黄色清漆化',
        micro_details: [
            '细致裂纹(craquelure)呈非规则网状，密度在暗部更高',
            '唇角与眼角软渐变；手背静脉轻描',
            '边框金箔局部脱落显木底'
        ],
        iconography_meaning: '人文主义与心理暧昧',
        geometry_notes: '作为平面作品，提供轻微法线凸显笔触；画框为巴洛克风金雕',
        texture_notes: '多层涂层：底绘/罩染/裂纹遮罩/清漆色偏；避免过度饱和',
        lighting_notes: '正面柔光，避免玻璃反光；弱顶光增强体积',
        display_mount: '金雕框+博物馆玻璃',
        camera_turntable: {pivot: '画芯中心', radius_cm: 140, elevation_deg: 0, step_deg: 12},
        interaction: '双击放大至面部与手部两处\'细节锚点\'',
        description: 'Leonardo da Vinci\'s revolutionary masterpiece (1503-1519), oil on wood panel using sfumato technique. Fine craquelure cracking, subtle glaze layers, and soft tonal transitions create the enigmatic expression. Aged varnish tint adds warmth to skin tones against cool misty landscape and earthy garments. The ambiguous smile, crossed hands, and atmospheric perspective background showcase humanist ideals and psychological ambiguity. Displayed in a gold-carved Renaissance frame with museum-grade glass. Soft diffused frontal lighting ensures no harsh reflections on this most famous painting, allowing viewers to experience the mystery that has captivated the world for centuries.'
    },
    'venus': {
        name: 'Venus de Milo',
        category: 'Fine Art/Sculpture',
        scale_real_world: {height_cm: 204, base_diameter_cm: 60},
        proportions: '头高比例≈1:7.25；躯干S形反向平衡；断臂处自然破断',
        materials: [
            {type: 'parian_marble', pbr: {roughness: 0.35, subsurface: 0.25, normal: 'fine chisel'}},
            {type: 'stone_base', pbr: {roughness: 0.7}}
        ],
        colors_finish: '暖白大理石；细微黄色化糖；点状矿物斑',
        micro_details: [
            '鼻梁与发丝边角轻磨损',
            '披帛褶皱锐利至0.6mm沟槽',
            '断口不规则、内部略粗糙'
        ],
        iconography_meaning: '理想化女性美与神性',
        geometry_notes: '保证衣褶的高低起伏与体块穿插；足趾与踝骨准确',
        texture_notes: '大理石细晶理理贴图+随机微裂；抛光高光只在突出部位增强',
        lighting_notes: '高位45°定向光塑形；背冷光分离背景',
        display_mount: '圆形石基与低护栏绳',
        camera_turntable: {pivot: '骨盆中心', radius_cm: 260, elevation_deg: 18, step_deg: 8},
        interaction: '旋转/缩放；按钮切换\'正侧背\'三视图',
        description: 'Ancient Greek sculpture (130-100 BC) carved from white Parian marble, standing approximately 2.0-2.1 meters tall. Smooth classical polish with slight grain texture, warm white with subtle yellow patina and mineral flecks. Notable features include chips at nose and hair, fractured arm stumps, draped classical garment folds, idealized anatomy, and graceful head tilt. Symbolizes feminine beauty and divine grace as Aphrodite, Greek goddess of love. Displayed on a circular stone base with low cord barrier. High directional spotlight creates sculptural shadow drama, revealing the extraordinary skill in depicting flowing fabric in stone despite the passage of millennia.'
    },
    'last-supper': {
        name: 'The Last Supper',
        category: 'Fine Art/Mural (Recreation)',
        scale_real_world: {height_cm: 420, width_cm: 880},
        proportions: '强线性透视汇聚后窗；人物横向分组节奏',
        materials: [
            {type: 'pigment_on_plaster_recreation', pbr: {roughness: 0.6}},
            {type: 'canvas_or_wall_support', pbr: {roughness: 0.8}}
        ],
        colors_finish: '土色系、赭红、群青低饱和；老化褪色整体柔和',
        micro_details: [
            '修复接缝与补绘边界可见',
            '桌布可见细网格纹理；器皿金属微反光',
            '人物衣褶边缘处出现细裂'
        ],
        iconography_meaning: '预告背叛的戏剧张力与群像心理',
        geometry_notes: '以平面为主，提供轻微法线表现壁面砂感与笔触；桌面器皿体量准确',
        texture_notes: '旧化层：裂纹遮罩+边角磨耗+色层不均；洗墙渲染保证整体读性',
        lighting_notes: '均匀洗墙光+上缘柔条光，控制反射眩光',
        display_mount: '大幅挂墙+保护说明铭牌',
        camera_turntable: {pivot: '画面几何中心', radius_cm: 500, elevation_deg: 0, step_deg: 15},
        interaction: '热点：耶稣/犹大/中央桌面器皿，点击放大并弹出注解',
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

    const data = artifactData[artifactId];
    if (data) {
        title.textContent = data.name;
        description.textContent = data.description;

        // Initialize 3D renderer if not already done
        if (!state.renderer3D) {
            state.renderer3D = new Artifact3DRenderer('viewer-canvas');
        }

        // Load the 3D model
        state.renderer3D.loadArtifact(artifactId, data);
        state.currentArtifact = artifactId;

        // Reset rotation
        state.rotationX = 0;
        state.rotationY = 0;
        state.scale = 1;

        viewer.classList.remove('hidden');
    }
}

function closeArtifactViewer() {
    const viewer = document.getElementById('artifact-viewer');
    viewer.classList.add('hidden');
    state.currentArtifact = null;

    // Stop animation to save resources
    if (state.renderer3D) {
        state.renderer3D.stopAnimation();
    }
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

    // Use 3D renderer's rotation method
    if (state.renderer3D) {
        state.renderer3D.rotateModel(deltaX, deltaY);
    }

    state.lastMouseX = clientX;
    state.lastMouseY = clientY;
}

function endDrag() {
    state.isDragging = false;
}

function zoom(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.2 : -0.2;

    // Use 3D renderer's zoom method
    if (state.renderer3D) {
        state.renderer3D.zoomModel(delta);
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

    // Use 3D renderer's rotation method
    if (state.renderer3D) {
        state.renderer3D.rotateModel(deltaX, deltaY);
    }

    state.lastMouseX = touchX;
    state.lastMouseY = touchY;
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
