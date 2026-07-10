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

          <form className="space-y-10" action="#" method="post" encType="multipart/form-data">
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
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-3 bg-[#344059] px-8 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#D89B2B]"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
