/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
// import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import * as BABYLON from '@babylonjs/core';

const antialias = true;
const engineOptions = null;
const adaptToDeviceRatio = null;
const sceneOptions = null;
const onRender = (scene) => {
  const box = scene.getMeshByName('box');
  if (box !== undefined) {
    const deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }
};
const onSceneReady = (scene) => {
  // const canvas = scene.getEngine().getRenderingCanvas();

  const camera = new BABYLON.FreeCamera(
    'camera',
    new BABYLON.Vector3(0, 5, -10),
    scene,
  );
  camera.setTarget(BABYLON.Vector3.Zero());
  // camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    'light',
    new BABYLON.Vector3(0.5, 1, 0),
    scene,
  );

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  BABYLON.MeshBuilder.CreateGround('ground', { width: 10, height: 10 }, scene);

  const box = BABYLON.MeshBuilder.CreateBox('box', { size: 2 }, scene);

  // Move the box upward 1/2 its height
  box.position.y = 1;

  // Our built-in 'ground' shape.
  BABYLON.MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);
};

export default function MainRender() {
  const reactCanvas = useRef(null);

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    const engine = new BABYLON.Engine(
      canvas,
      antialias,
      engineOptions,
      adaptToDeviceRatio,
    );
    const scene = new BABYLON.Scene(engine, sceneOptions);
    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce(() => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === 'function') onRender(scene);
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener('resize', resize);
    }

    const cleanupCallback = () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener('resize', resize);
      }
    };

    return cleanupCallback;
  }, [
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
  ]);

  return <canvas style={{ width: '100%', height: '100%' }} ref={reactCanvas} />;
}
