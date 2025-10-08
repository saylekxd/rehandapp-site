'use client';

import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

interface Props {
  children: ReactNode;
}

export default function I18nProvider({ children }: Props) {
  // Ensure i18n is initialized by simply importing the config
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
} 