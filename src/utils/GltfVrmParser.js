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

    this.materialModelsCache = GltfParserUtils.buildMaterialModelCache(
      this.jsonCache,
    );

    this.textureModelsCache = GltfParserUtils.buildTextureModelCache({
      json: this.jsonCache,
      binaryChunk: this.binaryChunk,
    });
  }

  materialModelsCache = null;

  /**
   * @returns {materialModel[]}
   */
  get materialModels() {
    if (!this.materialModelsCache) {
      this.materialModelsCache = GltfParserUtils.buildMaterialModelCache(
        this.json,
      );
    }

    return this.materialModelsCache;
  }

  textureModelsCache = null;

  /**
   * @returns {TextureModel[]}
   */
  get textureModels() {
    if (!this.textureModelsCache) {
      this.textureModelsCache = GltfParserUtils.buildTextureModelCache({
        json: this.json,
        binaryChunk: this.binaryChunk,
      });
    }

    return this.textureModelsCache;
  }

  get vrmMetadataModel() {
    return new VrmMetadataModel(this.json?.extensions.VRM.meta);
  }

  jsonCache = null;

  commitJsonCache() {
    const jsonString = JSON.stringify(this.jsonCache);
    const jsonStringLength = GltfParserUtils.calculateChunkLength(
      jsonString.length,
    );

    // This chunk MUST be padded with trailing Space chars (0x20) to satisfy alignment requirements.
    const paddedJsonString = jsonString.padEnd(jsonStringLength);

    let hasDoubleByteChars = false;
    const encodedJsonString = new TextEncoder()
      .encode(paddedJsonString)
      .map((value) => {
        // TO DO: handle double byte chars
        if (value > 127) {
          hasDoubleByteChars = true;
        }

        return value;
      });

    if (hasDoubleByteChars) {
      throw new Error('DOUBLE BYTE CHARACTER DETECTED. ABORTING PARSE.');
    }

    this.jsonChunk = new GltfChunkModel({
      chunkLength: jsonStringLength,
      chunkUint8Array: encodedJsonString,
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

    this.commitJsonCache();
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

  get thumbnailImagesrc() {
    if (this.vrmMetadataModel && this.vrmMetadataModel?.thumbnailTextureIndex) {
      return this.getImageSrcByIndex(
        this.vrmMetadataModel.thumbnailTextureIndex,
      );
    }
    return null;
  }
}
