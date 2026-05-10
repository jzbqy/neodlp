import React, { createContext, useContext, useState, ReactNode } from 'react';
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

// Add language property to settings type (we'll use type assertion)
type SettingsWithLanguage = {
  language?: Language;
};

export const I18nProvider: React.FC<I18nProviderProps> = ({ children }) => {
  const settings = useSettingsPageStatesStore(state => state.settings);
  const setSettings = useSettingsPageStatesStore(state => state.setSettingsKey);

  const [language, setLanguageState] = useState<Language>(() => {
    // First try to get from settings if available
    const settingsWithLang = settings as SettingsWithLanguage;
    if (settingsWithLang.language) {
      return settingsWithLang.language;
    }
    // Then try browser language
    const browserLang = navigator.language;
    if (browserLang.startsWith('zh')) {
      return 'zh-CN';
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      // Save to settings (we use type assertion since language might not be in the type)
      setSettings('language' as any, lang);
    } catch (e) {
      // If setting doesn't exist, just ignore
      console.log('Could not save language to settings', e);
    }
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
