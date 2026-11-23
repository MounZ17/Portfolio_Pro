import type { Metadata, Viewport } from "next";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/400-italic.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { profile } from "@/lib/content";

const description =
  "Mounir Chemloul is an AI and software engineer in Algiers, working on computer vision, deep learning and full-stack software.";

export const metadata: Metadata = {
  title: { default: `${profile.name} | ${profile.role}`, template: `%s | ${profile.name}` },
  description,
  authors: [{ name: profile.name }],
  openGraph: { type: "website", title: `${profile.name} | ${profile.role}`, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#151412" },
  ],
};

// Runs before first paint: saved choice first, otherwise follow the OS (and keep following it).
const themeBoot = `(function(){var d=document.documentElement,m=window.matchMedia('(prefers-color-scheme: dark)'),s=function(){try{return localStorage.getItem('theme')}catch(e){return null}};var t=s();d.dataset.theme=t==='dark'||t==='light'?t:(m.matches?'dark':'light');if(m.addEventListener)m.addEventListener('change',function(e){if(!s())d.dataset.theme=e.matches?'dark':'light'})})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
