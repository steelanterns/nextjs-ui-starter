"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeSwitcher } from "./mode-switcher";
import { useTranslation } from "@/stores/contexts/translation-context";
import LocaleSwitcher from "./locale-switcher";

export function Header() {
  const { t, lang } = useTranslation();
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href={`/${lang}`} className="font-bold text-2xl">
          Next.js Starter
        </Link>
        <nav className="flex items-center gap-4">
          <Link href={`/${lang}/about`}>{t.navigation.about}</Link>
          <Link href={`/${lang}/contact`}>{t.navigation.contact}</Link>
          <ModeSwitcher />
          <LocaleSwitcher />
          <Button asChild>
            <Link href={`/${lang}/dashboard`}>{t.navigation.dashboard}</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
