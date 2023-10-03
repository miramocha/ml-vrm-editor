import * as ColorUtils from '../utils/ColorUtils';

const VECTOR_ALPHA_INDEX = 4;

/**
 * Future state - has VRM1.0 flag and handle getter/setter
 */
export default class MaterialModel {
  /**
   * @type {number}
   */
  materialIndex;

  /**
   * @type {any}
   */
  vrmMaterialJson;

  /**
   * @type {any}
   */
  pbrMaterialJson;

  constructor({ materialIndex, vrmMaterialJson, pbrMaterialJson }) {
    this.materialIndex = materialIndex;
    this.vrmMaterialJson = vrmMaterialJson;
    this.pbrMaterialJson = pbrMaterialJson;
  }

  get name() {
    return this.vrmMaterialJson.name;
  }

  // LIGHTING
  get lightColorAttunation() {
    return this.vrmMaterialJson.floatProperties._LightColorAttenuation;
  }

  set lightColorAttunation(lightColorAttunation) {
    this.vrmMaterialJson.floatProperties._LightColorAttenuation =
      lightColorAttunation;
  }

  get indirectLightIntensity() {
    return this.vrmMaterialJson?.floatProperties._IndirectLightIntensity;
  }

  set indirectLightIntensity(indirectLightIntensity) {
    this.vrmMaterialJson.floatProperties._IndirectLightIntensity =
      indirectLightIntensity;
  }

  // MAIN COLOR
  get mainColor() {
    const colorVector = this.vrmMaterialJson.vectorProperties._Color;
    const colorHex = ColorUtils.colorUIVectorToHex(colorVector);

    return {
      colorHex,
      alpha: colorVector[VECTOR_ALPHA_INDEX],
    };
  }

  set mainColor({ colorHex, alpha }) {
    const rgbaColorVector = [...ColorUtils.hexToColorUIVector(colorHex), alpha];
    this.vrmMaterialJson.vectorProperties._Color = rgbaColorVector;
    this.pbrMaterialJson.baseColorFactor = rgbaColorVector;
  }

  // SHADING
  get shadeColor() {
    const colorVector = this.vrmMaterialJson.vectorProperties._ShadeColor;
    const colorHex = ColorUtils.colorUIVectorToHex(colorVector);

    return {
      colorHex,
      alpha: colorVector[VECTOR_ALPHA_INDEX],
    };
  }

  set shadeColor({ colorHex, alpha }) {
    this.vrmMaterialJson.vectorProperties._ShadeColor = [
      ...ColorUtils.hexToColorUIVector(colorHex),
      alpha,
    ];
  }

  // OUTLINE
  get outlineColor() {
    const colorVector = this.vrmMaterialJson.vectorProperties._OutlineColor;
    const colorHex = ColorUtils.colorUIVectorToHex(colorVector);

    return {
      colorHex,
      alpha: colorVector[VECTOR_ALPHA_INDEX],
    };
  }

  set outlineColor({ colorHex, alpha }) {
    this.vrmMaterialJson.vectorProperties._OutlineColor = [
      ...ColorUtils.hexToColorUIVector(colorHex),
      alpha,
    ];
  }

  get outlineWidth() {
    return this.vrmMaterialJson?.floatProperties._OutlineWidth;
  }

  set outlineWidth(outlineWidth) {
    this.vrmMaterialJson.floatProperties._OutlineWidth = outlineWidth;
  }
}
