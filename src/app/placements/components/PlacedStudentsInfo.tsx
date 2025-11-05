"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Paragraph from "@/components/Paragraph";
import Span from "@/components/Span";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { getAllAlumniStories } from "@/services/alumniStoryService";
import { LoadingContext } from "@/components/LoadingContext";
import { ANIMATIONS } from "@/components/Animations";
// import { ANIMATIONS } from "@/components/Animations";

// Placement type for reuse
export type Placement = {
  id: string;
  name: string;
  course: string;
  batch_year: string;
  company: string;
  location: string;
  designation: string;
  salary: string;
  photo_url: string;
  status?: boolean;
};

// Pagination hook for reuse
function usePagination<T>(data: T[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return { currentPage, setCurrentPage, totalPages, paginatedData };
}

// Student Card component for reuse
const StudentCard: React.FC<{ placement: Placement }> = ({ placement }) => {
  const formatSalary = (salary?: string) => {
    if (!salary || salary === "0" || salary === "0.00") return null;
    if (salary.endsWith(".00")) return salary.slice(0, -3);
    return salary;
  };

  return (
    <div className="placement relative h-[220px] sm:h-[200px] flex flex-row bg-blue-custom shadow-[15px_15px_60px_rgba(0,0,0,0.01)] p-4 overflow-hidden">
      <div className="relative w-[250px] h-full">
        {/* <Image
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${placement.photo_url}`}
          className="absolute top-0 left-0 w-full h-full object-cover object-top"
          alt={placement.name}
          width={300}
          height={150}
          style={{ objectFit: "cover" }}
          unoptimized
        /> */}

        {placement.photo_url ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${placement.photo_url}`}
            className="absolute top-0 left-0 w-full h-full object-cover object-top"
            alt={placement.name}
            width={300}
            height={150}
            style={{ objectFit: "cover" }}
            unoptimized
          />
        ) : (
          <Image
            src="/images/profile.webp"
            className="absolute top-0 left-0 w-full h-full object-cover object-top"
            alt={placement.name}
            width={300}
            height={150}
            style={{ objectFit: "cover" }}
            unoptimized
          />
        )}
      </div>
      <div className="w-full flex flex-col justify-center items-start px-4">
        <div className="top flex justify-center">
          <div className="userDetails flex flex-col">
            <Paragraph
              size="lg"
              className="text-white-custom leading-[1em] uppercase font-bold"
            >
              {placement.name.length > 15
                ? placement.name.slice(0, 15) + "..."
                : placement.name}
            </Paragraph>
          </div>
        </div>
        <div>
          <Span className="message  text-white-custom capitalize">
            {placement.company}
          </Span>
        </div>
        <div className="mt-2">
          <Span className="message  text-white-custom">
            <b>Placement : </b> {placement.designation}
          </Span>
        </div>
        <div>
          <Span className="message text-white-custom">
            <b>Course : </b> {placement.course}
            {placement.batch_year && `( ${placement.batch_year} )`}
          </Span>
        </div>

        {formatSalary(placement.salary) && (
          <div>
            <Span className="message text-white-custom">
              <b>Salary : </b> Rs. {formatSalary(placement.salary)}
            </Span>
          </div>
        )}

       
      </div>
    </div>
  );
};

const PlacedStudentsInfo: React.FC = () => {
  const fullSectionRef = useRef<HTMLDivElement | null>(null);
  const [placementData, setPlacementData] = useState<Placement[]>([]);
  const itemsPerPage = 12;
  const { setLoading } = useContext(LoadingContext);


  useEffect(() => {
    const fetchPlacement = async () => {
      setLoading(true);
      try {
        const res = await getAllAlumniStories();
        const data: Placement[] = res?.data ?? [];
        setPlacementData(data.filter((story) => story?.status));
      } catch (err) {
        console.error("Failed to fetch placement stories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlacement();
  }, [setLoading]);

  const { currentPage, setCurrentPage, totalPages, paginatedData } =
    usePagination(placementData, itemsPerPage);

  return (
    <div ref={fullSectionRef}>
      <Section className="py-10 sm:py-16">
        <Heading
          level={4}
          className="text-blue-custom text-center uppercase mt-2 block placed-students-info" {...ANIMATIONS.zoomIn}
        >
          Full Time Placements
        </Heading>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 py-10">
          {paginatedData.map((placement) => (
            <StudentCard key={placement.id} placement={placement} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-end items-center gap-4 mt-4">
          <button
            className="px-3 py-1 bg-white-custom cursor-pointer text-blue-custom"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <Span className="text-dark-custom">
            Page {currentPage} of {totalPages}
          </Span>
          <button
            className="px-3 py-1 bg-white-custom cursor-pointer text-blue-custom"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </Section>
    </div>
  );
};

export default PlacedStudentsInfo;
