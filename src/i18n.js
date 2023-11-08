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
          materialDescription: {
            lighting: 'Lighting',
            outline: 'Outline',
            shading: 'Shading',
          },
        },
      },
      jp: {
        translation: {
          about: 'About',
          close: 'クローズ',
          editor: 'Editor',
          load: 'ロード',
          save: 'セーブ',
          materialDescription: {
            lighting: 'ライティング',
            outline: '輪郭線を',
            shading: 'シェーディング',
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
