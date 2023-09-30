export default class GltfChunkModel {
  /**
   * @type {number}
   */
  chunkLength;

  /**
   * @type {Uint8Array}
   */
  chunkUint8Array;

  constructor({ chunkLength, chunkUint8Array }) {
    this.chunkLength = chunkLength;
    this.chunkUint8Array = chunkUint8Array;
  }
}
