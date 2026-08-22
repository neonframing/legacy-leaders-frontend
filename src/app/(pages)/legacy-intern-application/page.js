"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const educationLevels = [
  "High School",
  "College (currently enrolled)",
  "Bachelors",
  "Masters (enrolled or pursuing)",
  "Trade Program",
];

const internshipTypes = ["Paid internship", "Unpaid internship", "None"];

export default function LegacyInternApplicationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const raw = new FormData(e.target);
    const payload = {
      fullName:               raw.get("fullName"),
      addressCityStateZip:    raw.get("addressCityStateZip"),
      preferredEmail:         raw.get("preferredEmail"),
      phone:                  raw.get("phone"),
      businessDepartment:     raw.get("businessDepartment"),
      educationLevel:         raw.get("educationLevel"),
      internshipType:         raw.getAll("internshipType").join(", "),
      socialHandles:          raw.get("socialHandles"),
      idealBackground:        raw.get("idealBackground"),
      developmentAreas:       raw.get("developmentAreas"),
      opportunityDescription: raw.get("opportunityDescription"),
      internSchedule:         raw.get("internSchedule"),
      additionalBenefits:     raw.get("additionalBenefits"),
      timestamp:              new Date().toISOString(),
    };

    try {
      const response = await fetch("https://hook.us2.make.com/j9dub6demfu2lbhjxztrtxadzih0po48", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 409) {
        setErrorMessage("An application with this email address has already been submitted.");
        return;
      }

      if (response.ok) {
        setIsSubmitted(true);
        e.target.reset();
      } else {
        setErrorMessage("Something went wrong on our end. Please try again later.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f1] font-sans text-[#344059] selection:bg-[#D89B2B] selection:text-white">
      <SiteHeader />

      <main className="pb-16 pt-28 lg:pb-24 lg:pt-40">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="mb-10 border-l-4 border-[#D89B2B] bg-white p-6 sm:p-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Internship Application</p>
            <h1 className="text-3xl font-black uppercase tracking-tight text-[#344059] sm:text-4xl">
              Legacy Intern Host Application
            </h1>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600 sm:text-base">
              <p>
                Thanks for your interest. Please fill out this application if you have a potential internship opportunity
                for a young adult from one of our programs.
              </p>
              <p>
                Please complete the application in one sitting. Fields marked with an asterisk are required.
              </p>
            </div>
          </div>

          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center min-h-[360px] text-center bg-white p-10 border border-[#344059]/10 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-5 border border-green-100">
                <Check size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-[#344059] mb-3">Application Received</h3>
              <p className="text-gray-600 text-base max-w-md mx-auto">
                Thank you for submitting your internship host application. A member of our team will be in touch with you shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-8 text-sm font-bold uppercase tracking-widest text-[#D89B2B] hover:text-[#344059] transition-colors"
              >
                Submit another application
              </button>
            </div>
          ) : (
          <form className="space-y-10" onSubmit={handleSubmit}>
            <section className="border border-[#344059]/10 bg-white p-6 sm:p-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Contact Information</h2>
              <p className="mt-3 text-sm text-gray-600">Please provide your detailed contact information below.</p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="fullName">
                    First and Last Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="addressCityStateZip">
                    Full Address with City, State, Zip Code *
                  </label>
                  <input
                    id="addressCityStateZip"
                    name="addressCityStateZip"
                    type="text"
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="preferredEmail">
                    Preferred Email *
                  </label>
                  <input
                    id="preferredEmail"
                    name="preferredEmail"
                    type="email"
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="phone">
                    Best Phone Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="businessDepartment">
                    What is the name of your business and department (if applicable)? *
                  </label>
                  <input
                    id="businessDepartment"
                    name="businessDepartment"
                    type="text"
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>
              </div>
            </section>

            <section className="border border-[#344059]/10 bg-white p-6 sm:p-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Internship Preferences</h2>
              <p className="mt-3 text-sm text-gray-600">Help us match your opportunity with the right young adult.</p>

              <div className="mt-6 space-y-6">
                <div>
                  <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#344059]">
                    What is the highest level of education you would like your intern to have? *
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {educationLevels.map((level) => (
                      <label key={level} className="flex items-center gap-3 text-sm text-gray-700">
                        <input
                          type="radio"
                          name="educationLevel"
                          value={level}
                          className="h-4 w-4 accent-[#D89B2B]"
                          required
                        />
                        {level}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#344059]">
                    What type of internship opportunities are you able to provide? (Check all that apply) *
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {internshipTypes.map((type) => (
                      <label key={type} className="flex items-center gap-3 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          name="internshipType"
                          value={type}
                          className="h-4 w-4 accent-[#D89B2B]"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="socialHandles">
                    Please provide your company website *
                  </label>
                  <textarea
                    id="socialHandles"
                    name="socialHandles"
                    rows={3}
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="idealBackground">
                    Ideally, what type of background would you like your intern to have experience in? *
                  </label>
                  <textarea
                    id="idealBackground"
                    name="idealBackground"
                    rows={3}
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="developmentAreas">
                    What areas of development are you able to offer your intern? (Business / Health / Budgeting / etc.) *
                  </label>
                  <textarea
                    id="developmentAreas"
                    name="developmentAreas"
                    rows={3}
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="opportunityDescription">
                    Please provide a brief description of the internship opportunity you are able to provide *
                  </label>
                  <textarea
                    id="opportunityDescription"
                    name="opportunityDescription"
                    rows={4}
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="internSchedule">
                    What schedule and number of hours would you like your intern to work? *
                  </label>
                  <textarea
                    id="internSchedule"
                    name="internSchedule"
                    rows={3}
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="additionalBenefits">
                    Are there any additional benefits for your intern to consider? *
                  </label>
                  <textarea
                    id="additionalBenefits"
                    name="additionalBenefits"
                    rows={3}
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs font-medium text-gray-500">* Required fields</p>
              <div className="flex flex-col items-end gap-3">
                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-md animate-in fade-in w-full">
                    {errorMessage}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-3 bg-[#344059] px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#D89B2B] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                  {!isSubmitting && <Send size={14} />}
                </button>
              </div>
            </div>
          </form>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
