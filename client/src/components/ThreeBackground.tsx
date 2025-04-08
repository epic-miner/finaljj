import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeBackgroundProps {
  className?: string;
}

export default function ThreeBackground({ className }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create a scene
    const scene = new THREE.Scene();
    
    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // transparent background
    containerRef.current.appendChild(renderer.domElement);
    
    // Create a group to hold all objects
    const group = new THREE.Group();
    scene.add(group);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x9900ff, 0.5);
    scene.add(ambientLight);
    
    // Add point light
    const pointLight = new THREE.PointLight(0x9900ff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      // Position particles in a sphere
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xAA00FF,
      transparent: true,
      opacity: 0.8,
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(particlesMesh);
    
    // Create geometries
    const geometry1 = new THREE.TorusGeometry(2, 0.5, 16, 100);
    const material1 = new THREE.MeshStandardMaterial({
      color: 0x9900ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const torus = new THREE.Mesh(geometry1, material1);
    group.add(torus);
    
    const geometry2 = new THREE.IcosahedronGeometry(1.5, 0);
    const material2 = new THREE.MeshStandardMaterial({
      color: 0x8800ff,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const icosahedron = new THREE.Mesh(geometry2, material2);
    group.add(icosahedron);
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate group
      group.rotation.x += 0.001;
      group.rotation.y += 0.002;
      
      // Rotate individual meshes
      torus.rotation.x += 0.003;
      torus.rotation.y += 0.001;
      
      icosahedron.rotation.x -= 0.001;
      icosahedron.rotation.y -= 0.002;
      
      // Rotate particles
      particlesMesh.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose geometries and materials
      geometry1.dispose();
      material1.dispose();
      geometry2.dispose();
      material2.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      
      renderer.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className={`absolute top-0 left-0 w-full h-full -z-10 overflow-hidden ${className}`}
    />
  );
}