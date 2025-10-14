import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from './theme';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
import { Analytics } from "@vercel/analytics/next"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Pokemon Catch",
    description: "Catch Berries to feed your Pokemons",
    other: {
      'fc:miniapp': JSON.stringify({
        version: 'next',
        imageUrl: 'https://your-app.com/embed-image',
        button: {
          title: `Lauch Pokemon Catch`,
          action: {
            type: 'launch_miniapp',
            name: 'Berry Catch',
            url: 'https://pokemon-catch-nu.vercel.app',
            splashImageUrl: 'https://your-app.com/splash-image/globe.svg',
            splashBackgroundColor: '#000000',
          },
        },
      }),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
            {children}
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

