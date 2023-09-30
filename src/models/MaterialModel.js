import * as ColorUtils from '../utils/ColorUtils';

const VECTOR_ALPHA_INDEX = 4;

export default class MaterialModel {
  /**
   * @type {number}
   */
  materialIndex;

  /**
   * @type {any}
   */
  json;

  constructor({ materialIndex, json }) {
    this.materialIndex = materialIndex;
    this.json = json;
  }

  get name() {
    return this.json.name;
  }

  get lightColorAttunation() {
    return this.json?.floatProperties._LightColorAttenuation;
  }

  set lightColorAttunation(lightColorAttunation) {
    this.json.floatProperties._LightColorAttenuation = lightColorAttunation;
  }

  get indirectLightIntensity() {
    return this.json?.floatProperties._IndirectLightIntensity;
  }

  set indirectLightIntensity(indirectLightIntensity) {
    this.json.floatProperties._IndirectLightIntensity = indirectLightIntensity;
  }

  get shadeColor() {
    const colorVector = this.json.vectorProperties._ShadeColor;
    const colorHex = ColorUtils.colorUIVectorToHex(colorVector);

    return {
      colorHex,
      alpha: colorVector[VECTOR_ALPHA_INDEX],
    };
  }

  set shadeColor({ colorHex, alpha }) {
    this.json.vectorProperties._ShadeColor = [
      ...ColorUtils.hexToColorUIVector(colorHex),
      alpha,
    ];
  }

  get outlineColor() {
    const colorVector = this.json.vectorProperties._OutlineColor;
    return {
      colorHex: ColorUtils.colorUIVectorToHex(colorVector),
      alpha: colorVector[VECTOR_ALPHA_INDEX],
    };
  }

  set outlineColor({ colorHex, alpha }) {
    this.json.vectorProperties._OutlineColor = [
      ...ColorUtils.hexToColorUIVector(colorHex),
      alpha,
    ];
  }
}
