export default class BufferModel {
  bufferViewJson;

  buffer;

  constructor({ bufferViewJson, buffer }) {
    this.bufferViewJson = bufferViewJson;
    this.buffer = buffer;
  }
}
