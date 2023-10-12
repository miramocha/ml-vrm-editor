export const setGlobalVectorProperties = ({
  json,
  propertyNameToVectorMap,
  skipMaterialNameSet = new Set(),
}) => {
  const updatedMaterialProperties = json.extensions.VRM?.materialProperties.map(
    (material) => {
      const updatedMaterial = structuredClone(material);

      if (!skipMaterialNameSet.has(updatedMaterial.name)) {
        propertyNameToVectorMap.forEach((vector, propertyName) => {
          updatedMaterial.vectorProperties[propertyName] = vector;
        });
      }

      return updatedMaterial;
    },
  );

  const updatedJson = structuredClone(json);
  updatedJson.extensions.VRM.materialProperties = updatedMaterialProperties;

  return updatedJson;
};

export const setGlobalFloatProperties = ({
  json,
  propertyNameToFloatMap,
  skipMaterialNameSet = new Set(),
}) => {
  const updatedMaterialProperties = json.extensions.VRM.materialProperties.map(
    (material) => {
      const updatedMaterial = structuredClone(material);

      if (!skipMaterialNameSet.has(updatedMaterial.name)) {
        propertyNameToFloatMap.forEach((float, propertyName) => {
          updatedMaterial.floatProperties[propertyName] = float;
        });
      }

      return updatedMaterial;
    },
  );

  const updatedJson = structuredClone(json);

  updatedJson.extensions.VRM.materialProperties = updatedMaterialProperties;

  return updatedJson;
};
