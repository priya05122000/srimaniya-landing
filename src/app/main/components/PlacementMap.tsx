"use client";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import Section from "@/components/Section";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { getAllCountries } from "@/services/countriesService";
import { ANIMATIONS } from "@/components/Animations";

type Placement = {
  flag_img: string;
  max_ctc: string;
  name: string;
  placement_count: string;
};

const formatCTC = (ctc: string) => {
  if (!ctc) return "";
  // Remove trailing .00 if present
  if (ctc.endsWith(".00")) {
    return ctc.slice(0, -3);
  }
  return ctc;
};

const PlacementCard: React.FC<Placement> = ({
  flag_img,
  max_ctc,
  name,
  placement_count,
}) => (
  <div className="flex items-center space-x-4 px-4 py-4 sm:py-8 hover:shadow-sm transition-shadow ">
    <div className="w-32 h-14 relative shrink-0">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${flag_img}`}
        alt={name}
        fill
        className=" object-contain"
      />
    </div>
    <div>
      <Paragraph size="lg" className="text-xl font-bold text-blue-custom">
        {name}
      </Paragraph>
      {max_ctc && (
        <Paragraph className="text-gray-600">
          {formatCTC(max_ctc)} CTC
        </Paragraph>
      )}
      {placement_count && (
        <Paragraph className="text-gray-600">
          {placement_count} + students placed
        </Paragraph>
      )}
    </div>
  </div>
);

const PlacementMap = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [placements, setPlacements] = useState<Placement[]>([]);


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const results = await getAllCountries();
        const data = results.data;
        setPlacements(data);
      } catch (error: unknown) {
        if (typeof error === "object" && error !== null && "message" in error) {
          console.error(
            (error as { message?: string }).message ||
              "Failed to fetch countries"
          );
        } else {
          console.error("Failed to fetch countries");
        }
      }
    };
    fetchCountries();
  }, []);

  return (
    <div className=" py-10 lg:py-16">
      <Section ref={sectionRef}>
        <div>
          <Paragraph
            size="lg"
            className="text-blue-custom text-center font-bold placement-title"
            {...ANIMATIONS.fadeZoomIn}
          >
            Our Placement
          </Paragraph>
          <Heading
            level={4}
            className="text-blue-custom text-center uppercase mt-2 connecting-title"
            {...ANIMATIONS.zoomIn}
          >
            Connecting Talent to <br /> Global Brands
          </Heading>
        </div>
        <div className=" grid grid-cols-1">
          <div className="hero-content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-col justify-center sm:justify-center pt-10 sm:pt-16  text-white-custom ">
            {placements.map((placement, idx) => (
              <PlacementCard key={idx} {...placement} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PlacementMap;
