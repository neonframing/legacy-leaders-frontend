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

          <form className="space-y-10" action="#" method="post" encType="multipart/form-data">
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

              <div className="mt-6">
                <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="socialHandles">
                  Please provide all your social media handles (Facebook / Instagram / TikTok / LinkedIn / etc.)*
                </label>
                <textarea
                  id="socialHandles"
                  name="socialHandles"
                  rows={3}
                  required
                  className="w-full border border-[#344059]/15 bg-[#f8f6f1] px-4 py-3 text-sm"
                />
              </div>

              <div className="mt-6">
                <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#344059]" htmlFor="headshot">
                  Share one great headshot or selfie that we can share on our website and social media outlets if you are
                  selected as a Mentor. *
                </label>
                <div className="rounded-xl border border-dashed border-[#344059]/30 bg-[#f8f6f1] px-4 py-4 sm:px-5 sm:py-5">
                  <input
                    id="headshot"
                    name="headshot"
                    type="file"
                    accept="image/*"
                    required
                    className="w-full cursor-pointer text-sm text-[#344059] file:mr-4 file:rounded-md file:border file:border-[#344059] file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:normal-case file:tracking-normal file:text-[#344059] file:transition-colors hover:file:border-[#D89B2B] hover:file:text-[#D89B2B]"
                  />
                  <p className="mt-3 text-xs text-gray-600">Upload one image file, or drag and drop it here.</p>
                </div>
              </div>
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
                    What industry do you work in? (Please explain) *
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
