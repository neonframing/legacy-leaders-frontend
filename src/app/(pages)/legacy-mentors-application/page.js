"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const preferredContactOptions = ["Email", "Phone", "Text"];

const bestContactTimes = ["Morning", "Afternoon", "Evening"];

const internshipAvailabilityOptions = [
  "Paid internship",
  "Unpaid internship",
  "None (Not at this time)",
  "Other",
];

export default function LegacyMentorsApplicationPage() {
  const currentYear = new Date().getFullYear();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const raw = new FormData(e.target);
    const payload = {
      fullName:                    raw.get("fullName"),
      address1:                    raw.get("address1"),
      cityStateZip:                raw.get("cityStateZip"),
      email:                       raw.get("email"),
      companyTitle:                raw.get("companyTitle"),
      phone:                       raw.get("phone"),
      preferredContact:            raw.getAll("preferredContact").join(", "),
      bestTimeToContact:           raw.get("bestTimeToContact"),
      shirtSize:                   raw.get("shirtSize"),
      internshipAvailability:      raw.getAll("internshipAvailability").join(", "),
      internshipAvailabilityOther: raw.get("internshipAvailabilityOther"),
      birthday:                    raw.get("birthday"),
      industry:                    raw.get("industry"),
      leadershipSignificance:      raw.get("leadershipSignificance"),
      mentorExperience:            raw.get("mentorExperience"),
      timestamp:                   new Date().toISOString(),
    };

    try {
      const response = await fetch("https://hook.us2.make.com/g34fdwdw2cs6k1haolpx101z7ub8yqf2", {
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
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">
              Legacy Mentor {currentYear} Application
            </p>
            <h1 className="text-3xl font-black uppercase tracking-tight text-[#344059] sm:text-4xl">
              Legacy Mentors Application
            </h1>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600 sm:text-base">
              <p>
                Hello! We are excited about your interest in becoming a Legacy Mentor. We know this program has the power to
                change lives, and applaud you for taking the first step to impacting young adults with our upcoming cycle.
              </p>
              <p>
                Please complete this application in one sitting as your answers are not autosaved. Please fill out every
                field and write "N/A" for anything that does not apply.
              </p>
              <p>
                Be on the lookout for an email scheduling a virtual interview once you have submitted your application.
                This will also be part of the application process.
              </p>
              <p className="font-bold text-[#344059]">
                Please note: all returning Mentors must also complete the application.
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
                Thank you for applying to become a Legacy Mentor. Be on the lookout for an email scheduling your virtual interview.
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
              <p className="mt-3 text-sm text-gray-600">Please provide your detailed contact information in the fields below.</p>

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
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="address1">
                    Full Address with apartment number (if applicable) *
                  </label>
                  <input
                    id="address1"
                    name="address1"
                    type="text"
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="cityStateZip">
                    City, State, Zip Code *
                  </label>
                  <input
                    id="cityStateZip"
                    name="cityStateZip"
                    type="text"
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="email">
                    What is your email address? *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="companyTitle">
                    Company name and title *
                  </label>
                  <input
                    id="companyTitle"
                    name="companyTitle"
                    type="text"
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
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#344059]">
                  Preferred Form of Contact (Select all that apply) *
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {preferredContactOptions.map((option) => (
                    <label key={option} className="flex items-center gap-3 text-sm text-gray-700">
                      <input type="checkbox" name="preferredContact" value={option} className="h-4 w-4 accent-[#D89B2B]" />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#344059]">Best Time to Contact You *</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {bestContactTimes.map((time) => (
                    <label key={time} className="flex items-center gap-3 text-sm text-gray-700">
                      <input type="radio" name="bestTimeToContact" value={time} className="h-4 w-4 accent-[#D89B2B]" required />
                      {time}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="shirtSize">
                    What is your t-shirt size? *
                  </label>
                  <input
                    id="shirtSize"
                    name="shirtSize"
                    type="text"
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#344059]">
                    Does your company offer any internship opportunities for one of our Fellows? (Check all that apply) *
                  </p>
                  <div className="space-y-3 rounded-lg border border-[#344059]/10 bg-[#f8f6f1] p-4">
                    {internshipAvailabilityOptions.map((option) => (
                      <label key={option} className="flex items-center gap-3 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          name="internshipAvailability"
                          value={option}
                          className="h-4 w-4 accent-[#D89B2B]"
                        />
                        {option}
                      </label>
                    ))}
                    <input
                      type="text"
                      name="internshipAvailabilityOther"
                      placeholder="If other, please specify"
                      className="mt-1 w-full border border-[#344059]/15 bg-white px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-gray-500">
                You can also complete an internship request by visiting the Request an Intern form.
              </p>
            </section>

            <section className="border border-[#344059]/10 bg-white p-6 sm:p-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Getting to Know You</h2>
              <p className="mt-3 text-sm text-gray-600">We would love to know a bit more about you. Please answer below.</p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="birthday">
                    What is your birthday? (MM-DD-YYYY)
                  </label>
                  <input
                    id="birthday"
                    name="birthday"
                    type="text"
                    placeholder="MM-DD-YYYY"
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="industry">
                    What industry do you work in? *
                  </label>
                  <input
                    id="industry"
                    name="industry"
                    type="text"
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>
              </div>
            </section>

            <section className="border border-[#344059]/10 bg-white p-6 sm:p-8">
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">In Your Own Words</h2>
              <p className="mt-3 text-sm text-gray-600">
                Share more insights with us about your experiences. Returning Mentors may write "NA" where noted.
              </p>

              <div className="mt-6 space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="leadershipSignificance">
                    What is the significance of leadership development in the life of a young adult? *
                  </label>
                  <p className="mb-2 text-xs text-gray-500">If you are a returning Mentor, you may enter "NA".</p>
                  <textarea
                    id="leadershipSignificance"
                    name="leadershipSignificance"
                    rows={5}
                    required
                    className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="mentorExperience">
                    Have you ever been a mentor in any other setting? If so, share your experiences and what you learned. *
                  </label>
                  <p className="mb-2 text-xs text-gray-500">If you are a returning Mentor, you may enter "NA".</p>
                  <textarea
                    id="mentorExperience"
                    name="mentorExperience"
                    rows={5}
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
