import { parseHeader, parseJsonChunk, validateHeader } from './vrmParserUtils';

function parseJson(jsonChunk) {
  const decoder = new TextDecoder('utf8');
  const jsonText = decoder.decode(jsonChunk.chunkUint8Array);
  return JSON.parse(jsonText);
}

/**
 * Based on VRMParser Copyright (c) 2022 Nobuyuki Furukawa (tfuru)
 */
export default class GltfVrmParser {
  static IS_LITTLE_ENDIAN = true;

  static GLTF_CHUNK_TYPE_JSON = 0x4e4f534a;

  static CHUNK_TYPE_BIN = 0x004e4942;

  static CHUNK_HEADER_SIZE = 12;

  static CHUNK_LENGTH_SIZE = 4;

  static CHUNK_TYPE_SIZE = 4;

  file;

  fileDataView;

  header;

  jsonChunk;

  json;

  constructor(file) {
    console.log('INIT...');

    this.file = file;
    this.parse();
  }

  parse() {
    console.log('PARSE...');
    const reader = new FileReader();
    reader.onload = this.handleFileReaderLoad;
    reader.readAsArrayBuffer(this.file);
  }

  handleFileReaderLoad(event) {
    console.log('HANDLING...', event.currentTarget.result);

    this.fileDataView = new DataView(event.currentTarget.result);
    this.header = parseHeader(this.fileDataView);
    validateHeader(this.header);
    this.jsonChunk = parseJsonChunk(this.fileDataView, this.header);
    this.json = parseJson(this.jsonChunk);
    console.log('JSON:', this.json);
  }
}
