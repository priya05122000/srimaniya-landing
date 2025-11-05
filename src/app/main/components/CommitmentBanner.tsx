"use client";
import React, { useEffect, useRef } from "react";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import Image from "next/image";
import { ANIMATIONS } from "@/components/Animations";

// Feature type for reusability
export type Feature = {
  number: string;
  title: string;
};

export const features: Feature[] = [
  { number: "01", title: "Internship from Day 1 with stipend" },
  { number: "02", title: "100% Placement Support" },
  { number: "03", title: "Affordable Fees with Flexible Payment Options" },
  { number: "04", title: "Strong Hotel Legacy Since 1984- career opportunity" },
];

const CommitmentBanner: React.FC = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const velocityRef = useRef(0.2); // base rotation speed (deg per frame)
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let rotation = rotationRef.current;
    let velocity = velocityRef.current;
    let lastRenderedRotation: number | null = null;

    const animate = () => {
      rotation += velocity;
      // Only update DOM if rotation changed enough (1 deg threshold)
      if (
        logoRef.current &&
        (lastRenderedRotation === null ||
          Math.abs(rotation - lastRenderedRotation) > 1)
      ) {
        logoRef.current.style.transform = `rotate(${rotation}deg)`;
        lastRenderedRotation = rotation;
      }
      // Limit velocity to prevent excessive speed
      velocity = Math.max(Math.min(velocity + (1 - velocity) * 0.05, 5), -5);
      rotationRef.current = rotation;
      velocityRef.current = velocity;
      requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      velocity += delta * 0.03;
      // Clamp velocity
      velocity = Math.max(Math.min(velocity, 5), -5);
      velocityRef.current = velocity;
      lastScrollY = currentScrollY;
    };

    requestAnimationFrame(animate);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full   relative mb-15 sm:mb-10 mt-10 sm:mt-16 lg:mb-30 flex flex-col"
      id="section3"
    >
      <div
        className="bg-blue-custom px-6 sm:px-8 py-10 flex flex-col items-end"
        data-section
      >
        <Heading
          level={4}
          className="text-white-custom text-right leading-tight commitment-title uppercase"
          {...ANIMATIONS.zoomInLeft}
        >
          Our commitment to build your trust
        </Heading>
        <Paragraph size="lg" className="msg-text-scroll"  {...ANIMATIONS.fadeZoomIn}>
          The Srimaniya Guarantee
        </Paragraph>
      </div>
      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 flex-1 min-h-[60vh] sm:min-h-[400px] xl:min-h-[420px]">
        {features.map((feature, idx) => (
          <div
            key={feature.number}
            className="flex flex-col justify-end items-end bg-cover bg-center relative min-h-[200px] sm:min-h-[250px] overflow-hidden group"
            style={{
              backgroundImage: `url('/images/commitment-bg-${idx + 1}.webp')`,
            }}
          >
            <div className="absolute inset-0 z-0 transition-all duration-300 group-hover:opacity-0 lg:backdrop-blur-xs" />
            <div className="absolute inset-0 z-20 pointer-events-none transition-all duration-300 group-hover:opacity-0 bg-no-repeat bg-[url('/designs/noise.svg')] bg-cover" />
            <div className="relative z-30 flex flex-col items-end justify-start h-full p-6 sm:p-8 gap-4 text-[#FBFFFA] w-10/12 lg:w-2/3 group">
              <div className="transition-all duration-300 ease-in-out  rounded-lg ">
                <Heading
                  level={5}
                  className="mb-1 font-semibold transition-colors duration-300 ease-in-out  bg-[#0B2351] p-2"
                >
                  {feature.number}
                </Heading>
              </div>
              <div className="transition-all duration-300 ease-in-out  rounded-lg ">
                <Heading
                  level={6}
                  className="text-end font-semibold leading-snug transition-colors duration-300 ease-in-out group-hover:text-[#ffffff]  px-2 py-1 group-hover:backdrop-blur-md group-hover:bg-white/6 group-hover:drop-shadow-2xl group-hover:text-shadow-lg"
                >
                  {feature.title}
                </Heading>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-6 sm:left-8 lg:left-1/6 translate-x-0 translate-y-1/2 z-30">
        <div className="relative w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 flex items-center justify-center">
          <div
            ref={logoRef}
            id="rotating-logo"
            className="absolute inset-0 will-change-transform"
          >
            <Image
              src="/designs/rotate.svg"
              alt="Rotating Ring"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Image
              src="/logos/sri-maniya-institute-logo.png"
              alt="Sri Maniya Institute"
              width={120}
              height={120}
              className="object-contain w-10 h-10 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitmentBanner;
