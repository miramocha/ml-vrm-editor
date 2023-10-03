import * as ColorUtils from './ColorUtils';

// eslint-disable-next-line import/prefer-default-export
export const normalizeMaterialFormData = (formData) => {
  const normalizedMaterialFormDataMap = new Map();
  const nameToColorAttributeMap = new Map();

  // eslint-disable-next-line no-restricted-syntax
  for (const [name, value] of formData.entries()) {
    const nameParts = name.split('.');
    if (nameParts.length === 2) {
      const [colorName, colorPart] = nameParts;
      // ASSUME THIS COMES FROM COLOR
      if (!nameToColorAttributeMap.has(colorName)) {
        nameToColorAttributeMap.set(colorName, {});
      }

      nameToColorAttributeMap.get(colorName)[colorPart] = value;
    } else {
      normalizedMaterialFormDataMap.set(name, value);
    }
  }

  nameToColorAttributeMap.forEach((color, colorName) => {
    normalizedMaterialFormDataMap.set(colorName, [
      ...ColorUtils.hexToColorUIVector(color.hex),
      Number(color.alpha),
    ]);
  });

  return normalizedMaterialFormDataMap;
};
