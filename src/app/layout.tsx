"use client";

import React, { useEffect, useState } from "react";
import { LoadingContext } from "@/components/LoadingContext";
import ClientLayout from "./ClientLayout";
import Loader from "@/components/Loader";
import "./globals.css";
import PopupForm from "@/components/PopupForm";
import CaptchaWrapper from "@/components/CaptchaWrapper";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  // Show loader for 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Show popup 5 seconds after loader disappears
  useEffect(() => {
    if (!loading) {
      const popupTimer = setTimeout(() => setShowPopup(true), 5000);
      return () => clearTimeout(popupTimer);
    }
  }, [loading]);

  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17861303334"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'AW-17861303334');
            `}
        </Script>
      </head>
      <body className="antialiased">
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <CaptchaWrapper>
            {/* Loader */}
            <div
              className={`fade-transition ${loading ? "fade-visible" : "fade-hidden"}`}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                pointerEvents: loading ? "auto" : "none",
              }}
            >
              <Loader />
            </div>

            {/* App */}
            <div
              className={`fade-transition ${loading ? "fade-hidden" : "fade-visible"}`}
            >
              <ClientLayout>{children}</ClientLayout>
              {/* Popup */}
              {showPopup && <PopupForm onClose={() => setShowPopup(false)} />}
            </div>
          </CaptchaWrapper>
        </LoadingContext.Provider>
      </body>
    </html>
  );
}
