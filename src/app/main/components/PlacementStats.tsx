"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Heading from "@/components/Heading";
import Section from "@/components/Section";
import Paragraph from "@/components/Paragraph";

// Types
interface Stat {
  value: string;
  label: string;
}

// 🔹 Animated Odometer Number
interface OdometerNumberProps {
  value: number;
}

const OdometerNumber: React.FC<OdometerNumberProps> = ({ value }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const digitHeight =
      wrapperRef.current.querySelector(".digit-span")?.clientHeight || 24;

    const digits = value.toString().split("");

    digits.forEach((digit, i) => {
      const digitContainer = wrapperRef.current?.children[i] as HTMLElement;
      const digitColumn = digitContainer?.querySelector(
        ".digit-column"
      ) as HTMLElement;
      if (!digitColumn) return;

      gsap.set(digitColumn, { y: 0 });
      gsap.to(digitColumn, {
        y: -Number(digit) * digitHeight,
        duration: 2,
        delay: i * 0.15,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 90%",
          once: false,
        },
      });
    });
  }, [value]);

  return (
    <div ref={wrapperRef} className="flex overflow-hidden tabular-nums">
      {value
        .toString()
        .split("")
        .map((_, idx) => (
          <div
            key={idx}
            className="h-[1em] overflow-hidden relative"
            style={{ lineHeight: "1em", minWidth: "0.6em" }}
          >
            <div className="digit-column flex flex-col">
              {Array.from({ length: 10 }, (_, n) => (
                <span
                  key={n}
                  className="digit-span block h-[1em] leading-[1em]"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

// 🔹 Main Component
const PlacementStats: React.FC = () => {
  // Static stats
  const stats: Stat[] = [
    { value: "750", label: "Placements" },
    { value: "250", label: "Placement Partners" },
    { value: "400", label: "Part Time Placements" },
    { value: "2000", label: "Alumni" },
  ];

  return (
    <Section>
      <div className=" my-10 sm:my-16 py-2 bg-blue-custom" data-section>
        <div className="grid grid-cols-1 lg:gap-8 message-content">
          <div className="flex flex-col sm:flex-row justify-evenly text-white-custom gap-6 sm:gap-2 py-4 sm:py-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center lg:py-6">
                <Heading level={3} className="hidden sm:flex justify-center">
                  <span className="flex items-baseline">
                    <OdometerNumber value={parseInt(stat.value)} />
                    <span className="ml-1">+</span>
                  </span>
                </Heading>
                <Heading level={6} className="flex sm:hidden justify-center">
                  <span className="flex items-baseline">
                    <OdometerNumber value={parseInt(stat.value)} />
                    <span className="ml-1">+</span>
                  </span>
                </Heading>
                <Paragraph
                  size="xl"
                  className="font-normal hidden sm:block text-center"
                >
                  {stat.label}
                </Paragraph>
                <Paragraph
                  size="lg"
                  className="font-normal block sm:hidden text-center"
                >
                  {stat.label}
                </Paragraph>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default PlacementStats;
