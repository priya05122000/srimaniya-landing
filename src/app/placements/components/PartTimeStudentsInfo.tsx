"use client";
import Heading from "@/components/Heading";
import React, { useState, useContext } from "react";
import { useRef } from "react";
import Section from "@/components/Section";
import Paragraph from "@/components/Paragraph";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { getAllPlacements } from "@/services/placementService";
import Span from "@/components/Span";
import Image from "next/image";
import { ANIMATIONS } from "@/components/Animations";
import { LoadingContext } from "@/components/LoadingContext";

type Placement = {
  id: string;
  name: string;
  course: string;
  designation: string;
  company: string;
  location: string;
  salary: string;
  batch_year: string;
  profile_photo: string;
  status?: boolean;
};

const PartTimeStudentsInfo = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [placementData, setPlacementData] = useState<Placement[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Change as needed

  const { setLoading } = useContext(LoadingContext);


  useEffect(() => {
    const fetchPlacement = async () => {
      setLoading(true);
      try {
        const res = await getAllPlacements();
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

  // Pagination logic
  const totalPages = Math.ceil(placementData.length / itemsPerPage);
  const paginatedData = placementData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatSalary = (salary?: string) => {
    if (!salary || salary === "0" || salary === "0.00") return null;
    if (salary.endsWith(".00")) return salary.slice(0, -3);
    return salary;
  };
  return (
    <div ref={sectionRef} className="bg-blue-custom" data-section>
      <Section className="py-20 overflow-hidden">
        <Heading
          level={4}
          className="text-white-custom text-center uppercase " {...ANIMATIONS.zoomIn}
        >
          Part Time Placements
        </Heading>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 py-10">
          {paginatedData.map((placement, idx) => (
            <div
              key={idx}
              className="placement relative h-[220px] sm:h-[200px] flex  flex-row bg-white-custom shadow-[15px_15px_60px_rgba(0,0,0,0.01)] p-4 overflow-hidden"
            >
              <div className=" relative w-[250px] h-full">
                {placement.profile_photo ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${placement.profile_photo}`}
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
              <div className=" w-full flex flex-col justify-center items-start px-4">
                <div className="top flex justify-center">
                  <div className="userDetails flex flex-col">
                    <Paragraph
                      size="lg"
                      className="text-dark-custom leading-[1em] uppercase font-bold"
                    >
                      {placement.name.length > 15
                        ? placement.name.slice(0, 15) + "..."
                        : placement.name}
                    </Paragraph>
                  </div>
                </div>
                <div>
                  <Span className="message  text-dark-custom capitalize">
                    {placement.company}
                  </Span>
                </div>
                <div className="mt-2">
                  <Span className="message  text-dark-custom">
                    <b>Placement :</b> {placement.designation}
                  </Span>
                </div>
                <div>
                  <Span className="message text-dark-custom">
                    <b>Course : </b> {placement.course}
                    {placement.batch_year && `( ${placement.batch_year} )`}
                  </Span>
                </div>

                {formatSalary(placement.salary) && (
                  <div>
                    <Span className="message text-dark-custom">
                      <b>Salary : </b> Rs. {formatSalary(placement.salary)}
                    </Span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-end items-center gap-4 mt-4">
          <button
            className="px-3 py-1 bg-white-custom cursor-pointer  text-blue-custom"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <Span className="text-white-custom">
            Page {currentPage} of {totalPages}
          </Span>
          <button
            className="px-3 py-1 bg-white-custom cursor-pointer  text-blue-custom"
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

export default PartTimeStudentsInfo;
