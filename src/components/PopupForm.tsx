"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

import CommonEnquiryFields, {
    AutofillSuppressionFields,
} from "@/components/CommonEnquiryFields";
import { validateEnquiryFormWithToast } from "@/components/enquiryFormValidation";
import { useEnquiryForm } from "@/components/useEnquiryForm";
import { createAppoinmentRequest } from "@/services/appoinmentRequestService";

type Props = {
    onClose: () => void;
};

const PopupForm: React.FC<Props> = ({ onClose }) => {
    const {
        formData,
        handleChange,
        handleSubmit,
        loading,
        error,
        success,
        setError,
        setSuccess,
    } = useEnquiryForm({
        validateForm: validateEnquiryFormWithToast,
        onSubmit: createAppoinmentRequest,
        captchaAction: "popup_form",
        namePrefix: "(From Landing Page Brochure) ",
    });

    useEffect(() => {
        if (error) {
            toast.error(error);
            setError(null);
        }
        if (success) {
            toast.success(success);
            setSuccess(null);
            onClose();
        }
    }, [error, success, setError, setSuccess, onClose]);

    return (
        <AnimatePresence>
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
                        onClick={onClose}
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

                    {/* ✅ SAME FORM AS BANNER */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
                        <AutofillSuppressionFields />
                        <CommonEnquiryFields
                            formData={formData}
                            handleChange={handleChange as React.ChangeEventHandler<
                                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
                            >}
                            fieldsToShow={["name", "mobile"]}
                            loading={loading}
                            submitText="Submit"
                        />
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PopupForm;
