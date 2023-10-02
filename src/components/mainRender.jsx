import { useEffect, useRef, useContext } from 'react';
import {
  // FreeCamera,
  Vector3,
  Engine,
  Scene,
  HemisphericLight,
  ArcRotateCamera,
} from '@babylonjs/core';
import { AppControllerContext } from '../AppContext';

const antialias = true;
const engineOptions = null;
const adaptToDeviceRatio = null;
const sceneOptions = null;
const onRender = () => {};
const onSceneReady = (scene) => {
  // TO DO - REFACTOR THIS
  // const camera = new FreeCamera('camera', new Vector3(0, 1.5, -2), scene);
  const camera = new ArcRotateCamera(
    'camera',
    -(Math.PI / 2),
    Math.PI / 2,
    2,
    new Vector3(0, 1, -0.2),
    scene,
  );
  // camera.setTarget(new Vector3(0, 1, 0));
  // camera.useAutoRotationBehavior = true;
  camera.attachControl(scene.getEngine().getRenderingCanvas());

  const light = new HemisphericLight('light', new Vector3(0.5, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.9;
};

export default function MainRender() {
  const reactCanvas = useRef(null);
  const appController = useContext(AppControllerContext);

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    const engine = new Engine(
      canvas,
      antialias,
      engineOptions,
      adaptToDeviceRatio,
    );
    appController.engine = engine;
    const scene = new Scene(engine, sceneOptions);
    if (scene.isReady()) {
      onSceneReady(scene);
      appController.scene = scene;
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

    // eslint-disable-next-line consistent-return
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
