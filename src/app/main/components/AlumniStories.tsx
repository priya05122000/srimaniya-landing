"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { EffectFade, Navigation } from "swiper/modules";
import Section from "@/components/Section";
import Paragraph from "@/components/Paragraph";
import Heading from "@/components/Heading";
import { useSplitTextHeadingAnimation } from "@/hooks/useSplitTextHeadingAnimation";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { ANIMATIONS } from "@/components/Animations";
import Image from "next/image";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { getAllAlumniStories } from "@/services/alumniStoryService";


type Alumni = {
  id: string;
  name: string;
  batch_year: number;
  course: string;
  location: string;
  designation: string;
  country: string;
  company: string;
  story: string;
  photo_url: string;
  video_url: string;
  status?: boolean;
};

type QuoteBlockProps = Pick<
  Alumni,
  | "name"
  | "batch_year"
  | "course"
  | "designation"
  | "company"
  | "country"
  | "story"
  | "location"
  | "photo_url" // <-- add this
  | "video_url" // <-- add this
>;

const QuoteBlock: React.FC<{ alumni: QuoteBlockProps }> = ({ alumni }) => (
  <div
    className="flex-1 bg-blue-custom -ml-6 sm:ml-0 py-8 px-6 sm:px-8 xl:px-20 text-white-custom sm:w-[90%]"
    data-section
  >
    <div className="h-full flex flex-col justify-end">
      {/* Show AlumniMedia only on mobile */}
      <div className="sm:hidden mb-4 h-24 w-24">
        <AlumniMedia
          photoUrl={alumni.photo_url}
          videoUrl={alumni.video_url}
          name={alumni.name}
        />
      </div>

      <Heading level={5} {...ANIMATIONS.fadeZoomIn}>
        {alumni.name}
      </Heading>
      <Paragraph
        {...ANIMATIONS.fadeZoomIn}
        size="lg"
        className="text-grey-custom mt-1"
      >
        {alumni.batch_year} - {alumni.course}
      </Paragraph>
      <Paragraph
        {...ANIMATIONS.fadeZoomIn}
        size="lg"
        className="text-grey-custom mt-1"
      >
        {alumni.designation} - {alumni.company}, {alumni.location},{" "}
        {alumni.country}
      </Paragraph>
      <div className="flex items-start gap-4 py-6">
        <BiSolidQuoteLeft className="text-9xl text-yellow-custom  h-auto" />
        <div className="flex flex-col gap-2 text-white-custom  ">
          <div
            {...ANIMATIONS.fadeZoomIn}
            className="text-sm lg:text-lg"
            dangerouslySetInnerHTML={{ __html: alumni.story }}
          />
        </div>
      </div>
    </div>
  </div>
);

const AlumniMedia: React.FC<{
  photoUrl: string;
  videoUrl?: string;
  name: string;
}> = ({ photoUrl, videoUrl, name }) => {
  const src = `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${photoUrl}`;
  return videoUrl ? (
    <video
      controls
      className="w-full h-full object-cover object-top rounded-lg"
    >
      <source
        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${videoUrl}`}
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  ) : (
    <Image
      src={src}
      alt={`Photo of alumni ${name}`}
      width={400}
      height={400}
      className="w-full h-full object-cover object-top"
    />
  );
};

const AlumniNavButtons: React.FC = () => (
  <div className="absolute right-6 sm:right-8 flex flex-col items-end gap-2 z-20 top-4 md:top-auto md:bottom-4">
    <Paragraph
      {...ANIMATIONS.fadeZoomIn}
      size="lg"
      className="text-white-custom md:mb-2"
    >
      Prev/Nxt
    </Paragraph>
    <div className="flex gap-2 md:gap-4">
      <button className="alumni-prev flex items-center justify-center transition-all duration-200 cursor-pointer bg-transparent">
        <HiOutlineArrowNarrowLeft className="font-normal border-2 rounded-full text-[#fbfffa] hover:bg-white hover:text-[#0b2351] text-2xl w-12 h-6" />
      </button>
      <button className="alumni-next flex items-center justify-center transition-all duration-200 w-12 h-6 cursor-pointer bg-transparent">
        <HiOutlineArrowNarrowRight className="font-normal border-2 rounded-full text-[#fbfffa] hover:bg-white hover:text-[#0b2351] text-2xl w-12 h-6" />
      </button>
    </div>
  </div>
);

export default function AlumniStories() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useSplitTextHeadingAnimation({
    trigger: sectionRef,
    first: ".alumni-title",
    second: ".proof-title",
  });

  const [alumniData, setAlumniData] = useState<Alumni[]>([]);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await getAllAlumniStories();
        const data: Alumni[] = res?.data ?? [];
        setAlumniData(data.filter((story) => story?.status));
      } catch (err) {
        console.error("Failed to fetch alumni stories:", err);
      }
    };
    fetchAlumni();
  }, []);

  return (
    <div className="space-y-10 pt-10">
      <Section ref={sectionRef}>
        <div>
          <Paragraph
            size="lg"
            className="text-blue-custom text-center font-bold alumni-title"
          >
            The Proof
          </Paragraph>
          <Heading
            level={4}
            className="text-blue-custom text-center uppercase mt-2 proof-title"
          >
            Alumni Stories
          </Heading>
        </div>
      </Section>
      <div className="sm:h-[500px] relative ">
        <Swiper
          effect="fade"
          grabCursor={true}
          loop={alumniData.length > 1}
          navigation={{ nextEl: ".alumni-next", prevEl: ".alumni-prev" }}
          modules={[EffectFade, Navigation]}
          slidesPerView={1}
          className="mySwiper h-full"
        >
          {alumniData.map((alumni) => (
            <SwiperSlide key={alumni.id}>
              <div
                className="w-full h-full bg-top relative sm:bg-cover"
                style={
                  typeof window !== "undefined" && window.innerWidth < 640
                    ? {}
                    : {
                        backgroundImage: `url('${process.env.NEXT_PUBLIC_API_BASE_URL}/files/${alumni.photo_url}')`,
                      }
                }
              >
                <div className="absolute inset-0 z-0 backdrop-blur-[6px] bg-blue-custom/30 sm:block hidden" />
                <div className="h-full ">
                  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] h-full items-end ">
                    <div className="flex flex-col items-end justify-between gap-10 pl-6  xl:pl-16 sm:h-[80%] min-h-[400px]">
                      <QuoteBlock alumni={alumni} />
                    </div>
                    <div className="hidden sm:flex items-center justify-center h-[350px] md:h-full overflow-hidden relative border-b sm:border-b-0 sm:border-l border-grey-custom">
                      <AlumniMedia
                        photoUrl={alumni.photo_url}
                        videoUrl={alumni.video_url}
                        name={alumni.name}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <AlumniNavButtons />
      </div>
    </div>
  );
}
