"use client";
import React, { useRef } from "react";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import Image from "next/image";
import Heading from "@/components/Heading";
import { ANIMATIONS } from "@/components/Animations";


const ScholarBanner: React.FC = () => {

    const sectionRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="sm:h-[calc(100vh-80px)]" ref={sectionRef}>
            <div className=" h-full min-h-[300px] relative">
                <Image
                    src="/images/scholarship-banner.png"
                    alt="Scholarship Banner"
                    width={1000}
                    height={1000}
                    style={{ objectFit: "cover" }}
                    className="absolute inset-0 w-full h-full object-top"
                />

                <div
                    className="absolute inset-0" 
                    style={{
                        background: "linear-gradient(to bottom, rgba(0,0,0,0) 30%, #0b2351 100%)",
                        opacity: 0.8,
                    }}
                ></div>

                <div className="absolute left-0 sm:left-8 bottom-8 sm:bottom-16 px-6 sm:px-0 w-full sm:w-2/3 xl:w-1/2">
                    <Heading level={4} className="leading-tight scholarship" {...ANIMATIONS.zoomInLeft}>₹51 Lakh Worth of Scholarships Awarded to Deserving Students</Heading>
                </div>
            </div>
        </div>
    );

};

export default ScholarBanner;
