"use client";
import React from "react";
import Heading from "@/components/Heading";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Section from "@/components/Section";
import Paragraph from "@/components/Paragraph";
import "swiper/css";
import "swiper/css/navigation";
import { getAllAlumniStories } from "@/services/alumniStoryService";
import Span from "@/components/Span";
import Image from "next/image";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import { ANIMATIONS } from "@/components/Animations";

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

const ITEMS_PER_PAGE = 12;

function formatSalary(salary?: string): string | null {
  if (!salary || salary === "0" || salary === "0.00") return null;
  return salary.endsWith(".00") ? salary.slice(0, -3) : salary;
}

interface NavigationState {
  prevEl: HTMLElement | null;
  nextEl: HTMLElement | null;
}

const StudentCard: React.FC<{ placement: Placement }> = ({ placement }) => (
  <div className="placement relative h-[220px] sm:h-[200px] flex flex-row bg-blue-custom shadow-[15px_15px_60px_rgba(0,0,0,0.01)] p-4 overflow-hidden">
    <div className="relative w-[250px] h-full">
      <Image
        src={
          placement.photo_url
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${placement.photo_url}`
            : "/images/profile.webp"
        }
        className="absolute top-0 left-0 w-full h-full object-cover object-top"
        alt={placement.name}
        width={300}
        height={150}
        style={{ objectFit: "cover" }}
        unoptimized
      />
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
          <b>Placement :</b> {placement.designation}
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

const FullTimePlacement: React.FC = () => {
  const fullSectionRef = useRef<HTMLDivElement | null>(null);
  const [placementData, setPlacementData] = useState<Placement[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [navigation, setNavigation] = useState<NavigationState>({
    prevEl: null,
    nextEl: null,
  });



  useEffect(() => {
    const fetchPlacement = async () => {
      try {
        const res = await getAllAlumniStories();
        const data: Placement[] = res?.data ?? [];
        setPlacementData(data.filter((story) => story?.status));
      } catch (err) {
        console.error("Failed to fetch placement stories:", err);
      }
    };
    fetchPlacement();
  }, []);

  const paginatedData = placementData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div ref={fullSectionRef} className="">
      <Section >
        <Heading
          level={4}
          className="text-blue-custom uppercase mb-10 text-center block placed-students-info"
          {...ANIMATIONS.zoomIn}
        >
          Full Time Placements
        </Heading>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={3}
          loop={true}
          grabCursor={true}
          navigation={navigation}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 }, // mobile
            640: { slidesPerView: 2 }, // tablet
            1024: { slidesPerView: 2 }, // desktop
            1280: { slidesPerView: 3 }, // large desktop
          }}
        >
          {paginatedData.map((placement) => (
            <SwiperSlide key={placement.id}>
              <StudentCard placement={placement} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Navigation Buttons */}
        <div className="flex flex-col items-end mt-4">
          <Span className="text-blue-custom">Prev/Nxt</Span>
          <div className="flex items-center space-x-4 mt-2">
            <button
              ref={(node) => {
                if (node && navigation.prevEl !== node)
                  setNavigation((nav) => ({ ...nav, prevEl: node }));
              }}
              className="text-2xl text-blue-custom focus:outline-none cursor-pointer"
              aria-label="Previous"
              type="button"
            >
              <CgArrowLongLeft />
            </button>
            <button
              ref={(node) => {
                if (node && navigation.nextEl !== node)
                  setNavigation((nav) => ({ ...nav, nextEl: node }));
              }}
              className="text-2xl text-blue-custom focus:outline-none cursor-pointer"
              aria-label="Next"
              type="button"
            >
              <CgArrowLongRight />
            </button>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default FullTimePlacement;
