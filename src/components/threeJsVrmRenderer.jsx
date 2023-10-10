/* eslint-disable no-unused-vars */
import { useRef, useEffect, useContext } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';
import { AppControllerContext } from '../AppContext';

export default function ThreeJsVrmRenderer() {
  const appController = useContext(AppControllerContext);
  const rendererCanvas = useRef(null);

  useEffect(() => {
    const { current: canvas } = rendererCanvas;

    const loader = new GLTFLoader();
    loader.register((parser) => {
      return new VRMLoaderPlugin(parser);
    });

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0.75, -3);
    camera.rotateY(Math.PI);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 0.75, 0);
    controls.update();

    const handleWindowResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.width, canvas.height);
    };

    if (window) {
      window.addEventListener('resize', handleWindowResize);
    }

    const light = new THREE.AmbientLight('rgb(255, 255, 255)'); // soft white light
    scene.add(light);

    appController.loader = loader;
    appController.scene = scene;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <canvas ref={rendererCanvas} />;
}
