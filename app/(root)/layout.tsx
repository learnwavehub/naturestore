// app/layout.tsx
import type { Metadata, Viewport } from "next"; // Add Viewport import
import { ClerkProvider } from "@clerk/nextjs";
import TestimonialsSkeleton from "@/components/skeletons/TestimonialsKeleton";
import "../globals.css";
import Navbar from "@/components/Navbar";
import ToasterProvider from "@/lib/providers/ToasterProvider";
import Footer from "@/components/Footer";
import InstallPrompt from "@/components/pwa/InstallPrompt";
import { ServiceWorkerProvider } from "@/components/pwa/ServiceWorkerProvider";
import { FloatingBubbles } from "@/components/FloatingBubble";
import Testimonials from "@/components/Testimonials";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Natures Joy Holistic Health",
  description: "we sell natural health remedies",
  manifest: '/site.webmanifest', 
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Natures joy holistic health',
  },
};

// FIX: Separate viewport export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
       <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="Naturesjoy" />
<link rel="manifest" href="/site.webmanifest" />
      </head>
      <body style={{ fontFamily: "Arial, sans-serif" }}>
        <FloatingBubbles count={100}/>
        <ServiceWorkerProvider>
          <ClerkProvider>
            
            <ToasterProvider />
            <Navbar />
            {/* Add padding-top to prevent content from hiding behind navbar */}
            <main className="min-h-screen pt-16 md:pt-20">
              {children}
            </main>
            <Suspense fallback={<TestimonialsSkeleton/>}>
            <Testimonials />
            </Suspense>
            
            <Footer />
            <InstallPrompt />
          </ClerkProvider>
        </ServiceWorkerProvider>
      </body>
    </html>
  );
}