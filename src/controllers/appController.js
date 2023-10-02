import { SceneLoader } from '@babylonjs/core';
// import 'babylonjs-loaders';
import 'babylon-vrm-loader';
// import defaultAvatar from '../resources/AvatarSampleB.gltf';

export default class AppController {
  idToRefreshFunctionMap = new Map();

  groupNameToIdSet = new Map();

  defaultAvatar;

  scene;

  engine;

  async loadVrm(file) {
    console.log('ATTEMPTING TO LOAD:', file);
    this.scene.materials.forEach((material) => material.dispose());
    this.scene.meshes.forEach((mesh) => mesh.dispose());

    SceneLoader.Append(
      'file:',
      file,
      this.scene,
      (a) => {
        console.log('SUCCESS:', a);
      },
      (b) => {
        console.log('PROGRESS:', b);
      },
      (c) => {
        console.log('ERROR:', c);
      },
      '.vrm',
    );
  }

  refreshView(id) {
    const refreshFunction = this.idToRefreshFunctionMap.get(id);

    if (refreshFunction) {
      console.log('REFRESHING:', id);
      refreshFunction();
    }
  }

  refreshViews({ ids = new Set(), skipIds = new Set() }) {
    ids.forEach((id) => !skipIds.has(id) && this.refreshView(id));
  }

  refreshGroup({ group, skipIds = new Set() }) {
    console.log('REFRESHING GROUP:', group);
    this.refreshViews({ ids: this.groupNameToIdSet.get(group), skipIds });
  }

  setRefreshFunction({ id, refreshFunction }) {
    this.idToRefreshFunctionMap.set(id, refreshFunction);
  }

  setIdToRefreshFunctionGroup({ id, group, refreshFunction }) {
    this.setRefreshFunction({ id, refreshFunction });

    let idSet = this.groupNameToIdSet.get(group);
    if (!idSet) {
      idSet = new Set();
      this.groupNameToIdSet.set(group, idSet);
    }

    idSet.add(id);
  }
}
