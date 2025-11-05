"use client";

import React, { FC } from "react";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import { ANIMATIONS } from "@/components/Animations";

const BG_IMAGE = "/images/courses.jpeg";
const GRID_CLASSES =
  "grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] h-full";
const CONTENT_CLASSES =
  "flex flex-col justify-evenly sm:justify-end text-end pl-6 lg:pl-6 pr-6 lg:pr-8 py-6 lg:py-12 text-white-custom h-full bg-blue-overlay-strong relative";
const HEADING_CLASSES = "leading-tight animate-text uppercase";
// const HEADING_TEXT = "Courses & Admission";
const PARAGRAPH_TEXT =
  "Explore our industry-focused hotel management courses designed to build strong fundamentals and practical skills for a successful hospitality career.";

const Header: FC = () => (
  <div
    className={`relative w-full h-[400px] md:h-[280px] lg:h-[400px] bg-cover bg-center`}
    style={{ backgroundImage: `url('${BG_IMAGE}')` }}
    data-section
  >
    <div className={GRID_CLASSES}>
      <div className="border-b lg:border-b-0 lg:border-r border-grey-custom" />
      <div className={CONTENT_CLASSES}>
        <div className="py-2 lg:py-4">
          <Heading level={5} className={HEADING_CLASSES}>
            Courses <br />
            and <br />
            Admission
          </Heading>
        </div>
        <Paragraph size="base" {...ANIMATIONS.fadeZoomIn}>
          {PARAGRAPH_TEXT}
        </Paragraph>
      </div>
    </div>
  </div>
);

export default Header;
