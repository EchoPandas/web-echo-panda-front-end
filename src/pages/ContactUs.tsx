import React, { useState, useRef, useEffect } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function ContactUs() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (subject: string) => {
    setFormData({ ...formData, subject });
  };

  // Auto-expand textarea effect
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      // Set height based on scroll height, capped at 200px
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [formData.message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert("Form Submitted! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans relative overflow-hidden flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      
      {/* Background Gradient Orbs - hide on very small screens */}
      <div className="hidden sm:block absolute top-[-8%] right-[-4%] w-[320px] h-[320px] bg-gradient-to-br from-teal-400 to-emerald-300 rounded-full blur-[64px] opacity-14 pointer-events-none z-0" />
      <div className="hidden sm:block absolute bottom-[-8%] left-[-8%] w-[300px] h-[300px] bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full blur-[72px] opacity-18 pointer-events-none z-0" />
      <div className="hidden md:block absolute top-[18%] left-[8%] w-[140px] h-[140px] bg-purple-600 rounded-full blur-[60px] opacity-12 pointer-events-none z-0" />
      <div className="hidden md:block absolute bottom-[18%] right-[26%] w-[140px] h-[140px] bg-pink-600 rounded-full blur-[60px] opacity-12 pointer-events-none z-0" />
       
      {/* Header Section */}
        <div className="text-center mb-12 relative">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Contact Us</h1>
           <p className="text-gray-400 text-lg">Any question or remarks? Just write us a message!</p>
         </div>

      {/* Main Card - narrower on small screens */}
      <div className="w-full max-w-xl sm:max-w-2xl bg-[#2a2a2a]/30 backdrop-blur-xl border border-white/8 rounded-2xl shadow-lg overflow-hidden z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Left Column: Contact Info */}
          <div className="bg-indigo-900/36 rounded-xl p-4 md:p-6 flex flex-col justify-between relative overflow-hidden m-1">
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-semibold mb-3">Contact Information</h2>
              <p className="text-gray-300 mb-6 text-sm">Say something to start a live chat!</p>
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <FaPhone className="w-5 h-5 text-teal-400 mt-1" />
                  <span className="text-gray-200">+91 98765 43210</span>
                </div>
                <div className="flex items-start space-x-3">
                  <FaEnvelope className="w-5 h-5 text-teal-400 mt-1" />
                  <span className="text-gray-200">contact@EchoPanda.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-teal-400 mt-1 shrink-0" />
                  <span className="text-gray-200 leading-relaxed text-xs">
                    House 24, Street 352,<br />
                    Sangkat Boeung Keng Kang I,<br />
                    Phnom Penh, Cambodia
                  </span>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-white/6 hover:bg-teal-500 hover:text-white flex items-center justify-center transition-all duration-200">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/6 hover:bg-pink-500 hover:text-white flex items-center justify-center transition-all duration-200">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/6 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all duration-200">
                <FaLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-2 p-4 md:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b border-gray-600 text-gray-200 focus:border-teal-400 focus:outline-none pb-1 pt-4 text-sm"
                    placeholder=" "
                    required
                  />
                  <label className="absolute left-0 top-1 text-gray-400 text-xs peer-focus:text-teal-400 peer-placeholder-shown:text-sm transition-all pointer-events-none">
                    First Name
                  </label>
                </div>

                <div className="relative">
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b border-gray-600 text-gray-200 focus:border-teal-400 focus:outline-none pb-1 pt-4 text-sm"
                    placeholder=" "
                    required
                  />
                  <label className="absolute left-0 top-1 text-gray-400 text-xs peer-focus:text-teal-400 peer-placeholder-shown:text-sm transition-all pointer-events-none">
                    Last Name
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b border-gray-600 text-gray-200 focus:border-teal-400 focus:outline-none pb-1 pt-4 text-sm"
                    placeholder=" "
                    required
                  />
                  <label className="absolute left-0 top-1 text-gray-400 text-xs peer-focus:text-teal-400 peer-placeholder-shown:text-sm transition-all pointer-events-none">
                    Email
                  </label>
                </div>

                <div className="relative">
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="peer w-full bg-transparent border-b border-gray-600 text-gray-200 focus:border-teal-400 focus:outline-none pb-1 pt-4 text-sm"
                    placeholder=" "
                  />
                  <label className="absolute left-0 top-1 text-gray-400 text-xs peer-focus:text-teal-400 peer-placeholder-shown:text-sm transition-all pointer-events-none">
                    Phone Number
                  </label>
                </div>
              </div>

              {/* Subject Selection */}
              <div>
                <label className="block text-gray-400 text-sm mb-1">Subject</label>
                <div className="flex flex-wrap gap-3">
                  {['General Inquiry', 'Support', 'Feedback', 'Other'].map((option) => (
                    <label key={option} className={`flex items-center gap-2 text-sm px-2 py-1 rounded-md cursor-pointer ${formData.subject === option ? 'bg-teal-600 text-white' : 'text-gray-300 bg-white/3'}`}>
                      <input
                        type="radio"
                        name="subject"
                        value={option}
                        checked={formData.subject === option}
                        onChange={() => handleSubjectChange(option)}
                        className="hidden"
                      />
                      <span className="w-3 h-3 rounded-full border inline-block" />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <textarea 
                  ref={textareaRef}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="peer w-full bg-transparent border-b border-gray-600 text-gray-200 focus:border-teal-400 focus:outline-none pb-1 pt-4 text-sm resize-y max-h-48"
                  placeholder=" "
                  rows={3}
                  required
                />
                <label className="absolute left-0 top-1 text-gray-400 text-xs peer-focus:text-teal-400 peer-placeholder-shown:text-sm transition-all pointer-events-none">
                  Message
                </label>
              </div>

              {/* Button */}
              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md text-sm shadow-sm"
                >
                  Send
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
export default ContactUs;