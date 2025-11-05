"use client";
import { ANIMATIONS } from "@/components/Animations";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import ParagraphList from "@/components/ParagraphList";
import Section from "@/components/Section";
import Image from "next/image";
import React, { useRef } from "react";

const ScholarContent = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="py-10 sm:py-16" ref={sectionRef}>
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <Paragraph
              size="lg"
              className="text-blue-custom font-bold facilities-title-main"
              {...ANIMATIONS.fadeZoomIn}
            >
              Sri Maniya Institute
            </Paragraph>
            <Heading
              level={4}
              className="text-blue-custom mt-2 uppercase facilities-title-sub"
              {...ANIMATIONS.zoomInRight}
            >
              Scholarship
            </Heading>
          </div>
          <div>
            <Paragraph size="lg" className="text-dark-custom">
              Sri Maniya Institute of Hotel Management offers a variety of
              scholarships, including Merit-Based Scholarships, Community-Based
              Scholarships, and College-Specific Scholarships to support and
              encourage deserving students.
            </Paragraph>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mt-16">
          <div>
            <Image
              src="/images/scholarship.jpeg"
              alt="Scholarship Banner"
              width={600}
              height={400}
              style={{ objectFit: "cover" }}
              className="w-full h-full"
            />
          </div>
          <div className="flex-col justify-center flex ">
            <div className="inline-block">
              <Paragraph
                size="lg"
                className="text-white-custom mt-2 mb-4 bg-blue-custom uppercase  font-bold p-2 inline-block"
              >
                SANCTIONED DURING ADMISSION (PROVIDED IN TERM II)
              </Paragraph>

              <ParagraphList size="lg" className="text-dark-custom">
                <li>
                  <strong>ST / SC STUDENTS</strong>
                  <br />
                  (10% in Term fees on course selected)
                </li>
                <li>
                  <strong>FIRST GRADUATION</strong>
                  <br />
                  (10% in Term fees on course selected)
                </li>
                <li>
                  <strong>MERIT</strong> 10% in Term fees on course selected
                  <br />
                  (90% marks scored in SSLC for diploma)
                </li>
                <li>
                  <strong>MERIT</strong> 10% in Term fees on course selected
                  <br />
                  (90% marks scored in HSC for Degree)
                </li>
                <li>
                  <strong>MERIT</strong> 10% in Term fees on course selected
                  <br />
                  (90% marks scored in UG for Post Degree)
                </li>
                <li>
                  <strong>Sports Quota</strong> –
                  <br />
                  Students with records of excellence in sports under
                  National/State/District level shall be considered.
                </li>
              </ParagraphList>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default ScholarContent;
