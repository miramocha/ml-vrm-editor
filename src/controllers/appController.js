import { SceneLoader } from '@babylonjs/core';
import 'babylon-vrm-loader';

export default class AppController {
  idToRefreshFunctionMap = new Map();

  groupNameToIdSet = new Map();

  defaultAvatar;

  scene;

  engine;

  isLoading = false;

  async loadVrm(file) {
    const environmentNodes = new Set([
      'camera',
      'ambientLight',
      'pointLight',
      'ground',
    ]);

    this.scene.rootNodes.forEach((rootNode) => {
      if (!environmentNodes.has(rootNode.name)) {
        rootNode.dispose();
      }
    });

    this.scene.materials.forEach((materials) => materials.dispose());
    this.scene.meshes.forEach(
      (mesh) => mesh.name !== 'ground' && mesh.dispose(),
    );
    this.scene.skeletons.forEach((skeleton) => skeleton.dispose());

    SceneLoader.Append(
      'file:',
      file,
      this.scene,
      () => {
        this.isLoading = false;
      },
      () => {
        this.isLoading = true;
      },
      () => {
        this.isLoading = false;
      },
      '.vrm',
    );
  }

  // refreshView(id) {
  //   const refreshFunction = this.idToRefreshFunctionMap.get(id);

  //   if (refreshFunction) {
  //     refreshFunction();
  //   }
  // }

  // refreshViews({ ids = new Set(), skipIds = new Set() }) {
  //   ids.forEach((id) => !skipIds.has(id) && this.refreshView(id));
  // }

  // refreshGroup({ group, skipIds = new Set() }) {
  //   this.refreshViews({ ids: this.groupNameToIdSet.get(group), skipIds });
  // }

  // setRefreshFunction({ id, refreshFunction }) {
  //   this.idToRefreshFunctionMap.set(id, refreshFunction);
  // }

  // setIdToRefreshFunctionGroup({ id, group, refreshFunction }) {
  //   this.setRefreshFunction({ id, refreshFunction });

  //   let idSet = this.groupNameToIdSet.get(group);
  //   if (!idSet) {
  //     idSet = new Set();
  //     this.groupNameToIdSet.set(group, idSet);
  //   }

  //   idSet.add(id);
  // }
}
