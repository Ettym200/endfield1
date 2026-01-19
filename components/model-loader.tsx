"use client";

import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense, useState, useEffect } from "react";
import { Mesh, Group, Box3, Vector3 } from "three";

// Componente de loading enquanto o modelo carrega
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8b5cf6" wireframe />
    </mesh>
  );
}

// Componente que carrega o modelo GLB/GLTF
function Model3D({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  const meshRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const baseYRef = useRef<number>(0);
  const modelRef = useRef<Group | null>(null);

  // Clonar e centralizar o modelo uma vez quando carregar
  useEffect(() => {
    if (scene && !modelRef.current) {
      // Clonar a cena para evitar problemas de mutação
      const clonedScene = scene.clone();
      
      // Calcular bounding box
      const box = new Box3().setFromObject(clonedScene);
      const center = box.getCenter(new Vector3(0, 0, 0));
      const size = box.getSize(new Vector3());
      
      // Calcular escala automática
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = maxDim > 0 ? 3 / maxDim : 1;
      
      // Aplicar escala
      clonedScene.scale.setScalar(scale);
      
      // Centralizar o modelo (mover para a origem)
      const centeredX = -center.x * scale;
      const centeredY = -center.y * scale;
      const centeredZ = -center.z * scale;
      
      clonedScene.position.set(centeredX, centeredY, centeredZ);
      baseYRef.current = centeredY; // Guardar posição Y base (centralizada)
      modelRef.current = clonedScene as Group;
    }
  }, [scene]);

  useFrame((state) => {
    if (meshRef.current && baseYRef.current !== undefined) {
      // Rotação sutil automática (mais lenta para não competir com OrbitControls)
      if (!hovered) {
        meshRef.current.rotation.y += 0.002;
      }

      // Movimento flutuante muito sutil (mantém posição base centralizada)
      meshRef.current.position.y = baseYRef.current + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  if (!modelRef.current) {
    return null;
  }

  return (
    <primitive
      ref={meshRef}
      object={modelRef.current}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    />
  );
}

// Componente principal que renderiza o Canvas
export default function ModelLoader({ 
  modelPath = "/models/character.glb" 
}: { 
  modelPath?: string 
}) {
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
        <Suspense fallback={<LoadingFallback />}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
          
          {/* Iluminação */}
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          <directionalLight position={[0, 5, 5]} intensity={0.8} />

          {/* Modelo 3D */}
          <Model3D modelPath={modelPath} />

          {/* Controles de órbita - permite girar com o mouse */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={false}
            minDistance={2}
            maxDistance={10}
            rotateSpeed={1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Pré-carregar modelos para performance
// useGLTF.preload("/models/character.glb");

