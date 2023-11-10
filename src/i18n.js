import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          about: 'About',
          close: 'Close',
          editor: 'Editor',
          load: 'Load',
          save: 'Save',
          misc: 'Miscellaneous',
          materialDescription: {
            emission: 'Emission',
            lighting: 'Lighting',
            main: 'Main',
            outline: 'Outline',
            rimLight: 'Rim Light',
            shading: 'Shading',
            texture: 'Texture',
            textureAnimation: 'Texture Animation',
          },
          helpText: {
            shadeToony:
              'Set whether to smoothly change the lit color and shade color around the threshold value in Shading Shift.When the value is 0, it becomes realistically smooth like a general Lambert model.When the value is 1, it becomes animation-style lighting. The lit color and shade color change rapidly around the threshold value.',
            shadeShift:
              'Adjust the threshold value of the lit color and shade color for how the light ray hits the object.When the value is 0, it is the normal lighting.When the value is negative, it becomes the lighting with anime-like, wide range of lit color. It is necessary to disable the self-shadow with setting the value to 0 in Shadow Receive Multiplier according to the displayed warning message.',
            shadowReceiveMultiplier:
              'Set the influence of the self-shadow and shadow. 0: Not affected. 1: Affected.',
            emissionColor:
              'Set the constant color regardless of the light source environment.',
            lightColorAttenuation:
              'Set the influence of the light source color.0: Affected by the light source color.1: Not affected by the light source color. It only reflects the luminance of the light source color.',
          },
        },
      },
      jp: {
        translation: {
          about: 'About',
          close: '閉じる',
          editor: '編集',
          load: '読込み',
          save: '保存',
          misc: 'その他の設定',
          materialDescription: {
            emission: '発光',
            lighting: 'ライティング',
            main: 'メイン',
            outline: '輪郭線',
            rimLight: 'リムライト',
            shading: 'シェーディング',
            texture: 'テクスチャ',
            textureAnimation: 'テクスチャアニメーション',
          },
          helpText: {
            shadeToony:
              'Shading Shift の項目における主色と陰色のしきい値付近を滑らかに変化させるか否かを設定します。 0 のときは通常の Lambert モデルのような写実寄りの滑らかさになります。 1 のときはしきい値ではっきり主色と陰色が変化するアニメ調のライティングになります。',
            shadeShift:
              '光の当たり方に対して、主色と陰色のしきい値を調整します。 0 のとき普通のライティングになります。 マイナス値にするとアニメ的な、主色の範囲が広いライティングになります。 マイナス値のときはセルフシャドウを無効化する必要があるため、表示された警告に従い Shadow Receive Multiplier を 0 に設定する必要があります。',
            shadowReceiveMultiplier:
              'セルフシャドウや落影の影響度を設定します。 0 のときは影響を受けません。 1 のときは影響を受けます。',
            emissionColor: '光源環境によらず一定な色を設定します。',
            lightColorAttenuation:
              '光源の色の影響度を設定します。 0 のときは光源の色の影響を受けます。 1 のときは光源の色の影響を無効化し、光源の色の輝度だけを反映します。',
          },
        },
      },
      th: {
        translation: {
          about: 'เกี่ยวกับแอพนี้',
          close: 'ปิด',
          editor: 'Editor',
          load: 'โหลด',
          save: 'เซฟ',
          materialDescription: {
            lighting: 'แสง',
            outline: 'เส้น',
            shading: 'เงา',
          },
        },
      },
    },
  });

export default i18n;
