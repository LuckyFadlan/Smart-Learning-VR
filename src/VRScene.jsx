import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const planetData = [
  { name: 'Mercury', color: '#b9a68b', radius: 0.42, distance: 2.1, speed: 1.45, tilt: 0.1 },
  { name: 'Venus', color: '#f3b46f', radius: 0.58, distance: 3.0, speed: 1.05, tilt: -0.22 },
  { name: 'Earth', color: '#31c8ff', radius: 0.62, distance: 4.05, speed: 0.82, tilt: 0.36 },
  { name: 'Mars', color: '#ff6d4a', radius: 0.5, distance: 5.15, speed: 0.63, tilt: -0.14 },
  { name: 'Jupiter', color: '#ffd48c', radius: 1.05, distance: 6.85, speed: 0.38, tilt: 0.2 },
  { name: 'Saturn', color: '#d9bf7a', radius: 0.9, distance: 8.55, speed: 0.28, tilt: -0.32 },
];

export default function VRScene({ activeSubject = 'Astronomy' }) {
  const mountRef = useRef(null);
  const planetRefs = useRef([]);
  const [selected, setSelected] = useState('Earth');

  useEffect(() => {
    if (!mountRef.current) return undefined;

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070814, 0.04);

    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 6.8, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x8bdfff, 0.7);
    scene.add(ambient);

    const sunLight = new THREE.PointLight(0xffd166, 9, 40);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = [];
    for (let i = 0; i < 900; i += 1) {
      const radius = 22 + Math.random() * 34;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      );
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
      starsGeometry,
      new THREE.PointsMaterial({ color: 0xbdf8ff, size: 0.045, transparent: true, opacity: 0.84 }),
    );
    scene.add(stars);

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

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.45, 48, 48),
      new THREE.MeshBasicMaterial({ color: 0xff4fd8, transparent: true, opacity: 0.12, side: THREE.BackSide }),
    );
    scene.add(halo);

    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x7cf3ff, transparent: true, opacity: 0.16 });
    planetRefs.current = planetData.map((planet) => {
      const orbit = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(
          Array.from({ length: 160 }, (_, index) => {
            const angle = (index / 160) * Math.PI * 2;
            return new THREE.Vector3(Math.cos(angle) * planet.distance, 0, Math.sin(angle) * planet.distance);
          }),
        ),
        orbitMaterial,
      );
      scene.add(orbit);

      const group = new THREE.Group();
      group.rotation.z = planet.tilt;

      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(planet.radius, 40, 40),
        new THREE.MeshStandardMaterial({
          color: planet.color,
          emissive: planet.color,
          emissiveIntensity: 0.12,
          metalness: 0.12,
          roughness: 0.55,
        }),
      );
      mesh.position.x = planet.distance;
      mesh.userData = planet;
      group.add(mesh);

      if (planet.name === 'Saturn') {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(1.14, 1.62, 64),
          new THREE.MeshBasicMaterial({ color: 0xffe4a8, transparent: true, opacity: 0.48, side: THREE.DoubleSide }),
        );
        ring.rotation.x = Math.PI / 2.8;
        mesh.add(ring);
      }

      scene.add(group);
      return { group, mesh, ...planet };
    });

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
      const hits = raycaster.intersectObjects(planetRefs.current.map((planet) => planet.mesh));
      if (hits[0]?.object?.userData?.name) {
        setSelected(hits[0].object.userData.name);
      }
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      sun.rotation.y = elapsed * 0.28;
      halo.scale.setScalar(1 + Math.sin(elapsed * 1.8) * 0.035);
      stars.rotation.y = elapsed * 0.025;

      planetRefs.current.forEach((planet) => {
        planet.group.rotation.y = elapsed * planet.speed;
        planet.mesh.rotation.y += 0.011;
        planet.mesh.position.y = Math.sin(elapsed * 1.4 + planet.distance) * 0.18;
        const isSelected = planet.name === selected;
        const isHovered = planet.mesh === hovered;
        planet.mesh.scale.lerp(new THREE.Vector3(isSelected || isHovered ? 1.18 : 1, isSelected || isHovered ? 1.18 : 1, isSelected || isHovered ? 1.18 : 1), 0.08);
      });

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(planetRefs.current.map((planet) => planet.mesh));
      hovered = hits[0]?.object ?? null;
      renderer.domElement.style.cursor = hovered ? 'pointer' : 'grab';

      camera.position.x += (pointer.x * 1.4 - camera.position.x) * 0.035;
      camera.position.y += (6.4 + pointer.y * 0.8 - camera.position.y) * 0.035;
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
      starsGeometry.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [selected]);

  const selectedPlanet = planetData.find((planet) => planet.name === selected) ?? planetData[2];

  return (
    <div className="relative h-[420px] min-h-[360px] overflow-hidden rounded-[8px] border border-white/10 bg-void shadow-neon md:h-[540px]">
      <div ref={mountRef} className="absolute inset-0" aria-label={`${activeSubject} VR solar system simulation`} />
      <div className="pointer-events-none absolute inset-x-4 top-4 flex flex-wrap items-center justify-between gap-3">
        <div className="glass-subtle rounded-[8px] px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pulse">VR Simulation</p>
          <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{activeSubject} Lab</h3>
        </div>
        <div className="glass-subtle rounded-[8px] px-4 py-3 text-right">
          <p className="text-xs text-white/58">Selected Object</p>
          <p className="font-display text-lg font-semibold text-mint">{selectedPlanet.name}</p>
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 right-4 grid gap-3 md:grid-cols-[1fr_auto]">
        <div className="glass-subtle rounded-[8px] p-4">
          <p className="text-sm leading-6 text-white/78">
            Drag your cursor across the viewport to guide the camera. Select a floating planet to lock the lesson context
            and surface its orbital telemetry.
          </p>
        </div>
        <div className="glass-subtle rounded-[8px] p-4">
          <p className="text-xs text-white/54">Orbital velocity</p>
          <p className="font-display text-2xl font-bold text-white">{selectedPlanet.speed.toFixed(2)}x</p>
        </div>
      </div>
    </div>
  );
}
