export default class VrmMetadataModel {
  metadataJson;

  constructor(metadataJson) {
    this.metadataJson = metadataJson;
  }

  processFormData(formData) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [name, value] of formData.entries()) {
      this.metadataJson[name] = value;
    }
  }

  get thumbnailTextureIndex() {
    return this.metadataJson?.texture;
  }
}
