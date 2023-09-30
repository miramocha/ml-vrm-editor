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

  // CACHING
  jsonCache;

  materialModelsCache;

  textureModelsCache;

  clearCaches() {
    this.jsonCache = null;
    this.materialModelsCache = null;
    this.textureModelsCache = null;
  }

  rebuildJsonCache() {
    this.jsonCache = GltfParserUtils.parseJson(this.jsonChunk);

    return this.jsonCache;
  }

  rebuildMaterialModelsCache() {
    this.materialModelsCache = this.json?.extensions.VRM.materialProperties.map(
      (material, materialIndex) =>
        new MaterialModel({ json: material, materialIndex }),
    );

    return this;
  }

  rebuildTextureModelsCache() {
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

    return this;
  }

  // GETTERS
  /**
   * @returns {any}
   */
  get json() {
    if (!this.jsonCache) {
      this.rebuildJsonCache();
    }

    return this.jsonCache;
  }

  /**
   * @returns {materialModel[]}
   */
  get materialModels() {
    if (!this.materialModelsCache) {
      this.rebuildMaterialModelsCache();
    }

    return this.materialModelsCache;
  }

  /**
   * @returns {TextureModel[]}
   */
  get textureModels() {
    if (!this.textureModelsCache) {
      this.rebuildTextureModelsCache();
    }

    return this.textureModelsCache;
  }

  setJson(json) {
    this.jsonCache = json;

    return this;
  }

  writeJsonChangesToChunk() {
    const jsonString = JSON.stringify(this.jsonCache);
    const jsonStringLength = GltfParserUtils.calculateChunkLength(
      jsonString.length,
    );

    // This chunk MUST be padded with trailing Space chars (0x20) to satisfy alignment requirements.
    const paddedJsonString = jsonString.padEnd(jsonStringLength);
    console.log(
      'NEW JSON STRING LENGTH:',
      JSON.stringify(this.jsonCache).length,
    );
    console.log('OLD CHUNK LENGTH:', this.jsonChunk.chunkLength);
    console.log('NEW JSON LENGTH:', jsonStringLength);
    console.log('NEW PADDED JSON LENGTH:', paddedJsonString.length);

    let hasDoubleByteChars = false;
    const encodedJsonString = new TextEncoder()
      .encode(paddedJsonString)
      .map((value, index) => {
        // TO DO: handle double byte chars
        if (value > 127) {
          hasDoubleByteChars = true;
          console.log(
            `DOUBLE BYTE CHAR FOUND AT ${index}:`,
            paddedJsonString[index],
          );
        }

        return value;
      });

    if (hasDoubleByteChars) {
      throw new Error('DOUBLE BYTE CHARACTER DETECTED. ABORTING PARSE.');
    }

    console.log('ENCODED LENGTH:', encodedJsonString.length);

    this.jsonChunk = new GltfChunkModel({
      chunkLength: jsonStringLength,
      chunkUint8Array: encodedJsonString,
    });

    return this;
  }

  setMaterialGlobalFloatProperties({
    propertyNameToFloatMap,
    skipMaterialNameSet,
  }) {
    // this.json = VrmJsonMaterialUtils.setGlobalFloatProperties({
    //   json: this.json,
    //   propertyNameToFloatMap,
    //   skipMaterialNameSet,
    // });

    this.writeJsonChangesToChunk();

    return this;
  }

  setMaterialGlobalVectorProperties({
    propertyNameToVectorMap,
    skipMaterialNameSet,
  }) {
    this.setJson(
      VrmJsonMaterialUtils.setGlobalVectorProperties({
        json: this.json,
        propertyNameToVectorMap,
        skipMaterialNameSet,
      }),
    );
  }

  async parseFile(file) {
    this.fileName = file.name;

    const fileDataView = new DataView(await file.arrayBuffer());

    console.log('VALIDATING IMPORTED FILE...');
    const report = await validateBytes(new Uint8Array(fileDataView.buffer), {
      ignoredIssues: ['BUFFER_VIEW_TARGET_MISSING'],
    });
    console.info('VALIDATION SUCCEEDED: ', report);
    // if (report.issues.numErrors > 0) {
    //   throw new Error('Invalid GLTF.');
    // }

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
    this.clearCaches();
  }

  async buildFile() {
    console.log('BUILDING FILE');
    const file = GltfParserUtils.buildGltfFile({
      fileName: this.fileName,
      jsonChunk: this.jsonChunk,
      binaryChunk: this.binaryChunk,
      version: this.version,
    });

    console.log('VALIDATING BUILT FILE...');
    const report = await validateBytes(
      new Uint8Array(await file.arrayBuffer()),
      {
        ignoredIssues: ['BUFFER_VIEW_TARGET_MISSING'],
      },
    );
    console.info('VALIDATION SUCCEEDED: ', report);
    // if (report.issues.numErrors > 0) {
    //   throw new Error('Invalid GLTF.');
    // }

    return file;
  }
}
