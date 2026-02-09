import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col justify-center items-center px-4">
      <div className="p-8 w-full text-center">
        <Heading level={1} className="text-blue-custom mb-4">
          Thank You!
        </Heading>
        <Paragraph size="lg" className="text-gray-700 mb-6">
          Your submission has been received. We appreciate your interest and
          will get back to you soon.
        </Paragraph>
        <Link href="/" className="flex justify-center items-center">
          <button className="relative flex justify-center items-center gap-1 rounded-full bg-blue-custom overflow-hidden cursor-pointer group transition-all duration-300 px-4 py-2">
            <span className="relative gap-x-1 z-20 flex items-center text-center no-underline w-full text-white text-base transition-all duration-300 group-hover:text-[#0B2351]">
              Continue
            </span>
            <span className="absolute left-0 top-0 w-full h-0 bg-yellow-custom transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
          </button>
        </Link>
      </div>
    </div>
  );
}
