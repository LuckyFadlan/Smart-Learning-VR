import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const sceneProfiles = {
  Astronomy: {
    defaultObject: 'Earth',
    statLabel: 'Orbital velocity',
    statSuffix: 'x',
    instruction:
      'Guide the camera across the solar system. Select a planet to inspect its orbital motion and relative speed.',
  },
  Physics: {
    defaultObject: 'Electron Cloud',
    statLabel: 'Energy state',
    statSuffix: ' eV',
    instruction:
      'Move through the quantum field lab. Select orbitals, particles, or field lines to connect forces with motion.',
  },
  Biology: {
    defaultObject: 'DNA Helix',
    statLabel: 'Cell activity',
    statSuffix: '%',
    instruction:
      'Explore the living cell environment. Select organelles and DNA structures to reveal their biological function.',
  },
  'AI Literacy': {
    defaultObject: 'Hidden Layer',
    statLabel: 'Model confidence',
    statSuffix: '%',
    instruction:
      'Inspect a neural network in motion. Select layers, nodes, or data signals to understand how AI transforms inputs.',
  },
};

const moduleFocus = {
  Astronomy: {
    'Solar System': {
      defaultObject: 'Earth',
      statLabel: 'Orbital velocity',
      statSuffix: 'x',
      metric: 0.82,
      instruction: 'Select planets, compare orbit paths, and adjust speed to observe relative motion in the solar system.',
      concept: 'Planet Scale Node',
    },
    'Orbital Motion': {
      defaultObject: 'Gravity Well',
      statLabel: 'Stability score',
      statSuffix: '%',
      metric: 86,
      instruction: 'Use the active orbit layer to compare gravity, distance, and forward velocity as a stable motion system.',
      concept: 'Gravity Well',
    },
    'Moon Phases': {
      defaultObject: 'Moon Phase Arc',
      statLabel: 'Illumination',
      statSuffix: '%',
      metric: 64,
      instruction: 'Follow the moon phase arc and inspect how Sun, Earth, and Moon positions change the visible phase.',
      concept: 'Moon Phase Arc',
    },
    'Stellar Life Cycle': {
      defaultObject: 'Stellar Stage Map',
      statLabel: 'Fusion intensity',
      statSuffix: '%',
      metric: 91,
      instruction: 'Select stages in the stellar sequence to compare nebula, main sequence, giant, and supernova states.',
      concept: 'Stellar Stage Map',
    },
  },
  Physics: {
    Forces: {
      defaultObject: 'Force Vector',
      statLabel: 'Net force',
      statSuffix: ' N',
      metric: 42,
      instruction: 'Select force vectors and field markers to see how push, pull, mass, and acceleration relate.',
      concept: 'Force Vector',
    },
    'Energy Transfer': {
      defaultObject: 'Electron Cloud',
      statLabel: 'Energy state',
      statSuffix: ' eV',
      metric: 5.4,
      instruction: 'Track electrons as energy moves between orbitals and creates visible state changes.',
      concept: 'Energy Packet',
    },
    Waves: {
      defaultObject: 'Wave Crest',
      statLabel: 'Amplitude',
      statSuffix: '%',
      metric: 72,
      instruction: 'Select wave crests and nodes to compare amplitude, frequency, and wavelength in motion.',
      concept: 'Wave Crest',
    },
    'Electric Fields': {
      defaultObject: 'Charge Field',
      statLabel: 'Field strength',
      statSuffix: '%',
      metric: 79,
      instruction: 'Inspect charges and field lines to understand attraction, repulsion, and direction of force.',
      concept: 'Charge Field',
    },
  },
  Biology: {
    'Cell Structure': {
      defaultObject: 'Nucleus',
      statLabel: 'Cell activity',
      statSuffix: '%',
      metric: 92,
      instruction: 'Select cell structures to connect organelle position with biological function.',
      concept: 'Organelle Map',
    },
    'DNA & Genes': {
      defaultObject: 'DNA Helix',
      statLabel: 'Gene signal',
      statSuffix: '%',
      metric: 88,
      instruction: 'Inspect the DNA layer and compare base-pair structure with gene-level information.',
      concept: 'Gene Segment',
    },
    Mitochondria: {
      defaultObject: 'ATP Stream',
      statLabel: 'Energy output',
      statSuffix: '%',
      metric: 76,
      instruction: 'Follow energy packets around mitochondria to connect structure with ATP production.',
      concept: 'ATP Stream',
    },
    Ecosystems: {
      defaultObject: 'Food Web Node',
      statLabel: 'Ecosystem balance',
      statSuffix: '%',
      metric: 69,
      instruction: 'Select ecosystem nodes and observe how energy and dependency links form a food web.',
      concept: 'Food Web Node',
    },
  },
  'AI Literacy': {
    'Data Inputs': {
      defaultObject: 'Input Token',
      statLabel: 'Data quality',
      statSuffix: '%',
      metric: 78,
      instruction: 'Select input tokens to see how data quality and context shape the model pipeline.',
      concept: 'Input Token',
    },
    'Neural Networks': {
      defaultObject: 'Hidden Layer',
      statLabel: 'Model confidence',
      statSuffix: '%',
      metric: 84,
      instruction: 'Inspect nodes, hidden layers, and connections to understand how models transform inputs into outputs.',
      concept: 'Hidden Layer',
    },
    Prompting: {
      defaultObject: 'Prompt Chain',
      statLabel: 'Prompt clarity',
      statSuffix: '%',
      metric: 81,
      instruction: 'Follow prompt tokens through the response path and compare instruction clarity with output quality.',
      concept: 'Prompt Chain',
    },
    'AI Ethics': {
      defaultObject: 'Ethics Checkpoint',
      statLabel: 'Risk awareness',
      statSuffix: '%',
      metric: 89,
      instruction: 'Select ethics checkpoints to discuss bias, privacy, transparency, and responsible classroom use.',
      concept: 'Ethics Checkpoint',
    },
  },
};

const planetData = [
  { name: 'Mercury', color: '#b9a68b', radius: 0.42, distance: 2.1, speed: 1.45, tilt: 0.1, metric: 1.45 },
  { name: 'Venus', color: '#f3b46f', radius: 0.58, distance: 3.0, speed: 1.05, tilt: -0.22, metric: 1.05 },
  { name: 'Earth', color: '#31c8ff', radius: 0.62, distance: 4.05, speed: 0.82, tilt: 0.36, metric: 0.82 },
  { name: 'Mars', color: '#ff6d4a', radius: 0.5, distance: 5.15, speed: 0.63, tilt: -0.14, metric: 0.63 },
  { name: 'Jupiter', color: '#ffd48c', radius: 1.05, distance: 6.85, speed: 0.38, tilt: 0.2, metric: 0.38 },
  { name: 'Saturn', color: '#d9bf7a', radius: 0.9, distance: 8.55, speed: 0.28, tilt: -0.32, metric: 0.28 },
];

function makeMaterial(color, emissiveIntensity = 0.22) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity,
    metalness: 0.14,
    roughness: 0.48,
  });
}

function addStarfield(scene, disposables) {
  const geometry = new THREE.BufferGeometry();
  const positions = [];

  for (let i = 0; i < 900; i += 1) {
    const radius = 22 + Math.random() * 34;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions.push(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
    );
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({ color: 0xbdf8ff, size: 0.045, transparent: true, opacity: 0.82 });
  const stars = new THREE.Points(geometry, material);
  scene.add(stars);
  disposables.push(geometry, material);
  return stars;
}

function makeOrbit(distance, color = 0x7cf3ff, opacity = 0.16) {
  return new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(
      Array.from({ length: 160 }, (_, index) => {
        const angle = (index / 160) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(angle) * distance, 0, Math.sin(angle) * distance);
      }),
    ),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
  );
}

function createAstronomyScene(scene, disposables) {
  const targets = [];
  const animated = [];

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(1.05, 48, 48),
    new THREE.MeshStandardMaterial({
      color: 0xffd166,
      emissive: 0xff7a33,
      emissiveIntensity: 1.5,
      roughness: 0.3,
    }),
  );
  scene.add(sun);
  animated.push({ type: 'spin', mesh: sun, speed: 0.28 });
  disposables.push(sun.geometry, sun.material);

  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(1.45, 48, 48),
    new THREE.MeshBasicMaterial({ color: 0xff4fd8, transparent: true, opacity: 0.12, side: THREE.BackSide }),
  );
  scene.add(halo);
  animated.push({ type: 'pulse', mesh: halo, speed: 1.8, amount: 0.035 });
  disposables.push(halo.geometry, halo.material);

  planetData.forEach((planet) => {
    const orbit = makeOrbit(planet.distance);
    scene.add(orbit);
    disposables.push(orbit.geometry, orbit.material);

    const group = new THREE.Group();
    group.rotation.z = planet.tilt;

    const mesh = new THREE.Mesh(new THREE.SphereGeometry(planet.radius, 40, 40), makeMaterial(planet.color, 0.12));
    mesh.position.x = planet.distance;
    mesh.userData = { name: planet.name, metric: planet.metric };
    group.add(mesh);
    scene.add(group);
    disposables.push(mesh.geometry, mesh.material);

    if (planet.name === 'Saturn') {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(1.14, 1.62, 64),
        new THREE.MeshBasicMaterial({ color: 0xffe4a8, transparent: true, opacity: 0.48, side: THREE.DoubleSide }),
      );
      ring.rotation.x = Math.PI / 2.8;
      mesh.add(ring);
      disposables.push(ring.geometry, ring.material);
    }

    targets.push(mesh);
    animated.push({ type: 'planet', group, mesh, speed: planet.speed, distance: planet.distance });
  });

  return { targets, animated };
}

function createPhysicsScene(scene, disposables) {
  const targets = [];
  const animated = [];

  const nucleus = new THREE.Group();
  const nucleusColors = ['#ff4fd8', '#7cffc4', '#ffd166', '#00e5ff'];
  Array.from({ length: 14 }, (_, index) => {
    const angle = index * 1.7;
    const radius = 0.18 + (index % 4) * 0.16;
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.34, 28, 28), makeMaterial(nucleusColors[index % nucleusColors.length], 0.55));
    mesh.position.set(Math.cos(angle) * radius, Math.sin(index) * 0.22, Math.sin(angle) * radius);
    mesh.userData = { name: index % 2 ? 'Neutron Core' : 'Proton Core', metric: 12 + index };
    nucleus.add(mesh);
    targets.push(mesh);
    disposables.push(mesh.geometry, mesh.material);
    return mesh;
  });
  scene.add(nucleus);
  animated.push({ type: 'spin', mesh: nucleus, speed: 0.34 });

  const electronMaterial = makeMaterial('#00e5ff', 0.75);
  const ringAngles = [0, Math.PI / 3, -Math.PI / 3];
  ringAngles.forEach((angle, orbitIndex) => {
    const orbit = makeOrbit(3.1 + orbitIndex * 0.72, 0x7cffc4, 0.24);
    orbit.rotation.x = angle;
    scene.add(orbit);
    disposables.push(orbit.geometry, orbit.material);

    const electronGroup = new THREE.Group();
    electronGroup.rotation.x = angle;
    const electron = new THREE.Mesh(new THREE.SphereGeometry(0.18, 24, 24), electronMaterial);
    electron.position.x = 3.1 + orbitIndex * 0.72;
    electron.userData = { name: orbitIndex === 1 ? 'Electron Cloud' : 'Energy Orbital', metric: 3.6 + orbitIndex * 1.8 };
    electronGroup.add(electron);
    scene.add(electronGroup);
    targets.push(electron);
    animated.push({ type: 'electron', group: electronGroup, mesh: electron, speed: 1.4 + orbitIndex * 0.34, distance: orbitIndex });
    disposables.push(electron.geometry);
  });
  disposables.push(electronMaterial);

  Array.from({ length: 9 }, (_, index) => {
    const field = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 2.6, 12),
      new THREE.MeshBasicMaterial({ color: index % 2 ? 0xff4fd8 : 0x00e5ff, transparent: true, opacity: 0.48 }),
    );
    const angle = (index / 9) * Math.PI * 2;
    field.position.set(Math.cos(angle) * 5.4, Math.sin(index) * 0.6, Math.sin(angle) * 5.4);
    field.rotation.z = Math.PI / 2;
    field.rotation.y = -angle;
    field.userData = { name: 'Magnetic Field', metric: 74 };
    scene.add(field);
    targets.push(field);
    animated.push({ type: 'field', mesh: field, offset: index });
    disposables.push(field.geometry, field.material);
    return field;
  });

  return { targets, animated };
}

function createBiologyScene(scene, disposables) {
  const targets = [];
  const animated = [];

  const membrane = new THREE.Mesh(
    new THREE.SphereGeometry(5.7, 64, 64),
    new THREE.MeshBasicMaterial({ color: 0x7cffc4, transparent: true, opacity: 0.08, wireframe: true }),
  );
  scene.add(membrane);
  animated.push({ type: 'pulse', mesh: membrane, speed: 1.2, amount: 0.045 });
  disposables.push(membrane.geometry, membrane.material);

  const nucleus = new THREE.Mesh(new THREE.SphereGeometry(1.18, 48, 48), makeMaterial('#7c3cff', 0.5));
  nucleus.position.set(-2.3, -0.3, 0.2);
  nucleus.userData = { name: 'Nucleus', metric: 92 };
  scene.add(nucleus);
  targets.push(nucleus);
  animated.push({ type: 'float', mesh: nucleus, offset: 1.1 });
  disposables.push(nucleus.geometry, nucleus.material);

  const dnaGroup = new THREE.Group();
  const dnaMaterialA = makeMaterial('#00e5ff', 0.65);
  const dnaMaterialB = makeMaterial('#ff4fd8', 0.62);
  const bondMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.24 });
  Array.from({ length: 34 }, (_, index) => {
    const y = (index - 16) * 0.18;
    const angle = index * 0.55;
    const left = new THREE.Vector3(Math.cos(angle) * 0.82, y, Math.sin(angle) * 0.82);
    const right = new THREE.Vector3(Math.cos(angle + Math.PI) * 0.82, y, Math.sin(angle + Math.PI) * 0.82);
    const sphereA = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), dnaMaterialA);
    const sphereB = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), dnaMaterialB);
    sphereA.position.copy(left);
    sphereB.position.copy(right);
    sphereA.userData = { name: 'DNA Helix', metric: 88 };
    sphereB.userData = { name: 'DNA Helix', metric: 88 };
    const bond = new THREE.Line(new THREE.BufferGeometry().setFromPoints([left, right]), bondMaterial);
    dnaGroup.add(sphereA, sphereB, bond);
    targets.push(sphereA, sphereB);
    disposables.push(sphereA.geometry, sphereB.geometry, bond.geometry);
    return null;
  });
  dnaGroup.position.set(1.9, 0.2, 0);
  dnaGroup.rotation.z = 0.25;
  scene.add(dnaGroup);
  animated.push({ type: 'dna', mesh: dnaGroup });
  disposables.push(dnaMaterialA, dnaMaterialB, bondMaterial);

  Array.from({ length: 4 }, (_, index) => {
    const organelle = new THREE.Mesh(new THREE.SphereGeometry(0.46, 28, 28), makeMaterial(index % 2 ? '#ffd166' : '#7cffc4', 0.38));
    const angle = (index / 4) * Math.PI * 2;
    organelle.scale.set(1.55, 0.62, 0.8);
    organelle.position.set(Math.cos(angle) * 3.5, Math.sin(index) * 0.7, Math.sin(angle) * 2.4);
    organelle.userData = { name: 'Mitochondria', metric: 76 };
    scene.add(organelle);
    targets.push(organelle);
    animated.push({ type: 'float', mesh: organelle, offset: index * 0.6 });
    disposables.push(organelle.geometry, organelle.material);
    return organelle;
  });

  return { targets, animated };
}

function createAIScene(scene, disposables) {
  const targets = [];
  const animated = [];
  const layers = [-4.2, -1.4, 1.4, 4.2];
  const nodeCounts = [4, 6, 5, 3];
  const nodeGrid = [];
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.16 });

  layers.forEach((x, layerIndex) => {
    const layerNodes = [];
    const count = nodeCounts[layerIndex];
    Array.from({ length: count }, (_, nodeIndex) => {
      const y = (nodeIndex - (count - 1) / 2) * 0.88;
      const z = Math.sin(nodeIndex + layerIndex) * 0.3;
      const label = layerIndex === 0 ? 'Input Layer' : layerIndex === layers.length - 1 ? 'Output Node' : 'Hidden Layer';
      const metric = layerIndex === layers.length - 1 ? 94 : 72 + layerIndex * 6;
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 24), makeMaterial(layerIndex % 2 ? '#ff4fd8' : '#00e5ff', 0.75));
      mesh.position.set(x, y, z);
      mesh.userData = { name: label, metric };
      scene.add(mesh);
      targets.push(mesh);
      layerNodes.push(mesh);
      animated.push({ type: 'node', mesh, offset: layerIndex + nodeIndex * 0.3 });
      disposables.push(mesh.geometry, mesh.material);
      return mesh;
    });
    nodeGrid.push(layerNodes);
  });

  for (let layerIndex = 0; layerIndex < nodeGrid.length - 1; layerIndex += 1) {
    nodeGrid[layerIndex].forEach((source, sourceIndex) => {
      nodeGrid[layerIndex + 1].forEach((target, targetIndex) => {
        if ((sourceIndex + targetIndex + layerIndex) % 2 === 0) {
          const line = new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([source.position, target.position]),
            lineMaterial,
          );
          scene.add(line);
          disposables.push(line.geometry);
        }
      });
    });
  }
  disposables.push(lineMaterial);

  Array.from({ length: 8 }, (_, index) => {
    const token = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.28), makeMaterial(index % 2 ? '#7cffc4' : '#ffd166', 0.55));
    token.userData = { name: 'Training Signal', metric: 87 };
    scene.add(token);
    targets.push(token);
    animated.push({ type: 'token', mesh: token, offset: index * 0.6 });
    disposables.push(token.geometry, token.material);
    return token;
  });

  return { targets, animated };
}

function createSubtopicLayer(scene, disposables, activeSubject, activeSubtopic) {
  const focus = moduleFocus[activeSubject]?.[activeSubtopic];
  if (!focus) return { targets: [], animated: [] };

  const targets = [];
  const animated = [];
  const colorSets = {
    Astronomy: [0x00e5ff, 0xffd166, 0xff4fd8, 0x7c3cff],
    Physics: [0x7cffc4, 0x00e5ff, 0xff4fd8, 0xffffff],
    Biology: [0x7cffc4, 0xff4fd8, 0xffd166, 0x00e5ff],
    'AI Literacy': [0xff4fd8, 0x7c3cff, 0x00e5ff, 0x7cffc4],
  };
  const colors = colorSets[activeSubject] ?? colorSets.Astronomy;
  const materialLine = new THREE.LineBasicMaterial({ color: colors[0], transparent: true, opacity: 0.28 });
  const points = [];

  Array.from({ length: 5 }, (_, index) => {
    const x = (index - 2) * 1.35;
    const y = 2.25 + Math.sin(index) * 0.28;
    const z = -1.2 + Math.cos(index * 1.3) * 0.55;
    const geometry =
      index % 3 === 0
        ? new THREE.TorusGeometry(0.28, 0.055, 14, 32)
        : index % 3 === 1
          ? new THREE.OctahedronGeometry(0.34)
          : new THREE.BoxGeometry(0.42, 0.42, 0.42);
    const material =
      index === 2
        ? makeMaterial(`#${colors[1].toString(16).padStart(6, '0')}`, 0.75)
        : makeMaterial(`#${colors[index % colors.length].toString(16).padStart(6, '0')}`, 0.42);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.userData = {
      name: index === 2 ? focus.defaultObject : `${focus.concept} ${index + 1}`,
      metric: Math.max(1, focus.metric - Math.abs(index - 2) * 7),
    };
    scene.add(mesh);
    targets.push(mesh);
    points.push(mesh.position);
    animated.push({ type: 'subtopic', mesh, offset: index, subject: activeSubject });
    disposables.push(geometry, material);
    return mesh;
  });

  const path = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), materialLine);
  scene.add(path);
  disposables.push(path.geometry, materialLine);

  return { targets, animated };
}

function disposeItem(item) {
  if (!item) return;
  if (Array.isArray(item)) {
    item.forEach(disposeItem);
    return;
  }
  if (typeof item.dispose === 'function') {
    item.dispose();
  }
}

export default function VRScene({
  activeSubject = 'Astronomy',
  activeSubtopic = 'Solar System',
  speedMultiplier = 1,
  guidedMode = true,
}) {
  const mountRef = useRef(null);
  const targetRefs = useRef([]);
  const profile = moduleFocus[activeSubject]?.[activeSubtopic] ?? sceneProfiles[activeSubject] ?? sceneProfiles.Astronomy;
  const [selected, setSelected] = useState(profile.defaultObject);

  useEffect(() => {
    setSelected((moduleFocus[activeSubject]?.[activeSubtopic] ?? sceneProfiles[activeSubject] ?? sceneProfiles.Astronomy).defaultObject);
  }, [activeSubject, activeSubtopic]);

  useEffect(() => {
    if (!mountRef.current) return undefined;

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070814, activeSubject === 'Biology' ? 0.032 : 0.04);

    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, activeSubject === 'AI Literacy' ? 4.7 : 6.8, activeSubject === 'AI Literacy' ? 13 : 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const disposables = [];
    scene.add(new THREE.AmbientLight(0x8bdfff, 0.8));

    const keyLight = new THREE.PointLight(0xffd166, activeSubject === 'Astronomy' ? 9 : 4.8, 44);
    keyLight.position.set(0, 1, 1);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xff4fd8, 2.4, 34);
    rimLight.position.set(-6, 5, 8);
    scene.add(rimLight);

    const stars = addStarfield(scene, disposables);
    const sceneFactory = {
      Astronomy: createAstronomyScene,
      Physics: createPhysicsScene,
      Biology: createBiologyScene,
      'AI Literacy': createAIScene,
    }[activeSubject] ?? createAstronomyScene;

    const baseScene = sceneFactory(scene, disposables);
    const subtopicScene = createSubtopicLayer(scene, disposables, activeSubject, activeSubtopic);
    const targets = [...baseScene.targets, ...subtopicScene.targets];
    const animated = [...baseScene.animated, ...subtopicScene.animated];
    targetRefs.current = targets;

    const pointer = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    let hovered = null;

    const onPointerMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onClick = () => {
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(targetRefs.current, true);
      if (hits[0]?.object?.userData?.name) {
        setSelected(hits[0].object.userData.name);
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      const elapsed = clock.getElapsedTime() * speedMultiplier;
      stars.rotation.y = elapsed * 0.025;

      animated.forEach((item) => {
        if (item.type === 'spin') item.mesh.rotation.y = elapsed * item.speed;
        if (item.type === 'pulse') item.mesh.scale.setScalar(1 + Math.sin(elapsed * item.speed) * item.amount);
        if (item.type === 'planet') {
          item.group.rotation.y = elapsed * item.speed;
          item.mesh.rotation.y += 0.011;
          item.mesh.position.y = Math.sin(elapsed * 1.4 + item.distance) * 0.18;
        }
        if (item.type === 'electron') {
          item.group.rotation.y = elapsed * item.speed;
          item.mesh.position.y = Math.sin(elapsed * 2 + item.distance) * 0.1;
        }
        if (item.type === 'field') {
          item.mesh.material.opacity = 0.28 + Math.sin(elapsed * 2 + item.offset) * 0.18;
          item.mesh.scale.y = 0.8 + Math.sin(elapsed * 1.6 + item.offset) * 0.18;
        }
        if (item.type === 'float') {
          item.mesh.position.y += Math.sin(elapsed * 1.5 + item.offset) * 0.002;
          item.mesh.rotation.y += 0.006;
        }
        if (item.type === 'dna') {
          item.mesh.rotation.y = elapsed * 0.45;
          item.mesh.position.y = Math.sin(elapsed * 1.2) * 0.18;
        }
        if (item.type === 'node') {
          const pulse = 1 + Math.sin(elapsed * 2.2 + item.offset) * 0.08;
          item.mesh.scale.setScalar(pulse);
        }
        if (item.type === 'token') {
          const travel = ((elapsed * 0.7 + item.offset) % 1) * 8.4 - 4.2;
          item.mesh.position.set(travel, Math.sin(elapsed * 2 + item.offset) * 2.4, Math.cos(elapsed + item.offset) * 0.8);
          item.mesh.rotation.x += 0.02;
          item.mesh.rotation.y += 0.028;
        }
        if (item.type === 'subtopic') {
          item.mesh.rotation.x += 0.012 + item.offset * 0.001;
          item.mesh.rotation.y += 0.018;
          item.mesh.position.y += Math.sin(elapsed * 1.8 + item.offset) * 0.0025;
        }
      });

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(targetRefs.current, true);
      hovered = hits[0]?.object ?? null;
      renderer.domElement.style.cursor = hovered ? 'pointer' : 'grab';

      targetRefs.current.forEach((target) => {
        const isSelected = target.userData?.name === selected;
        const isHovered = target === hovered;
        const scale = isSelected || isHovered ? 1.18 : 1;
        target.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.08);
      });

      const targetY = activeSubject === 'AI Literacy' ? 4.4 : 6.4;
      camera.position.x += (pointer.x * 1.4 - camera.position.x) * 0.035;
      camera.position.y += (targetY + pointer.y * 0.8 - camera.position.y) * 0.035;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    animate();

    const resizeObserver = new ResizeObserver(() => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(mount);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('click', onClick);
      renderer.dispose();
      disposables.forEach(disposeItem);
      mount.removeChild(renderer.domElement);
    };
  }, [activeSubject, activeSubtopic, guidedMode, selected, speedMultiplier]);

  const selectedObject = useMemo(() => {
    const allObjects = {
      Astronomy: [
        ...planetData.map((planet) => ({ name: planet.name, metric: planet.metric })),
      ],
      Physics: [
        { name: 'Electron Cloud', metric: 5.4 },
        { name: 'Energy Orbital', metric: 7.2 },
        { name: 'Magnetic Field', metric: 74 },
        { name: 'Proton Core', metric: 21 },
        { name: 'Neutron Core', metric: 24 },
      ],
      Biology: [
        { name: 'DNA Helix', metric: 88 },
        { name: 'Nucleus', metric: 92 },
        { name: 'Mitochondria', metric: 76 },
      ],
      'AI Literacy': [
        { name: 'Input Layer', metric: 78 },
        { name: 'Hidden Layer', metric: 84 },
        { name: 'Output Node', metric: 94 },
        { name: 'Training Signal', metric: 87 },
      ],
    };
    const focusObject = moduleFocus[activeSubject]?.[activeSubtopic]
      ? [
          {
            name: moduleFocus[activeSubject][activeSubtopic].defaultObject,
            metric: moduleFocus[activeSubject][activeSubtopic].metric,
          },
        ]
      : [];
    return [...focusObject, ...(allObjects[activeSubject] ?? allObjects.Astronomy)].find((item) => item.name === selected) ?? {
      name: profile.defaultObject,
      metric: 0,
    };
  }, [activeSubject, activeSubtopic, profile.defaultObject, selected]);

  return (
    <div className="relative h-[420px] min-h-[360px] overflow-hidden rounded-[8px] border border-white/10 bg-void shadow-neon md:h-[540px]">
      <div ref={mountRef} className="absolute inset-0" aria-label={`${activeSubject} ${activeSubtopic} VR simulation`} />
      <div className="pointer-events-none absolute inset-x-4 top-4 flex flex-wrap items-center justify-between gap-3">
        <div className="glass-subtle rounded-[8px] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pulse">VR Simulation</p>
          <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{activeSubtopic}</h3>
        </div>
        {guidedMode && (
          <div className="glass-subtle rounded-[8px] px-4 py-3">
            <p className="text-xs text-white/58">Guided Mode</p>
            <p className="font-display text-lg font-semibold text-pulse">Interactive labels on</p>
          </div>
        )}
        <div className="glass-subtle rounded-[8px] px-4 py-3 text-right">
          <p className="text-xs text-white/58">Selected Object</p>
          <p className="font-display text-lg font-semibold text-mint">{selectedObject.name}</p>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 grid gap-3 md:grid-cols-[1fr_auto]">
        <div className="glass-subtle rounded-[8px] p-4">
          <p className="text-sm leading-6 text-white/78">{profile.instruction}</p>
        </div>
        <div className="glass-subtle rounded-[8px] p-4">
          <p className="text-xs text-white/54">{profile.statLabel}</p>
          <p className="font-display text-2xl font-bold text-white">
            {selectedObject.metric.toFixed(profile.statSuffix === 'x' ? 2 : 0)}
            {profile.statSuffix}
          </p>
        </div>
      </div>
    </div>
  );
}
