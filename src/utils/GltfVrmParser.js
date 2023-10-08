import * as GltfParserUtils from './GltfParserUtils';
import * as VrmJsonMaterialUtils from './VrmJsonMaterialUtils';
import GltfChunkModel from '../models/GltfChunkModel';
import VrmMetadataModel from '../models/VrmMetadataModel';

export default class GltfVrmParser {
  /**
   * @type {string}
   */
  fileName;

  /**
   * @type {string}
   */
  version;

  /**
   * @type {GltfChunkModel}
   */
  jsonChunk;

  /**
   * @type {GltfChunkModel}
   */
  binaryChunk;

  buildCaches() {
    this.jsonCache = this.jsonChunk
      ? GltfParserUtils.parseJson(this.jsonChunk)
      : null;

    this.bufferModelCache = GltfParserUtils.buildBufferModelCache({
      json: this.json,
      binaryChunk: this.binaryChunk,
    });

    this.materialModelCache = GltfParserUtils.buildMaterialModelCache(
      this.jsonCache,
    );

    this.textureModelCache = GltfParserUtils.buildTextureModelCache({
      json: this.jsonCache,
      bufferModels: this.bufferModels,
    });
  }

  bufferModelsCache = null;

  /**
   *@returns {BufferModel[]}
   */
  get bufferModels() {
    if (!this.bufferModelCache) {
      this.bufferModelCache = GltfParserUtils.buildBufferModelCache({
        json: this.json,
        binaryChunk: this.binaryChunk,
      });
    }

    return this.bufferModelCache;
  }

  materialModelCache = null;

  /**
   * @returns {materialModel[]}
   */
  get materialModels() {
    if (!this.materialModelCache) {
      this.materialModelCache = GltfParserUtils.buildMaterialModelCache(
        this.json,
      );
    }

    return this.materialModelCache;
  }

  textureModelCache = null;

  /**
   * @returns {TextureModel[]}
   */
  get textureModels() {
    if (!this.textureModelCache) {
      this.textureModelCache = GltfParserUtils.buildTextureModelCache({
        json: this.json,
        bufferModels: this.bufferModels,
      });
    }

    return this.textureModelCache;
  }

  get vrmMetadataModel() {
    return new VrmMetadataModel(this.json?.extensions.VRM.meta);
  }

  getVrmMetadataModel() {
    return this.vrmMetadataModel;
  }

  jsonCache = null;

  rebuildBinarychunk() {
    const { bufferModels, totalBufferLength, updatedBinaryChunk } =
      GltfParserUtils.recalculateBuffers(this.bufferModels);
    this.bufferModels = bufferModels;
    this.binaryChunk = updatedBinaryChunk;
    this.json.buffers.byteLength = totalBufferLength;
  }

  commitJsonChanges() {
    const paddedEncodedJsonString =
      GltfParserUtils.jsonToPaddedEncodedJsonString(this.jsonCache);

    this.jsonChunk = new GltfChunkModel({
      chunkLength: paddedEncodedJsonString.length,
      chunkUint8Array: paddedEncodedJsonString,
    });

    this.buildCaches();
  }

  /**
   * @returns {any}
   */
  get json() {
    if (!this.jsonCache) {
      this.jsonCache = this.jsonChunk
        ? GltfParserUtils.parseJson(this.jsonChunk)
        : null;
    }

    return this.jsonCache;
  }

  /**
   * @param {any}
   */
  set json(json) {
    this.jsonCache = json;

    this.commitJsonChanges();
  }

  setJson(json) {
    this.json = json;

    return this;
  }

  setMaterialGlobalFloatProperties({
    propertyNameToFloatMap,
    skipMaterialNameSet,
  }) {
    this.json = VrmJsonMaterialUtils.setGlobalFloatProperties({
      json: this.json,
      propertyNameToFloatMap,
      skipMaterialNameSet,
    });
  }

  setMaterialGlobalVectorProperties({
    propertyNameToVectorMap,
    skipMaterialNameSet,
  }) {
    this.json = VrmJsonMaterialUtils.setGlobalVectorProperties({
      json: this.json,
      propertyNameToVectorMap,
      skipMaterialNameSet,
    });
  }

  async parseFile(file) {
    this.fileName = file.name;

    const fileDataView = new DataView(await file.arrayBuffer());
    const { version } = GltfParserUtils.parseHeader({
      fileDataView,
    });

    this.version = version;
    this.jsonChunk = GltfParserUtils.parseJsonChunk({
      fileDataView,
      header: this.header,
    });

    this.binaryChunk = GltfParserUtils.parseBinaryChunk({
      fileDataView,
      jsonChunkLength: this.jsonChunk.chunkLength,
    });
  }

  fileCache;

  async getFile() {
    if (!this.fileCache) {
      await this.buildFile();
    }

    return this.fileCache;
  }

  async buildFile() {
    this.fileCache = await GltfParserUtils.buildGltfFile({
      fileName: this.fileName,
      jsonChunk: this.jsonChunk,
      binaryChunk: this.binaryChunk,
      version: this.version,
    });

    return this.fileCache;
  }

  getImageSrcByIndex(index) {
    const cappedIndex =
      index > this.textureModels.length - 1
        ? this.textureModels.length - 1
        : index;

    // VRM Exported from Blender has index off by 1???
    return this.textureModels?.at(cappedIndex).imageSrc;
  }

  get thumbnailImageSrc() {
    if (this.vrmMetadataModel && this.vrmMetadataModel?.thumbnailTextureIndex) {
      return this.getImageSrcByIndex(
        this.vrmMetadataModel.thumbnailTextureIndex,
      );
    }
    return null;
  }
}
