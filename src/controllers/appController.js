import { MeshBuilder } from '@babylonjs/core';
// import defaultAvatar from '../resources/AvatarSampleB.gltf';

export default class AppController {
  idToRefreshFunctionMap = new Map();

  groupNameToIdSet = new Map();

  mainScene;

  mainEngine;

  async loadVrm(file) {
    console.log(file);
    console.log(this.mainEngine);

    const box = MeshBuilder.CreateBox('box2', { size: 2 }, this.mainScene);

    // Move the box upward 1/2 its height
    box.position.z = 15;
    // console.log('LOADING:', file);
    // this.mainScene = await SceneLoader.LoadAsync(
    //   'file:',
    //   file,
    //   this.mainEngine,
    // );

    // await SceneLoader.AppendAsync('model', file, this.mainScene, null, '.gltf');
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
