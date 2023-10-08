// eslint-disable-next-line no-unused-vars
const ACCESSOR_COMPONENT_TYPE_TO_BYTES = new Map([
  [5120, 1],
  [5121, 1],
  [5122, 2],
  [5123, 2],
  [5125, 4],
  [5126, 4],
]);
// eslint-disable-next-line no-unused-vars
const ACCESSOR_TYPE_TO_NUMBER_OF_COMPONENTS = new Map([
  ['SCALAR', 1],
  ['VEC2', 2],
  ['VEC3', 3],
  ['VEC4', 4],
  ['MAT2', 4],
  ['MAT3', 9],
  ['MAT4', 16],
]);

export default class BufferModel {
  bufferViewJson;

  accessorJson;

  buffer;

  constructor({ bufferViewJson, buffer, accessorJson }) {
    this.bufferViewJson = bufferViewJson;
    this.buffer = buffer;
    this.accessorJson = accessorJson;
  }

  get componentSize() {
    // console.log(this.accessorJson);
    const componentNumber = ACCESSOR_COMPONENT_TYPE_TO_BYTES.get(
      this.accessorJson.componentType,
    );

    const size = ACCESSOR_TYPE_TO_NUMBER_OF_COMPONENTS.get(
      this.accessorJson.type,
    );
    // console.log(componentNumber, size);
    return componentNumber * size;
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
