import BufferModel from '../../models/BufferModel';
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

it('Recalculate buffer model', () => {
  const bufferModels = [
    new BufferModel({
      bufferViewJson: { buffer: 0, byteOffset: 0, byteLength: 70 },
      buffer: new TextEncoder().encode(JSON.stringify({ testValue: '55' })), // 18
    }),
    new BufferModel({
      bufferViewJson: { buffer: 0, byteOffset: 70, byteLength: 70 },
      buffer: new TextEncoder().encode(JSON.stringify({ testValue: '5555' })), // 20
    }),
    new BufferModel({
      bufferViewJson: { buffer: 0, byteOffset: 140, byteLength: 70 },
      buffer: new TextEncoder().encode(
        JSON.stringify({ testValue: '555555555' }), // 25
      ),
    }),
  ];

  GltfParserUtils.recalculateBuffers(bufferModels);

  expect(bufferModels[0].bufferViewJson).toEqual({
    buffer: 0,
    byteOffset: 0,
    byteLength: 18,
  });
  expect(bufferModels[1].bufferViewJson).toEqual({
    buffer: 0,
    byteOffset: 18,
    byteLength: 20,
  });
  expect(bufferModels[2].bufferViewJson).toEqual({
    buffer: 0,
    byteOffset: 38,
    byteLength: 25,
  });
});
