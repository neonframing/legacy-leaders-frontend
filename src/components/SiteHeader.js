"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

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
  { name: "Our Story", href: "/our-story" },
  { name: "Our Programs", href: "/our-programs" },
  { name: "Get Involved", href: "/get-involved" },
  { name: "Contact Us", href: "/contact-us" },
];

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  const [mobileLoginOpen, setMobileLoginOpen] = useState(false);
  const loginMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginMenuRef.current && !loginMenuRef.current.contains(event.target)) {
        setLoginMenuOpen(false);
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

        <nav className="hidden items-center space-x-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="cursor-pointer text-sm font-semibold uppercase tracking-wider transition-colors hover:text-[#D89B2B]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center space-x-4 lg:flex">
          <div
            ref={loginMenuRef}
            className="relative mr-4"
            onMouseEnter={() => setLoginMenuOpen(true)}
            onMouseLeave={() => setLoginMenuOpen(false)}
          >
            <button
              type="button"
              className="cursor-pointer text-sm font-semibold uppercase tracking-wider transition-colors hover:text-[#D89B2B]"
              onClick={() => setLoginMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={loginMenuOpen}
            >
              Login
            </button>
            {loginMenuOpen && (
              <div className="absolute right-0 top-full min-w-[210px] pt-2">
                <div className="overflow-hidden border border-gray-200 bg-white shadow-lg">
                  <a
                    href="#"
                    className="block cursor-pointer px-4 py-3 text-sm font-semibold uppercase tracking-wider text-[#344059] transition-colors hover:bg-[#f6f1e8] hover:text-[#D89B2B]"
                  >
                    Fellows Login
                  </a>
                  <a
                    href="#"
                    className="block cursor-pointer border-t border-gray-100 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-[#344059] transition-colors hover:bg-[#f6f1e8] hover:text-[#D89B2B]"
                  >
                    Mentors Login
                  </a>
                </div>
              </div>
            )}
          </div>
          <HeaderButton variant="primary" href="/get-involved#legacy-donor">
            Donate Today
          </HeaderButton>
        </div>

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

      {mobileMenuOpen && (
        <div className="absolute left-0 top-0 z-40 flex h-screen w-full flex-col items-center justify-center space-y-8 bg-white">
          <button
            type="button"
            className="absolute right-6 top-6 cursor-pointer text-[#344059]"
            onClick={() => {
              setMobileMenuOpen(false);
              setMobileLoginOpen(false);
            }}
            aria-label="Close menu"
          >
            <X size={30} />
          </button>

          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="cursor-pointer text-2xl font-bold uppercase tracking-widest text-[#344059] hover:text-[#D89B2B]"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col items-center space-y-4">
            <button
              type="button"
              className="cursor-pointer text-xl font-bold uppercase tracking-widest text-[#344059] hover:text-[#D89B2B]"
              onClick={() => setMobileLoginOpen((open) => !open)}
              aria-expanded={mobileLoginOpen}
              aria-controls="mobile-login-menu"
            >
              Login
            </button>
            {mobileLoginOpen && (
              <div id="mobile-login-menu" className="flex flex-col items-center space-y-3">
                <a
                  href="#"
                  className="cursor-pointer text-base font-semibold uppercase tracking-wider text-[#344059] hover:text-[#D89B2B]"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileLoginOpen(false);
                  }}
                >
                  Fellows Login
                </a>
                <a
                  href="#"
                  className="cursor-pointer text-base font-semibold uppercase tracking-wider text-[#344059] hover:text-[#D89B2B]"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileLoginOpen(false);
                  }}
                >
                  Mentors Login
                </a>
              </div>
            )}
          </div>
          <HeaderButton 
            variant="primary" 
            href="/get-involved#donate"
            onClick={() => setMobileMenuOpen(false)}
          >
            Donate Today
          </HeaderButton>
        </div>
      )}
    </header>
  );
}