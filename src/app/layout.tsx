"use client";

import React, { useEffect, useState } from "react";
import { LoadingContext } from "@/components/LoadingContext";
import ClientLayout from "./ClientLayout";
import Loader from "@/components/Loader";
import "./globals.css";
import PopupForm from "@/components/PopupForm";
import CaptchaWrapper from "@/components/CaptchaWrapper";
import Script from "next/script";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const pathname = usePathname();

  // Show loader for 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    if (pathname === "/thankyou") {
      localStorage.setItem("popupDisabled", "true");
    }
  }, [pathname])

  // Show popup 5 seconds after loader disappears
  useEffect(() => {
    if (!loading) {

      const isDisabled = localStorage.getItem("popupDisabled");

      if(isDisabled==="true") return;

      const popupTimer = setTimeout(() => setShowPopup(true), 5000);
      return () => clearTimeout(popupTimer);
    }
  }, [loading]);

  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow"></meta>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),
                    dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TLLR36TQ');
            `}
        </Script>
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TLLR36TQ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
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
