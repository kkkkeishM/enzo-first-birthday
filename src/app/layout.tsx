import type { Metadata } from "next";
import { Lilita_One, Nunito } from "next/font/google";
import "./globals.css";
import { Kaushan_Script } from "next/font/google";

const script = Kaushan_Script({ weight: "400", subsets: ["latin"], variable: "--font-script" });
// then add ${script.variable} to the className on <html>

const display = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://enzo-rsvp.vercel.app"), // your real live URL
  title: "Enzo's First Race Day",
  description: "The engines are ready, the track is set, and our little racer is turning ONE!. Tap to see more details 🏁",
  openGraph: {
    title: "Enzo's First Race Day",
    description: "The engines are ready, the track is set, and our little racer is turning ONE!. Tap to see more details 🏁",
    url: "/",
    siteName: "Enzo's First Race Day",
    type: "website",
    images: [
      {
        url: "poster.png",
        width: 1200,
        height: 630,
        alt: "Enzo First Birthday | One year of love, laughter, and little moments.",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}

