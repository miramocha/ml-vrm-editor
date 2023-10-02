import { validateBytes } from 'gltf-validator';
import * as GltfParserUtils from './GltfParserUtils';
import * as VrmJsonMaterialUtils from './VrmJsonMaterialUtils';
import TextureModel from '../models/TextureModel';
import MaterialModel from '../models/MaterialModel';
import GltfChunkModel from '../models/GltfChunkModel';

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

  clearCaches() {
    // console.log('CLEARING CACHE');
    this.materialModelsCache = null;
    this.textureModelsCache = null;
    this.jsonCache = null;
  }

  materialModelsCache = null;

  /**
   * @returns {materialModel[]}
   */
  get materialModels() {
    if (!this.materialModelsCache) {
      this.materialModelsCache =
        this.json?.extensions.VRM.materialProperties.map(
          (vrmMaterialJson, materialIndex) =>
            new MaterialModel({
              materialIndex,
              vrmMaterialJson,
              pbrMaterialJson: this.json?.materials[materialIndex],
            }),
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
      this.textureModelsCache = this.json.images.map((image, imagesIndex) => {
        const bufferView = this.json.bufferViews[image.bufferView];
        const imageBuffer = this.binaryChunk.chunkUint8Array.slice(
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
    }

    return this.textureModelsCache;
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

    this.clearCaches();
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
    const report = await validateBytes(new Uint8Array(fileDataView.buffer), {
      ignoredIssues: ['BUFFER_VIEW_TARGET_MISSING'],
    });
    console.info('VALIDATION SUCCEEDED: ', report);

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

    console.log('JSON:', GltfParserUtils.parseJson(this.jsonChunk));
  }

  fileCache;

  async getFile() {
    if (!this.fileCache) {
      await this.buildFile();
    }

    return this.fileCache;
  }

  async buildFile() {
    console.log('BUILDING FILE');
    this.fileCache = await GltfParserUtils.buildGltfFile({
      fileName: this.fileName,
      jsonChunk: this.jsonChunk,
      binaryChunk: this.binaryChunk,
      version: this.version,
    });

    return this.fileCache;
  }
}
