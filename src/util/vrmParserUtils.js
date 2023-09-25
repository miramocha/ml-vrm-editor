const GLTF_HEADER_MAGIC = 0x46546c67;
const GLTF_JSON_CHUNK_TYPE_NUMBER = 0x4e4f534a;
const GLTF_CHUNK_HEADER_SIZE = 12;
const GLTF_CHUNK_LENGTH_SIZE = 4;
const GLTF_CHUNK_TYPE_SIZE = 4;

function parseHeader(fileDataView) {
  return {
    magic: fileDataView.getUint32(0, true),
    version: fileDataView.getUint32(4, true),
    length: fileDataView.getUint32(8, true),
  };
}

function validateHeader(header) {
  if (header.magic !== GLTF_HEADER_MAGIC) {
    throw new Error('Invalid GLTF File.');
  }
}

function parseChunk(fileDataView, byteOffset, chunkNumber) {
  const chunkLength = fileDataView.getUint32(byteOffset, true);

  if (chunkNumber !== fileDataView.getUint32(byteOffset + GLTF_CHUNK_LENGTH_SIZE, true)) {
    throw new Error('Invalid Chunk Number.');
  }

  const chunkUint8Array = new Uint8Array(
    fileDataView.buffer,
    byteOffset + GLTF_CHUNK_LENGTH_SIZE + GLTF_CHUNK_TYPE_SIZE,
    chunkLength,
  );

  return { chunkLength, chunkUint8Array };
}

function parseJsonChunk(fileDataView) {
  try {
    return parseChunk(fileDataView, GLTF_CHUNK_HEADER_SIZE, GLTF_JSON_CHUNK_TYPE_NUMBER);
  } catch (error) {
    throw new Error('Invalid JSON Chunk Number.');
  }
}

export { parseHeader, validateHeader, parseJsonChunk };
