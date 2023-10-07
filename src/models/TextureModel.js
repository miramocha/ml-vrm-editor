export default class TextureModel {
  imageJson;

  bufferModel;

  constructor({ bufferModel, imageJson }) {
    this.bufferModel = bufferModel;
    this.imageJson = imageJson;
  }

  get name() {
    return this.imageJson.name;
  }

  get mimeType() {
    return this.imageJson.mimeType;
  }

  get imageSrc() {
    return URL.createObjectURL(
      new Blob([this.bufferModel.buffer], { type: this.mimeType }),
    );
  }
}
