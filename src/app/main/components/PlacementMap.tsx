"use client";
import { ANIMATIONS } from "@/components/Animations";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import Section from "@/components/Section";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { getAllCountries } from "@/services/countriesService";

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
  <div className="flex items-center space-x-4 p-4 hover:shadow-sm transition-shadow">
    <div className="w-24 h-14 relative shrink-0">
      <Image
        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${flag_img}`}
        alt={name}
        fill
        className=" object-cover"
      />
    </div>
    <div>
      <Paragraph size="lg" className="text-xl font-bold text-blue-custom">
        {name}
      </Paragraph>
      {max_ctc && (
        <Paragraph {...ANIMATIONS.fadeZoomIn} className="text-gray-600">
          {formatCTC(max_ctc)} CTC
        </Paragraph>
      )}
      {placement_count && (
        <Paragraph {...ANIMATIONS.fadeZoomIn} className="text-gray-600">
          {placement_count} + students placed
        </Paragraph>
      )}
    </div>
  </div>
);

const PlacementMap = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [placements, setPlacements] = useState<Placement[]>([]);

  useSplitTextHeadingAnimation({
    trigger: sectionRef,
    first: ".placement-title",
    second: ".connecting-title",
  });

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
    <div className="space-y-10 pt-10 ">
      <Section ref={sectionRef}>
        <div>
          <Paragraph
            size="lg"
            className="text-blue-custom text-center font-bold placement-title"
          >
            Our Placement
          </Paragraph>
          <Heading
            level={4}
            className="text-blue-custom text-center uppercase mt-2 connecting-title"
          >
            Connecting Talent to <br /> Global Brands
          </Heading>
        </div>
        <div className=" grid grid-cols-1  my-10 ">
          {/* <div className="h-full  flex items-center min-h-[300px] relative">
            <Paragraph
              size="lg"
              className="mb-2 text-dark-custom w-[90%] xl:w-[85%]"
              {...ANIMATIONS.fadeZoomIn}
            >
              Every pin on this map is a destination for your talent. Each flag
              represents a renowned global partner where our graduates launch
              distinguished careers.
            </Paragraph>
          </div> */}
          <div className="hero-content grid grid-cols-4 flex-col justify-center sm:justify-center py-6 sm:py-8 text-white-custom min-h-[380px]">
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
