import * as ColorUtils from '../ColorUtils';

test('Convert RGB vector to hex', () => {
  expect(ColorUtils.colorUIVectorToHex([1, 0, 0])).toEqual('#ff0000');
});

test('Convert hex RGB vector', () => {
  expect(ColorUtils.hexToColorUIVector('#00ff00')).toEqual([0, 1, 0]);
});
