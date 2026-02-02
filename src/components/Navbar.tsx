"use client";

// External Libraries
import { useState, FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { GoDownload } from "react-icons/go";

// -------------------- Types --------------------
interface NavLink {
  name: string;
  href?: string;
  sublinks?: { name: string; href: string }[];
}

interface NavbarProps {
  sticky?: boolean;
  className?: string;
}

type FormData = {
  StudentName: string;
  ParentName: string;
  StudentPhone: string;
  ParentPhone: string;
  StudentEmail: string;
  Address: string;
  City: string;
  State: string;
  District: string;
  PinCode: string;
};

const initialForm: FormData = {
  StudentName: "",
  ParentName: "",
  StudentPhone: "",
  ParentPhone: "",
  StudentEmail: "",
  Address: "",
  City: "",
  State: "",
  District: "",
  PinCode: "",
};

// -------------------- Data --------------------
const NAV_LINKS: NavLink[] = [
  // { name: "Courses", href: "/courses" },
  // { name: "Placements", href: "/placements" },
  // { name: "Scholarship", href: "/scholarship" },
];

// -------------------- Components --------------------
// Logo
const Logo: FC<{ id?: string }> = ({ id }) => (
  <Image
    id={id}
    src="/logos/navbarlogo.png"
    alt="Company Logo"
    width={500}
    height={500}
    className="h-16 sm:h-12 w-auto object-contain"
    priority
  />
);

// Hamburger Menu
const Hamburger: FC<{ open: boolean }> = ({ open }) => (
  <span
    className="relative flex items-center justify-center w-8 h-8 transition-all duration-300"
    aria-hidden="true"
  >
    <span
      className={`absolute transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}
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
      className={`absolute transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
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
);

// -------------------- Main Navbar --------------------
const Navbar: FC<NavbarProps> = ({ sticky = true }) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => pathname === href;
  const handleMenuToggle = () => setMenuOpen((prev) => !prev);
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav
      id="section1"
      className={`navbar h-20 z-50 bg-blue-custom w-full shadow-sm border-b border-grey-custom ${sticky ? "fixed top-0" : ""}`}
    >
      <div className="grid grid-cols-[1.2fr_1fr] sm:grid-cols-[1.2fr_2fr] h-full">
        {/* Logo Left */}
        <Link
          href="/"
          className="logo flex items-center justify-start pl-6 order-1"
        >
          <Logo id="navbar-logo" />
        </Link>
        {/* Navigation Menu Right */}
        <div className="flex items-center justify-end order-2 pr-6">
          {/* Hamburger */}
          <div
            className="lg:hidden mr-2"
            onClick={handleMenuToggle}
            role="button"
            tabIndex={0}
            aria-label="Open menu"
          >
            <Hamburger open={menuOpen} />
          </div>
          {/* Nav Links */}
          {/* Desktop Nav */}
          <div className="nav-elements hidden lg:flex lg:items-center lg:static lg:h-auto lg:w-auto lg:bg-transparent lg:px-0 lg:py-0 lg:shadow-none">
            <ul className="flex flex-row lg:space-x-6 space-y-0 mt-0">
              {NAV_LINKS.map((link) => (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.href ?? "#"}
                    className={`text-base font-normal text-white-custom transition-colors duration-200 relative py-2 ${isActive(link.href ?? "#")
                      ? "border-b border-white-custom"
                      : "hover:border-b hover:border-white-custom"
                      }`}
                    onClick={handleLinkClick}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Brochure Button */}
            <div className="lg:ml-4">
              <button
                className="relative flex justify-center items-center gap-1 rounded-full bg-blue-custom overflow-hidden cursor-pointer border border-yellow-custom group transition-all duration-300 px-3 py-1"
                onClick={() => {
                  const brochureUrl = "/pdf/brochure.pdf";
                  const link = document.createElement("a");
                  link.href = brochureUrl;
                  link.download = "brochure.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <span className="relative gap-x-1 z-20 flex items-center text-center no-underline w-full text-[#FFCE54] text-base transition-all duration-300 group-hover:text-[#0B2351]">
                  Brochure <GoDownload />
                </span>
                <span className="absolute left-0 top-0 w-full h-0 bg-yellow-custom transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
              </button>
            </div>
          </div>
          {/* Mobile Nav */}
          <div
            className={`nav-elements fixed top-20 right-0 h-[calc(100vh-80px)] w-[280px] bg-blue-custom transition-transform duration-300 z-40 ${menuOpen
              ? "translate-x-0 px-6 py-8 shadow-lg"
              : "translate-x-full px-6 py-8"
              } lg:hidden`}
          >
            {/* <ul className="flex flex-col space-y-6 mt-8">
              {NAV_LINKS.map((link) => (
                <li key={link.name} className="relative group">
                  <Link
                    href={link.href ?? "#"}
                    className={`text-base font-normal text-white-custom transition-colors duration-200 relative py-2 ${isActive(link.href ?? "#")
                      ? "border-b border-white-custom"
                      : "hover:border-b hover:border-white-custom"
                      }`}
                    onClick={handleLinkClick}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul> */}
            {/* Brochure Button */}
            {/* <div className="mt-6"> */}
            <div className="">
              <button
                className="relative flex justify-center items-center gap-1 rounded-full bg-blue-custom overflow-hidden cursor-pointer border border-yellow-custom group transition-all duration-300 px-3 py-1"
                onClick={() => {
                  const brochureUrl = "/pdf/brochure.pdf";
                  const link = document.createElement("a");
                  link.href = brochureUrl;
                  link.download = "brochure.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <span className="relative gap-x-1 z-20 flex items-center text-center no-underline w-full text-[#FFCE54] text-base transition-all duration-300 group-hover:text-[#0B2351]">
                  Brochure <GoDownload />
                </span>
                <span className="absolute left-0 top-0 w-full h-0 bg-yellow-custom transition-all duration-300 ease-in-out group-hover:h-full group-hover:top-auto group-hover:bottom-0 z-10" />
              </button>
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
    </nav>
  );
};

export default Navbar;