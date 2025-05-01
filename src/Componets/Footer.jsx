import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";


const Footer = () => {
  const form = useRef();
  const recaptchaRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const sendEmail = async (e) => {
    e.preventDefault();
    const email = form.current.email.value;

    if (!isValidEmail(email)) {
      toast.error("Enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const recaptchaToken = await recaptchaRef.current.executeAsync();
      if (!recaptchaToken) {
        toast.error("reCAPTCHA verification failed.");
        setIsSubmitting(false);
        return;
      }

      emailjs
        .sendForm("service_875ouap", "template_vukgtjb", form.current, {
          publicKey: "D-cn2juO2mzcrewiO",
        })
        .then(
          () => {
            toast.success("Email sent successfully!");
            form.current.reset();
            recaptchaRef.current.reset();
            setIsSubmitting(false);
          },
          (error) => {
            toast.error("Failed to send email. Try again.");
            console.error("EmailJS Error:", error);
            setIsSubmitting(false);
          }
        );
    } catch (err) {
      toast.error("Unexpected error occurred.");
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { Icon: FaFacebook, link: "https://facebook.com", label: "Facebook" },
    { Icon: FaTwitter, link: "https://twitter.com", label: "Twitter" },
    { Icon: FaLinkedin, link: "https://linkedin.com", label: "LinkedIn" },
    { Icon: FaInstagram, link: "https://instagram.com", label: "Instagram" },
  ];

  const quickLinks = ["Home", "About", "Services", "Projects", "Contact"];

  return (
    <footer className="bg-[#1877F2] mt-10 text-white pt-10 pb-2">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 items-stretch">
          {/* Company Info */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <h2 className="text-3xl font-bold mb-3">Constructo</h2>
              <p className="text-gray-200">
                Cunstructo helps users easily find skilled workers for home and building projects.
                From construction to repairs, connect with trusted professionals near you.
                Simple, reliable, and built for all your housing needs.
              </p>
            </div>
            <div className="flex space-x-4 pb-4 mt-4">
              {socialLinks.map(({ Icon, link, label }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-200 hover:text-white transition"
                >
                  <Icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-gray-200 hover:text-white transition"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
              <div className="space-y-3 text-gray-200">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="mt-1 mr-2 text-white" />
                  <span>123 Construction Ave, Build City BC 12345</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="mr-2 text-white" />
                  <a href="mailto:info@constructo.com" className="hover:text-white">
                    info@constructo.com
                  </a>
                </div>
                <div className="flex items-center">
                  <FaPhoneAlt className="mr-2 text-white" />
                  <a href="tel:+1234567890" className="hover:text-white">
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2 text-white" />
                  <span>Mon–Fri: 8 AM – 6 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Email Form */}
          <div className="flex flex-col justify-between h-full">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="flex flex-col justify-between h-full bg-[#165DBF] p-4 rounded-lg space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full p-2 rounded-md bg-[#165DBF] border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold">Subject</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Your Subject"
                    className="w-full p-2 rounded-md bg-[#165DBF] border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-semibold">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your message..."
                  className="w-full p-2 rounded-md bg-[#165DBF] border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex justify-center items-center gap-2 p-2 bg-white text-[#1877F2] font-semibold rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send"} <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
