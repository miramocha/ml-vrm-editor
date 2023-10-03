import * as FormUtils from '../FormUtils';

test('Normalize material form data', () => {
  const formData = new FormData();
  formData.append('_OutlineColor.hex', '#ffffff');
  formData.append('_OutlineColor.alpha', 1);

  const normalizeFormData = FormUtils.normalizeMaterialFormData(formData);
  expect(normalizeFormData.get('_OutlineColor')).toEqual([1, 1, 1, 1]);
});
