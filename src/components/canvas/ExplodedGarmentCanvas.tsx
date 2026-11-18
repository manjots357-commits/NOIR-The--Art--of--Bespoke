import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface ExplodedGarmentCanvasProps {
  modelType: 'shirt' | 'waistcoat' | 'suit';
  explosionProgress: number; // 0 (assembled) to 1 (fully exploded)
  isRotating: boolean;
  onHoverPart?: (partName: string | null) => void;
  className?: string;
}

export const ExplodedGarmentCanvas: React.FC<ExplodedGarmentCanvasProps> = ({
  modelType,
  explosionProgress,
  isRotating,
  onHoverPart,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const stateRef = useRef({
    modelType,
    explosionProgress,
    isRotating,
    mouseX: 0,
    mouseY: 0,
    targetRotationY: 0,
    currentRotationY: 0,
    targetRotationX: 0,
    currentRotationX: 0,
  });

  // Keep stateRef up to date without re-triggering full three scene remount
  useEffect(() => {
    stateRef.current.modelType = modelType;
    stateRef.current.explosionProgress = explosionProgress;
    stateRef.current.isRotating = isRotating;
  }, [modelType, explosionProgress, isRotating]);

  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Detect software WebGL safely
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 2. Setup Three.js Renderer
    const width = canvas.clientWidth || 800;
    const height = canvas.clientHeight || 600;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 3. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.045);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 5.8);

    // Studio Environment map using RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig
    // Overhead dramatic spotlight
    const spotLight = new THREE.SpotLight(0xfff5ea, 5.5);
    spotLight.position.set(0, 6, 2.5);
    spotLight.angle = Math.PI / 4.5;
    spotLight.penumbra = 0.85;
    spotLight.castShadow = !isSoftwareGl;
    if (spotLight.shadow) {
      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;
      spotLight.shadow.bias = -0.0005;
    }
    scene.add(spotLight);

    // Warm Key Light from upper right
    const keyLight = new THREE.DirectionalLight(0xffebd2, 2.2);
    keyLight.position.set(4, 3, 4);
    keyLight.castShadow = !isSoftwareGl;
    scene.add(keyLight);

    // Cool Rim Light from back left
    const rimLight = new THREE.DirectionalLight(0xc9d6e8, 2.8);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // Soft ground fill
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x111111, 0.7);
    scene.add(hemiLight);

    // 5. Floor Reflection & Shadow Plane
    const floorGeo = new THREE.PlaneGeometry(14, 14);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x080808,
      roughness: 0.2,
      metalness: 0.8,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -2.1;
    floorMesh.receiveShadow = !isSoftwareGl;
    scene.add(floorMesh);

    // Soft radial contact shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0,0,0,0.85)');
      grad.addColorStop(0.5, 'rgba(0,0,0,0.3)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const contactShadowGeo = new THREE.PlaneGeometry(4.5, 4.5);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = -2.08;
    scene.add(contactShadow);

    // 6. Atmospheric Dust Motes
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc5a46d,
      size: 0.025,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Procedural Materials
    // A. Crisp White Egyptian Cotton Twill
    const shirtClothMat = new THREE.MeshStandardMaterial({
      color: 0xf6f4ef,
      roughness: 0.65,
      metalness: 0.04,
      bumpScale: 0.02,
    });

    // Mother of Pearl button material
    const mopButtonMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.1,
      clearcoat: 0.9,
      clearcoatRoughness: 0.1,
      reflectivity: 0.7,
    });

    // B. Super 150s Worsted Wool (Charcoal / Navy)
    const woolMat = new THREE.MeshStandardMaterial({
      color: 0x161617,
      roughness: 0.78,
      metalness: 0.08,
    });

    // Horsehair Canvas interlining (golden beige organic weave)
    const canvasInterliningMat = new THREE.MeshStandardMaterial({
      color: 0xb49a78,
      roughness: 0.9,
      metalness: 0.02,
      wireframe: false,
    });

    // Silk Damask / Cupro Lining
    const silkLiningMat = new THREE.MeshPhysicalMaterial({
      color: 0x221c19,
      roughness: 0.35,
      metalness: 0.25,
      clearcoat: 0.5,
    });

    // Buffalo Horn Buttons
    const hornButtonMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1614,
      roughness: 0.3,
      metalness: 0.15,
      clearcoat: 0.6,
    });

    // Accent Gold / Brass
    const brassMat = new THREE.MeshPhysicalMaterial({
      color: 0xc5a46d,
      roughness: 0.25,
      metalness: 0.92,
      clearcoat: 0.4,
    });

    // ==========================================
    // 8. PROCEDURAL 3D MODELS ASSEMBLY
    // ==========================================

    interface ExplodablePart {
      mesh: THREE.Object3D;
      assembledPos: THREE.Vector3;
      explodedPos: THREE.Vector3;
      assembledRot: THREE.Euler;
      explodedRot: THREE.Euler;
      name: string;
      category: 'shirt' | 'waistcoat' | 'suit';
    }

    const explodableParts: ExplodablePart[] = [];

    // Helper: Register Part
    const registerPart = (
      mesh: THREE.Object3D,
      assembledPos: [number, number, number],
      explodedPos: [number, number, number],
      assembledRot: [number, number, number],
      explodedRot: [number, number, number],
      name: string,
      category: 'shirt' | 'waistcoat' | 'suit'
    ) => {
      mesh.position.set(...assembledPos);
      mesh.rotation.set(...assembledRot);
      mesh.userData = { name, category };
      explodableParts.push({
        mesh,
        assembledPos: new THREE.Vector3(...assembledPos),
        explodedPos: new THREE.Vector3(...explodedPos),
        assembledRot: new THREE.Euler(...assembledRot),
        explodedRot: new THREE.Euler(...explodedRot),
        name,
        category,
      });
    };

    // ----------------------------------------
    // GARMENT 1: EGYPTIAN COTTON DRESS SHIRT
    // ----------------------------------------
    const shirtGroup = new THREE.Group();
    shirtGroup.name = 'shirtGroup';

    // Torso (front body with placket)
    const shirtTorsoGeo = new THREE.CylinderGeometry(0.72, 0.65, 1.8, 24, 1, false, -Math.PI / 2, Math.PI);
    shirtTorsoGeo.scale(1.15, 1.0, 0.7);
    const shirtTorsoMesh = new THREE.Mesh(shirtTorsoGeo, shirtClothMat);
    shirtTorsoMesh.castShadow = !isSoftwareGl;
    shirtTorsoMesh.receiveShadow = !isSoftwareGl;

    // Placket line
    const placketGeo = new THREE.BoxGeometry(0.08, 1.75, 0.04);
    const placketMesh = new THREE.Mesh(placketGeo, shirtClothMat);
    placketMesh.position.set(0, 0, 0.46);
    shirtTorsoMesh.add(placketMesh);

    // Mother of pearl buttons down placket
    for (let i = 0; i < 5; i++) {
      const btnGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.015, 16);
      btnGeo.rotateX(Math.PI / 2);
      const btn = new THREE.Mesh(btnGeo, mopButtonMat);
      btn.position.set(0, 0.6 - i * 0.3, 0.49);
      shirtTorsoMesh.add(btn);
    }

    registerPart(shirtTorsoMesh, [0, 0, 0], [0, 0, -0.2], [0, 0, 0], [0, 0, 0], 'Shirt Body & Placket', 'shirt');
    shirtGroup.add(shirtTorsoMesh);

    // Collar
    const collarGroup = new THREE.Group();
    const collarBandGeo = new THREE.CylinderGeometry(0.38, 0.42, 0.22, 24, 1, true, -Math.PI / 1.5, Math.PI * 1.33);
    const collarBand = new THREE.Mesh(collarBandGeo, shirtClothMat);
    collarGroup.add(collarBand);

    // Collar leaf points
    const leftLeafGeo = new THREE.BufferGeometry();
    const leafVertices = new Float32Array([
      -0.05, 0.1, 0.4,
      -0.35, -0.15, 0.52,
      -0.2, 0.1, 0.35
    ]);
    leftLeafGeo.setAttribute('position', new THREE.BufferAttribute(leafVertices, 3));
    leftLeafGeo.computeVertexNormals();
    const leftLeaf = new THREE.Mesh(leftLeafGeo, shirtClothMat);
    collarGroup.add(leftLeaf);

    const rightLeafGeo = leftLeafGeo.clone();
    rightLeafGeo.scale(-1, 1, 1);
    const rightLeaf = new THREE.Mesh(rightLeafGeo, shirtClothMat);
    collarGroup.add(rightLeaf);

    registerPart(collarGroup, [0, 0.95, 0], [0, 1.5, -0.1], [0, 0, 0], [-0.15, 0, 0], 'Turned Spread Collar', 'shirt');
    shirtGroup.add(collarGroup);

    // Left Sleeve
    const sleeveCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-0.4, -0.7, 0.05),
      new THREE.Vector3(-0.55, -1.35, 0.1)
    );
    const sleeveGeo = new THREE.TubeGeometry(sleeveCurve, 16, 0.22, 16, false);
    const leftSleeveMesh = new THREE.Mesh(sleeveGeo, shirtClothMat);
    registerPart(leftSleeveMesh, [-0.78, 0.72, 0], [-1.85, 0.55, 0.3], [0, 0, 0.2], [0, 0.3, 0.45], 'Left Sleeve (140-Ply Twill)', 'shirt');
    shirtGroup.add(leftSleeveMesh);

    // Right Sleeve
    const rightSleeveGeo = sleeveGeo.clone();
    rightSleeveGeo.scale(-1, 1, 1);
    const rightSleeveMesh = new THREE.Mesh(rightSleeveGeo, shirtClothMat);
    registerPart(rightSleeveMesh, [0.78, 0.72, 0], [1.85, 0.55, 0.3], [0, 0, -0.2], [0, -0.3, -0.45], 'Right Sleeve (140-Ply Twill)', 'shirt');
    shirtGroup.add(rightSleeveMesh);

    // Left Cuff
    const cuffGeo = new THREE.CylinderGeometry(0.24, 0.23, 0.22, 20);
    const leftCuffMesh = new THREE.Mesh(cuffGeo, shirtClothMat);
    const cuffBtnGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.015, 12);
    cuffBtnGeo.rotateZ(Math.PI / 2);
    const cuffBtn = new THREE.Mesh(cuffBtnGeo, mopButtonMat);
    cuffBtn.position.set(-0.24, 0, 0);
    leftCuffMesh.add(cuffBtn);
    registerPart(leftCuffMesh, [-1.35, -0.65, 0.1], [-2.6, -1.0, 0.5], [0, 0, 0.3], [0, 0.4, 0.6], 'Left Mitered Barrel Cuff', 'shirt');
    shirtGroup.add(leftCuffMesh);

    // Right Cuff
    const rightCuffMesh = leftCuffMesh.clone();
    registerPart(rightCuffMesh, [1.35, -0.65, 0.1], [2.6, -1.0, 0.5], [0, 0, -0.3], [0, -0.4, -0.6], 'Right Mitered Barrel Cuff', 'shirt');
    shirtGroup.add(rightCuffMesh);

    scene.add(shirtGroup);

    // ----------------------------------------
    // GARMENT 2: THE STRUCTURED WAISTCOAT
    // ----------------------------------------
    const waistcoatGroup = new THREE.Group();
    waistcoatGroup.name = 'waistcoatGroup';
    waistcoatGroup.visible = false;

    // Left Front Panel
    const wFrontLGeo = new THREE.BoxGeometry(0.65, 1.45, 0.06);
    const wFrontL = new THREE.Mesh(wFrontLGeo, woolMat);
    // Add welt pockets
    const weltGeo = new THREE.BoxGeometry(0.28, 0.03, 0.02);
    const weltL = new THREE.Mesh(weltGeo, woolMat);
    weltL.position.set(0.05, -0.35, 0.04);
    wFrontL.add(weltL);
    registerPart(wFrontL, [-0.35, 0, 0.22], [-1.05, 0, 0.65], [0, 0.1, 0.02], [0, 0.35, 0.1], 'Left Front Waistcoat Panel', 'waistcoat');
    waistcoatGroup.add(wFrontL);

    // Right Front Panel
    const wFrontRGeo = new THREE.BoxGeometry(0.65, 1.45, 0.06);
    const wFrontR = new THREE.Mesh(wFrontRGeo, woolMat);
    const weltR = new THREE.Mesh(weltGeo, woolMat);
    weltR.position.set(-0.05, -0.35, 0.04);
    wFrontR.add(weltR);
    registerPart(wFrontR, [0.35, 0, 0.22], [1.05, 0, 0.65], [0, -0.1, -0.02], [0, -0.35, -0.1], 'Right Front Waistcoat Panel', 'waistcoat');
    waistcoatGroup.add(wFrontR);

    // Waistcoat Buttons
    const wBtnGroup = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const bGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.02, 16);
      bGeo.rotateX(Math.PI / 2);
      const b = new THREE.Mesh(bGeo, hornButtonMat);
      b.position.set(0, 0.42 - i * 0.18, 0);
      wBtnGroup.add(b);
    }
    registerPart(wBtnGroup, [0.03, 0, 0.28], [0.03, 0, 1.1], [0, 0, 0], [0, 0, 0], 'Genuine Horn Button Stance', 'waistcoat');
    waistcoatGroup.add(wBtnGroup);

    // Silk Damask Back Panel with Buckle
    const wBackGeo = new THREE.BoxGeometry(1.2, 1.4, 0.04);
    const wBack = new THREE.Mesh(wBackGeo, silkLiningMat);
    const buckleGeo = new THREE.TorusGeometry(0.06, 0.015, 12, 24);
    const buckle = new THREE.Mesh(buckleGeo, brassMat);
    buckle.position.set(0, -0.2, -0.04);
    wBack.add(buckle);
    registerPart(wBack, [0, 0, -0.25], [0, 0, -1.0], [0, 0, 0], [0, 0, 0], 'Silk Damask Back & Brass Cinch', 'waistcoat');
    waistcoatGroup.add(wBack);

    // Silk Necktie framing the V
    const tieCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0.9, 0.25),
      new THREE.Vector3(0.04, 0.4, 0.26),
      new THREE.Vector3(0, -0.35, 0.28)
    );
    const tieGeo = new THREE.TubeGeometry(tieCurve, 16, 0.1, 16, false);
    const tieMesh = new THREE.Mesh(tieGeo, silkLiningMat);
    registerPart(tieMesh, [0, 0, 0.25], [0, 0.5, 1.3], [0, 0, 0], [-0.15, 0, 0], 'Italian Woven Silk Tie', 'waistcoat');
    waistcoatGroup.add(tieMesh);

    scene.add(waistcoatGroup);

    // ----------------------------------------
    // GARMENT 3: FULL CANVAS BESPOKE SUIT JACKET
    // ----------------------------------------
    const suitGroup = new THREE.Group();
    suitGroup.name = 'suitGroup';
    suitGroup.visible = false;

    // Full Canvas Interlining (The core secret of bespoke)
    const canvasChestGeo = new THREE.BoxGeometry(1.25, 1.6, 0.03);
    canvasChestGeo.scale(1.0, 1.0, 0.8);
    const canvasChest = new THREE.Mesh(canvasChestGeo, canvasInterliningMat);
    registerPart(canvasChest, [0, 0, 0], [0, 0, 0.8], [0, 0, 0], [0, 0, 0], 'Horsehair & Camelhair Full Canvas', 'suit');
    suitGroup.add(canvasChest);

    // Outer Wool Left Panel & Peak Lapel
    const suitLeftGroup = new THREE.Group();
    const suitLeftBodyGeo = new THREE.BoxGeometry(0.78, 1.75, 0.08);
    const suitLeftBody = new THREE.Mesh(suitLeftBodyGeo, woolMat);
    suitLeftGroup.add(suitLeftBody);

    // Peak Lapel (angled upward)
    const lapelLGeo = new THREE.BufferGeometry();
    const lapelLVerts = new Float32Array([
      0.15, 0.8, 0.1,
      -0.4, 0.65, 0.12,
      0.25, -0.2, 0.08
    ]);
    lapelLGeo.setAttribute('position', new THREE.BufferAttribute(lapelLVerts, 3));
    lapelLGeo.computeVertexNormals();
    const lapelL = new THREE.Mesh(lapelLGeo, woolMat);
    suitLeftGroup.add(lapelL);

    // Breast pocket with silk pocket square peek
    const breastPocketGeo = new THREE.BoxGeometry(0.24, 0.04, 0.03);
    const breastPocket = new THREE.Mesh(breastPocketGeo, woolMat);
    breastPocket.position.set(-0.1, 0.35, 0.05);
    const silkSquareGeo = new THREE.ConeGeometry(0.06, 0.12, 4);
    const silkSquare = new THREE.Mesh(silkSquareGeo, mopButtonMat);
    silkSquare.position.set(-0.1, 0.42, 0.05);
    suitLeftGroup.add(breastPocket);
    suitLeftGroup.add(silkSquare);

    registerPart(suitLeftGroup, [-0.42, 0, 0.2], [-1.25, 0.1, 1.2], [0, 0.12, 0.04], [0, 0.4, 0.15], 'Left Hand-Padded Peak Lapel Panel', 'suit');
    suitGroup.add(suitLeftGroup);

    // Outer Wool Right Panel
    const suitRightGroup = new THREE.Group();
    const suitRightBodyGeo = new THREE.BoxGeometry(0.78, 1.75, 0.08);
    const suitRightBody = new THREE.Mesh(suitRightBodyGeo, woolMat);
    suitRightGroup.add(suitRightBody);

    const lapelRGeo = lapelLGeo.clone();
    lapelRGeo.scale(-1, 1, 1);
    const lapelR = new THREE.Mesh(lapelRGeo, woolMat);
    suitRightGroup.add(lapelR);

    // Lower flap pocket
    const flapPocketGeo = new THREE.BoxGeometry(0.32, 0.06, 0.04);
    const flapPocket = new THREE.Mesh(flapPocketGeo, woolMat);
    flapPocket.position.set(0.12, -0.4, 0.05);
    suitRightGroup.add(flapPocket);

    registerPart(suitRightGroup, [0.42, 0, 0.2], [1.25, 0.1, 1.2], [0, -0.12, -0.04], [0, -0.4, -0.15], 'Right Front Panel & Flap Pocket', 'suit');
    suitGroup.add(suitRightGroup);

    // Back Panel with Side Vents
    const suitBackGeo = new THREE.BoxGeometry(1.35, 1.75, 0.06);
    const suitBack = new THREE.Mesh(suitBackGeo, woolMat);
    registerPart(suitBack, [0, 0, -0.22], [0, 0, -1.2], [0, 0, 0], [0, 0, 0], 'Back Body with Dual Side Vents', 'suit');
    suitGroup.add(suitBack);

    // Left Tailored Sleeve with Roped Shoulder
    const suitSleeveCurveL = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-0.45, -0.75, 0.06),
      new THREE.Vector3(-0.65, -1.45, 0.12)
    );
    const suitSleeveGeoL = new THREE.TubeGeometry(suitSleeveCurveL, 20, 0.26, 16, false);
    const suitSleeveL = new THREE.Mesh(suitSleeveGeoL, woolMat);

    // Surgeon's 4 horn buttons on cuff
    for (let i = 0; i < 4; i++) {
      const sbGeo = new THREE.CylinderGeometry(0.024, 0.024, 0.012, 12);
      sbGeo.rotateZ(Math.PI / 2);
      const sb = new THREE.Mesh(sbGeo, hornButtonMat);
      sb.position.set(-0.7, -1.25 - i * 0.06, 0.24);
      suitSleeveL.add(sb);
    }
    registerPart(suitSleeveL, [-0.88, 0.8, 0], [-2.35, 0.6, 0.45], [0, 0, 0.18], [0, 0.35, 0.45], 'Left Sleeve & 4-Button Surgeon Cuff', 'suit');
    suitGroup.add(suitSleeveL);

    // Right Tailored Sleeve with Roped Shoulder
    const suitSleeveGeoR = suitSleeveGeoL.clone();
    suitSleeveGeoR.scale(-1, 1, 1);
    const suitSleeveR = new THREE.Mesh(suitSleeveGeoR, woolMat);
    registerPart(suitSleeveR, [0.88, 0.8, 0], [2.35, 0.6, 0.45], [0, 0, -0.18], [0, -0.35, -0.45], 'Right Roped Shoulder Sleeve', 'suit');
    suitGroup.add(suitSleeveR);

    // Pure Cupro Bemberg Inner Lining
    const innerLiningGeo = new THREE.BoxGeometry(1.28, 1.68, 0.02);
    const innerLining = new THREE.Mesh(innerLiningGeo, silkLiningMat);
    registerPart(innerLining, [0, 0, -0.12], [0, -0.1, -0.6], [0, 0, 0], [0, 0, 0], 'Cupro Bemberg Breathable Lining', 'suit');
    suitGroup.add(innerLining);

    scene.add(suitGroup);

    // 9. Raycasting Setup for Part Hover Detection
    const raycaster = new THREE.Raycaster();
    const mousePos = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mousePos.x = x;
      mousePos.y = y;

      stateRef.current.mouseX = x;
      stateRef.current.mouseY = y;
      stateRef.current.targetRotationY = x * 0.45;
      stateRef.current.targetRotationX = -y * 0.25;

      // Check intersections
      raycaster.setFromCamera(mousePos, camera);
      const activeGroup =
        stateRef.current.modelType === 'shirt'
          ? shirtGroup
          : stateRef.current.modelType === 'waistcoat'
          ? waistcoatGroup
          : suitGroup;

      const intersects = raycaster.intersectObjects(activeGroup.children, true);
      if (intersects.length > 0) {
        let topObj: THREE.Object3D | null = intersects[0].object;
        let foundName: string | null = null;
        while (topObj && topObj !== activeGroup) {
          if (topObj.userData?.name) {
            foundName = topObj.userData.name;
            break;
          }
          topObj = topObj.parent;
        }
        setHoveredLabel(foundName);
        if (onHoverPart) onHoverPart(foundName);
      } else {
        setHoveredLabel(null);
        if (onHoverPart) onHoverPart(null);
      }
    };

    window.addEventListener('mousemove', handlePointerMove);

    // 10. Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener('resize', handleResize);

    // 11. Render Loop
    let clock = new THREE.Clock();

    const tick = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Switch active model visibility
      shirtGroup.visible = stateRef.current.modelType === 'shirt';
      waistcoatGroup.visible = stateRef.current.modelType === 'waistcoat';
      suitGroup.visible = stateRef.current.modelType === 'suit';

      // Update explodable part interpolation
      const targetProg = stateRef.current.explosionProgress;
      for (const part of explodableParts) {
        if (part.category !== stateRef.current.modelType) continue;

        // Position interpolation
        part.mesh.position.lerpVectors(part.assembledPos, part.explodedPos, targetProg);

        // Rotation interpolation
        part.mesh.rotation.x = THREE.MathUtils.lerp(part.assembledRot.x, part.explodedRot.x, targetProg);
        part.mesh.rotation.y = THREE.MathUtils.lerp(part.assembledRot.y, part.explodedRot.y, targetProg);
        part.mesh.rotation.z = THREE.MathUtils.lerp(part.assembledRot.z, part.explodedRot.z, targetProg);
      }

      // Smooth mouse parallax & rotation damping
      if (stateRef.current.isRotating) {
        stateRef.current.targetRotationY += delta * 0.4;
      }
      stateRef.current.currentRotationY = THREE.MathUtils.damp(
        stateRef.current.currentRotationY,
        stateRef.current.targetRotationY,
        4.5,
        delta
      );
      stateRef.current.currentRotationX = THREE.MathUtils.damp(
        stateRef.current.currentRotationX,
        stateRef.current.targetRotationX,
        4.5,
        delta
      );

      // Apply rotation to active group
      const activeGarment =
        stateRef.current.modelType === 'shirt'
          ? shirtGroup
          : stateRef.current.modelType === 'waistcoat'
          ? waistcoatGroup
          : suitGroup;

      activeGarment.rotation.y = stateRef.current.currentRotationY;
      activeGarment.rotation.x = stateRef.current.currentRotationX;

      // Subtle breathing float in Z/Y
      const floatOffset = Math.sin(time * 1.2) * 0.04;
      activeGarment.position.y = floatOffset;

      // Particle floating oscillation
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        let py = posAttr.getY(i);
        py += delta * 0.08;
        if (py > 3.0) py = -2.5;
        posAttr.setY(i, py);
      }
      posAttr.needsUpdate = true;

      // Render scene
      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    // Cleanup
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      shadowTexture.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Inspected Craftsmanship Callout */}
      {hoveredLabel && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none z-20">
          <div className="bg-[#0c0c0e]/90 border border-[#C5A46D]/40 px-4 py-2 text-center shadow-2xl">
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#C5A46D] font-mono">
              SPECIFICATION INSPECTED
            </div>
            <div className="text-sm font-editorial text-[#F4F1EB] tracking-wide mt-0.5">
              {hoveredLabel}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
