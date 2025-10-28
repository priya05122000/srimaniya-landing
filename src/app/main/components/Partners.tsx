"use client";

import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import Section from "@/components/Section";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import { getAllPartners } from "@/services/partnerService";

interface Partner {
  logo_url: string;
  name: string;
  website_url: string;
}
const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useSplitTextHeadingAnimation({
    trigger: sectionRef,
    first: ".partners-title",
    second: ".partners-explore-title",
  });

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

  const scrollingPartners = [...partners, ...partners];

  const handleClick = (url: string) => () => {
    window.open(url, "_blank");
  };

  return (
    <div className="partners-bg">
      <Section ref={sectionRef} className="py-20">
        <div>
          <Paragraph
            size="base"
            className="text-blue-custom font-bold partners-title text-center"
          >
            Recruitment Partners
          </Paragraph>
          <Heading
            level={4}
            className="text-blue-custom uppercase mt-2 partners-explore-title text-center"
          >
            Explore Our <br /> Placement Partners
          </Heading>

          <div className="brands_list-wrapper relative overflow-hidden my-10">
            <div className="marquee-fade pointer-events-none absolute top-0 left-0 w-full h-full z-2" />

            <div className="animate-marquee flex cursor-grab">
              {scrollingPartners.map((partner, i) => (
                <div className="p-4 shrink-0" key={i}>
                  <div className="bg-white-custom p-2 w-32 sm:w-48 h-32 flex items-center justify-center">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${partner.logo_url}`}
                      alt={partner.name}
                      className="object-contain h-full w-auto"
                      loading="lazy"
                      width={120}
                      height={120}
                      onClick={handleClick(partner.website_url)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Partners;
