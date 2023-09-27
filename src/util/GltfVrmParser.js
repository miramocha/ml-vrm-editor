import * as GltfParserUtils from './GltfParserUtils';

export default class GltfVrmParser {
  fileName;

  fileDataView;

  header;

  jsonChunk;

  binaryChunk;

  get file() {
    return GltfParserUtils.buildGltfFile({
      fileName: this.fileName,
      jsonChunk: this.jsonChunk,
      binaryChunk: this.binaryChunk,
      header: this.header,
    });
  }

  set file(file) {
    this.parse(file);
  }

  get json() {
    return this.jsonChunk ? GltfParserUtils.parseJson(this.jsonChunk) : null;
  }

  constructor(file) {
    this.file = file;
  }

  parse(file) {
    console.log(file);
    this.fileName = file.name;
    const reader = new FileReader();
    reader.onload = this.handleFileReaderLoad;
    reader.readAsArrayBuffer(file);
  }

  handleFileReaderLoad(event) {
    console.log('HANDLING...', event.currentTarget.result);

    const fileDataView = new DataView(event.currentTarget.result);
    this.header = GltfParserUtils.parseHeader({
      fileDataView,
    });
    GltfParserUtils.validateHeader(this.header);

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
      fileName: this.file.name,
      jsonChunk: this.jsonChunk,
      binaryChunk: this.binaryChunk,
      header: this.header,
    });
  }
}
