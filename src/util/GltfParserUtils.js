/**
 * Refactored from VRMEditorTools
 * Copyright (c) 2022 Nobuyuki Furukawa (tfuru)
 */

const GLTF_HEADER_MAGIC = 0x46546c67;
const GLTF_JSON_CHUNK_TYPE_NUMBER = 0x4e4f534a;
const GLTF_BINARY_CHUNK_TYPE_NUMBER = 0x004e4942;
const GLTF_UINT32_CHUNK_LENGTH = 4;
const GLTF_CHUNK_HEADER_LENGTH = 3 * GLTF_UINT32_CHUNK_LENGTH;
const GLTF_LITTLE_ENDIAN = true;

function parseHeader({ fileDataView }) {
  let byteOffset = 0;

  // magic MUST be equal to equal 0x46546C67. It is ASCII string glTF and can be used to identify data as Binary glTF.
  const magic = fileDataView.getUint32(byteOffset, GLTF_LITTLE_ENDIAN);
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;

  // version indicates the version of the Binary glTF container format.
  const version = fileDataView.getUint32(byteOffset, GLTF_LITTLE_ENDIAN);
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;
  console.log('READING HEADER VERSION:', version);

  // length is the total length of the Binary glTF, including header and all chunks, in bytes.
  const length = fileDataView.getUint32(byteOffset, GLTF_LITTLE_ENDIAN);

  console.log('READING HEADER LENGTH:', length);

  return { magic, version, length };
}

function parseChunk({ fileDataView, byteOffset, chunkNumber }) {
  const chunkLength = fileDataView.getUint32(byteOffset, GLTF_LITTLE_ENDIAN);

  console.log('READING CHUNK LENGTH AT OFFSET:', byteOffset);
  console.log('CHUNK LENGTH:', chunkLength);

  const typeNumber = fileDataView.getUint32(
    byteOffset + GLTF_UINT32_CHUNK_LENGTH,
    GLTF_LITTLE_ENDIAN,
  );
  console.log(
    'READING CHUNK TYPE AT OFFSET:',
    byteOffset + GLTF_UINT32_CHUNK_LENGTH,
  );
  console.log('CHUNK TYPE NUMBER:', typeNumber);

  // TO DO: Remove this check and throw error earlier with gltf-validator
  if (chunkNumber !== typeNumber) {
    throw new Error('Invalid Chunk Number.');
  }

  console.log(
    'READING CHUNK CONTENT AT OFFSET:',
    byteOffset + GLTF_UINT32_CHUNK_LENGTH + GLTF_UINT32_CHUNK_LENGTH,
  );
  const chunkUint8Array = new Uint8Array(
    fileDataView.buffer,
    byteOffset + GLTF_UINT32_CHUNK_LENGTH + GLTF_UINT32_CHUNK_LENGTH,
    chunkLength,
  );

  return { chunkLength, chunkUint8Array };
}

function parseJsonChunk({ fileDataView }) {
  return parseChunk({
    fileDataView,
    byteOffset: GLTF_CHUNK_HEADER_LENGTH,
    chunkNumber: GLTF_JSON_CHUNK_TYPE_NUMBER,
  });
}

function parseBinaryChunk({ fileDataView, jsonChunkLength }) {
  const byteOffset =
    GLTF_CHUNK_HEADER_LENGTH +
    GLTF_UINT32_CHUNK_LENGTH +
    GLTF_UINT32_CHUNK_LENGTH +
    jsonChunkLength;

  return parseChunk({
    fileDataView,
    byteOffset,
    chunkNumber: GLTF_BINARY_CHUNK_TYPE_NUMBER,
  });
}

function parseJson(jsonChunk) {
  const decoder = new TextDecoder('utf8');
  const jsonString = decoder.decode(jsonChunk.chunkUint8Array);
  console.log('JSON STRING LENGTH:', jsonString.length);
  return JSON.parse(jsonString);
}

function buildGltfFile({ fileName, jsonChunk, binaryChunk, version }) {
  const arrayBufferLength =
    GLTF_CHUNK_HEADER_LENGTH + // 12-Byte Header (4 + 4 + 4)
    GLTF_UINT32_CHUNK_LENGTH + // 4 Byte containing length of JSON chunk
    GLTF_UINT32_CHUNK_LENGTH + // 4 Byte containing type of chunk
    jsonChunk.chunkLength +
    GLTF_UINT32_CHUNK_LENGTH + // 4 Byte containing length of binary chunk
    GLTF_UINT32_CHUNK_LENGTH + // 4 Byte containing type of chunk
    binaryChunk.chunkLength;
  const arrayBuffer = new ArrayBuffer(arrayBufferLength);

  console.log('ARRAY BUFFER LENGTH:', arrayBufferLength);
  const fileDataView = new DataView(arrayBuffer);
  const uInt8Array = new Uint8Array(arrayBuffer);

  let byteOffset = 0;

  // Build 12-byte Header
  fileDataView.setUint32(byteOffset, GLTF_HEADER_MAGIC, GLTF_LITTLE_ENDIAN);
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;

  fileDataView.setUint32(byteOffset, version, GLTF_LITTLE_ENDIAN);
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;
  console.log('WRITING HEADER VERSION:', version);

  fileDataView.setUint32(byteOffset, arrayBufferLength, GLTF_LITTLE_ENDIAN);
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;
  console.log('WRITING HEADER LENGTH', arrayBufferLength);

  // Build Chunk 0 (JSON)
  console.log(
    `WRITING JSON CHUNK LENGTH ${jsonChunk.chunkLength} AT OFFSET:${byteOffset}`,
  );
  fileDataView.setUint32(byteOffset, jsonChunk.chunkLength, GLTF_LITTLE_ENDIAN);
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;

  console.log('WRITING JSON CHUNK TYPE AT OFFSET:', byteOffset);
  fileDataView.setUint32(
    byteOffset,
    GLTF_JSON_CHUNK_TYPE_NUMBER,
    GLTF_LITTLE_ENDIAN,
  );
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;

  console.log('WRITING JSON AT OFFSET:', byteOffset);
  uInt8Array.set(jsonChunk.chunkUint8Array, byteOffset);
  byteOffset += jsonChunk.chunkLength;

  // Build Chunk 1 (Binary)
  console.log(
    `WRITING BINARY CHUNK LENGTH ${binaryChunk.chunkLength} AT OFFSET:${byteOffset}`,
  );
  fileDataView.setUint32(
    byteOffset,
    binaryChunk.chunkLength,
    GLTF_LITTLE_ENDIAN,
  );
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;

  console.log('WRITING BINARY CHUNK TYPE AT OFFSET:', byteOffset);
  fileDataView.setUint32(
    byteOffset,
    GLTF_BINARY_CHUNK_TYPE_NUMBER,
    GLTF_LITTLE_ENDIAN,
  );
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;

  console.log('WRITING BINARY AT OFFSET:', byteOffset);
  uInt8Array.set(binaryChunk.chunkUint8Array, byteOffset);

  return new File([fileDataView], fileName);
}

function calculateChunkLength(length) {
  return Math.ceil(length / 4) * 4;
}

export {
  parseHeader,
  parseJsonChunk,
  parseBinaryChunk,
  parseJson,
  buildGltfFile,
  calculateChunkLength,
};
