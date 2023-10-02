// TO DO - REFACTOR THIS TO USE INDIVIDUAL APPLIER
export const setGlobalVectorProperties = ({
  json,
  propertyNameToVectorMap,
  skipMaterialNameSet = new Set(),
}) => {
  console.log('SKIPPING MATERIALS:', skipMaterialNameSet);

  const updatedMaterialProperties = json.extensions.VRM.materialProperties.map(
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

  console.log('SETTING VECTOR MATERIAL PROPS:', updatedMaterialProperties);

  const updatedJson = structuredClone(json);
  updatedJson.extensions.VRM.materialProperties = updatedMaterialProperties;

  return updatedJson;
};

// TO DO - REFACTOR THIS TO USE INDIVIDUAL APPLIER
export const setGlobalFloatProperties = ({
  json,
  propertyNameToFloatMap,
  skipMaterialNameSet = new Set(),
}) => {
  console.log('SKIPPING MATERIALS:', skipMaterialNameSet);

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

  console.log('SETTING FLOAT MATERIAL PROPS:', updatedMaterialProperties);

  const updatedJson = structuredClone(json);
  updatedJson.extensions.VRM.materialProperties = updatedMaterialProperties;

  return updatedJson;
};
