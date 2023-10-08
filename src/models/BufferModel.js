export default class BufferModel {
  bufferViewJson;

  buffer;

  constructor({ bufferViewJson, buffer }) {
    this.bufferViewJson = bufferViewJson;
    this.buffer = buffer;
  }

  get byteOffset() {
    return this.bufferViewJson.byteOffset;
  }

  setByteOffset(byteOffset) {
    this.bufferViewJson.byteOffset = byteOffset;
    return this;
  }

  get byteLength() {
    return this.bufferViewJson.byteLength;
  }

  setByteLength(byteLength) {
    this.bufferViewJson.byteLength = byteLength;
    return this;
  }
}
