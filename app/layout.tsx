import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { profile } from "@/lib/content";

const description =
  "Mounir Chemloul — AI & Software Engineer in Algiers. Computer vision, deep learning and production full-stack software. Selected work and case studies.";

export const metadata: Metadata = {
  title: { default: `${profile.name} — ${profile.role}`, template: `%s · ${profile.name}` },
  description,
  authors: [{ name: profile.name }],
  openGraph: { type: "website", title: `${profile.name} — ${profile.role}`, description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d11" },
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
