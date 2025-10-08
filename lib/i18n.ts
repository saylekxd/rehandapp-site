import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/messages/en.json';
import pl from '@/messages/pl.json';

// Initialize i18next
void i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pl: { translation: pl }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes
    }
  });

export default i18n; 