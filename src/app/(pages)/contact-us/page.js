"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const interestOptions = [
  "Join our email/mail list",
  "Volunteer",
  "Join the Board",
  "Join the Advisory Board",
  "Join the Young Professionals Board",
  "Sign up for Coaching",
  "Request a Trainer",
  "Become a Partner",
  "Become a Mentor",
  "Become a Speaker",
  "Career Development"
];

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    employer: "",
    email: "",
    phone: "",
    streetAddress: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    questions: "",
    interests: [],
    otherInterest: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmittingSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (option) => {
    setFormData((prev) => {
      const currentInterests = prev.interests;
      if (currentInterests.includes(option)) {
        return { ...prev, interests: currentInterests.filter((i) => i !== option) };
      } else {
        return { ...prev, interests: [...currentInterests, option] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate an API call / webhook to Make.com or Sanity
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmittingSuccess(true);
    // In a real implementation, you would route this data to your backend here
  };

  return (
    <div className="min-h-screen bg-[#f8f6f1] font-sans text-[#344059] selection:bg-[#D89B2B] selection:text-white">
      <SiteHeader />

      <main className="pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24">
            
            {/* Left Column: Contact Info & Copy */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[2px] bg-[#D89B2B]"></span>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#D89B2B]">Connect With Us</p>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-[#344059] mb-8 leading-[1.1]">
                Let's build a <br />legacy together.
              </h1>
              <p className="text-lg leading-relaxed text-gray-600 mb-12">
                Whether you are looking to accelerate your own growth, invest in the leaders of tomorrow, or explore partnership opportunities, we would love to connect with you. Please fill out the form, and a member of our team will be in touch within two business days.
              </p>

              <div className="space-y-8 border-t border-[#344059]/10 pt-12">
                <div className="flex items-start gap-4 group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-white shadow-sm border border-[#344059]/10 group-hover:bg-[#344059] transition-colors duration-300">
                    <Mail className="text-[#D89B2B] group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#D89B2B] mb-1">Email</p>
                    <a href="mailto:info@mylegacyleaders.org" className="text-[#344059] font-medium hover:text-[#D89B2B] transition-colors">info@mylegacyleaders.org</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-white shadow-sm border border-[#344059]/10 group-hover:bg-[#344059] transition-colors duration-300">
                    <Phone className="text-[#D89B2B] group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#D89B2B] mb-1">Phone</p>
                    <a href="tel:+15551234567" className="text-[#344059] font-medium hover:text-[#D89B2B] transition-colors">+1 (773) 217-9528</a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-white shadow-sm border border-[#344059]/10 group-hover:bg-[#344059] transition-colors duration-300">
                    <MapPin className="text-[#D89B2B] group-hover:text-white transition-colors duration-300" size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#D89B2B] mb-1">Headquarters</p>
                    <p className="text-[#344059] font-medium leading-relaxed">
                      Chicago, IL 60601
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: The Form */}
            <div className="bg-white p-8 sm:p-12 shadow-[0_24px_80px_rgba(52,64,89,0.08)] border border-[#344059]/5">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 border border-green-100">
                    <Check size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tight text-[#344059] mb-4">Request Received</h3>
                  <p className="text-gray-600 text-lg max-w-md mx-auto">
                    Thank you for reaching out to Legacy Leaders. A member of our team will review your information and follow up with you shortly.
                  </p>
                  <button 
                    onClick={() => setIsSubmittingSuccess(false)}
                    className="mt-10 text-sm font-bold uppercase tracking-widest text-[#D89B2B] hover:text-[#344059] transition-colors"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
                  
                  {/* General Info */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="*First Name"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full bg-[#f8f6f1] border border-[#344059]/10 px-5 py-4 text-[#344059] focus:outline-none focus:border-[#D89B2B] focus:ring-1 focus:ring-[#D89B2B] transition-all placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="*Last Name"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full bg-[#f8f6f1] border border-[#344059]/10 px-5 py-4 text-[#344059] focus:outline-none focus:border-[#D89B2B] focus:ring-1 focus:ring-[#D89B2B] transition-all placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <input
                          type="text"
                          name="profession"
                          placeholder="*Profession"
                          required
                          value={formData.profession}
                          onChange={handleInputChange}
                          className="w-full bg-[#f8f6f1] border border-[#344059]/10 px-5 py-4 text-[#344059] focus:outline-none focus:border-[#D89B2B] focus:ring-1 focus:ring-[#D89B2B] transition-all placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          name="employer"
                          placeholder="*Employer"
                          required
                          value={formData.employer}
                          onChange={handleInputChange}
                          className="w-full bg-[#f8f6f1] border border-[#344059]/10 px-5 py-4 text-[#344059] focus:outline-none focus:border-[#D89B2B] focus:ring-1 focus:ring-[#D89B2B] transition-all placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="*Email Address"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full bg-[#f8f6f1] border border-[#344059]/10 px-5 py-4 text-[#344059] focus:outline-none focus:border-[#D89B2B] focus:ring-1 focus:ring-[#D89B2B] transition-all placeholder:text-gray-400"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="*Phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-[#f8f6f1] border border-[#344059]/10 px-5 py-4 text-[#344059] focus:outline-none focus:border-[#D89B2B] focus:ring-1 focus:ring-[#D89B2B] transition-all placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Block */}
                  <div className="space-y-6 pt-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#344059]">
                      <span className="text-[#D89B2B]">*</span> Address
                    </h3>
                    <input
                      type="text"
                      name="streetAddress"
                      placeholder="*Street Address"
                      required
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      className="w-full bg-[#f8f6f1] border border-[#344059]/10 px-5 py-4 text-[#344059] focus:outline-none focus:border-[#D89B2B] focus:ring-1 focus:ring-[#D89B2B] transition-all placeholder:text-gray-400"
                    />
                    <input
                      type="text"
                      name="addressLine2"
                      placeholder="Address line 2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      className="w-full bg-[#f8f6f1] border border-[#344059]/10 px-5 py-4 text-[#344059] focus:outline-none focus:border-[#D89B2B] focus:ring-1 focus:ring-[#D89B2B] transition-all placeholder:text-gray-400"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <input
                        type="text"
                        name="city"
                        placeholder="*City"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-[#f8f6f1] border border-[#344059]/10 px-5 py-4 text-[#344059] focus:outline-none focus:border-[#D89B2B] focus:ring-1 focus:ring-[#D89B2B] transition-all placeholder:text-gray-400"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="*State / Province"
                        required
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full bg-[#f8f6f1] border border-[#344059]/10 px-5 py-4 text-[#344059] focus:outline-none focus:border-[#D89B2B] focus:ring-1 focus:ring-[#D89B2B] transition-all placeholder:text-gray-400"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <input
                        type="text"
                        name="postalCode"
                        placeholder="*Postal / Zip Code"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full bg-[#f8f6f1] border border-[#344059]/10 px-5 py-4 text-[#344059] focus:outline-none focus:border-[#D89B2B] focus:ring-1 focus:ring-[#D89B2B] transition-all placeholder:text-gray-400"
                      />
                      <select
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full bg-[#f8f6f1] border border-[#344059]/10 px-5 py-4 text-[#344059] focus:outline-none focus:border-[#D89B2B] focus:ring-1 focus:ring-[#D89B2B] transition-all appearance-none"
                      >
                        <option value="" disabled className="text-gray-400">- *Country -</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        {/* Add more countries as needed */}
                      </select>
                    </div>
                  </div>

                  {/* Open Questions */}
                  <div className="pt-4">
                    <textarea
                      name="questions"
                      placeholder="Questions or Comments?"
                      rows={4}
                      value={formData.questions}
                      onChange={handleInputChange}
                      className="w-full bg-[#f8f6f1] border border-[#344059]/10 px-5 py-4 text-[#344059] focus:outline-none focus:border-[#D89B2B] focus:ring-1 focus:ring-[#D89B2B] transition-all placeholder:text-gray-400 resize-y"
                    ></textarea>
                  </div>

                  {/* Checkbox Interests */}
                  <div className="space-y-5 pt-4">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#344059] mb-6">
                      <span className="text-[#D89B2B]">*</span> I am interested in (check all that apply):
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                      {interestOptions.map((option) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-5 h-5 flex items-center justify-center border transition-colors ${
                            formData.interests.includes(option) 
                            ? 'bg-[#D89B2B] border-[#D89B2B]' 
                            : 'bg-[#f8f6f1] border-[#344059]/20 group-hover:border-[#D89B2B]'
                          }`}>
                            {formData.interests.includes(option) && <Check size={14} className="text-white" />}
                          </div>
                          <span className="text-sm text-gray-700 select-none">{option}</span>
                        </label>
                      ))}
                    </div>

                    {/* "Other" Text Input */}
                    <div className="flex items-center gap-3 mt-4">
                      <label className="text-sm text-gray-700 whitespace-nowrap">Other:</label>
                      <input
                        type="text"
                        name="otherInterest"
                        value={formData.otherInterest}
                        onChange={handleInputChange}
                        className="flex-1 bg-transparent border-b border-[#344059]/20 py-1 text-[#344059] focus:outline-none focus:border-[#D89B2B] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting || formData.interests.length === 0}
                      className="w-full sm:w-auto px-12 py-5 bg-[#344059] text-white font-bold uppercase tracking-widest text-sm hover:bg-[#D89B2B] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 group"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                      {!isSubmitting && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    </button>
                    {formData.interests.length === 0 && (
                      <p className="text-xs text-red-500 mt-3">Please select at least one area of interest.</p>
                    )}
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}