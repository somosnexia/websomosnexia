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

// Un engranaje: aro + cubo central + dientes radiales. Vive en el plano XY
// (mirando a cámara), como una rueda dentada real de sala de máquinas.
function buildGear(radius, teethCount, color) {
  const group = new THREE.Group();

  const rim = edgesMesh(
    new THREE.TorusGeometry(radius, radius * 0.11, 6, 28),
    color,
    0.9
  );
  group.add(rim);

  const hub = edgesMesh(new THREE.CircleGeometry(radius * 0.22, 16), color, 0.9);
  group.add(hub);

  for (let i = 0; i < 4; i++) {
    const spoke = edgesMesh(
      new THREE.BoxGeometry(radius * 1.7, radius * 0.055, 0.01),
      color,
      0.4
    );
    spoke.rotation.z = (i * Math.PI) / 4;
    group.add(spoke);
  }

  for (let i = 0; i < teethCount; i++) {
    const angle = (i / teethCount) * Math.PI * 2;
    const tooth = edgesMesh(
      new THREE.BoxGeometry(radius * 0.24, radius * 0.2, 0.02),
      color,
      0.9
    );
    tooth.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
    tooth.rotation.z = angle;
    group.add(tooth);
  }

  return group;
}

function buildEngineRoom(accent, signal, coreColor) {
  const group = new THREE.Group();
  const floorY = -1.05;

  // ---------- Suelo (para anclar la escena como una sala) ----------
  const floor = new THREE.GridHelper(4.4, 14, signal, signal);
  floor.position.set(-0.1, floorY, -0.3);
  floor.material.transparent = true;
  floor.material.opacity = 0.3;
  group.add(floor);

  // ---------- Motor: tren de engranajes engranados y girando ----------
  const engineGroup = new THREE.Group();
  engineGroup.position.set(-1.0, -0.18, -0.25);
  group.add(engineGroup);

  const rA = 0.56;
  const rB = 0.33;
  const rC = 0.2;
  const gearA = buildGear(rA, 13, accent);
  const gearB = buildGear(rB, 9, signal);
  const gearC = buildGear(rC, 7, accent);

  const distAB = (rA + rB) * 0.92;
  const angleAB = -0.55;
  gearB.position.set(Math.cos(angleAB) * distAB, Math.sin(angleAB) * distAB, 0.03);

  const distBC = (rB + rC) * 0.92;
  const angleBC = 1.0;
  gearC.position.set(
    gearB.position.x + Math.cos(angleBC) * distBC,
    gearB.position.y + Math.sin(angleBC) * distBC,
    0.06
  );

  engineGroup.add(gearA, gearB, gearC);

  // Eje que ancla el motor al suelo.
  const axle = edgesMesh(
    new THREE.BoxGeometry(0.03, engineGroup.position.y - floorY, 0.03),
    signal,
    0.5
  );
  axle.position.set(engineGroup.position.x, (floorY + engineGroup.position.y) / 2, -0.25);
  group.add(axle);

  // ---------- Consola / panel de mando ----------
  const panel = edgesMesh(new THREE.BoxGeometry(1.5, 0.13, 0.7), signal, 0.85);
  panel.position.set(0.95, -0.76, 0.1);
  panel.rotation.x = -0.32;
  group.add(panel);

  const panelLeg = edgesMesh(
    new THREE.BoxGeometry(0.04, 0.32, 0.04),
    signal,
    0.5
  );
  panelLeg.position.set(0.95, -0.9, 0.35);
  group.add(panelLeg);

  // Botones / interruptores sobre la consola (onda de activación secuencial).
  const buttons = [];
  const cols = 5;
  const rows = 2;
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const btn = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.04, 8),
        new THREE.MeshBasicMaterial({ color: coreColor, transparent: true })
      );
      btn.position.set(-0.55 + c * (1.1 / (cols - 1)), 0.09, -0.18 + r * 0.36);
      panel.add(btn);
      buttons.push(btn);
    }
  }

  // ---------- Radar (montado sobre un mástil que nace de la consola) ----------
  const radarMast = edgesMesh(
    new THREE.BoxGeometry(0.03, 0.42, 0.03),
    signal,
    0.6
  );
  radarMast.position.set(0.55, -0.33, -0.08);
  group.add(radarMast);

  const radarGroup = new THREE.Group();
  radarGroup.position.set(0.55, 0.0, -0.14);
  radarGroup.rotation.x = -1.1;
  group.add(radarGroup);

  [0.16, 0.29, 0.42].forEach((r) => {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(r - 0.005, r, 36),
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
    new THREE.RingGeometry(0.43, 0.46, 36),
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
    new THREE.PlaneGeometry(0.44, 0.44, 1, 1),
    new THREE.MeshBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    })
  );
  sweep.geometry.translate(0.22, 0, 0);
  sweepPivot.add(sweep);
  const sweepLine = new THREE.Mesh(
    new THREE.PlaneGeometry(0.44, 0.01),
    new THREE.MeshBasicMaterial({ color: coreColor, transparent: true, opacity: 0.95 })
  );
  sweepLine.geometry.translate(0.22, 0, 0);
  sweepPivot.add(sweepLine);

  const blips = [];
  for (let i = 0; i < 5; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 0.1 + Math.random() * 0.3;
    const blip = new THREE.Mesh(
      new THREE.CircleGeometry(0.018, 8),
      new THREE.MeshBasicMaterial({ color: coreColor, transparent: true, opacity: 0 })
    );
    blip.position.set(Math.cos(angle) * r, Math.sin(angle) * r, 0.002);
    blip.userData.angle = (angle + Math.PI * 2) % (Math.PI * 2);
    radarGroup.add(blip);
    blips.push(blip);
  }

  // ---------- Pantallas de datos ----------
  const screens = [];
  [0.62, 1.32].forEach((x, idx) => {
    const screenGroup = new THREE.Group();
    screenGroup.position.set(x, 0.28, -0.5);
    screenGroup.rotation.x = -0.16;
    screenGroup.rotation.y = idx === 0 ? 0.14 : -0.1;
    group.add(screenGroup);

    const frame = edgesMesh(new THREE.BoxGeometry(0.5, 0.36, 0.02), signal, 0.75);
    screenGroup.add(frame);

    const screenLeg = edgesMesh(new THREE.BoxGeometry(0.02, 0.2, 0.02), signal, 0.5);
    screenLeg.position.set(0, -0.28, 0);
    screenGroup.add(screenLeg);

    const pointCount = 16;
    const positions = new Float32Array(pointCount * 3);
    for (let i = 0; i < pointCount; i++) {
      positions[i * 3] = -0.21 + (i / (pointCount - 1)) * 0.42;
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
  [1.9, -1.9].forEach((x, idx) => {
    const pipe = new THREE.Mesh(
      new THREE.TorusGeometry(0.95, 0.024, 6, 24, Math.PI * 0.55),
      wireMat(signal, 0.28)
    );
    pipe.position.set(x, 1.75, -1.5);
    pipe.rotation.z = idx === 0 ? Math.PI * 0.22 : Math.PI * 0.78;
    group.add(pipe);
  });

  group.position.set(0, 0.05, 0);
  group.scale.setScalar(0.86);
  return {
    group,
    buttons,
    sweepPivot,
    blips,
    screens,
    gears: [
      { group: gearA, speed: 0.6 },
      { group: gearB, speed: -0.6 * (rA / rB) },
      { group: gearC, speed: 0.6 * (rA / rB) * (rB / rC) },
    ],
  };
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
  camera.position.set(0.05, 0.25, 5.0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  scene.fog = new THREE.Fog(0x05070d, 4.5, 9.5);
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));

  const { group, buttons, sweepPivot, blips, screens, gears } = buildEngineRoom(
    accent,
    signal,
    coreColor
  );
  scene.add(group);

  // Polvo / bruma ambiental de la sala de máquinas.
  const count = 260;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 4.8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 3 - 1;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({
      size: 0.016,
      color: accent,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
  );
  scene.add(dust);

  let frameId;
  const clock = new THREE.Clock();
  const sweepSpeed = (Math.PI * 2) / 4.2;
  let elapsed = 0;

  function animate() {
    const delta = clock.getDelta();
    elapsed += delta;
    const t = elapsed;

    if (!reducedMotion) {
      group.rotation.y = Math.sin(t * 0.1) * 0.12;

      gears.forEach(({ group: g, speed }) => {
        g.rotation.z += speed * delta;
      });

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
            Math.sin(t * 1.6 + i * 0.6 + seed) * 0.07 +
              Math.sin(t * 0.4 + x * 3 + seed) * 0.025
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
