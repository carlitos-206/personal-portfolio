import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './style.css';

const Planet3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    // --- LOAD TEXTURES ---
    const textureLoader = new THREE.TextureLoader();

    // Base planet texture
    const planetTexture = textureLoader.load('/images/10K_earth_texture_day.jpg');

    // Overlay texture (e.g., clouds)
    const overlayTexture = textureLoader.load('/images/8k_earth_clouds_texture.jpg');

    // --- CREATE THE PLANET ---
    const planetGeometry = new THREE.SphereGeometry(1, 32, 32);
    const planetMaterial = new THREE.MeshPhongMaterial({ map: planetTexture });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    // --- CREATE THE OVERLAY (CLOUDS) SPHERE ---
    // Make it slightly larger than the base sphere
    const cloudsGeometry = new THREE.SphereGeometry(1.01, 32, 32);
    const cloudsMaterial = new THREE.MeshPhongMaterial({
      map: overlayTexture,
      transparent: true, 
      opacity: 0.45,     // Adjust opacity to taste (0.0 ~ 1.0)
    });
    const clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    scene.add(clouds);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // --- ANIMATE ---
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the planet
      planet.rotation.y += 0.001;

      // Rotate the overlay texture a bit (can be same rate or different)
      clouds.rotation.y += 0.0015;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // --- RESIZE HANDLER ---
    const onWindowResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="planet" ref={mountRef} />;
};

export default Planet3D;
