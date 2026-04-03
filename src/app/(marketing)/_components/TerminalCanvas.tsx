"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function TerminalMesh() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.15;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.05;
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Terminal body */}
      <mesh>
        <boxGeometry args={[3.2, 2.0, 0.12]} />
        <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Screen bezel */}
      <mesh position={[0, 0, 0.065]}>
        <boxGeometry args={[2.9, 1.7, 0.01]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.8} />
      </mesh>
      {/* Screen glow */}
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[2.7, 1.5, 0.005]} />
        <meshStandardMaterial
          color="#001a00"
          emissive="#00ff41"
          emissiveIntensity={0.08}
          roughness={1}
        />
      </mesh>
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = (() => {
    const count = 80;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    return pos;
  })();

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#6366f1" size={0.04} transparent opacity={0.5} />
    </points>
  );
}

export function TerminalCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#6366f1" />
      <pointLight position={[-3, -2, 2]} intensity={0.8} color="#22d3ee" />
      <TerminalMesh />
      <Particles />
    </Canvas>
  );
}
