"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, Check, Loader2 } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

const STORAGE_KEY = "ll_newsletter_dismissed";

export default function NewsletterModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  // Show modal after 3 seconds, but only if the user hasn't dismissed it before
  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  // Close on Escape key
  useEffect(() => {
    if (!isVisible) return;
    const onKey = (e) => { if (e.key === "Escape") dismiss(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isVisible]);

  // Lock background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = isVisible ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isVisible]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        // Auto-close after 2.5 seconds on success
        setTimeout(() => {
          setIsVisible(false);
          localStorage.setItem(STORAGE_KEY, "true");
        }, 2500);
      } else {
        const data = await response.json();
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("A network error occurred. Please try again.");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#344059]/80 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-300 overflow-hidden">

        {/* Gold accent bar */}
        <div className="h-1 w-full bg-[#D89B2B]" />

        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-[#344059] transition-colors hover:bg-[#344059] hover:text-white z-10"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="p-8 sm:p-10">
          {status === "success" ? (
            /* ── Success State ── */
            <div className="flex flex-col items-center text-center py-6 animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5 border border-green-100">
                <Check size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-[#344059] mb-2">
                You're In!
              </h3>
              <p className="text-gray-500 text-sm">
                Welcome to the Legacy Leaders community. Stay tuned for updates.
              </p>
            </div>
          ) : (
            /* ── Form State ── */
            <>
              {/* Logo */}
              <div className="mb-6">
                <BrandLogo />
              </div>

              {/* Headline */}
              <div className="flex items-center gap-3 mb-2">
                <span className="w-8 h-[2px] bg-[#D89B2B] shrink-0" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D89B2B]">
                  Stay Connected
                </p>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#344059] mb-3 leading-tight">
                Join the Legacy<br />Leaders Community
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-7">
                Get the latest on programs, events, and impact stories delivered straight to your inbox.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    disabled={status === "loading"}
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm text-[#344059] focus:border-[#D89B2B] focus:outline-none focus:ring-1 focus:ring-[#D89B2B] disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="flex min-w-[52px] items-center justify-center bg-[#344059] px-4 text-white transition-colors hover:bg-[#D89B2B] disabled:opacity-50"
                    aria-label="Subscribe"
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <ArrowRight className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {errorMessage && (
                  <p className="text-xs text-red-500 animate-in fade-in">{errorMessage}</p>
                )}
              </form>

              {/* Dismiss link */}
              <button
                onClick={dismiss}
                className="mt-5 text-xs text-gray-400 hover:text-[#344059] transition-colors"
              >
                No thanks, I'll skip for now
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
