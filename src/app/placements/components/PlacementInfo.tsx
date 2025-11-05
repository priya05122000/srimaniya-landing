"use client";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import Section from "@/components/Section";
import React, { useRef } from "react";
import ParagraphList from "@/components/ParagraphList";
import { ANIMATIONS } from "@/components/Animations";

const PlacementInfo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <Section ref={sectionRef} className="placement-info space-y-6 py-10 sm:py-16">
      <section>
        <Heading level={4} className="mb-6 text-blue-custom text-center hotel-management-title uppercase" {...ANIMATIONS.zoomIn}>
          Placements at srimaniya institute
        </Heading>
       
        <Paragraph size="lg" className="text-dark-custom">
          At Sri Maniya Institute, we believe that education should open doors to real-world success. Our dedicated Placement Cell ensures that every student gains valuable industry exposure and career opportunities both in India and abroad.
        </Paragraph>
      </section>
      <section>
        <Paragraph size="xl" className="text-blue-custom font-semibold mt-4 mb-2 uppercase">
          Global Placements
        </Paragraph>
        <Paragraph size="lg" className="text-dark-custom">
          We collaborate with top international brands and hospitality chains to provide our students with exceptional global career opportunities. From luxury hotels to leading resorts, our graduates are now working across major destinations worldwide.
        </Paragraph>
      </section>
      <section>
        <Paragraph size="xl" className="text-blue-custom font-semibold mt-4 mb-2 uppercase">
          Part-Time Placements
        </Paragraph>
        <Paragraph size="lg" className="text-dark-custom">
          We arrange part-time placements for all our students during their course of study, helping them gain hands-on experience and build professional skills that complement their academic learning.
        </Paragraph>
      </section>
      <section>
        <Paragraph size="xl" className="text-blue-custom uppercase font-semibold mt-4 mb-2">
          Our Commitment
        </Paragraph>
        <ParagraphList size="lg" className="text-dark-custom">
          <li>100% placement assistance</li>
          <li>Tie-ups with global hospitality leaders</li>
          <li>Career guidance and interview training</li>
          <li>Internships and part-time work opportunities during courses</li>
        </ParagraphList>
      </section>

    </Section>
  );
};

export default PlacementInfo;
