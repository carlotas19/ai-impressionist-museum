import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
