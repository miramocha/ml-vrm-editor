export default class VrmMetadataModel {
  metadataJson;

  constructor(metadataJson) {
    this.metadataJson = metadataJson;
  }

  get title() {
    return this.metadataJson.title;
  }

  get version() {
    return this.metadataJson.version;
  }

  get author() {
    return this.metadataJson.author;
  }

  get thumbnailTextureIndex() {
    return this.metadataJson?.texture;
  }
}
