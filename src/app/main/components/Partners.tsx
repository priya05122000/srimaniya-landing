"use client";

import React, { useEffect, useRef, useState, useContext } from "react";
import { Splide } from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/css";
import Image from "next/image";
import { getAllPartners } from "@/services/partnerService";
import Section from "@/components/Section";
import Paragraph from "@/components/Paragraph";
import Heading from "@/components/Heading";
import { ANIMATIONS } from "@/components/Animations";

interface Partner {
  logo_url: string;
  name: string;
  website_url: string;
}

const Partners = () => {
  const splideRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    if (!splideRef.current) return;
    const splide = new Splide(splideRef.current, {
      type: "loop",
      drag: "free",
      focus: "center",
      pagination: false,
      arrows: false,
      gap: "2rem",
      perPage: 6,
      autoScroll: {
        speed: 2,
        pauseOnHover: false,
        pauseOnFocus: false,
      },
      breakpoints: {
        1024: { perPage: 4 },
        768: { perPage: 3 },
        320: { perPage: 2 },
      },
    });
    splide.mount({ AutoScroll });
    return () => {
      splide.destroy();
    };
  }, [partners]);

  return (
    <div className="partners-bg py-10 lg:py-16">
      <Section ref={sectionRef} className="">
        <div>
          <Paragraph
            size="base"
            className="text-blue-custom font-bold partners-title text-center"
            {...ANIMATIONS.fadeZoomIn}
          >
            Recruitment Partners
          </Paragraph>
          <Heading
            level={4}
            {...ANIMATIONS.zoomIn}
            className="text-blue-custom uppercase mt-2 partners-explore-title text-center"
          >
            Explore Our <br /> Placement Partners
          </Heading>

          <div className="brands_list-wrapper relative overflow-hidden mt-10">
            <div className=" pointer-events-none absolute top-0 left-0 w-full h-full z-2 bg-[linear-gradient(to_right,#EEECEA_0%,rgba(255,255,255,0)_10%,rgba(255,255,255,0)_90%,#EEECEA_100%)]" />

            <div className="splide " ref={splideRef}>
              <div className="splide__track">
                <ul className="splide__list">
                  {partners.map((partner, index) => (
                    <li
                      className="splide__slide bg-white-custom h-32   flex items-center justify-center"
                      key={index}
                    >
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${partner.logo_url}`}
                        alt={partner.name}
                        width={200}
                        height={100}
                        className="object-contain cursor-pointer h-full "
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Partners;
