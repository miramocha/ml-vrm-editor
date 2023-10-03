import * as FormUtils from '../utils/FormUtils';
import * as ColorUtils from '../utils/ColorUtils';

const COLOR = 'COLOR';
const VECTOR = 'VECTOR';
const FLOAT = 'FLOAT';
const VECTOR_ALPHA_INDEX = 3;
const FIELD_NAME_TO_ATTRIBUTE_TYPE = {
  _Color: COLOR,
  _ShadeColor: COLOR,
  _EmissionColor: COLOR,
  _RimColor: COLOR,
  _OutlineColor: COLOR,
  _MainTex: VECTOR,
  _ShadeTexture: VECTOR,
  _BumpMap: VECTOR,
  _EmissionMap: VECTOR,
  _SphereAdd: VECTOR,
  _RimTexture: VECTOR,
  _Cutoff: FLOAT,
  _BumpScale: FLOAT,
  _ReceiveShadowRate: FLOAT,
  _ShadeShift: FLOAT,
  _ShadeToony: FLOAT,
  _RimLightingMix: FLOAT,
  _RimFresnelPower: FLOAT,
  _RimLift: FLOAT,
  _ShadingGradeRate: FLOAT,
  _LightColorAttenuation: FLOAT,
  _IndirectLightIntensity: FLOAT,
  _OutlineWidth: FLOAT,
  _OutlineScaledMaxDistance: FLOAT,
  _OutlineLightingMix: FLOAT,
  _UvAnimScrollX: FLOAT,
  _UvAnimScrollY: FLOAT,
  _UvAnimRotation: FLOAT,
  _OutlineWidthMode: FLOAT,
  _OutlineColorMode: FLOAT,
  _BlendMode: FLOAT,
  _SrcBlend: FLOAT,
  _DstBlend: FLOAT,
  _ZWrite: FLOAT,
  _MToonVersion: FLOAT,
  _CullMode: FLOAT,
  _OutlineCullMode: FLOAT,
  _DebugMode: FLOAT,
};

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

  processMaterialFormData(formData) {
    const normalizedMaterialFormDataMap =
      FormUtils.normalizeMaterialFormData(formData);

    normalizedMaterialFormDataMap.forEach((value, name) => {
      this.setValue(name, value);
    });
  }

  setValue(name, value) {
    const type = FIELD_NAME_TO_ATTRIBUTE_TYPE[name];

    if (type === VECTOR || type === COLOR) {
      this.#setVector(name, value);
    }

    if (type === FLOAT) {
      this.#setFloat(name, value);
    }
  }

  getValue(name) {
    const type = FIELD_NAME_TO_ATTRIBUTE_TYPE[name];

    if (type === VECTOR) {
      return this.#getVector(name);
    }

    if (type === COLOR) {
      return this.#getColor(name);
    }

    if (type === FLOAT) {
      return this.#getFloat(name);
    }

    return null;
  }

  #setFloat(name, value) {
    this.vrmMaterialJson.floatProperties[name] = value;
  }

  #getFloat(name) {
    // ROUND UP NUMBER TO PREVENT FORM VALIDATION FAILURE
    return (
      Math.round(
        (Number(this.vrmMaterialJson?.floatProperties[name]) + Number.EPSILON) *
          10000,
      ) / 10000
    );
  }

  #setVector(name, value) {
    this.vrmMaterialJson.vectorProperties[name] = value;
  }

  #getVector(name) {
    return this.vrmMaterialJson.vectorProperties[name];
  }

  #getColor(name) {
    const vector = this.#getVector(name);

    return {
      hex: ColorUtils.colorUIVectorToHex(vector),
      alpha: vector[VECTOR_ALPHA_INDEX],
    };
  }
}
