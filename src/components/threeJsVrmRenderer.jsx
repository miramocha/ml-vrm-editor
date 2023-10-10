/* eslint-disable no-unused-vars */
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';
import defaultVrmPath from '../resources/AvatarSampleB.vrm';

export default function ThreeJsVrmRenderer() {
  const rendererCanvas = useRef(null);

  useEffect(() => {
    const { current: canvas } = rendererCanvas;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

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

    camera.position.y = 1;
    camera.position.z = -2;
    camera.rotateY(Math.PI);

    const loader = new GLTFLoader();

    // Install GLTFLoader plugin
    loader.register((parser) => {
      return new VRMLoaderPlugin(parser);
    });

    loader.load(
      // URL of the VRM you want to load
      defaultVrmPath,

      // called when the resource is loaded
      (gltf) => {
        // retrieve a VRM instance from gltf
        const { vrm } = gltf.userData;
        console.log('vrm:', vrm);
        console.log('userData:', gltf.userData);

        // add the loaded vrm to the scene
        scene.add(vrm.scene);

        // deal with vrm features
        console.log(vrm);
      },

      // called while loading is progressing
      (progress) =>
        console.log(
          'Loading model...',
          100.0 * (progress.loaded / progress.total),
          '%',
        ),

      // called when loading has errors
      (error) => console.error(error),
    );

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return <canvas ref={rendererCanvas} />;
}
