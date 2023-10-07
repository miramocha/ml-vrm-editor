import * as GltfParserUtils from '../GltfParserUtils';

test('Convert and pad json to chunk', () => {
  const json = { lang: '日本語/ENGL' };

  expect(
    new TextEncoder().encode(JSON.stringify(json).length % 4 !== 0),
  ).toBeTruthy();
  expect(
    GltfParserUtils.jsonToPaddedEncodedJsonString(json).length % 4 === 0,
  ).toBeTruthy();
});
