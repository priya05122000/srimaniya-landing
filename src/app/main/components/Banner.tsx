"use client";

import React, { useEffect, useState } from "react";
import { createAppoinmentRequest } from "@/services/appoinmentRequestService";
import { getAllCourses } from "@/services/courseService";
import CommonEnquiryFields, { AutofillSuppressionFields } from "@/components/CommonEnquiryFields";
import { validateEnquiryFormWithToast } from "@/components/enquiryFormValidation";
import { useEnquiryForm } from "@/components/useEnquiryForm";
import { toast } from "react-toastify";

type CourseOption = {
  id: string;
  title: string;
};



const mapCourses = (data: any[]): CourseOption[] =>
  data.map((c) => ({ id: String(c.id), title: String(c.title) }));

const Banner: React.FC = () => {
  const [courseOptions, setCourseOptions] = useState<CourseOption[]>([]);

  const { formData, handleChange, handleSubmit, loading, error, success, setError, setSuccess } = useEnquiryForm({
    validateForm: validateEnquiryFormWithToast,
    onSubmit: createAppoinmentRequest,
    captchaAction: "placement_form",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
    if (success) {
      toast.success(success);
      setSuccess(null);
    }
  }, [error, success, setError, setSuccess]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await getAllCourses();
        setCourseOptions(mapCourses(result?.data || []));
      } catch {
        setCourseOptions([]);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div data-section>
      <div className="bg-blue-custom grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] xl:grid-cols-[2fr_1fr] lg:h-[calc(100vh-80px)]">
        <div className="border-b sm:border-b-0 sm:border-r border-grey-custom h-full min-h-[400px] relative">
          <video
            src="/videos/reelvideo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover rounded-none"
          />
        </div>
        <div className="hero-content flex flex-col justify-center sm:justify-center text-end px-6 sm:px-8 py-6 sm:py-8 text-white-custom min-h-[380px]">
          <form className="flex flex-col gap-y-2 " onSubmit={handleSubmit}>
            <AutofillSuppressionFields />
            <CommonEnquiryFields
              formData={formData}
              handleChange={handleChange as React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>}
              courseOptions={courseOptions}
              fieldsToShow={["name", "email", "mobile", "course", "message"]}
              loading={loading}
              submitText="Submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
