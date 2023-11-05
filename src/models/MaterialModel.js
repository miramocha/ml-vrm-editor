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
  static TEXTURE_SLOTS = {
    MAIN: 'MAIN',
    SHADE: 'SHADE',
    EMISSIVE: 'EMISSIVE',
    NORMAL: 'NORMAL',
    SPHERE: 'SPHERE',
    RIM: 'RIM',
  };

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

  processFormData(formData) {
    const normalizedMaterialFormDataMap =
      FormUtils.normalizeMaterialFormData(formData);

    normalizedMaterialFormDataMap.forEach((value, name) => {
      this.setValue(name, value);
    });
  }

  setValue(name, value) {
    if (value) {
      if (name === 'renderQueue') {
        this.setRenderQueue(Number(value));
        return;
      }

      const type = FIELD_NAME_TO_ATTRIBUTE_TYPE[name];

      if (type === VECTOR || type === COLOR) {
        this.#setVector(name, value);
      } else if (type === FLOAT) {
        this.#setFloat(name, value);
      }
    }
  }

  getValue(name) {
    const type = FIELD_NAME_TO_ATTRIBUTE_TYPE[name];

    if (name === 'renderQueue') {
      return this.#getRenderQueue();
    }

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
    this.vrmMaterialJson.floatProperties[name] = Number(value);
  }

  #getFloat(name) {
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

  get mainTextureIndex() {
    return this.pbrMaterialJson.pbrMetallicRoughness.baseColorTexture.index;
  }

  setMainTextureIndex(textureIndex) {
    this.pbrMaterialJson.pbrMetallicRoughness.baseColorTexture.index =
      textureIndex;
    this.vrmMaterialJson.textureProperties._MainTex = textureIndex;
  }

  get shadeTextureIndex() {
    return this.vrmMaterialJson.textureProperties._ShadeTexture;
  }

  setShadeTextureIndex(textureIndex) {
    this.vrmMaterialJson.textureProperties._ShadeTexture = textureIndex;
  }

  get emissiveTextureIndex() {
    return this.pbrMaterialJson.emissiveTexture.index;
  }

  setEmissiveTextureIndex(textureIndex) {
    this.pbrMaterialJson.emissiveTexture.index = textureIndex;
    this.vrmMaterialJson.textureProperties._EmissionMap = textureIndex;
  }

  get normalTextureIndex() {
    return this.pbrMaterialJson.normalTexture.index;
  }

  setNormalTextureIndex(textureIndex) {
    this.pbrMaterialJson.normalTexture.index = textureIndex;
    this.vrmMaterialJson.textureProperties._BumpMap = textureIndex;
  }

  get sphereAdditionTextureIndex() {
    return this.vrmMaterialJson.textureProperties._SphereAdd;
  }

  setSphereAdditionTextureIndex(textureIndex) {
    this.vrmMaterialJson.textureProperties._SphereAdd = textureIndex;
  }

  get rimTextureIndex() {
    return this.vrmMaterialJson.textureProperties._RimTexture;
  }

  setRimTextureIndex(textureIndex) {
    this.vrmMaterialJson.textureProperties._RimTexture = textureIndex;
  }

  #getRenderQueue() {
    return this.vrmMaterialJson.renderQueue;
  }

  #setRenderQueue(renderQueue) {
    this.renderQueue = renderQueue;
  }

  get isMtoon() {
    return this.vrmMaterialJson.shader === 'VRM/MToon';
  }
}
