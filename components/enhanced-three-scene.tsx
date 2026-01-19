"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { useRef, useState } from "react";
import { Mesh, Group } from "three";
import * as THREE from "three";

function RotatingBox() {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotação contínua suave
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      
      // Efeito de hover - rotaciona mais rápido
      if (hovered) {
        meshRef.current.rotation.x += 0.02;
        meshRef.current.rotation.y += 0.02;
      }

      // Movimento flutuante sutil
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color={hovered ? "#a855f7" : "#8b5cf6"}
        emissive={hovered ? "#a855f7" : "#8b5cf6"}
        emissiveIntensity={hovered ? 0.8 : 0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

function RotatingSphere() {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
      
      if (hovered) {
        meshRef.current.rotation.x += 0.01;
        meshRef.current.rotation.y += 0.01;
      }

      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + 1) * 0.2;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[3, 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.15 : 1}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={hovered ? "#60a5fa" : "#3b82f6"}
        emissive={hovered ? "#60a5fa" : "#3b82f6"}
        emissiveIntensity={hovered ? 0.8 : 0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = new Float32Array(2000 * 3);
  for (let i = 0; i < 2000; i++) {
    particles[i * 3] = (Math.random() - 0.5) * 20;
    particles[i * 3 + 1] = (Math.random() - 0.5) * 20;
    particles[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2000}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.6}
      />
    </points>
  );
}

interface EnhancedThreeSceneProps {
  modelPath?: string; // Caminho opcional para um modelo GLB/GLTF
}

export default function EnhancedThreeScene({ modelPath }: EnhancedThreeSceneProps = { modelPath: undefined }) {
  // Se um modelo foi fornecido, você pode usar o ModelLoader aqui
  // Por enquanto, mostra os objetos padrão
  
  return (
    <div className="w-full h-full min-h-[600px]">
      <Canvas
        gl={{ 
          antialias: true, 
          alpha: true,
          preserveDrawingBuffer: true,
          premultipliedAlpha: false
        }}
        onCreated={({ gl }) => {
          // Garantir que o fundo seja transparente
          gl.setClearColor(0x000000, 0);
          gl.clear();
        }}
        className="bg-transparent w-full h-full"
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
        
        {/* Iluminação aprimorada */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
        <directionalLight position={[0, 5, 5]} intensity={0.5} />

        {/* Campo de partículas */}
        <ParticleField />

        {/* Objetos 3D padrão */}
        <RotatingBox />
        <RotatingSphere />

        {/* Controles de órbita - permite girar com o mouse */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          minDistance={3}
          maxDistance={10}
          rotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}

