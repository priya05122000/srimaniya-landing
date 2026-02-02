"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { GoDownload } from "react-icons/go";
import {
  CheckboxField,
  InputField,
  TextAreaField,
  SelectField,
} from "@/components/FormFields";

// -------------------- Types --------------------
export type CommonEnquiryFormData = {
  name: string;
  email: string;
  mobile: string;
  message: string;
  course?: string;
};

export type CommonEnquiryFieldsProps = {
  formData: CommonEnquiryFormData;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  setFormData?: React.Dispatch<React.SetStateAction<CommonEnquiryFormData>>;
  requiredMobile?: boolean;
  requiredName?: boolean;
  fileInputRef?: React.RefObject<HTMLInputElement>;
  courseOptions?: { id: string; title: string }[];
  onCourseChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  fieldsToShow?: string[];
  loading?: boolean;
  submitText?: string;
};


const CommonEnquiryFields: React.FC<CommonEnquiryFieldsProps> = ({
  formData,
  handleChange,
  requiredMobile = true,
  requiredName = true,
  courseOptions,
  onCourseChange,
  fieldsToShow,
  loading = false,
  submitText = "Submit",
}) => {

  const renderField = (field: string) => {
    switch (field) {
      case "name":
        return (
          <InputField
            key="name"
            type="text"
            label="Name *"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="new-password"
          />
        );
      case "email":
        return (
          <InputField
            key="email"
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="new-password"
          />
        );
      case "mobile":
        return (
          <InputField
            key="mobile"
            type="tel"
            label="Mobile number *"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            autoComplete="new-password"
          />
        );
      case "course":
        return (
          <SelectField
            key="course"
            label="Course"
            name="course"
            value={formData.course || ""}
            onChange={handleChange}
            options={courseOptions && courseOptions.length > 0 ? courseOptions.map((course) => ({ value: course.id, label: course.title })) : [{ value: "", label: "No courses available" }]}
          />
        );

      case "message":
        return (
          <TextAreaField
            key="message"
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={2}
          />
        );
      default:
        return null;

    }
  };

  return (
    <>
      {fieldsToShow ? (
        fieldsToShow.map((field) => renderField(field))
      ) : (
        <>
          {renderField("name")}
          {renderField("email")}
          {renderField("mobile")}
          {renderField("course")}
          {renderField("message")}
        </>
      )}
      <div className="flex justify-end mt-4">
        {submitText === "Download Brochure" ? (
          <DownloadBrochureButton loading={loading} />
        ) : (
          <SubmitButton loading={loading} submitText={submitText} />
        )}
      </div>
    </>
  );
};

// -------------------- Reusable Buttons --------------------
const SubmitButton: React.FC<{ loading?: boolean; submitText?: string }> = ({ loading, submitText }) => (
  <button
    type="submit"
    className="relative flex justify-center items-center rounded-full bg-transparent overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 min-w-[110px]"
    disabled={loading}
    style={loading ? { pointerEvents: 'none', opacity: 0.7 } : {}}
  >
    <span className="relative z-20 text-center no-underline w-full px-2 py-1 text-(--yellow) text-base transition-all duration-300 group-hover:text-(--blue)">{loading ? "Submitting..." : submitText}</span>
    <span className="absolute left-0 top-0 w-full h-0 bg-(--yellow) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
  </button>
);

const DownloadBrochureButton: React.FC<{ loading?: boolean }> = ({ loading }) => (
  <button
    type="submit"
    className="relative flex justify-center items-center gap-1 rounded bg-(--yellow) overflow-hidden cursor-pointer border border-(--yellow) group transition-all duration-300 px-4 py-1"
    disabled={loading}
    style={loading ? { pointerEvents: 'none', opacity: 0.7 } : {}}
  >
    <span className="relative z-20 gap-x-1 flex items-center text-center no-underline w-full text-(--blue) transition-all duration-300 group-hover:text-(--yellow)">
      {loading ? "Downloading Brochure..." : "Download Brochure"} <GoDownload />
    </span>
    <span className="absolute left-0 top-0 w-full h-0 bg-(--blue) transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
  </button>
);

// -------------------- Autofill Suppression Fields --------------------
export const AutofillSuppressionFields: React.FC = () => (
  <>
    <input type="text" name="fakeusernameremembered" autoComplete="username" style={{ display: "none" }} tabIndex={-1} />
    <input type="password" name="fakePassword" autoComplete="new-password" style={{ display: "none" }} tabIndex={-1} />
  </>
);

export default CommonEnquiryFields;
