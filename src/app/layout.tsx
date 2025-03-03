import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeMatrics - Leading the Way in Innovative IT Solutions",
  description:
    "Transform your business with innovative IT solutions by CodeMatrics. Get IT consulting, cloud computing, cybersecurity, and custom software development services tailored for success.",
  keywords: [
    "Innovative IT solutions",
    "Best IT services",
    "IT consulting",
    "Digital transformation",
    "Cloud computing",
    "Cybersecurity",
    "Custom software development",
    "IT infrastructure",
    "Affordable IT services",
    "Website Development",
    "Website Design",
    "Website Design and Development",
    "Web Development",
    "Mobile App Development",
    "codematrix",
    "codematrix It",
    "codematric",
    "codemetric",
    "codematrics",
    "codematrics",
  ],
  openGraph: {
    title: "CodeMatrics - Leading the Way in Innovative IT Solutions",
    description:
      "Stay tuned for cutting-edge IT solutions that will transform the way you work and grow.",
    url: "https://codematrics.com",
    images: [
      {
        url: "https://codematrics.com/assets/CodeMatrics.webp",
        alt: "CodeMatrics Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    title: "CodeMatrics - Leading the Way in Innovative IT Solutions",
    description:
      "Discover innovative IT solutions by CodeMatrics, transforming businesses for the future.",
    images: ["https://codematrics.com/assets/CodeMatrics.webp"],
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta
          name="google-site-verification"
          content="P0jHynGstXmNhoxIBQTnL-74RdmQrL1bBav43LQRTwA"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="https://codematrics.com/assets/CodeMatrics.webp"
          as="image"
        />
        <link
          rel="canonical"
          href="https://codematrics.com"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "CodeMatrics",
            url: "https://codematrics.com",
            logo: "https://codematrics.com/assets/CodeMatrics.webp",
            description:
              "CodeMatrics is a hub for innovative IT solutions designed to transform businesses.",
            sameAs: [
              "https://www.facebook.com/CodeMatrics",
              "https://twitter.com/CodeMatrics",
              "https://www.linkedin.com/company/codematrics",
            ],
          })}
        </script>
      </head>
      <head>
        <meta name="theme-color" content="#000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black scrollbar-hidden text-white dark:text-white`}
      >
        <div className="min-h-screen">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
