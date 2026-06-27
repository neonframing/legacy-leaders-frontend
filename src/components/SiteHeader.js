"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

import BrandLogo from "@/components/BrandLogo";

function HeaderButton({ children, variant = "primary", className = "", href, onClick }) {
  const baseStyle = "inline-flex cursor-pointer items-center justify-center border px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300";
  const variants = {
    primary: "border-[#D89B2B] bg-[#D89B2B] text-white hover:bg-transparent hover:text-[#D89B2B]",
    secondary: "border-[#344059] bg-[#344059] text-white hover:bg-transparent hover:text-[#344059]",
    outline: "border-[#344059] bg-transparent text-[#344059] hover:bg-[#344059] hover:text-white",
    outlineWhite: "border-white bg-transparent text-white hover:bg-white hover:text-[#344059]",
  };

  const combinedStyles = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedStyles} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={combinedStyles} onClick={onClick}>
      {children}
    </button>
  );
}

const navLinks = [
  { 
    name: "Our Story", 
    href: "/our-story",
    subLinks: [
      { name: "About Us", href: "/our-story" },
      { name: "Our History", href: "/our-story#our-history" },
      { name: "Leadership", href: "/our-story#leadership" },
      { name: "Sneaker Gala", href: "/our-story#sneaker-gala" },
    ]
  },
  { 
    name: "Our Programs", 
    href: "/our-programs",
    subLinks: [
      { name: "Overview", href: "/our-programs" },
      { name: "Legacy Fellows", href: "/our-programs#legacy-fellows" },
      { name: "Legacy Mentors", href: "/our-programs#legacy-mentors" },
      { name: "Legacy Coaching", href: "/our-programs#legacy-coaching" },
    ]
  },
  { 
    name: "Get Involved", 
    href: "/get-involved",
    subLinks: [
      { name: "Overview", href: "/get-involved" },
      { name: "Donate", href: "/get-involved#legacy-donor" },
      { name: "Request an Intern", href: "/get-involved#request-intern" },
      { name: "Volunteer", href: "/get-involved#volunteer" },
    ]
  },
  { 
    name: "Contact Us", 
    href: "/contact" 
  },
];

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // Tracks which desktop dropdown is open
  const [expandedMobileSection, setExpandedMobileSection] = useState(null); // Tracks which mobile accordion is open
  
  const loginMenuRef = useRef(null);
  const navMenuRef = useRef(null);

  // Handle Navbar styling on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicking outside of dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginMenuRef.current && !loginMenuRef.current.contains(event.target)) {
        setLoginMenuOpen(false);
      }
      if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white py-4 shadow-sm" : "bg-white/95 py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link href="/" className="z-50 flex-shrink-0">
          <BrandLogo />
        </Link>

        {/* --- DESKTOP NAVIGATION --- */}
        <nav ref={navMenuRef} className="hidden items-center space-x-8 lg:flex">
          {navLinks.map((link, idx) => (
            <div 
              key={link.name} 
              className="relative"
              onMouseEnter={() => link.subLinks && setActiveDropdown(idx)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className="flex items-center gap-1 cursor-pointer text-sm font-semibold uppercase tracking-wider transition-colors hover:text-[#D89B2B]"
              >
                {link.name}
                {link.subLinks && <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === idx ? "rotate-180 text-[#D89B2B]" : ""}`} />}
              </Link>
              
              {/* Desktop Dropdown Menu */}
              {link.subLinks && activeDropdown === idx && (
                <div className="absolute left-0 top-full pt-6 min-w-[220px]">
                  <div className="overflow-hidden border border-gray-200 bg-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    {link.subLinks.map((subLink, subIdx) => (
                      <Link
                        key={subLink.name}
                        // Use object notation for secure Next.js hash routing
                        href={
                          subLink.href.includes('#') 
                          ? { pathname: subLink.href.split('#')[0], hash: subLink.href.split('#')[1] }
                          : subLink.href
                        }
                        className={`block cursor-pointer px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#344059] transition-colors hover:bg-[#f8f6f1] hover:text-[#D89B2B] ${subIdx !== 0 ? 'border-t border-gray-100' : ''}`}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* --- DESKTOP LOGIN & CTA --- */}
        <div className="hidden items-center space-x-4 lg:flex">
          <div
            ref={loginMenuRef}
            className="relative mr-4"
            onMouseEnter={() => setLoginMenuOpen(true)}
            onMouseLeave={() => setLoginMenuOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 cursor-pointer text-sm font-semibold uppercase tracking-wider transition-colors hover:text-[#D89B2B]"
              onClick={() => setLoginMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={loginMenuOpen}
            >
              Login <ChevronDown size={14} className={`transition-transform duration-200 ${loginMenuOpen ? "rotate-180 text-[#D89B2B]" : ""}`} />
            </button>
            {loginMenuOpen && (
              <div className="absolute right-0 top-full min-w-[210px] pt-6">
                <div className="overflow-hidden border border-gray-200 bg-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <a
                    href="#"
                    className="block cursor-pointer px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#344059] transition-colors hover:bg-[#f8f6f1] hover:text-[#D89B2B]"
                  >
                    Fellows Login
                  </a>
                  <a
                    href="#"
                    className="block cursor-pointer border-t border-gray-100 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#344059] transition-colors hover:bg-[#f8f6f1] hover:text-[#D89B2B]"
                  >
                    Mentors Login
                  </a>
                </div>
              </div>
            )}
          </div>
          <HeaderButton variant="primary" href={{ pathname: '/get-involved', hash: 'legacy-donor' }}>
            Donate Today
          </HeaderButton>
        </div>

        {/* --- MOBILE MENU TOGGLE --- */}
        {!mobileMenuOpen && (
          <button
            className="z-50 cursor-pointer text-[#344059] lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        )}
      </div>

      {/* --- MOBILE FULLSCREEN MENU --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex h-[100dvh] w-full flex-col bg-white overflow-y-auto pt-24 pb-12 px-6 animate-in fade-in duration-200">
          <button
            type="button"
            className="absolute right-6 top-6 cursor-pointer text-[#344059]"
            onClick={() => {
              setMobileMenuOpen(false);
              setExpandedMobileSection(null);
            }}
            aria-label="Close menu"
          >
            <X size={30} />
          </button>

          <div className="flex flex-col space-y-6 w-full max-w-sm mx-auto">
            {navLinks.map((link, idx) => (
              <div key={link.name} className="flex flex-col border-b border-gray-100 pb-4">
                <div className="flex items-center justify-between">
                  <Link
                    href={link.href}
                    className="text-2xl font-black uppercase tracking-tight text-[#344059]"
                    onClick={() => {
                      if (!link.subLinks) setMobileMenuOpen(false);
                    }}
                  >
                    {link.name}
                  </Link>
                  {link.subLinks && (
                    <button 
                      onClick={() => setExpandedMobileSection(expandedMobileSection === idx ? null : idx)}
                      className="p-2 text-[#D89B2B]"
                    >
                      <ChevronDown size={24} className={`transition-transform duration-300 ${expandedMobileSection === idx ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                
                {/* Mobile Accordion Sub-links */}
                {link.subLinks && expandedMobileSection === idx && (
                  <div className="mt-4 flex flex-col space-y-4 pl-4 border-l-2 border-[#D89B2B] animate-in slide-in-from-top-2">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.name}
                        href={
                          subLink.href.includes('#') 
                          ? { pathname: subLink.href.split('#')[0], hash: subLink.href.split('#')[1] }
                          : subLink.href
                        }
                        className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-[#D89B2B]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Login Accordion */}
            <div className="flex flex-col border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black uppercase tracking-tight text-[#344059]">Login</span>
                <button 
                  onClick={() => setExpandedMobileSection('login')}
                  className="p-2 text-[#D89B2B]"
                >
                  <ChevronDown size={24} className={`transition-transform duration-300 ${expandedMobileSection === 'login' ? "rotate-180" : ""}`} />
                </button>
              </div>
              {expandedMobileSection === 'login' && (
                <div className="mt-4 flex flex-col space-y-4 pl-4 border-l-2 border-[#D89B2B] animate-in slide-in-from-top-2">
                  <a href="#" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-[#D89B2B]">Fellows Login</a>
                  <a href="#" className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-[#D89B2B]">Mentors Login</a>
                </div>
              )}
            </div>

            <div className="pt-6">
              <HeaderButton 
                variant="primary" 
                className="w-full"
                href={{ pathname: '/get-involved', hash: 'legacy-donor' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Donate Today
              </HeaderButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}