import { ArrowRight } from "lucide-react";

import Link from "next/link";

import BrandLogo from "@/components/BrandLogo";

export default function SiteFooter() {
  return (
    <footer id="contact" className="bg-[#1e2533] pb-10 pt-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6 inline-block bg-white p-4">
              <BrandLogo />
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Empowering the next generation of leaders through mentorship, fellowship, and corporate coaching.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#D89B2B]">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/our-story" className="text-gray-400 transition-colors hover:text-white">About Us</Link></li>
              <li><Link href="/our-programs" className="text-gray-400 transition-colors hover:text-white">Our Programs</Link></li>
              <li><Link href="/get-involved" className="text-gray-400 transition-colors hover:text-white">Get Involved</Link></li>
              <li><Link href="#" className="text-gray-400 transition-colors hover:text-white">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#D89B2B]">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>info@mylegacyleaders.org</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Corporate Blvd,<br />Suite 400<br />Chicago, IL 60601</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-[#D89B2B]">Newsletter</h4>
            <p className="mb-4 text-sm text-gray-400">Stay updated with our latest programs and impact.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="w-full border border-gray-600 bg-transparent px-4 py-2 text-sm text-white focus:border-[#D89B2B] focus:outline-none"
              />
              <button className="bg-[#D89B2B] px-4 py-2 text-white transition-colors hover:bg-white hover:text-[#344059]" aria-label="Submit email">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-gray-700 pt-8 text-sm text-gray-500 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Legacy Leaders. All rights reserved.</p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}