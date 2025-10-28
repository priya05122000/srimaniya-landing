"use client";
import React, {
  useState,
  useEffect,
  MouseEvent,
  KeyboardEvent,
  ChangeEvent,
  FormEvent,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { InputField } from "@/components/FormFields";
import { IoClose } from "react-icons/io5";
import { GoDownload } from "react-icons/go";
import { MdArrowForward } from "react-icons/md";

// -------------------- Types --------------------

interface NavbarProps {
  sticky?: boolean;
  className?: string;
}

interface FormData {
  StudentName: string;
  ParentName?: string;
  StudentPhone: string;
  ParentPhone?: string;
  StudentEmail: string;
  Address?: string;
  City: string;
  State: string;
  District: string;
  PinCode?: string;
}

const initialForm: FormData = {
  StudentName: "",
  StudentPhone: "",
  StudentEmail: "",
  City: "",
  State: "",
  District: "",
};

// -------------------- Components --------------------

// Logo
const Logo: React.FC<{ id?: string }> = React.memo(({ id }) => (
  <Image
    id={id}
    src="/logos/navbarlogo.png"
    alt="Company Logo"
    width={500}
    height={500}
    className="h-16 sm:h-12 w-auto object-contain"
    priority
  />
));

// Hamburger Menu
const Hamburger: React.FC<{ open: boolean }> = React.memo(({ open }) => (
  <span
    className="relative flex items-center justify-center w-8 h-8 transition-all duration-300"
    aria-hidden="true"
  >
    <span
      className={`absolute transition-opacity duration-300 ${
        open ? "opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src="/logos/sort.svg"
        alt="Open menu"
        width={32}
        height={32}
        className="w-8 h-8"
        priority
      />
    </span>
    <span
      className={`absolute transition-opacity duration-300 ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src="/logos/close.png"
        alt="Close menu"
        width={32}
        height={32}
        className="w-6 h-6"
        priority
      />
    </span>
  </span>
));

// -------------------- Main Navbar --------------------
const Navbar = ({ sticky = true }: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [hideNavbar, setHideNavbar] = useState<boolean>(false);
  const [showBrochureModal, setShowBrochureModal] = useState<boolean>(false); // NEW
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);

  // -------------------- Helpers --------------------
  // Helper: Toggle menu
  const handleMenuToggle = (
    e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  // Helper: Close menu
  const handleLinkClick = () => setMenuOpen(false);

  // -------------------- Effects --------------------
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleHomeScroll = () => {
      const revealSection = document.querySelector(".reveal-section");
      if (!revealSection) return;
      const rect = revealSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const ratio = Math.min(
        1,
        Math.max(0, (viewportHeight - rect.top) / rect.height)
      );
      let threshold =
        window.innerWidth >= 1024 && window.innerWidth < 1280 ? 0.6 : 0.9;
      setHideNavbar(ratio >= threshold);
    };
    if (pathname === "/") {
      window.addEventListener("scroll", handleHomeScroll);
      handleHomeScroll();
    }
    return () => {
      window.removeEventListener("scroll", handleHomeScroll);
    };
  }, [pathname]);

  // Form change handler
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const { StudentName, StudentPhone, StudentEmail, City, State, District } =
      form;
    const brochureName = `(brochure) ${StudentName}`;
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxQ0OGd2A5Tvs0_MQxcUWtWfwEmyAyHpdY6mcUXZKj87QXG0JP2ilZ9CTQxmhfkP6_r/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            StudentName: brochureName,
            ParentName: "null",
            StudentPhone,
            ParentPhone: "null",
            StudentEmail: StudentEmail || "null",
            Address: "null",
            City: City || "null",
            State: State || "null",
            District: District || "null",
            PinCode: "null",
          }),
        }
      );
      toast.success("Form submitted successfully!");
      setForm(initialForm);
      // Trigger brochure download
      const brochureUrl = "/pdf/brochure.pdf";
      const link = document.createElement("a");
      link.href = brochureUrl;
      link.download = "brochure.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // -------------------- Render --------------------
  return (
    <nav
      id="section1"
      className={`navbar h-20 z-50 bg-blue-custom w-full shadow-sm border-b border-grey-custom
        ${sticky ? "fixed top-0 " : ""}
        transition-opacity duration-500
        ${hideNavbar ? "navbar--hidden" : "navbar--visible"}
      `}
    >
      <div className="grid grid-cols-2 sm:grid-cols-[1fr_1.5fr] lg:grid-cols-[1fr_2fr] xl:grid-cols-[1fr_3fr] h-full">
        {/* Logo */}
        <Link
          href="/"
          className="logo flex items-center justify-start order-1 pl-6 sm:pl-8"
        >
          <Logo id="navbar-logo" />
        </Link>
        {/* Navigation Menu */}
        <div className="flex items-center justify-end order-2 pr-6 sm:pr-8 ">
          {/* Hamburger */}
          <div
            className="sm:hidden ml-2"
            onClick={handleMenuToggle}
            role="button"
            tabIndex={0}
            aria-label="Open menu"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleMenuToggle(e);
            }}
          >
            <Hamburger open={menuOpen} />
          </div>

          {/* Nav Links */}
          <div
            className={`nav-elements
          fixed top-20 right-0
          h-[calc(100vh-80px)] w-[280px]
          bg-blue-custom transition-transform duration-300 z-40
          ${
            menuOpen
              ? "translate-x-0 px-6 py-8 shadow-lg"
              : "translate-x-full px-6 py-8"
          }
          sm:static sm:h-auto sm:w-auto sm:bg-transparent sm:translate-x-0 sm:px-0 sm:py-0 sm:shadow-none
          sm:flex sm:items-center`}
          >
            {/* Brochure & Enquire Buttons (reused) */}
            <div className="mt-6 sm:mt-0 sm:ml-4 flex flex-col sm:flex-row gap-6">
              {[
                { label: "Brochure", icon: <GoDownload /> },
                { label: "Enquire", icon: <MdArrowForward /> },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  className="relative flex justify-center items-center gap-1 rounded-full bg-blue-custom overflow-hidden cursor-pointer border border-yellow-custom group transition-all duration-300 px-3 py-1"
                  onClick={() => setShowBrochureModal(true)}
                >
                  <span className="relative gap-x-1 z-20 flex items-center text-center no-underline w-full text-[#FFCE54] text-base transition-all duration-300 group-hover:text-[#0B2351]">
                    {label} {icon}
                  </span>
                  <span className="absolute left-0 top-0 w-full h-0 bg-yellow-custom transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={handleLinkClick}
        ></div>
      )}

      {/* Brochure Modal */}
      <AnimatePresence>
        {showBrochureModal && (
          <motion.div
            className="fixed inset-0 z-100 flex items-center justify-center bg-blue-overlay-strong p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-blue-custom  shadow-lg p-6 max-w-lg w-full relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-2 right-2 cursor-pointer text-2sm"
                onClick={() => setShowBrochureModal(false)}
                aria-label="Close"
              >
                <IoClose />
              </button>
              <div className="mb-8 flex justify-center">
                <Image
                  src="/logos/navbarlogo.png"
                  alt="Logo"
                  width={376}
                  height={94}
                  className="w-48 md:w-72"
                  priority
                />
              </div>
              <form onSubmit={handleSubmit} className="space-y-2 mt-5">
                <div className="grid grid-cols-1 gap-y-4 gap-x-6">
                  <InputField
                    label="Name *"
                    name="StudentName"
                    required
                    value={form.StudentName}
                    onChange={handleChange}
                  />
                  <InputField
                    label="Phone Number *"
                    name="StudentPhone"
                    type="tel"
                    required
                    value={form.StudentPhone}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    maxLength={10}
                  />
                </div>
                {/* Buttons */}
                <div className="flex flex-row justify-end my-4 gap-2">
                  <button
                    type="submit"
                    className="relative flex justify-center items-center gap-1 rounded bg-yellow-custom overflow-hidden cursor-pointer border border-yellow-custom group transition-all duration-300 px-4 py-1"
                    disabled={submitting}
                  >
                    <span className="relative z-20 gap-x-1 flex items-center text-center no-underline w-full text-[#0B2351] text-base transition-all duration-300 group-hover:text-[#FFCE54]">
                      Download Brochure <GoDownload />
                    </span>
                    <span className="absolute left-0 top-0 w-full h-0 bg-blue-custom transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
                  </button>
                </div>
                {/* Note */}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
