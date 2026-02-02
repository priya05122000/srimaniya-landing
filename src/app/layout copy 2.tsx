"use client";

import React, { useEffect, useState } from "react";
import { LoadingContext } from "@/components/LoadingContext";
import ClientLayout from "./ClientLayout";
import Loader from "@/components/Loader";
import "./globals.css";

import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

// import PopupEnquiryForm from "@/components/PopupEnquiryForm";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  /* ---------------- Loader ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  /* ---------------- Popup delay ---------------- */
  useEffect(() => {
    let popupTimer: NodeJS.Timeout;
    if (!loading) {
      popupTimer = setTimeout(() => setShowPopup(true), 5000);
    }
    return () => popupTimer && clearTimeout(popupTimer);
  }, [loading]);

  return (
    <html lang="en">
      <body className="antialiased">
        <LoadingContext.Provider value={{ loading, setLoading }}>
          {/* Loader */}
          <div
            className={`fade-transition ${loading ? "fade-visible" : "fade-hidden"
              }`}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              pointerEvents: loading ? "auto" : "none",
            }}
          >
            <Loader />
          </div>

          {/* App content */}
          <div
            className={`fade-transition ${loading ? "fade-hidden" : "fade-visible"
              }`}
          >
            <ClientLayout>{children}</ClientLayout>

            {/* ================= POPUP ================= */}
            <AnimatePresence>
              {showPopup && (
                <motion.div
                  className="fixed inset-0 z-100 flex items-center justify-center bg-blue-overlay-strong p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-blue-custom shadow-lg p-6 max-w-lg w-full relative"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Close */}
                    <button
                      className="absolute cursor-pointer top-2 right-2 text-2xl text-white"
                      onClick={() => setShowPopup(false)}
                      aria-label="Close"
                    >
                      <IoClose />
                    </button>

                    {/* Logo */}
                    <div className="mb-6 flex justify-center">
                      <img
                        src="/logos/navbarlogo.png"
                        alt="Logo"
                        width={180}
                        height={40}
                        className="w-48 md:w-64"
                      />
                    </div>

                    {/* PopupEnquiryForm handles its own logic and closes on success */}
                    {/* <PopupEnquiryForm onSuccess={() => setShowPopup(false)} fieldsToShow={["name", "mobile"]} /> */}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </LoadingContext.Provider>
      </body>
    </html>
  );
}
