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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;1,6..96,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
