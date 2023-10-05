/**
 * Refactored from VRMEditorTools
 * Copyright (c) 2022 Nobuyuki Furukawa (tfuru)
 */

import GltfChunkModel from '../models/GltfChunkModel';
import MaterialModel from '../models/MaterialModel';
import TextureModel from '../models/TextureModel';

const GLTF_HEADER_MAGIC = 0x46546c67;
const GLTF_JSON_CHUNK_TYPE_NUMBER = 0x4e4f534a;
const GLTF_BINARY_CHUNK_TYPE_NUMBER = 0x004e4942;
const GLTF_UINT32_CHUNK_LENGTH = 4;
const GLTF_CHUNK_HEADER_LENGTH = 3 * GLTF_UINT32_CHUNK_LENGTH;
const GLTF_LITTLE_ENDIAN = true;

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

export const buildTextureModelCache = ({ json, binaryChunk }) => {
  return json.images.map((image, imagesIndex) => {
    const bufferView = json.bufferViews[image.bufferView];
    const imageBuffer = binaryChunk.chunkUint8Array.slice(
      bufferView.byteOffset,
      bufferView.byteOffset + bufferView.byteLength,
    );
    const blob = new Blob([imageBuffer], { type: image.mimeType });

    return new TextureModel({
      imagesIndex,
      bufferViewsIndex: image.bufferView,
      name: image.name,
      mimeType: image.mimeType,
      blob,
    });
  });
};
