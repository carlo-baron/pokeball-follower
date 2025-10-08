"use client";

import { useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function PokeballScene() {
  return (
    <div className='w-20 h-20 rounded-full'>
      <Canvas
        orthographic
        camera={{
          zoom: 10,
          position: [0, 0, 5],
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight color="white" position={[-5, 5, 10]} />
        <Suspense fallback={null}>
          <Pokeball />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Pokeball() {
  const model = useGLTF("/pokeball.glb");
  const modelRef = useRef<THREE.Group>(null);
  const { gl } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [gl]);

  useFrame(() => {
    if (!modelRef.current) return;

    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    const normX = mouse.current.x / winWidth - 0.5;
    const normY = mouse.current.y / winHeight - 0.5;

    modelRef.current.rotation.y = (normX * Math.PI * .7);
    modelRef.current.rotation.x = (normY * Math.PI * .7);
  });

  return <primitive ref={modelRef} object={model.scene} />;
}
