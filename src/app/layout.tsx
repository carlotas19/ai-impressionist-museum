import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The AI Artiste — An Impressionist Museum",
  description:
    "A collection of impressionist art painted by AI. Eight GPT-5 models interpret classic subjects through Neon AI Gateway.",
  openGraph: {
    title: "The AI Artiste",
    description:
      "A collection of impressionist art painted by AI, powered by Neon AI Gateway.",
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
