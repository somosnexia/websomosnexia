import * as THREE from "three";

function initScene(container) {
  const accent = container.dataset.accent || "#5b73ff";
  const signal = container.dataset.signal || "#2e4be2";
  const coreColor = container.dataset.core || "#7c92ff";

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    42,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0.4, 6.4);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  scene.fog = new THREE.Fog(0x05070d, 6, 13);
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  // Núcleo tipo radar/sónar
  const group = new THREE.Group();
  scene.add(group);

  const outerCore = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.35, 1),
    new THREE.MeshBasicMaterial({
      color: coreColor,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    })
  );
  group.add(outerCore);

  const innerCore = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.68, 0),
    new THREE.MeshBasicMaterial({
      color: signal,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    })
  );
  group.add(innerCore);

  function makeRing() {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(1.5, 1.54, 64),
      new THREE.MeshBasicMaterial({
        color: accent,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
      })
    );
    ring.rotation.x = Math.PI / 2;
    group.add(ring);
    return ring;
  }
  const ring1 = makeRing();
  const ring2 = makeRing();

  // Campo de partículas (plancton / señales)
  const count = 900;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = 3.4 + Math.random() * 5.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
    positions[i * 3 + 2] = radius * Math.cos(phi) - 2;
  }
  const particlesGeometry = new THREE.BufferGeometry();
  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  const particles = new THREE.Points(
    particlesGeometry,
    new THREE.PointsMaterial({
      size: 0.028,
      color: accent,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  scene.add(particles);

  let frameId;
  const clock = new THREE.Clock();

  function animate() {
    const t = clock.getElapsedTime();

    if (!reducedMotion) {
      group.rotation.y = t * 0.12;
      group.rotation.x = Math.sin(t * 0.2) * 0.15;
      group.position.y = Math.sin(t * 0.6) * 0.08;

      const phase1 = (t * 0.4) % 1.6;
      ring1.scale.setScalar(1 + phase1);
      ring1.material.opacity = Math.max(0, 0.5 - phase1 * 0.32);

      const phase2 = (t * 0.4 + 0.8) % 1.6;
      ring2.scale.setScalar(1 + phase2);
      ring2.material.opacity = Math.max(0, 0.5 - phase2 * 0.32);

      particles.rotation.y = t * 0.02;
      particles.rotation.x = Math.sin(t * 0.05) * 0.05;
    }

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  }
  animate();

  function handleResize() {
    const { clientWidth, clientHeight } = container;
    if (!clientWidth || !clientHeight) return;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight);
  }
  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(container);

  return () => {
    cancelAnimationFrame(frameId);
    resizeObserver.disconnect();
    renderer.dispose();
    outerCore.geometry.dispose();
    innerCore.geometry.dispose();
    particlesGeometry.dispose();
    container.removeChild(renderer.domElement);
  };
}

function boot() {
  const containers = document.querySelectorAll(".nexia-hero-3d__canvas");
  containers.forEach((el) => {
    if (el.dataset.nexiaInit) return;
    el.dataset.nexiaInit = "1";
    initScene(el);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

document.addEventListener("elementor/popup/show", boot);
window.addEventListener("elementor/frontend/init", boot);
