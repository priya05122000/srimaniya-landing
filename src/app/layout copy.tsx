"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { InputField } from "@/components/FormFields";
import { toast } from "react-toastify";
import { LoadingContext } from "@/components/LoadingContext";
import ClientLayout from "./ClientLayout";
import Loader from "@/components/Loader";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css";
import { IoClose } from "react-icons/io5";
import { createAppoinmentRequest } from "@/services/appoinmentRequestService";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let popupTimer: NodeJS.Timeout;
    if (!loading) {
      popupTimer = setTimeout(() => {
        setShowPopup(true);
      }, 5000);
    }
    return () => {
      if (popupTimer) clearTimeout(popupTimer);
    };
  }, [loading]);

  // Popup form state and handlers
  const [popupSubmitting, setPopupSubmitting] = useState(false);
  const [popupForm, setPopupForm] = useState({
    StudentName: "",
    StudentPhone: "",
    StudentEmail: "",
    City: "",
    State: "",
    District: "",
  });

  const handlePopupChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPopupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePopupSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setPopupSubmitting(true);
    try {
      const { StudentName, StudentPhone, StudentEmail, City, State, District } =
        popupForm;
      const brochureName = `( From Landing Page Brochure) ${StudentName}`;
      await fetch(
        "https://script.google.com/macros/s/AKfycbxQ0OGd2A5Tvs0_MQxcUWtWfwEmyAyHpdY6mcUXZKj87QXG0JP2ilZ9CTQxmhfkP6_r/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            StudentName: brochureName,
            ParentName: "null",
            StudentPhone,
            ParentPhone: "null",
            StudentEmail: StudentEmail || "null",
            Address: "null",
            City: City || "null",
            State: State || "null",
            District: District || "null",
            PinCode: "null",
          }),
        }
      );

      const payload = {
        name: brochureName,
        phone_number: StudentPhone,
      };

      const response = await createAppoinmentRequest(payload);
      if (!response || !response.status || response.responseCode !== "INSERT_SUCCESS") {
        toast.error("Failed to submit the form. Please try again.");
        return;
      }
      toast.success("Form submitted successfully!");
      setPopupForm({
        StudentName: "",
        StudentPhone: "",
        StudentEmail: "",
        City: "",
        State: "",
        District: "",
      });
      setShowPopup(false);
    } catch {
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setPopupSubmitting(false);
    }
  };

  const handleClosePopup = () => setShowPopup(false);

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <LoadingContext.Provider value={{ loading, setLoading }}>
          <div
            className={`fade-transition ${
              loading ? "fade-visible" : "fade-hidden"
            }`}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 9999,
              pointerEvents: loading ? "auto" : "none",
            }}
          >
            <Loader />
          </div>
          <div
            className={`fade-transition ${
              loading ? "fade-hidden" : "fade-visible"
            }`}
          >
            <ClientLayout>{children}</ClientLayout>
            <AnimatePresence>
              {showPopup && (
                <motion.div
                  className="fixed inset-0 z-100 flex items-center justify-center bg-blue-overlay-strong p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="bg-blue-custom shadow-lg p-6 max-w-lg w-full relative"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      className="absolute top-2 right-2 cursor-pointer text-2xl"
                      onClick={handleClosePopup}
                      aria-label="Close"
                    >
                      <IoClose />
                    </button>
                    <div className="mb-8 flex justify-center">
                      <img
                        src="/logos/navbarlogo.png"
                        alt="Logo"
                        width={180}
                        height={40}
                        className="w-48 md:w-72"
                      />
                    </div>
                    <form
                      onSubmit={handlePopupSubmit}
                      className="space-y-2 mt-5"
                    >
                      <div className="grid grid-cols-1 gap-y-4 gap-x-6">
                        <InputField
                          label="Name *"
                          name="StudentName"
                          required
                          value={popupForm.StudentName}
                          onChange={handlePopupChange}
                        />
                        <InputField
                          label="Phone Number *"
                          name="StudentPhone"
                          type="tel"
                          required
                          value={popupForm.StudentPhone}
                          onChange={handlePopupChange}
                          pattern="[0-9]{10}"
                          maxLength={10}
                        />
                      </div>
                      <div className="flex flex-row justify-end my-4 gap-2">
                        <button
                          type="submit"
                          className="relative flex justify-center items-center gap-1 rounded bg-yellow-custom overflow-hidden cursor-pointer border border-yellow-custom group transition-all duration-300 px-4 py-1"
                          disabled={popupSubmitting}
                        >
                          <span className="relative z-20 gap-x-1 flex items-center text-center no-underline w-full text-[#0B2351] text-base transition-all duration-300 group-hover:text-[#FFCE54]">
                            {popupSubmitting ? "Submitting..." : "Submit"}
                          </span>
                          <span className="absolute left-0 top-0 w-full h-0 bg-blue-custom transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                        </button>
                      </div>
                    </form>
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
