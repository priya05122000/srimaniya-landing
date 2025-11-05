"use client";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import Section from "@/components/Section";
import React, { useRef } from "react";
import Link from "next/link";
import ParagraphList from "@/components/ParagraphList";

const TermsAndConditions = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <Section ref={sectionRef} className="placement-info space-y-6 py-12">
      <section>
        <Paragraph
          size="base"
          className="institute-name text-dark-custom uppercase text-center"
        >
          Sri Maniya Institute of Hotel Management
        </Paragraph>
        <Heading
          level={4}
          className="my-2 text-blue-custom text-center privacy-policy uppercase"
        >
          Terms and Conditions
        </Heading>
        <div className="flex justify-center my-6">
          <div className="w-20 h-1 bg-yellow-custom flex items-center"></div>
        </div>
        <div>
          <Paragraph size="lg" className="text-dark-custom ">
            <strong>Last Updated: </strong>04/11/2025
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom my-4">
            Welcome to{" "}
            <strong>Sri Maniya Institute of Hospitality Management</strong>{" "}
            (“we,” “our,” or “us”). By accessing or using our website{" "}
            <Link
              href="https://www.srimaniyainstitute.in"
              className="text-blue-custom underline font-bold"
            >
              www.srimaniyainstitute.in
            </Link>{" "}
            (the “Site”), you agree to comply with and be bound by these Terms
            and Conditions. If you do not agree, please refrain from using our
            Site.
          </Paragraph>
        </div>

        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            General Information
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            The information provided on this website is intended for general
            informational and promotional purposes related to our academic
            programs, courses, and institutional activities. While we strive to
            ensure the accuracy of the information presented, we do not
            guarantee that all details are fully current, complete, or
            error-free.
          </Paragraph>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Courses, Fees, and Content
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            Course structures, fees, admission criteria, and related details are
            subject to change without prior notice. The Institute reserves the
            right to modify, discontinue, or replace any course, faculty member,
            or facility as deemed necessary.
          </Paragraph>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Placement and Salary Disclaimer
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            All information, statistics, or examples related to{" "}
            <strong>student placements, job offers, or salary packages</strong>{" "}
            displayed on this website, brochures, or promotional materials are
            <strong> illustrative only.</strong> They{" "}
            <strong>do not represent actual or guaranteed outcomes</strong> for
            any student. Employment opportunities depend on individual
            performance, employer requirements, and market conditions. The
            Institute does{" "}
            <strong>not guarantee placements or specific salary figures</strong>
            to any student.
          </Paragraph>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Use of Website
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            Users agree to use the Site only for lawful purposes. You must not
            misuse, hack, or attempt to disrupt the functionality of the
            website. Any unauthorized use of the Site may lead to suspension of
            access and/or legal action.
          </Paragraph>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Intellectual Property
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            All content on this website, including text, images, videos, logos,
            and graphics, is the property of{" "}
            <strong>Sri Maniya Institute of Hospitality Management</strong>{" "}
            unless otherwise stated. Unauthorized copying, modification, or
            distribution of content is strictly prohibited.
          </Paragraph>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Third-Party Links
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            Our website may contain links to third-party websites for additional
            information or convenience. We do not endorse or take responsibility
            for the content, privacy practices, or accuracy of such external
            sites.
          </Paragraph>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Limitation of Liability
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            The Institute shall not be held liable for any direct or indirect
            damages arising from:
          </Paragraph>
          <ParagraphList size="lg" className="text-dark-custom ml-8">
            <li>The use or inability to use the website;</li>
            <li>Reliance on information provided on the website; or</li>
            <li>Any errors, inaccuracies, or omissions in the content.</li>
          </ParagraphList>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Privacy
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            Use of this website is also governed by our [Privacy Policy], which
            explains how we handle personal information collected through the
            site.
          </Paragraph>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Changes to Terms
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            We reserve the right to update or revise these Terms and Conditions
            at any time without prior notice. Continued use of the website
            following any changes constitutes your acceptance of the revised
            terms.
          </Paragraph>
        </div>
        <div className="my-8">
          <Paragraph
            size="xl"
            className="my-4 text-blue-custom  uppercase font-bold"
          >
            Contact Us
          </Paragraph>
          <Paragraph size="lg" className="text-dark-custom">
            If you have any questions or concerns about these Terms and
            Conditions, please contact us at:
            <br />
            <strong>Sri Maniya Institute of Hospitality Management</strong>
            <br />
            +91 89038 64444
            <br />
            <Link
              href="https://www.srimaniyainstitute.in"
              className="text-blue-custom underline font-bold"
            >
              www.srimaniyainstitute.in
            </Link>
            <br />
            <Link
              href="mailto:info@srimaniyainstitute.in"
              className="text-blue-custom underline font-bold"
            >
              info@srimaniyainstitute.in
            </Link>
          </Paragraph>
        </div>
      </section>
    </Section>
  );
};

export default TermsAndConditions;
