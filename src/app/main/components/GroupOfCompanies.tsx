"use client";

import { useRef, FC, memo } from "react";
import Image from "next/image";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import Section from "@/components/Section";
import { ANIMATIONS } from "@/components/Animations";

// =============== Sub Components ==================
interface AddressInfoProps {
  title: string;
  address: string;
}

const AddressInfo: FC<AddressInfoProps> = memo(({ title, address }) => (
  <div className="flex flex-col justify-center">
    <Paragraph size="lg" className="text-dark-custom font-semibold">
      {title}
    </Paragraph>
    <div
      className="text-dark-custom text-sm xl:text-base"
      dangerouslySetInnerHTML={{ __html: address }}
    />
  </div>
));
AddressInfo.displayName = "AddressInfo";

interface CompanyInfoProps {
  logoSrc: string;
  title: string;
  address: string;
  className?: string;
  logoClassName?: string;
}

const CompanyInfo: FC<CompanyInfoProps> = memo(
  ({
    logoSrc,
    title,
    address,
    className = "grid sm:grid-cols-[auto_2fr] gap-10 ",
    logoClassName = "w-72  h-32 flex items-start justify-center ",
  }) => (
    <div className={className}>
      <div className={logoClassName}>
        <Image
          src={logoSrc}
          alt="Partner Logo"
          className="object-contain w-auto  h-full max-h-full  mr-auto"
          loading="lazy"
          width={1000}
          height={1000}
        />
      </div>
      <AddressInfo title={title} address={address} />
    </div>
  )
);
CompanyInfo.displayName = "CompanyInfo";

// =============== Main Component ==================

const COMPANY_LIST: CompanyInfoProps[] = [
  {
    logoSrc: "/images/gtholidays.png",
    title: "GT Holidays Pvt LTD",
    address:
      "No.1, Gemini Parsn, Kodambakkam High Road, Nungambakkam, Chennai – 600006 Tamil Nadu, India.",
  },
  {
    logoSrc: "/images/seashore.png",
    title: "Seashore & co",
    address: "2/12, East Car Street, Kanyakumari, Tamilnadu, India - 629702",
  },
  {
    logoSrc: "/images/follicle.webp",
    title: "Follicle",
    address:
      "NO 2/75, Customs Colony, OPP TO JAIN COLLEGE, Omr Service Road Ellaiamman Nagar, Thoraipakkam-600097 (OPP TO JAIN COLLEGE).",
  },
];

const HOTELS_LIST =
  "Hotel Sangam | Chennai Inn | Rameshwaram Grand | Temple Citi | AR Residency | Comorin Grand | Hotel Seaview | Hotel Seaface | Ocean Heritage | Triveni Tourist Home | Gopinivas Grand";

const GroupOfCompanies: FC = () => {
  const mobileGroupSectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={mobileGroupSectionRef} className="w-full pb-10 sm:pb-16  ">
      <Section>
        <section className="section flex flex-col items-center w-full ">
          <Heading
            level={4}
            className="group-title text-center text-blue-custom  uppercase text-dark-custom px-6  lg:px-8 pb-10"
            {...ANIMATIONS.zoomIn}
          >
            Our Group of Companies
          </Heading>
          <div className="space-y-6 lg:space-y-8 w-full">
            {COMPANY_LIST.map((company) => (
              <CompanyInfo key={company.title} {...company} />
            ))}
          </div>
          <Paragraph
            size="lg"
            className="text-dark-custom font-semibold px-6 pt-6 lg:px-8 text-center"
          >
            {HOTELS_LIST}
          </Paragraph>
        </section>
      </Section>
    </div>
  );
};

export default GroupOfCompanies;
