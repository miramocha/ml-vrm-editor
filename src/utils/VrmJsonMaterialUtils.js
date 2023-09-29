export const setGlobalVectorProperties = ({
  json,
  propertyNameToVectorMap,
}) => {
  const updatedMaterialProperties = json.extensions.VRM.materialProperties.map(
    (material) => {
      const updatedMaterial = structuredClone(material);

      propertyNameToVectorMap.forEach((vector, propertyName) => {
        updatedMaterial.vectorProperties[propertyName] = vector;
      });

      return updatedMaterial;
    },
  );

  console.log('SETTING VECTOR MATERIAL PROPS:', updatedMaterialProperties);

  const updatedJson = structuredClone(json);
  updatedJson.extensions.VRM.materialProperties = updatedMaterialProperties;

  return updatedJson;
};

export const setGlobalFloatProperties = ({ json, propertyNameToFloatMap }) => {
  const updatedMaterialProperties = json.extensions.VRM.materialProperties.map(
    (material) => {
      const updatedMaterial = structuredClone(material);

      propertyNameToFloatMap.forEach((float, propertyName) => {
        updatedMaterial.floatProperties[propertyName] = float;
      });

      return updatedMaterial;
    },
  );

  console.log('SETTING FLOAT MATERIAL PROPS:', updatedMaterialProperties);

  const updatedJson = structuredClone(json);
  updatedJson.extensions.VRM.materialProperties = updatedMaterialProperties;

  return updatedJson;
};

export const setGlobalOutlineColor = ({ json, colorVector }) => {
  return setGlobalVectorProperties({
    json,
    propertyNameToVectorMap: new Map([['_OutlineColor', colorVector]]),
  });
};

export const setGlobalShadeColor = ({ json, colorVector }) => {
  return setGlobalVectorProperties({
    json,
    propertyNameToVectorMap: new Map([['_ShadeColor', colorVector]]),
  });
};

export const setGlobalEmissionColor = ({ json, colorVector }) => {
  return setGlobalVectorProperties({
    json,
    propertyNameToVectorMap: new Map([['_EmissionColor', colorVector]]),
  });
};

export const setGlobalRimColor = ({ json, colorVector }) => {
  return setGlobalVectorProperties({
    json,
    propertyNameToVectorMap: new Map([['_RimColor', colorVector]]),
  });
};
