"use client";

import Image from "next/image";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import {
  CheckboxField,
  InputField,
  SelectField,
  TextAreaField,
} from "@/components/FormFields";
import { createAppoinmentRequest } from "@/services/appoinmentRequestService";
import { getAllCourses } from "@/services/courseService";
import { toast } from "react-toastify";

type CourseOption = {
  id: number;
  title: string;
};

type FormData = {
  name: string;
  email: string;
  mobile: string;
  message: string;
  course: string;
  agree: boolean;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  mobile: "",
  message: "",
  course: "",
  agree: false,
};

const mapCourses = (data: any[]): CourseOption[] =>
  data.map((c) => ({ id: c.id, title: c.title }));

const Banner: React.FC = () => {
  const [courseOptions, setCourseOptions] = useState<CourseOption[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);

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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.agree) {
      toast.error("You must agree to the terms and conditions.");
      return;
    }

    const landingName = `(From LandingPage) ${formData.name}`;
    const payload = {
      name: landingName,
      email: formData.email || null,
      phone_number: formData.mobile,
      message: formData.message || null,
      course_id: formData.course || null,
    };
    try {
      await createAppoinmentRequest(payload);
      toast.success("Application submitted successfully!");
      setFormData(initialFormData);
    } catch (error: any) {
      const response = error?.response;
      if (response) {
        if (response.status === 409) {
          toast.error(
            response.data?.message || "Duplicate application detected."
          );
        } else {
          toast.error(response.data?.message || "Submission failed.");
        }
        console.error("Application error:", response.data || error);
      } else {
        toast.error("Submission failed.");
        console.error("Application error:", error);
      }
    }
  };

  return (
    <div data-section>
      <div className="bg-blue-custom grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1.5fr_1fr] sm:h-[calc(100vh-80px)]">
        <div className="border-b sm:border-b-0 sm:border-r border-grey-custom h-full min-h-[300px] relative">
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
            <InputField
              type="text"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              type="tel"
              label="Mobile number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            <SelectField
              label="Course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              options={courseOptions.map((course) => ({
                value: String(course.id),
                label: course.title,
              }))}
            />
            <TextAreaField
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={2}
            />
            <CheckboxField
              label="By submitting this form, I agree to Sri Maniya Institute’s Terms & Conditions and Privacy Policy."
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <div className="block text-end mt-4">
              <div className="flex justify-end ml-auto">
                <button
                  type="submit"
                  className="relative flex justify-center items-center rounded-full overflow-hidden cursor-pointer border border-yellow-custom group transition-all duration-300 min-w-[110px]"
                >
                  <span className="relative z-20 text-center no-underline w-full px-2 py-1 text-[#FFCE54] text-base transition-all duration-300 group-hover:text-[#0B2351]">
                    Submit
                  </span>
                  <span className="absolute left-0 top-0 w-full h-0 bg-yellow-custom transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
