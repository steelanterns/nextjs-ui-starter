import type React from "react";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { TranslationProvider } from "@/stores/contexts/translation-context";
import { i18n } from "@/i18n.config";

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  let { lang } = await params;
  // Validate the locale
  if (!i18n.locales.includes(lang)) {
    // Fallback to default locale if an invalid locale is provided
    lang = i18n.defaultLocale;
  }

  const dictionary = await getDictionary(lang);

  return (
    <div>
      <TranslationProvider lang={lang} dictionary={dictionary}>
        {children}
      </TranslationProvider>
    </div>
  );
}
