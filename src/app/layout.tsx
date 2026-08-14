import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The AI Artiste — An Impressionist Museum",
  description:
    "Who says AI doesn't have feelings? Eight GPT-5 models paint impressionist canvases through Neon AI Gateway — with a house critic's verdict.",
  openGraph: {
    title: "The AI Artiste",
    description:
      "A gallery of carefully felt impressionist work painted by eight GPT-5 models via Neon AI Gateway.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cormorant.variable}>
      <body className="font-serif antialiased">{children}</body>
    </html>
  );
}
