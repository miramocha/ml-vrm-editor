export default class TextureModel {
  /**
   * @type {number}
   */
  imagesIndex;

  /**
   * @type {number}
   */
  bufferViewsIndex;

  /**
   * @type {string}
   */
  name;

  /**
   * @type {string}
   */
  mimeType;

  /**
   * @type {blob}
   */
  blob;

  constructor({ imagesIndex, bufferViewsIndex, name, mimeType, blob }) {
    this.imagesIndex = imagesIndex;
    this.bufferViewsIndex = bufferViewsIndex;
    this.name = name;
    this.mimeType = mimeType;
    this.blob = blob;
  }

  get imageSrc() {
    return URL.createObjectURL(this.blob);
  }
}
