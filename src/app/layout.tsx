import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Star Crescent Marriage Lawn | Premium Wedding Venue in Karachi",
  description: "Star Crescent Marriage Lawn - Where Dreams Begin. Premium wedding and event venue in Karachi with capacity for 600-1000 guests. Elegant décor, professional catering, and unforgettable celebrations.",
  keywords: ["wedding venue", "marriage lawn", "Karachi", "events", "banquet hall", "Star Crescent"],
  openGraph: {
    title: "Star Crescent Marriage Lawn",
    description: "Where Dreams Begin - Premium Wedding Venue in Karachi",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Great+Vibes&family=Inter:wght@300;400;500;600&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
