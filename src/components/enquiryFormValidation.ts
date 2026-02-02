import { toast } from "react-toastify";
import { EnquiryFormData } from "./useEnquiryForm";

// -------------------- Validation Regex Constants --------------------
const NAME_REGEX = /^[A-Za-z.\s]+$/;
const MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX =
    /^[A-Za-z0-9](?:[A-Za-z0-9._%+-]{0,63})@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/;
const MESSAGE_REGEX = /^[A-Za-z0-9\s.,!?'"()\-]{0,300}$/;

// -------------------- Core Rule Runner --------------------
type ValidationResult = { ok: boolean; message?: string };

function fail(message: string): ValidationResult {
    return { ok: false, message };
}

function runValidation(
    formData: EnquiryFormData,
    requiredName: boolean,
    fieldsToShow?: string[],
): ValidationResult {
    // Implement field-specific validation logic here
    const has = (f: string) => !fieldsToShow || fieldsToShow.includes(f);

    // Name
    if (has("name") && requiredName) {
        if (
            !formData.name ||
            !NAME_REGEX.test(formData.name) ||
            formData.name.length < 2 ||
            formData.name.length > 50
        )
            return fail("Enter valid name");

        // Mobile
        if (has("mobile")) {
            if (!MOBILE_REGEX.test(formData.mobile))
                return fail("Enter valid mobile number");
        }

        // Email
        if (formData.email && !EMAIL_REGEX.test(formData.email)) {
            return fail("Enter valid email");
        }

        // Message
        if (formData.message && !MESSAGE_REGEX.test(formData.message))
            return fail("Enter valid message");

    }
    // If name is not required or not shown, treat as valid
    return { ok: true };
}

// -------------------- Public APIs --------------------
export function validateEnquiryForm(
    formData: EnquiryFormData,
    requiredName: boolean = true,
    fieldsToShow?: string[],
): boolean {
    return runValidation(formData, requiredName, fieldsToShow).ok;
}

export function validateEnquiryFormWithToast(
    formData: EnquiryFormData,
    requiredName: boolean = true,
    fieldsToShow?: string[],
): boolean {
    const result = runValidation(
        formData,
        requiredName,
        fieldsToShow,
    );
    if (!result.ok && result.message) toast.error(result.message);
    return result.ok;
}
