export const siteConfig = {
  name: "nextjs-starter",
  url: "https://ui.shadcn.com",
  // url:
  // env.NODE_ENV === "development"
  //   ? "http://localhost:3000"
  //   : "https://shadcn-table-vert.vercel.app",
  ogImage: "https://ui.shadcn.com/og.jpg",
  description:
    "A set of beautifully-designed, accessible components and a code distribution platform. Works with your favorite frameworks. Open Source. Open Code.",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn-ui/ui",
  },
}

export type SiteConfig = typeof siteConfig

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}