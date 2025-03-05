"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslation } from "@/stores/contexts/translation-context";

export default function HomePage() {
  const { t, lang } = useTranslation();

  return (
    <div className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-[980px] text-center">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          {t.page.home.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          {t.page.home.description}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href={`/${lang}/dashboard`}>Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link
              href="https://github.com/steelanterns"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
