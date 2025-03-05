"use client";

import { i18n } from "@/i18n.config";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Locale = (typeof i18n.locales)[number];

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<Locale>(
    i18n.defaultLocale as Locale
  );

  useEffect(() => {
    const segments = pathName.split("/");
    const localeInPath = segments[1] as Locale;
    if (i18n.locales.includes(localeInPath)) {
      setCurrentLocale(localeInPath);
    } else {
      setCurrentLocale(i18n.defaultLocale as Locale);
    }
  }, [pathName]);

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";

    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`
    );

    if (pathnameIsMissingLocale) {
      if (locale === i18n.defaultLocale) return pathName;
      return `/${locale}${pathName}`;
    } else {
      if (locale === i18n.defaultLocale) {
        const segments = pathName.split("/");
        const isHome = segments.length === 2;
        if (isHome) return "/";

        segments.splice(1, 1);
        return segments.join("/");
      }

      const segments = pathName.split("/");
      segments[1] = locale;
      return segments.join("/");
    }
  };

  const handleLocaleChange = (locale: Locale) => {
    setIsOpen(false);
    setCurrentLocale(locale);
    router.push(redirectedPathName(locale));
  };
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white transition-colors duration-200"
      >
        {/* <CurrentIcon className="w-6 h-6 mr-2 text-gray-700 dark:text-gray-300" /> */}
        <span className="font-semibold">{currentLocale.toUpperCase()}</span>
        <svg
          className="w-4 h-4 text-gray-700 dark:text-gray-300 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 lg:z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {i18n.locales.map((locale) => {
              // const Icon = getLanguageIcon(locale as Locale)
              return (
                <button
                  key={locale}
                  onClick={() => handleLocaleChange(locale as Locale)}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                >
                  {/* <Icon className="w-6 h-6 mr-3 text-gray-600 dark:text-gray-400" /> */}
                  <span className="font-medium">{locale.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// 'use client'

// import Link from 'next/link'
// import { usePathname } from 'next/navigation'

// import { i18n } from '@/i18n.config'

// export default function LocaleSwitcher() {
//   const pathName = usePathname()

//   const redirectedPathName = (locale: string) => {
//     if (!pathName) return '/'

//     const pathnameIsMissingLocale = i18n.locales.every(
//       locale => !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`
//     )

//     if (pathnameIsMissingLocale) {
//       if (locale === i18n.defaultLocale) return pathName
//       return `/${locale}${pathName}`
//     } else {
//       if (locale === i18n.defaultLocale) {
//         const segments = pathName.split('/')
//         const isHome = segments.length === 2
//         if (isHome) return '/'

//         segments.splice(1, 1)
//         return segments.join('/')
//       }

//       const segments = pathName.split('/')
//       segments[1] = locale
//       return segments.join('/')
//     }
//   }

//   // const redirectedPathName = (locale: string) => {
//   //   if (!pathName) return '/'
//   //   const segments = pathName.split('/')
//   //   segments[1] = locale
//   //   return segments.join('/')
//   // }

//   return (
//     <ul className='flex gap-x-3'>
//       {i18n.locales.map(locale => {
//         return (
//           <li key={locale}>
//             <Link
//               href={redirectedPathName(locale)}
//               className='rounded-md border bg-black px-3 py-2 text-white'
//             >
//               {locale}
//             </Link>
//           </li>
//         )
//       })}
//     </ul>
//   )
// }
