/**
 * Refactored from VRMEditorTools
 * Copyright (c) 2022 Nobuyuki Furukawa (tfuru)
 */

import GltfChunkModel from '../models/GltfChunkModel';
import MaterialModel from '../models/MaterialModel';
import TextureModel from '../models/TextureModel';
import BufferModel from '../models/BufferModel';

const GLTF_HEADER_MAGIC = 0x46546c67;
const GLTF_JSON_CHUNK_TYPE_NUMBER = 0x4e4f534a;
const GLTF_BINARY_CHUNK_TYPE_NUMBER = 0x004e4942;
const GLTF_UINT32_CHUNK_LENGTH = 4;
const GLTF_CHUNK_HEADER_LENGTH = 3 * GLTF_UINT32_CHUNK_LENGTH;
const GLTF_LITTLE_ENDIAN = true;
const PAD_SPACE_UINT8 = 32;

export const parseHeader = ({ fileDataView }) => {
  let byteOffset = 0;

  // magic MUST be equal to equal 0x46546C67. It is ASCII string glTF and can be used to identify data as Binary glTF.
  const magic = fileDataView.getUint32(byteOffset, GLTF_LITTLE_ENDIAN);
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;

  // version indicates the version of the Binary glTF container format.
  const version = fileDataView.getUint32(byteOffset, GLTF_LITTLE_ENDIAN);
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;

  // length is the total length of the Binary glTF, including header and all chunks, in bytes.
  const length = fileDataView.getUint32(byteOffset, GLTF_LITTLE_ENDIAN);

  return { magic, version, length };
};

const parseChunk = ({ fileDataView, byteOffset, chunkNumber }) => {
  const chunkLength = fileDataView.getUint32(byteOffset, GLTF_LITTLE_ENDIAN);

  const typeNumber = fileDataView.getUint32(
    byteOffset + GLTF_UINT32_CHUNK_LENGTH,
    GLTF_LITTLE_ENDIAN,
  );

  // TO DO: Remove this check and throw error earlier with gltf-validator
  if (chunkNumber !== typeNumber) {
    throw new Error('Invalid Chunk Number.');
  }

  const chunkUint8Array = new Uint8Array(
    fileDataView.buffer,
    byteOffset + GLTF_UINT32_CHUNK_LENGTH + GLTF_UINT32_CHUNK_LENGTH,
    chunkLength,
  );

  return new GltfChunkModel({ chunkLength, chunkUint8Array });
};

export const parseJsonChunk = ({ fileDataView }) => {
  return parseChunk({
    fileDataView,
    byteOffset: GLTF_CHUNK_HEADER_LENGTH,
    chunkNumber: GLTF_JSON_CHUNK_TYPE_NUMBER,
  });
};

export const parseBinaryChunk = ({ fileDataView, jsonChunkLength }) => {
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
};

export const parseJson = (jsonChunk) => {
  const decoder = new TextDecoder('utf8');
  const jsonString = decoder.decode(jsonChunk.chunkUint8Array);
  return JSON.parse(jsonString);
};

export const buildGltfFile = ({
  fileName,
  jsonChunk,
  binaryChunk,
  version,
}) => {
  const arrayBufferLength =
    GLTF_CHUNK_HEADER_LENGTH + // 12-Byte Header (4 + 4 + 4)
    GLTF_UINT32_CHUNK_LENGTH + // 4 Byte containing length of JSON chunk
    GLTF_UINT32_CHUNK_LENGTH + // 4 Byte containing type of chunk
    jsonChunk.chunkLength +
    GLTF_UINT32_CHUNK_LENGTH + // 4 Byte containing length of binary chunk
    GLTF_UINT32_CHUNK_LENGTH + // 4 Byte containing type of chunk
    binaryChunk.chunkLength;
  const arrayBuffer = new ArrayBuffer(arrayBufferLength);

  const fileDataView = new DataView(arrayBuffer);
  const uInt8Array = new Uint8Array(arrayBuffer);

  let byteOffset = 0;

  // Build 12-byte Header
  fileDataView.setUint32(byteOffset, GLTF_HEADER_MAGIC, GLTF_LITTLE_ENDIAN);
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;

  fileDataView.setUint32(byteOffset, version, GLTF_LITTLE_ENDIAN);
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;

  fileDataView.setUint32(byteOffset, arrayBufferLength, GLTF_LITTLE_ENDIAN);
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;

  // Build Chunk 0 (JSON)
  fileDataView.setUint32(byteOffset, jsonChunk.chunkLength, GLTF_LITTLE_ENDIAN);
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;

  fileDataView.setUint32(
    byteOffset,
    GLTF_JSON_CHUNK_TYPE_NUMBER,
    GLTF_LITTLE_ENDIAN,
  );
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;

  uInt8Array.set(jsonChunk.chunkUint8Array, byteOffset);
  byteOffset += jsonChunk.chunkLength;

  // Build Chunk 1 (Binary)
  fileDataView.setUint32(
    byteOffset,
    binaryChunk.chunkLength,
    GLTF_LITTLE_ENDIAN,
  );
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;

  fileDataView.setUint32(
    byteOffset,
    GLTF_BINARY_CHUNK_TYPE_NUMBER,
    GLTF_LITTLE_ENDIAN,
  );
  byteOffset += GLTF_UINT32_CHUNK_LENGTH;

  uInt8Array.set(binaryChunk.chunkUint8Array, byteOffset);

  return new File([fileDataView], fileName);
};

export const calculateChunkLength = (length) => {
  return Math.ceil(length / 4) * 4;
};

export const buildMaterialModelCache = (json) => {
  return json.extensions.VRM.materialProperties.map(
    (vrmMaterialJson, materialIndex) =>
      new MaterialModel({
        materialIndex,
        vrmMaterialJson,
        pbrMaterialJson: json.materials[materialIndex],
      }),
  );
};

export const buildTextureModelCache = ({ json, bufferModels }) => {
  return json.images.map((imageJson) => {
    return new TextureModel({
      imageJson,
      bufferModel: bufferModels[imageJson.bufferView],
    });
  });
};

export const buildBufferModelCache = ({ json, binaryChunk }) => {
  return json.bufferViews.map((bufferViewJson, index) => {
    const buffer = binaryChunk.chunkUint8Array.slice(
      bufferViewJson.byteOffset,
      bufferViewJson.byteOffset + bufferViewJson.byteLength,
    );

    const accessorJson = json.accessors.find(
      (accessor) => accessor.bufferView === index,
    );

    return new BufferModel({ bufferViewJson, buffer, accessorJson });
  });
};

export const jsonToPaddedEncodedJsonString = (json) => {
  const jsonString = JSON.stringify(json);
  const encodedJsonString = new TextEncoder().encode(jsonString);
  const paddedEncodedJsonStringLength = calculateChunkLength(
    encodedJsonString.length,
  );
  const paddedEncodedJsonString = new Uint8Array(paddedEncodedJsonStringLength);
  paddedEncodedJsonString.set(encodedJsonString);
  paddedEncodedJsonString.set(
    new Array(paddedEncodedJsonStringLength - encodedJsonString.length).fill(
      PAD_SPACE_UINT8,
    ),
    encodedJsonString.length,
  );

  return paddedEncodedJsonString;
};

export const recalculateBuffers = (bufferModels) => {
  let byteOffset = 0;

  bufferModels.forEach((bufferModel, index) => {
    // const oldOffset = bufferModel.byteOffset;
    // const oldLength = bufferModel.byteLength;

    // The byteOffset of an accessor must be divisible by the size of its componentType.
    // The sum of the byteOffset of an accessor and the byteOffset of the bufferView that it refers
    // to must be divisible by the size of its componentType.
    if (
      bufferModel.accessorJson &&
      byteOffset % bufferModel.componentSize !== 0
    ) {
      console.warn(`SHIFTING AT ${index} `, bufferModel.componentSize);
      byteOffset =
        Math.ceil(byteOffset / bufferModel.componentSize) *
        bufferModel.componentSize;
    }

    bufferModel.setByteOffset(byteOffset);
    bufferModel.setByteLength(bufferModel.buffer.length);

    byteOffset += bufferModel.byteLength;

    // if (oldOffset !== bufferModel.byteOffset) {
    //   console.log(
    //     `INDEX ${index}. OLD OFFSET: ${oldOffset} NEW OFFSET: ${bufferModel.byteOffset} OLD LENGTH: ${oldLength} NEW LENGTH: ${bufferModel.byteLength}`,
    //   );
    // }
  });

  const updatedBinaryChunkUint8Array = new Uint8Array(byteOffset);
  bufferModels.forEach((bufferModel) => {
    updatedBinaryChunkUint8Array.set(
      bufferModel.buffer,
      bufferModel.byteOffset,
    );
  });

  return {
    bufferModels,
    totalBufferLength: byteOffset,
    updatedBinaryChunkUint8Array,
  };
};
