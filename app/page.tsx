// import { useEffect, useRef } from 'react';
// dont use useEffect and useRef
"use client";
import  { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Link from 'next/link';

export default function ThreeDWebsite() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Three.js initialization
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Set background to white
    renderer.setClearColor(0xffffff, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create 3D objects
    const geometry = new THREE.IcosahedronGeometry(2, 0);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x000000,
      wireframe: false,
      shininess: 100,
      specular: 0x111111
    });
    const icosahedron = new THREE.Mesh(geometry, material);
    scene.add(icosahedron);

    // Add floating cubes
    const cubes: THREE.Mesh[] = [];
    for (let i = 0; i < 10; i++) {
      const size = Math.random() * 0.5 + 0.3;
      const cubeGeometry = new THREE.BoxGeometry(size, size, size);
      const cubeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x000000,
        wireframe: true 
      });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      
      cube.position.x = (Math.random() - 0.5) * 10;
      cube.position.y = (Math.random() - 0.5) * 10;
      cube.position.z = (Math.random() - 0.5) * 10;
      
      cube.userData = {
        speed: Math.random() * 0.02 + 0.01,
        rotation: Math.random() * 0.02 + 0.01
      };
      
      scene.add(cube);
      cubes.push(cube);
    }

    camera.position.z = 5;

    // Animation loop
    const animate = function () {
      requestAnimationFrame(animate);

      icosahedron.rotation.x += 0.005;
      icosahedron.rotation.y += 0.01;

      // Animate floating cubes
      cubes.forEach(cube => {
        cube.rotation.x += cube.userData.rotation;
        cube.rotation.y += cube.userData.rotation;
        
        // Bounce within bounds
        if (cube.position.x > 8 || cube.position.x < -8) {
          cube.userData.speed = -cube.userData.speed;
        }
        cube.position.x += cube.userData.speed;
      });

      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Three.js canvas */}
      <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0" />
      
      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="px-8 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter">
            <span className="bg-black text-white px-3 py-1">XENO MINI CRM</span> 
          </div>
          <div className="flex items-center space-x-6">
            
            <Link 
              href="/login" 
              className="border-2 border-black px-4 py-2 rounded bg-yellow-500 hover:bg-black hover:text-white transition"
            >
              Login
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-black text-orange-500 px-4 py-2">MANAGE YOUR</span> <span className=' text-blue-500 px-4 py-2'>CUSTOMERS</span>
          </h1>
          <p className="text-xl max-w-2xl text-green-500 mb-12">
            Experience the real productivity with our CRM.
          </p>
          <div className="flex space-x-4">
            
            <Link 
              href="/login" 
              className="bg-white text-black px-8 py-3 rounded hover:bg-gray-900 transition font-medium"
            >
              Login
            </Link>
            <Link 
              href="https://xeno-mini-crm-server.onrender.com/api-docs/" 
              className="bg-white text-black px-8 py-3 rounded hover:bg-gray-900 transition font-medium"
            >
              Swagger Docs
            </Link>
          </div>
        </main>

        {/* Floating indicators */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-12">
          {['3D', 'ART', 'DESIGN', 'BLACK/WHITE'].map((item) => (
            <div key={item} className="text-sm tracking-widest rotate-90 origin-bottom-left">
              {item}
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="px-8 py-6 text-sm flex justify-between">
          <div>© 2025 3D SPACE</div>
          <div className="flex space-x-4">
            <Link href="#" className="hover:underline">Terms</Link>
            <Link href="#" className="hover:underline">Privacy</Link>
            <Link href="/login" className="hover:underline">Login</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
