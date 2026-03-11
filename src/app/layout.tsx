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
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}
            (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1590176728705087');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1590176728705087&ev=PageView&noscript=1"
          />
        </noscript>
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
