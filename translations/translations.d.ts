
declare global {

  type Lang = "en" | "fr";

  type TranslationKeys = {
    [key: string]: string;
  };
  
  type Translations = {
      [key in 'en' | 'fr']: TranslationKeys;
  };

  type TranslationSet = 'general' | 'register';
  type TranslationSet = 'translations' | 'register';

  type translationContextType = {
    lang: Lang;
    setLang: (lang: Lang) => void;
    translate: (key: string, set: TranslationSet) => string;
  }

 

  type translationProvider = {
    children: React.ReactNode
  }

}

export {};
