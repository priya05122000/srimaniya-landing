"use client";

import React, { useEffect, useState } from "react";
interface Course {
  id: number;
  title: string;
  duration?: string;
  category?: string;
}
import { getAllCourses } from "@/services/courseService";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Paragraph from "@/components/Paragraph";
import Link from "next/link";
import ParagraphList from "@/components/ParagraphList";


const Table = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await getAllCourses();
        const data = result.data;
        setCourses(data);
      } catch (error: unknown) {
        if (error && typeof error === "object" && "message" in error) {
          console.error(
            (error as { message?: string }).message || "Failed to fetch courses"
          );
        } else {
          console.error("Failed to fetch courses");
        }
      }
    };

    fetchCourses();
  }, []);
  // Filter courses by category
  const diplomaCourses = courses.filter(
    (c) => c.category?.toLowerCase() === "diploma"
  );
  const pathwayCourses = courses.filter(
    (c) => c.category?.toLowerCase() === "pathway course"
  );
  const degreeCourses = courses.filter(
    (c) => c.category?.toLowerCase() === "degree course"
  );
  const postGraduateCourses = courses.filter(
    (c) => c.category?.toLowerCase() === "post grade course"
  );

  return (
    <Section className="my-10 sm:my-16 py-8 bg-blue-custom">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="md:border-r border-b lg:border-b-0 border-grey-custom px-0 md:px-6 py-4 md:py-2 lg:py-0">
          <Heading level={6} className="text-white py-4">
            Diploma Courses
          </Heading>
          {diplomaCourses.length === 0 ? (
            <Paragraph size="lg" className="text-gray-300">
              No courses found.
            </Paragraph>
          ) : (
            <ParagraphList size="base" className="list-square">
              {diplomaCourses.map((course) => (
                <li key={course.id}>
                  <Link
                    href={`/courses?course=${course.id}`}
                    className="cursor-pointer"
                  >
                    {course.title}
                  </Link>
                  {course.duration && (
                    <span className="text-xs text-gray-400">
                      {" "}
                      ({course.duration})
                    </span>
                  )}
                </li>
              ))}
            </ParagraphList>
          )}
        </div>
        <div className="border-b lg:border-b-0 lg:border-r border-grey-custom px-0 md:px-6 py-4 md:py-0">
          <Heading level={6} className="text-white py-4">
            Pathway Course
          </Heading>
          {pathwayCourses.length === 0 ? (
            <Paragraph size="lg" className="text-gray-300">
              No courses found.
            </Paragraph>
          ) : (
            <ParagraphList size="base" className="list-square">
              {pathwayCourses.map((course) => (
                <li key={course.id}>
                  <Link
                    href={`/courses?course=${course.id}`}
                    className="cursor-pointer"
                  >
                    {course.title}
                  </Link>
                  {course.duration && (
                    <span className="text-xs text-gray-400">
                      {" "}
                      ({course.duration})
                    </span>
                  )}
                </li>
              ))}
            </ParagraphList>
          )}
        </div>
        <div className="md:border-r border-b md:border-b-0 lg:border-r border-grey-custom px-0 md:px-6 py-4 md:py-0">
          <Heading level={6} className="text-white py-4">
            Degree Course
          </Heading>
          {degreeCourses.length === 0 ? (
            <Paragraph size="lg" className="text-gray-300">
              No courses found.
            </Paragraph>
          ) : (
            <ParagraphList size="base" className="list-square">
              {degreeCourses.map((course) => (
                <li key={course.id}>
                  <Link
                    href={`/courses?course=${course.id}`}
                    className="cursor-pointer"
                  >
                    {course.title}
                  </Link>
                  {course.duration && (
                    <span className="text-xs text-gray-400">
                      {" "}
                      ({course.duration})
                    </span>
                  )}
                </li>
              ))}
            </ParagraphList>
          )}
        </div>
        <div className="px-0 md:px-6 py-4 md:py-0">
          <Heading level={6} className="text-white py-4">
            Post Grade Course
          </Heading>
          {postGraduateCourses.length === 0 ? (
            <Paragraph size="lg" className="text-gray-300">
              No courses found.
            </Paragraph>
          ) : (
            <ParagraphList size="base" className="list-square">
              {postGraduateCourses.map((course) => (
                <li key={course.id}>
                  <Link
                    href={`/courses?course=${course.id}`}
                    className="cursor-pointer"
                  >
                    {course.title}
                  </Link>
                  {course.duration && (
                    <span className="text-xs text-gray-400">
                      {" "}
                      ({course.duration})
                    </span>
                  )}
                </li>
              ))}
            </ParagraphList>
          )}
        </div>
      </div>
    </Section>
  );
};

export default Table;
