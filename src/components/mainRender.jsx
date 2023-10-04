import { useEffect, useRef, useContext } from 'react';
import {
  // FreeCamera,
  MeshBuilder,
  Vector3,
  Engine,
  Scene,
  HemisphericLight,
  ArcRotateCamera,
  PointLight,
} from '@babylonjs/core';
import { AppControllerContext } from '../AppContext';

const antialias = true;
const engineOptions = null;
const adaptToDeviceRatio = null;
const sceneOptions = null;
const onRender = () => {};
const onSceneReady = (scene) => {
  // TO DO - REFACTOR THIS
  const camera = new ArcRotateCamera(
    'camera',
    -(Math.PI / 2),
    Math.PI / 2,
    1.5,
    new Vector3(0, 1, -0.4),
    scene,
  );

  camera.attachControl(scene.getEngine().getRenderingCanvas());

  MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);

  const ambientLight = new HemisphericLight(
    'ambientLight',
    new Vector3(0.5, 1, 0),
    scene,
  );

  ambientLight.intensity = 0.0;

  const pointLight = new PointLight(
    'pointLight',
    new Vector3(0, 1, -0.2),
    scene,
  );

  pointLight.radius = 0.1;
  console.log(pointLight);
};

export default function MainRender() {
  const reactCanvas = useRef(null);
  const appController = useContext(AppControllerContext);

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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

    const handleWindowResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener('resize', handleWindowResize);
    }

    const cleanupCallback = () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener('resize', handleWindowResize);
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

  return <canvas ref={reactCanvas} />;
}
