import * as THREE from "three";

function wireMat(color, opacity = 0.7) {
  return new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity,
  });
}

function edgesMesh(geometry, color, opacity = 0.75) {
  return new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity })
  );
}

function buildEngineRoom(accent, signal, coreColor) {
  const group = new THREE.Group();

  // ---------- Consola / panel de mando ----------
  const panel = edgesMesh(new THREE.BoxGeometry(2.6, 0.14, 1.05), signal, 0.85);
  panel.position.set(0, -0.62, 0.1);
  panel.rotation.x = -0.32;
  group.add(panel);

  // Botones / interruptores sobre la consola (onda de activación secuencial).
  const buttons = [];
  const cols = 6;
  const rows = 3;
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const btn = new THREE.Mesh(
        new THREE.CylinderGeometry(0.032, 0.032, 0.045, 8),
        new THREE.MeshBasicMaterial({ color: coreColor, transparent: true })
      );
      btn.position.set(
        -1.08 + c * (2.16 / (cols - 1)),
        0.1,
        -0.32 + r * 0.32
      );
      panel.add(btn);
      buttons.push(btn);
    }
  }

  // ---------- Radar ----------
  const radarGroup = new THREE.Group();
  radarGroup.position.set(-1.15, 0.68, -0.1);
  radarGroup.rotation.x = -1.15;
  group.add(radarGroup);

  [0.22, 0.4, 0.58].forEach((r) => {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(r - 0.006, r, 40),
      new THREE.MeshBasicMaterial({
        color: accent,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      })
    );
    radarGroup.add(ring);
  });

  const radarRim = new THREE.Mesh(
    new THREE.RingGeometry(0.59, 0.63, 40),
    new THREE.MeshBasicMaterial({
      color: signal,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    })
  );
  radarGroup.add(radarRim);

  const sweepPivot = new THREE.Group();
  radarGroup.add(sweepPivot);
  const sweep = new THREE.Mesh(
    new THREE.PlaneGeometry(0.61, 0.61, 1, 1),
    new THREE.MeshBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
    })
  );
  sweep.geometry.translate(0.305, 0, 0);
  sweepPivot.add(sweep);
  const sweepLine = new THREE.Mesh(
    new THREE.PlaneGeometry(0.61, 0.012),
    new THREE.MeshBasicMaterial({ color: coreColor, transparent: true, opacity: 0.95 })
  );
  sweepLine.geometry.translate(0.305, 0, 0);
  sweepPivot.add(sweepLine);

  const blips = [];
  for (let i = 0; i < 7; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 0.14 + Math.random() * 0.42;
    const blip = new THREE.Mesh(
      new THREE.CircleGeometry(0.022, 8),
      new THREE.MeshBasicMaterial({ color: coreColor, transparent: true, opacity: 0 })
    );
    blip.position.set(Math.cos(angle) * r, Math.sin(angle) * r, 0.002);
    blip.userData.angle = (angle + Math.PI * 2) % (Math.PI * 2);
    radarGroup.add(blip);
    blips.push(blip);
  }

  // ---------- Pantallas de datos ----------
  const screens = [];
  [-0.55, 0.55].forEach((x, idx) => {
    const screenGroup = new THREE.Group();
    screenGroup.position.set(x, 0.5, -0.7);
    screenGroup.rotation.x = -0.18;
    screenGroup.rotation.y = idx === 0 ? 0.16 : -0.16;
    group.add(screenGroup);

    const frame = edgesMesh(new THREE.BoxGeometry(0.62, 0.42, 0.02), signal, 0.75);
    screenGroup.add(frame);

    const pointCount = 18;
    const positions = new Float32Array(pointCount * 3);
    for (let i = 0; i < pointCount; i++) {
      positions[i * 3] = -0.27 + (i / (pointCount - 1)) * 0.54;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0.005;
    }
    const graphGeo = new THREE.BufferGeometry();
    graphGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const graph = new THREE.Line(
      graphGeo,
      new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.9 })
    );
    screenGroup.add(graph);

    screens.push({ graph, base: positions.slice(), seed: idx * 3.7 });
  });

  // ---------- Tuberías / conductos superiores ----------
  [1.55, -1.55].forEach((x, idx) => {
    const pipe = new THREE.Mesh(
      new THREE.TorusGeometry(0.9, 0.022, 6, 24, Math.PI * 0.6),
      wireMat(signal, 0.28)
    );
    pipe.position.set(x, 2.1, -1.6);
    pipe.rotation.z = idx === 0 ? Math.PI * 0.2 : Math.PI * 0.8;
    group.add(pipe);
  });

  group.position.set(0, 0.15, 0);
  group.scale.setScalar(0.82);
  return { group, buttons, sweepPivot, blips, screens };
}

function initEngineRoom(container) {
  const accent = container.dataset.accent || "#5b73ff";
  const signal = container.dataset.signal || "#2e4be2";
  const coreColor = container.dataset.core || "#c8d2ff";

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    40,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0.1, 0.2, 4.6);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  scene.fog = new THREE.Fog(0x05070d, 4, 9);
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  const { group, buttons, sweepPivot, blips, screens } = buildEngineRoom(
    accent,
    signal,
    coreColor
  );
  scene.add(group);

  // Polvo / bruma ambiental de la sala de máquinas.
  const count = 300;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 4.5;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 3 - 1;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      size: 0.018,
      color: accent,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  scene.add(dust);

  let frameId;
  const clock = new THREE.Clock();
  const sweepSpeed = (Math.PI * 2) / 4.2;

  function animate() {
    const t = clock.getElapsedTime();

    if (!reducedMotion) {
      group.rotation.y = Math.sin(t * 0.12) * 0.18;
      group.position.y = Math.sin(t * 0.5) * 0.04;

      buttons.forEach((btn, i) => {
        const wave = Math.max(0, Math.sin(t * 1.4 - i * 0.28));
        btn.material.opacity = 0.35 + wave * 0.65;
        btn.scale.setScalar(0.85 + wave * 0.3);
      });

      const sweepAngle = t * sweepSpeed;
      sweepPivot.rotation.z = sweepAngle;
      blips.forEach((blip) => {
        const diff = Math.abs(
          ((sweepAngle - blip.userData.angle + Math.PI) %
            (Math.PI * 2)) -
            Math.PI
        );
        const proximity = Math.max(0, 1 - diff / 0.5);
        blip.material.opacity = Math.max(
          blip.material.opacity * 0.92,
          proximity
        );
      });

      screens.forEach(({ graph, base, seed }) => {
        const posAttr = graph.geometry.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
          const x = base[i * 3];
          posAttr.setY(
            i,
            Math.sin(t * 1.6 + i * 0.6 + seed) * 0.08 +
              Math.sin(t * 0.4 + x * 3 + seed) * 0.03
          );
        }
        posAttr.needsUpdate = true;
      });

      dust.rotation.y = t * 0.015;
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
    dustGeo.dispose();
    container.removeChild(renderer.domElement);
  };
}

function boot() {
  const containers = document.querySelectorAll(".nexia-engine-room__canvas");
  containers.forEach((el) => {
    if (el.dataset.nexiaInit) return;
    el.dataset.nexiaInit = "1";
    initEngineRoom(el);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

document.addEventListener("elementor/popup/show", boot);
window.addEventListener("elementor/frontend/init", boot);
