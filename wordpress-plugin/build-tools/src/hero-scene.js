import * as THREE from "three";

function buildSubmarine(accent, signal, coreColor) {
  const group = new THREE.Group();

  const hullLength = 2.4;
  const hullRadius = 0.42;
  const hullMaterial = new THREE.MeshBasicMaterial({
    color: accent,
    wireframe: true,
    transparent: true,
    opacity: 0.55,
  });
  const structureMaterial = new THREE.MeshBasicMaterial({
    color: signal,
    wireframe: true,
    transparent: true,
    opacity: 0.85,
  });

  // Casco: cápsula tumbada sobre el eje X.
  const hull = new THREE.Mesh(
    new THREE.CapsuleGeometry(hullRadius, hullLength - hullRadius * 2, 6, 16),
    hullMaterial
  );
  hull.rotation.z = Math.PI / 2;
  group.add(hull);

  // Vela / torreta de mando.
  const sailX = 0.18;
  const sailHeight = 0.34;
  const sail = new THREE.Mesh(
    new THREE.CylinderGeometry(0.19, 0.24, sailHeight, 10),
    structureMaterial
  );
  sail.position.set(sailX, hullRadius + sailHeight / 2, 0);
  group.add(sail);

  // Periscopio.
  const periscopeHeight = 0.24;
  const periscope = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.022, periscopeHeight, 6),
    structureMaterial
  );
  periscope.position.set(
    sailX,
    hullRadius + sailHeight + periscopeHeight / 2,
    0
  );
  group.add(periscope);

  // Timones de popa (cruceta).
  const sternX = -hullLength / 2 + 0.1;
  const finV = new THREE.Mesh(
    new THREE.BoxGeometry(0.03, 0.5, 0.06),
    structureMaterial
  );
  finV.position.set(sternX, 0, 0);
  group.add(finV);
  const finH = new THREE.Mesh(
    new THREE.BoxGeometry(0.03, 0.06, 0.5),
    structureMaterial
  );
  finH.position.set(sternX, 0, 0);
  group.add(finH);

  // Hélice.
  const propeller = new THREE.Mesh(
    new THREE.TorusGeometry(0.13, 0.02, 6, 14),
    structureMaterial
  );
  propeller.position.set(-hullLength / 2 - 0.06, 0, 0);
  propeller.rotation.y = Math.PI / 2;
  group.add(propeller);

  // Red de nodos tipo "sistema / IA" enroscada sobre el casco.
  const nodeCount = 13;
  const nodeMaterial = new THREE.MeshBasicMaterial({ color: coreColor });
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    const t = i / (nodeCount - 1);
    const x = -hullLength / 2 + 0.3 + t * (hullLength - 0.6);
    const angle = t * Math.PI * 4.2;
    const r = hullRadius * 0.94;
    const node = new THREE.Mesh(
      new THREE.SphereGeometry(0.032, 8, 8),
      nodeMaterial
    );
    node.position.set(x, Math.cos(angle) * r, Math.sin(angle) * r);
    group.add(node);
    nodes.push(node);
  }

  const linePositions = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    linePositions.push(
      nodes[i].position.x,
      nodes[i].position.y,
      nodes[i].position.z,
      nodes[i + 1].position.x,
      nodes[i + 1].position.y,
      nodes[i + 1].position.z
    );
  }
  for (let i = 0; i < nodes.length - 3; i += 2) {
    linePositions.push(
      nodes[i].position.x,
      nodes[i].position.y,
      nodes[i].position.z,
      nodes[i + 3].position.x,
      nodes[i + 3].position.y,
      nodes[i + 3].position.z
    );
  }
  const linesGeometry = new THREE.BufferGeometry();
  linesGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(linePositions, 3)
  );
  const lines = new THREE.LineSegments(
    linesGeometry,
    new THREE.LineBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.45,
    })
  );
  group.add(lines);

  group.rotation.z = -0.08;
  group.scale.setScalar(1.05);

  return { group, nodes, hull, periscope };
}

function initScene(container) {
  const accent = container.dataset.accent || "#5b73ff";
  const signal = container.dataset.signal || "#2e4be2";
  const coreColor = container.dataset.core || "#c8d2ff";

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
  camera.position.set(0.6, 0.5, 6.4);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  scene.fog = new THREE.Fog(0x05070d, 6, 13);
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  const { group, nodes, periscope } = buildSubmarine(accent, signal, coreColor);
  group.position.set(2.1, -0.2, -0.9);
  scene.add(group);

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

  // Campo de partículas (plancton / señales del océano).
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
      group.rotation.y = 0.5 + Math.sin(t * 0.15) * 0.5;
      group.position.y = Math.sin(t * 0.6) * 0.08;
      periscope.rotation.y = Math.sin(t * 0.8) * 0.1;

      nodes.forEach((node, i) => {
        const s = 1 + Math.sin(t * 2 + i * 0.6) * 0.35;
        node.scale.setScalar(s);
      });

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
