import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translation, translations } from './translations';
import { useSettingsPageStatesStore } from '../services/store';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  // Try to get saved language from settings or use default
  const settings = useSettingsPageStatesStore(state => state.settings);
  const setSettings = useSettingsPageStatesStore(state => state.setSettingsKey);
  
  // Check if we have a saved language in settings (we'll add this field)
  // For now, default to English or detect browser language
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to detect browser language
    const browserLang = navigator.language;
    if (browserLang.startsWith('zh')) {
      return 'zh-CN';
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // In a real implementation, we would save this to settings
    // For now, we'll just update the state
  };

  const t = translations[language];

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
