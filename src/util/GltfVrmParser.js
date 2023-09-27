import * as GltfParserUtils from './GltfParserUtils';

export default class GltfVrmParser {
  fileName;

  fileDataView;

  header;

  version;

  jsonChunk;

  binaryChunk;

  get json() {
    return this.jsonChunk ? GltfParserUtils.parseJson(this.jsonChunk) : null;
  }

  set json(json) {
    this.jsonChunk = null;
  }

  async parseFile(file) {
    console.log(file);
    this.fileName = file.name;

    const fileDataView = new DataView(await file.arrayBuffer());
    const [magic, version] = GltfParserUtils.parseHeader({
      fileDataView,
    });

    this.version = version;
    GltfParserUtils.validateMagic(magic);

    this.jsonChunk = GltfParserUtils.parseJsonChunk({
      fileDataView,
      header: this.header,
    });

    this.binaryChunk = GltfParserUtils.parseBinaryChunk({
      fileDataView,
      jsonChunkLength: this.jsonChunk.chunkLength,
    });

    console.log('JSON:', GltfParserUtils.parseJson(this.jsonChunk));
  }

  buildGltfFile() {
    return GltfParserUtils.buildGltfFile({
      fileName: this.fileName,
      jsonChunk: this.jsonChunk,
      binaryChunk: this.binaryChunk,
      header: this.header,
    });
  }
}
