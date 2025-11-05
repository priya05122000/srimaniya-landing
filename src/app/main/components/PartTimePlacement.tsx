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
import { getAllPlacements } from "@/services/placementService";
import Span from "@/components/Span";
import Image from "next/image";
import { CgArrowLongLeft, CgArrowLongRight } from "react-icons/cg";
import { ANIMATIONS } from "@/components/Animations";

export type Placement = {
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

const ITEMS_PER_PAGE = 12;

function formatSalary(salary?: string): string | null {
  if (!salary || salary === "0" || salary === "0.00") return null;
  return salary.endsWith(".00") ? salary.slice(0, -3) : salary;
}

interface NavigationState {
  prevEl: HTMLElement | null;
  nextEl: HTMLElement | null;
}

const PlacementCard: React.FC<{ placement: Placement }> = ({ placement }) => (
  <div className="placement relative h-[220px] sm:h-[200px] flex flex-row bg-white-custom shadow-[15px_15px_60px_rgba(0,0,0,0.01)] p-4 overflow-hidden">
    <div className="relative w-[250px] h-full">
      <Image
        src={
          placement.profile_photo
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${placement.profile_photo}`
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
);

const PartTimePlacement: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [placementData, setPlacementData] = useState<Placement[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [navigation, setNavigation] = useState<NavigationState>({
    prevEl: null,
    nextEl: null,
  });


  useEffect(() => {
    async function fetchPlacement() {
      try {
        const res = await getAllPlacements();
        const data: Placement[] = res?.data ?? [];
        setPlacementData(data.filter((story) => story?.status));
      } catch (err) {
        console.error("Failed to fetch placement stories:", err);
      }
    }
    fetchPlacement();
  }, []);

  const paginatedData = placementData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div ref={sectionRef} className="bg-blue-custom my-10 sm:my-16" data-section>
      <Section className="py-10 overflow-hidden">
        <Heading
          level={4}
          className="text-white-custom uppercase mb-10 text-center block placed-students-info"
          {...ANIMATIONS.zoomIn}
        >
          Part Time Placements
        </Heading>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={3}
          loop
          grabCursor
          navigation={navigation}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="py-10"
        >
          {paginatedData.map((placement) => (
            <SwiperSlide key={placement.id}>
              <PlacementCard placement={placement} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Navigation Buttons */}
        <div className="flex flex-col items-end mt-4">
          <Span className="text-white-custom">Prev/Nxt</Span>
          <div className="flex items-center space-x-4 mt-2">
            <button
              ref={(node) => {
                if (node && navigation.prevEl !== node)
                  setNavigation((nav) => ({ ...nav, prevEl: node }));
              }}
              className="text-2xl text-white-custom focus:outline-none cursor-pointer"
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
              className="text-2xl text-white-custom focus:outline-none cursor-pointer"
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

export default PartTimePlacement;
