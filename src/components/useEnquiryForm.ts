import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

// -------------------- Types & Initial State --------------------
export type EnquiryFormData = {
    name: string;
    email: string;
    mobile: string;
    message: string;
    course?: string;
};

export const getInitialFormData = (): EnquiryFormData => ({
    name: "",
    email: "",
    mobile: "",
    message: "",
    course: "",
});

// -------------------- Validation Helpers --------------------

const sanitizers: Record<string, (value: string) => string> = {
    name: (value) => value.replace(/[^A-Za-z.\s]/g, ""),
    mobile: (value) => value.replace(/\D/g, "").slice(0, 10).replace(/^[^6-9]+/, ""),
    email: (value) => value.replace(/[^a-zA-Z0-9@._-]/g, "").replace(/(@.*)@/g, "$1"),
    message: (value) => value.replace(/[^A-Za-z0-9\s.,!?'"()\-]/g, "").slice(0, 300),
};

// -------------------- useEnquiryForm Hook --------------------
export function useEnquiryForm({
    validateForm,
    onSubmit,
    captchaAction = "enquiry_form",
    namePrefix = "",
}: {
    validateForm?: (formData: EnquiryFormData) => boolean;
    onSubmit: (payload: any) => Promise<void>;
    captchaAction?: string;
    namePrefix?: string;
}) {
    const [formData, setFormData] = useState<EnquiryFormData>(getInitialFormData());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const { executeRecaptcha } = useGoogleReCaptcha();
    const router = useRouter();

    // Unified handleChange
    const handleChange = (
        e:
            | React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
            | { target: { name: string; value: unknown } }
    ) => {
        const { name, value } = e.target;
        let newValue = value;
        if (typeof value === "string" && sanitizers[name]) {
            newValue = sanitizers[name](value);
        }
        // Always set countryCode to +91 for mobile
        if (name === "mobile") {
            setFormData((prev) => ({
                ...prev,
                [name]: typeof newValue === 'string' ? newValue : '',
                countryCode: "+91",
            }));
            localStorage.setItem("countryCode", "+91");
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: newValue,
            }));
        }
    };

    /* -------------------- handleSubmit -------------------- */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const tempFormData = { ...formData };
        if (validateForm && !validateForm(tempFormData)) return;

        if (!executeRecaptcha) {
            setError("Captcha failed. Please refresh and try again.");
            return;
        }

        setLoading(true);

        try {
            const captchaToken = await executeRecaptcha(captchaAction);

            const payload = {
                name: namePrefix ? `${namePrefix}${tempFormData.name}` : tempFormData.name,
                email: tempFormData.email?.trim() || null,
                phone_number: tempFormData.mobile ? `${localStorage.getItem("countryCode")}${tempFormData.mobile}` : null,
                message: tempFormData.message || null,
                course_id: tempFormData.course || null,
                token: captchaToken,
            };
            await onSubmit(payload);
            setFormData(getInitialFormData());
            setSuccess('Submitted successfully!');
            router.push("/thankyou");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to submit enquiry.");
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        setFormData,
        handleChange,
        handleSubmit,
        loading,
        error,
        success,
        setError,
        setSuccess,
    };
}

