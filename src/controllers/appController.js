// import defaultVrmPath from '../resources/AvatarSampleB.vrm';

export default class AppController {
  idToRefreshFunctionMap = new Map();

  groupNameToIdSet = new Map();

  loader = null;

  scene = null;

  vrm = null;

  isLoading = false;

  setVrmLoadingPercentage;

  loadVrm(file) {
    this.setVrmLoadingPercentage(0);
    this.loader.load(
      URL.createObjectURL(file),
      (gltf) => {
        const { vrm } = gltf.userData;
        this.scene.add(vrm.scene);

        if (this.vrm) {
          this.scene.remove(this.vrm);
        }
        this.vrm = vrm.scene;
        this.setVrmLoadingPercentage(100);
      },
      (progress) => {
        this.setVrmLoadingPercentage(
          Math.min(100.0 * (progress.loaded / progress.total), 95),
        );
      },
      (error) => console.error(error),
    );
  }

  refreshView(id) {
    const refreshFunction = this.idToRefreshFunctionMap.get(id);

    if (refreshFunction) {
      refreshFunction();
    }
  }

  refreshViews({ ids = new Set(), skipIds = new Set() }) {
    ids.forEach((id) => !skipIds.has(id) && this.refreshView(id));
    return this;
  }

  refreshGroup({ group, skipIds = new Set() }) {
    this.refreshViews({ ids: this.groupNameToIdSet.get(group), skipIds });
    return this;
  }

  setRefreshFunction({ id, refreshFunction }) {
    this.idToRefreshFunctionMap.set(id, refreshFunction);
    return this;
  }

  setIdToRefreshFunctionGroup({ id, group, refreshFunction }) {
    this.setRefreshFunction({ id, refreshFunction });

    let idSet = this.groupNameToIdSet.get(group);
    if (!idSet) {
      idSet = new Set();
      this.groupNameToIdSet.set(group, idSet);
    }

    idSet.add(id);

    return this;
  }

  setEditingTextureModel;

  setSetEditingTextureModelFunction(setEditingTextureModel) {
    this.setEditingTextureModel = setEditingTextureModel;
    return this;
  }

  setShowTextureEditorModal;

  setSetShowTextureEditorModalFunction(setShowTextureEditorModalFunction) {
    this.setShowTextureEditorModal = setShowTextureEditorModalFunction;
    return this;
  }

  openEditTextureModal(textureModel) {
    this.setEditingTextureModel(textureModel);
    this.setShowTextureEditorModal(true);
  }

  closeEditTextureModal() {
    this.setShowTextureEditorModal(false);
    this.setEditingTextureModel(null);
  }
}
