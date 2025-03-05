"use client";

import React, { createContext, useContext } from "react";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";

// Type for translation context
type TranslationContextType = {
  t: Awaited<ReturnType<typeof getDictionary>>;
  lang: Locale;
};

// Create the context with a more explicit undefined check
const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

// Provider component
export function TranslationProvider({
  children,
  lang,
  dictionary,
}: {
  children: React.ReactNode;
  lang: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  return (
    <TranslationContext.Provider value={{ t: dictionary, lang }}>
      {children}
    </TranslationContext.Provider>
  );
}

// Custom hook for translations
export function useTranslation() {
  const context = useContext(TranslationContext);

  if (context === undefined) {
    throw new Error(
      "useTranslation must be used within a TranslationProvider. " +
        "Ensure you have wrapped your component with TranslationProvider."
    );
  }

  return context;
}
