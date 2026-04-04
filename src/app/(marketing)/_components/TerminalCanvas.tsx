"use client";
// Needed for WebGL rendering and frame-by-frame pointer interaction.

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type TerminalPalette = {
  accent: string;
  accentSecondary: string;
  shell: string;
  shellEdge: string;
  glow: string;
  point: string;
  screenBackground: string;
  textPrimary: string;
  textSecondary: string;
};

type TerminalCanvasProps = {
  palette: TerminalPalette;
  reduceMotion?: boolean;
};

const SCREEN_LINES = [
  "$ nexus session spawn --agent claude-code",
  "context.sync(graph): linked 12 related nodes",
  "handoff(gemini-cli): seeded with schema + notes",
  "codex-cli: applying patch to workspace layout",
  "status: all agents aligned on current objective",
] as const;

const SCREEN_WIDTH = 768;
const SCREEN_HEIGHT = 448;
const SCREEN_REFRESH_INTERVAL = 1 / 12;

function roundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius,
    y + height,
  );
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function drawScreen(
  context: CanvasRenderingContext2D,
  elapsedTime: number,
  palette: TerminalPalette,
  reduceMotion: boolean,
) {
  const width = context.canvas.width;
  const height = context.canvas.height;
  const headerHeight = 80;
  const finalLine = SCREEN_LINES.at(-1) ?? "";
  const progress = reduceMotion ? 1 : (Math.sin(elapsedTime * 0.8) + 1) / 2;
  const visibleCharacters = reduceMotion
    ? finalLine.length
    : Math.max(16, Math.floor(16 + progress * finalLine.length));

  context.clearRect(0, 0, width, height);

  const background = context.createLinearGradient(0, 0, 0, height);
  background.addColorStop(0, palette.screenBackground);
  background.addColorStop(1, "#020611");
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  const glowGradient = context.createRadialGradient(
    width * 0.72,
    height * 0.18,
    20,
    width * 0.72,
    height * 0.18,
    width * 0.6,
  );
  glowGradient.addColorStop(0, `${palette.glow}66`);
  glowGradient.addColorStop(1, "transparent");
  context.fillStyle = glowGradient;
  context.fillRect(0, 0, width, height);

  context.fillStyle = "#07101f";
  context.fillRect(0, 0, width, headerHeight);

  context.fillStyle = palette.textSecondary;
  context.font = "600 18px var(--font-geist-mono), monospace";
  context.fillText("NEXUS / shared session", 36, 48);

  const badges = ["claude-code", "gemini-cli", "codex-cli"];
  badges.forEach((badge, index) => {
    const badgeX = 36 + index * 128;
    roundRect(context, badgeX, 58, 112, 28, 10);
    context.fillStyle = "#0d1730";
    context.fill();
    context.strokeStyle = `${palette.accent}66`;
    context.lineWidth = 1.5;
    context.stroke();
    context.fillStyle = palette.textPrimary;
    context.font = "500 13px var(--font-geist-mono), monospace";
    context.fillText(badge, badgeX + 12, 77);
  });

  context.fillStyle = `${palette.accentSecondary}33`;
  context.fillRect(36, headerHeight + 16, width - 72, 2);

  context.font = "500 18px var(--font-geist-mono), monospace";
  SCREEN_LINES.forEach((line, index) => {
    const y = headerHeight + 56 + index * 48;
    const renderedLine =
      index === SCREEN_LINES.length - 1
        ? line.slice(0, visibleCharacters)
        : line;

    context.fillStyle =
      index === SCREEN_LINES.length - 1
        ? palette.textPrimary
        : `${palette.textSecondary}dd`;
    context.fillText(renderedLine, 54, y);

    if (index === 1 || index === 3) {
      context.fillStyle = `${palette.accentSecondary}22`;
      roundRect(context, 54, y + 12, width - 108, 18, 8);
      context.fill();
    }
  });

  const caretVisible = reduceMotion
    ? true
    : Math.floor(elapsedTime * 2) % 2 === 0;
  if (caretVisible) {
    context.fillStyle = palette.accentSecondary;
    context.fillRect(
      54 + visibleCharacters * 10.6,
      headerHeight + 56 + (SCREEN_LINES.length - 1) * 48 - 16,
      10,
      22,
    );
  }

  context.strokeStyle = "rgba(255,255,255,0.05)";
  context.lineWidth = 1;
  for (let row = 0; row < 22; row += 1) {
    const y = row * 20 + (reduceMotion ? 0 : (elapsedTime * 12) % 20);
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
}

function TerminalRig({ palette, reduceMotion = false }: TerminalCanvasProps) {
  const shellRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const glassRef =
    useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null);
  const lastScreenDrawRef = useRef(-SCREEN_REFRESH_INTERVAL);

  const screen = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Unable to create terminal texture context");
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    return { canvas, context, texture };
  }, []);

  const particlePositions = useMemo(() => {
    const count = 84;
    const positions = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 10;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    return positions;
  }, []);

  const linePositions = useMemo(() => {
    const segments = 20;
    const positions = new Float32Array(segments * 6);

    for (let index = 0; index < segments; index += 1) {
      const startX = (Math.random() - 0.5) * 7.5;
      const startY = (Math.random() - 0.5) * 4.8;
      const startZ = (Math.random() - 0.5) * 4.2;
      positions[index * 6] = startX;
      positions[index * 6 + 1] = startY;
      positions[index * 6 + 2] = startZ;
      positions[index * 6 + 3] = startX + (Math.random() - 0.5) * 1.2;
      positions[index * 6 + 4] = startY + (Math.random() - 0.5) * 0.9;
      positions[index * 6 + 5] = startZ + (Math.random() - 0.5) * 0.7;
    }

    return positions;
  }, []);

  useEffect(() => {
    return () => {
      screen.texture.dispose();
    };
  }, [screen]);

  useFrame((state, delta) => {
    const elapsedTime = state.clock.elapsedTime;
    const pointerX = reduceMotion ? 0 : state.pointer.x;
    const pointerY = reduceMotion ? 0 : state.pointer.y;

    if (shellRef.current) {
      const targetRotationY =
        pointerX * 0.34 + Math.sin(elapsedTime * 0.35) * 0.08;
      const targetRotationX =
        -pointerY * 0.24 + Math.cos(elapsedTime * 0.28) * 0.05;
      const targetPositionY = Math.sin(elapsedTime * 0.75) * 0.1;
      const targetPositionX = pointerX * 0.18;

      shellRef.current.rotation.y = THREE.MathUtils.damp(
        shellRef.current.rotation.y,
        targetRotationY,
        4,
        delta,
      );
      shellRef.current.rotation.x = THREE.MathUtils.damp(
        shellRef.current.rotation.x,
        targetRotationX,
        4,
        delta,
      );
      shellRef.current.position.y = THREE.MathUtils.damp(
        shellRef.current.position.y,
        targetPositionY,
        3,
        delta,
      );
      shellRef.current.position.x = THREE.MathUtils.damp(
        shellRef.current.position.x,
        targetPositionX,
        3,
        delta,
      );
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
      particlesRef.current.rotation.x = THREE.MathUtils.damp(
        particlesRef.current.rotation.x,
        pointerY * 0.16,
        3,
        delta,
      );
      particlesRef.current.position.x = THREE.MathUtils.damp(
        particlesRef.current.position.x,
        pointerX * 0.32,
        3,
        delta,
      );
    }

    if (linesRef.current) {
      linesRef.current.rotation.y -= delta * 0.03;
      linesRef.current.rotation.z = THREE.MathUtils.damp(
        linesRef.current.rotation.z,
        pointerX * 0.08,
        3,
        delta,
      );
    }

    if (glassRef.current) {
      glassRef.current.material.opacity = THREE.MathUtils.damp(
        glassRef.current.material.opacity,
        0.12 + Math.sin(elapsedTime * 1.4) * 0.02,
        3,
        delta,
      );
    }

    if (
      elapsedTime - lastScreenDrawRef.current >= SCREEN_REFRESH_INTERVAL ||
      lastScreenDrawRef.current < 0
    ) {
      drawScreen(screen.context, elapsedTime, palette, reduceMotion);
      screen.texture.needsUpdate = true;
      lastScreenDrawRef.current = elapsedTime;
    }
  });

  return (
    <>
      <group ref={particlesRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color={palette.point}
            size={0.05}
            transparent
            opacity={0.7}
            sizeAttenuation
          />
        </points>
      </group>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={palette.accent} transparent opacity={0.25} />
      </lineSegments>

      <group ref={shellRef} position={[0, 0, 0]}>
        <mesh position={[0, -0.92, -0.16]} rotation={[-0.58, 0, 0]}>
          <boxGeometry args={[3.05, 0.26, 1.18]} />
          <meshStandardMaterial
            color={palette.shellEdge}
            metalness={0.3}
            roughness={0.62}
          />
        </mesh>

        <mesh position={[0, -1.02, 0.18]} rotation={[-0.58, 0, 0]}>
          <planeGeometry args={[2.72, 0.78]} />
          <meshBasicMaterial color="#0c1730" transparent opacity={0.92} />
        </mesh>

        <mesh position={[0, -0.32, -0.28]}>
          <boxGeometry args={[0.34, 0.7, 0.26]} />
          <meshStandardMaterial
            color={palette.shellEdge}
            metalness={0.32}
            roughness={0.56}
          />
        </mesh>

        <mesh position={[0, 0.34, -0.06]}>
          <boxGeometry args={[3, 1.96, 0.32]} />
          <meshStandardMaterial
            color={palette.shell}
            metalness={0.36}
            roughness={0.4}
          />
        </mesh>

        <mesh position={[0, 0.34, 0.06]}>
          <boxGeometry args={[2.76, 1.66, 0.09]} />
          <meshStandardMaterial
            color="#040816"
            metalness={0.2}
            roughness={0.78}
          />
        </mesh>

        <mesh position={[0, 0.34, 0.12]}>
          <planeGeometry args={[2.56, 1.42]} />
          <meshBasicMaterial map={screen.texture} toneMapped={false} />
        </mesh>

        <mesh ref={glassRef} position={[0, 0.34, 0.145]}>
          <planeGeometry args={[2.6, 1.46]} />
          <meshBasicMaterial color="#d9eeff" transparent opacity={0.12} />
        </mesh>

        <mesh position={[0, 1.16, 0.02]}>
          <boxGeometry args={[1, 0.05, 0.05]} />
          <meshBasicMaterial
            color={palette.accentSecondary}
            transparent
            opacity={0.72}
          />
        </mesh>

        <mesh position={[0.94, -1.02, 0.4]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color={palette.accentSecondary} />
        </mesh>
      </group>
    </>
  );
}

export function TerminalCanvas({
  palette,
  reduceMotion = false,
}: TerminalCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.02, 5.8], fov: 30 }}
      dpr={[1, 1.2]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[4, 3, 5]}
        intensity={1.2}
        color={palette.accent}
      />
      <pointLight
        position={[-4, -1, 4]}
        intensity={1.3}
        color={palette.accentSecondary}
      />
      <pointLight
        position={[0, 1.6, 2.8]}
        intensity={1.8}
        color={palette.glow}
      />
      <TerminalRig palette={palette} reduceMotion={reduceMotion} />
    </Canvas>
  );
}
