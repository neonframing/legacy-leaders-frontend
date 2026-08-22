"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const preferredContactOptions = ["Email", "Phone", "Text"];

const bestContactTimes = ["Morning", "Afternoon", "Evening"];

const educationOptions = [
  "High School",
  "College (currently enrolled)",
  "Bachelors",
  "Masters (enrolled or pursuing)",
  "Trade Program",
  "Other",
];

const employmentOptions = ["Yes", "No", "Job Searching", "In-School", "Other"];

const internshipOptions = ["Yes (Unpaid internship)", "Yes (Paid internship)", "No"];

const developmentAreas = [
  "Personal Finance",
  "Real Estate Knowledge",
  "Wealth Building / Strategies",
  "Professional / Career Development",
  "Leadership Training",
  "Workplace Etiquette / Readiness",
  "Entrepreneurship",
  "Emotional Intelligence",
  "Mental Health",
  "Personal Branding",
  "Business Development",
  "Mentorship",
  "Networking",
  "Creative Direction",
  "Education/Books",
  "Community Service / Volunteering",
  "Other",
];

export default function LegacyFellowsApplicationPage() {
  const currentYear = new Date().getFullYear();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    // Collect all form values using the native FormData API.
    // FormData automatically reads every named input in the form.
    // .getAll() is used for checkboxes so all selected values are captured as an array.
    const raw = new FormData(e.target);
    const payload = {
      fullName:            raw.get("fullName"),
      address1:            raw.get("address1"),
      cityStateZip:        raw.get("cityStateZip"),
      phone:               raw.get("phone"),
      bestEmail:           raw.get("bestEmail"),
      preferredContact:    raw.getAll("preferredContact").join(", "),
      bestTimeToContact:   raw.get("bestTimeToContact"),
      shirtSize:           raw.get("shirtSize"),
      birthday:            raw.get("birthday"),
      employerTitle:       raw.get("employerTitle"),
      educationLevel:      raw.get("educationLevel"),
      employmentStatus:    raw.get("employmentStatus"),
      internshipInterest:  raw.getAll("internshipInterest").join(", "),
      financialAssistance: raw.get("financialAssistance"),
      developmentAreas:    raw.getAll("developmentAreas").join(", "),
      timestamp:           new Date().toISOString(),
    };

    try {
      const response = await fetch("https://hook.us2.make.com/87zee0kqvgjrc2jlaam8ik9xe17h8hdp", {
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

      <main className="pt-28 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="mb-10 border-l-4 border-[#D89B2B] bg-white p-6 sm:p-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Legacy Fellows {currentYear} Application</p>
            <h1 className="text-3xl font-black uppercase tracking-tight text-[#344059] sm:text-4xl">
              Legacy Fellows Application
            </h1>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600 sm:text-base">
              <p>
                Hello! We are excited about your interest in becoming a Legacy Fellow. We know this program has the power to
                change lives, and we applaud you for taking the first step to growing your leadership potential.
              </p>
              <p>
                Please complete this application in one sitting. For what does not apply, write "N/A".
              </p>
              <p>
                Be on the lookout for an email scheduling a virtual interview once you have submitted your application.
                This interview is also part of the application process.
              </p>
              <p className="font-bold text-[#344059]">
                Please note: all returning Fellows must also complete the application.
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
                Thank you for applying to the Legacy Fellows program. Be on the lookout for an email scheduling your virtual interview.
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
            <section className="bg-white p-6 sm:p-8 border border-[#344059]/10">
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Contact Information</h2>
              <p className="mt-3 text-sm text-gray-600">Please provide your detailed contact information below.</p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="fullName">
                    First and Last Name *
                  </label>
                  <input id="fullName" name="fullName" type="text" required className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm" />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="address1">
                    Full Address with Apartment Number (if applicable) *
                  </label>
                  <input id="address1" name="address1" type="text" required className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="cityStateZip">
                    City, State, Zip Code *
                  </label>
                  <input id="cityStateZip" name="cityStateZip" type="text" required className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="phone">
                    Best Phone Number *
                  </label>
                  <input id="phone" name="phone" type="tel" required className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm" />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="bestEmail">
                    Best Email Address *
                  </label>
                  <input id="bestEmail" name="bestEmail" type="email" required className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm" />
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
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#344059]">Best Time to Contact You * </p>
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
                  <input id="shirtSize" name="shirtSize" type="text" required className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm" />
                </div>
              </div>
            </section>

            <section className="bg-white p-6 sm:p-8 border border-[#344059]/10">
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Getting to Know You</h2>
              <p className="mt-3 text-sm text-gray-600">We would love to know a bit more about you.</p>

              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="birthday">
                    What is your birthday? (MM-DD-YYYY) *
                  </label>
                  <input id="birthday" name="birthday" type="text" required placeholder="MM-DD-YYYY" className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="employerTitle">
                    Current Employer and Job Title *
                  </label>
                  <input id="employerTitle" name="employerTitle" type="text" required className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm" />
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#344059]">Highest level of education completed * </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {educationOptions.map((option) => (
                    <label key={option} className="flex items-center gap-3 text-sm text-gray-700">
                      <input type="radio" name="educationLevel" value={option} className="h-4 w-4 accent-[#D89B2B]" required />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#344059]">Are you currently employed? * </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {employmentOptions.map((option) => (
                    <label key={option} className="flex items-center gap-3 text-sm text-gray-700">
                      <input type="radio" name="employmentStatus" value={option} className="h-4 w-4 accent-[#D89B2B]" required />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white p-6 sm:p-8 border border-[#344059]/10">
              <h2 className="text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Areas of Interest</h2>
              <p className="mt-3 text-sm text-gray-600">Let us know what you are interested in as we consider pairing you with the right mentor.</p>

              <div className="mt-6">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#344059]">
                  Would you be interested in an internship after the program is over? (Check all that apply) *
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {internshipOptions.map((option) => (
                    <label key={option} className="flex items-center gap-3 text-sm text-gray-700">
                      <input type="checkbox" name="internshipInterest" value={option} className="h-4 w-4 accent-[#D89B2B]" />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#344059]">
                  Would you need a scholarship or financial assistance for participation in our program? *
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
                  <label className="flex items-center gap-3 text-sm text-gray-700">
                    <input type="radio" name="financialAssistance" value="Yes" className="h-4 w-4 accent-[#D89B2B]" required />
                    Yes
                  </label>
                  <label className="flex items-center gap-3 text-sm text-gray-700">
                    <input type="radio" name="financialAssistance" value="No" className="h-4 w-4 accent-[#D89B2B]" required />
                    No
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#344059]">
                  What areas of development are you most interested in developing? (Check all that apply) *
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {developmentAreas.map((area) => (
                    <label key={area} className="flex items-center gap-3 text-sm text-gray-700">
                      <input type="checkbox" name="developmentAreas" value={area} className="h-4 w-4 accent-[#D89B2B]" />
                      {area}
                    </label>
                  ))}
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
                  {!isSubmitting && <Send size={14} className="group-hover:translate-x-1 transition-transform" />}
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
