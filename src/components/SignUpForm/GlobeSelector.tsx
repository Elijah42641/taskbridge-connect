import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface GlobeSelectorProps {
  onLocationSelect: (location: string) => void;
}

export const GlobeSelector = ({ onLocationSelect }: GlobeSelectorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create globe
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const texture = new THREE.TextureLoader().load('/earth-texture.jpg');
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      bumpScale: 0.05,
    });
    
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    camera.position.z = 5;

    // Handle rotation
    let isDragging = false;
    let previousMousePosition = {
      x: 0,
      y: 0
    };

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
      };

      globe.rotation.y += deltaMove.x * 0.005;
      globe.rotation.x += deltaMove.y * 0.005;

      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleClick = (event: MouseEvent) => {
      if (isDragging) return;

      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2(x, y);
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(globe);

      if (intersects.length > 0) {
        const point = intersects[0].point.normalize();
        const lat = Math.asin(point.y) * (180 / Math.PI);
        const lng = Math.atan2(point.x, point.z) * (180 / Math.PI);
        
        onLocationSelect(`${lat.toFixed(2)}°, ${lng.toFixed(2)}°`);
      }
    };

    // Add event listeners
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('click', handleClick);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (!isDragging) {
        globe.rotation.y += 0.001;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [onLocationSelect]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[300px] rounded-lg overflow-hidden"
      style={{ cursor: 'grab' }}
    />
  );
};