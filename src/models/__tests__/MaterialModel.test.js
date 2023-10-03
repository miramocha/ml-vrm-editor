import MaterialModel from '../MaterialModel';

test('Normalize material form data', () => {
  const formData = new FormData();
  formData.append('_OutlineColor.hex', '#ff0000');
  formData.append('_OutlineColor.alpha', 1);

  const materialModel = new MaterialModel({
    materialIndex: 0,
    vrmMaterialJson: { vectorProperties: { _OutlineColor: [0, 0, 0, 1] } },
  });

  materialModel.processMaterialFormData(formData);
  expect(materialModel.vrmMaterialJson.vectorProperties._OutlineColor).toEqual([
    1, 0, 0, 1,
  ]);
});
