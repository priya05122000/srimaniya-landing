"use client";
import Section from "@/components/Section";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Heading from "@/components/Heading";
import { ANIMATIONS } from "@/components/Animations";
import { getAllPartners } from "@/services/partnerService"; // import your API function

gsap.registerPlugin(ScrollTrigger);

interface Partner {
  logo_url: string;
  name: string;
  website_url: string;
}

const PartPlacementPartners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const result = await getAllPartners();
        setPartners(result?.data || []);
      } catch {
        setPartners([]);
      }
    };
    fetchPartners();
  }, []);

  const scrollingPartners = [...partners];
  
  // const handleClick = (url: string) => () => {
  //   window.open(url, "_blank");
  // };

  return (
    <div className="partners-bg" ref={sectionRef}>
      <Section className="py-20">
        <Heading
          level={4}
          className="mb-2 text-blue-custom text-center  uppercase our-recruitment-partners" {...ANIMATIONS.zoomIn}
        >
          Our recruitment partners
        </Heading>
        <div className="grid grid-cols-1 sm:gap-10 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-10 w-full h-auto">
            {scrollingPartners.map((partner, i) => (
              <div
                className="flex p-2 items-center justify-center bg-white-custom shadow-2xl border border-blue-custom"
                key={i}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${partner.logo_url}`}
                  alt={partner.name}
                  className="object-contain h-32 w-32 cursor-pointer"
                  loading="lazy"
                  width={120}
                  height={120}
                  // onClick={handleClick(partner.website_url)}
                />
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PartPlacementPartners;
