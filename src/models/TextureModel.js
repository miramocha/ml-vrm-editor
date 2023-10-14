export default class TextureModel {
  imageJson;

  textureJson;

  bufferModel;

  constructor({ bufferModel, imageJson, textureJson }) {
    this.bufferModel = bufferModel;
    this.imageJson = imageJson;
    this.textureJson = textureJson;
  }

  get name() {
    return this.imageJson.name;
  }

  setName(name) {
    this.imageJson.name = name;
    return this;
  }

  get mimeType() {
    return this.imageJson.mimeType;
  }

  setMimeType(mimeType) {
    this.imageJson.mimeType = mimeType;
    return this;
  }

  setBuffer(buffer) {
    this.bufferModel.buffer = buffer;
  }

  get bufferViewIndex() {
    return this.imageJson.buffer;
  }

  get imageSrc() {
    return URL.createObjectURL(
      new Blob([this.bufferModel.buffer], { type: this.mimeType }),
    );
  }
}
