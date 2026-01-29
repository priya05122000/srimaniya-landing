"use client";

import React, { FC, ReactNode, useState, useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import CollapsibleHTML from "@/components/CollapsibleHTML"; // ✅ added

import { ScrollSmoother } from "gsap/ScrollSmoother";
import { GoDownload } from "react-icons/go";
import { getAllCourses } from "@/services/courseService";

interface Course {
  id: number;
  title: string;
  duration: string;
  description: string;
  opportunities: string;
  eligibility: string;
  syllabus: string;
}

interface CourseRowProps {
  label: string;
  children?: ReactNode;
  highlight?: boolean;
  id?: number | string;
  title?: string;
  duration?: string;
}

const CourseRow: FC<CourseRowProps> = ({
  label,
  children,
  highlight = false,
  id,
  title,
  duration,
}) => (
  <tr className="align-top">
    <td className="pr-4 flex items-start gap-2 md:pr-10 xl:pr-20 py-10 w-full sm:w-[260px] min-w-[180px]">
      <hr className="border-grey-custom w-12 mt-4 hidden md:block" />
      {highlight && id !== undefined ? (
        <>
          <Heading level={5} className="text-dark-custom">
            {id.toString().padStart(2, "0")}
          </Heading>
          <Paragraph
            size="xl"
            className="text-dark-custom font-bold pt-1 md:pt-2"
          >
            Course
          </Paragraph>
        </>
      ) : (
        <Paragraph size="xl" className="text-dark-custom font-bold">
          {label}
        </Paragraph>
      )}
    </td>
    <td className="text-dark-custom pl-8 pb-5 border-l border-grey-custom py-10">
      {highlight && title && duration ? (
        <Heading level={6} className="text-dark-custom md:w-[75%] xl:w-[70%]">
          {title}
          <span className="text-grey-light-custom text-xl font-normal">
            &nbsp;- ({duration})
          </span>
        </Heading>
      ) : (
        children
      )}
    </td>
  </tr>
);

const MobileCourseRow: FC<CourseRowProps> = ({
  label,
  children,
  highlight = false,
  id,
  title,
  duration,
}) => (
  <div className="flex items-start gap-4 py-4">
    <div className="min-w-[110px] shrink-0 flex flex-col items-start">
      {highlight && id !== undefined ? (
        <div className="flex items-center gap-2">
          <Heading level={5} className="text-dark-custom">
            {id.toString().padStart(2, "0")}
          </Heading>
          <Paragraph size="xl" className="text-dark-custom font-bold">
            Course
          </Paragraph>
        </div>
      ) : (
        <Paragraph size="xl" className="text-dark-custom font-bold">
          {label}
        </Paragraph>
      )}
    </div>
    <div className="flex-1">
      {highlight && title && duration ? (
        <Heading level={6} className="text-dark-custom">
          {title}
          <span className="text-gray-500 text-base font-normal">
            &nbsp;- ({duration})
          </span>
        </Heading>
      ) : (
        children
      )}
    </div>
  </div>
);

const CourseList: FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;
    const targetId = searchParams.get("course");
    if (!targetId) return;

    const timer = setTimeout(() => {
      const targetElement = document.getElementById(`course-${targetId}`);
      if (!targetElement) return;

      if (window.innerWidth >= 768) {
        const smoother = ScrollSmoother.get();
        if (smoother) {
          smoother.scrollTo(targetElement, true, "top 80");
        } else {
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        const elementY =
          targetElement.getBoundingClientRect().top + window.scrollY;
        const headerOffset = 80;
        window.scrollTo({
          top: elementY - headerOffset,
          behavior: "smooth",
        });
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [courses, searchParams]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await getAllCourses();
        const data = result?.data;
        setCourses(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("Failed to fetch courses");
        }
      }
    };
    fetchCourses();
  }, []);

  return (
    <Section className="w-full relative">
      <div className="sm:pr-2">
        {courses.map((course, index) => (
          <div
            key={course.id}
            id={`course-${course.id}`}
            className="border-b border-grey-custom py-10 sm:py-0"
          >
            {/* Desktop Table View */}
            <table className="w-full hidden sm:block">
              <tbody>
                <CourseRow
                  label="Course"
                  highlight
                  id={String(index + 1).padStart(2, "0")}
                  title={course.title}
                  duration={course.duration}
                />
                <CourseRow label="Description">
                  <CollapsibleHTML html={course.description} maxHeight={200} />
                </CourseRow>
                <CourseRow label="Opportunity">
                  <CollapsibleHTML
                    html={course.opportunities}
                    maxHeight={200}
                  />
                </CourseRow>
                <CourseRow label="Eligibility">
                  <CollapsibleHTML html={course.eligibility} maxHeight={200} />
                </CourseRow>
                {course.syllabus && (
                  <CourseRow label="Syllabus">
                    <Link
                      href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${course.syllabus}`}
                      target="_blank"
                      download
                    >
                      <button className="relative flex justify-center items-center gap-1 rounded-full bg-transparent overflow-hidden cursor-pointer border border-blue-custom group transition-all duration-300 px-3 py-1">
                        <span className="relative gap-x-1 z-20 flex items-center text-center no-underline w-full text-[#0b2351] text-base transition-all duration-300 group-hover:text-[#ffffff]">
                          Syllabus <GoDownload />
                        </span>
                        <span className="absolute left-0 top-0 w-full h-0 bg-blue-custom transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                      </button>
                    </Link>
                  </CourseRow>
                )}
              </tbody>
            </table>

            {/* Mobile View */}
            <div className="block sm:hidden overflow-visible">
              <MobileCourseRow
                label="Course"
                highlight
                id={String(index + 1).padStart(2, "0")}
                title={course.title}
                duration={course.duration}
              />
              <MobileCourseRow label="Description">
                <CollapsibleHTML html={course.description} maxHeight={200} />
              </MobileCourseRow>
              <MobileCourseRow label="Opportunity">
                <CollapsibleHTML html={course.opportunities} maxHeight={200} />
              </MobileCourseRow>
              <MobileCourseRow label="Eligibility">
                <CollapsibleHTML html={course.eligibility} maxHeight={200} />
              </MobileCourseRow>
              {course.syllabus && (
                <MobileCourseRow label="Syllabus">
                  <Link
                    href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${course.syllabus}`}
                    target="_blank"
                    download
                  >
                    <button className="relative flex justify-center items-center gap-1 rounded-full bg-transparent overflow-hidden cursor-pointer border border-blue-custom group transition-all duration-300 px-3 py-1">
                      <span className="relative gap-x-1 z-20 flex items-center text-center no-underline w-full text-[#0b2351] text-base transition-all duration-300 group-hover:text-[#ffffff]">
                        Syllabus <GoDownload />
                      </span>
                      <span className="absolute left-0 top-0 w-full h-0 bg-blue-custom transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                    </button>
                  </Link>
                </MobileCourseRow>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default CourseList;
