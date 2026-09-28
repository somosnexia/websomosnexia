import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { seo } from "@/lib/content";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://somosnexia.com"),
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: "https://somosnexia.com/",
    siteName: "Somos Nexia",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground bg-grain">
        {children}
      </body>
    </html>
  );
}
