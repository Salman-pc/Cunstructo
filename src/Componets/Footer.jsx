import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPaperPlane, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from "react-icons/fa";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!email || !message) {
      alert("Please enter both email and message.");
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      window.location.href = `mailto:mspc421@gmail.com?subject=Inquiry&body=${encodeURIComponent(message)}`;
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }, 500);
  };

  const socialLinks = [
    { Icon: FaFacebook, link: "https://facebook.com", label: "Facebook" },
    { Icon: FaTwitter, link: "https://twitter.com", label: "Twitter" },
    { Icon: FaLinkedin, link: "https://linkedin.com", label: "LinkedIn" },
    { Icon: FaInstagram, link: "https://instagram.com", label: "Instagram" },
  ];

  const quickLinks = ["Home", "About", "Services", "Projects", "Contact"];

  return (
    <footer className="bg-[#1877F2] mt-10 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Company Info */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-3">Constructo</h2>
            <p className="text-gray-200">Building the future with precision and excellence since 2003.</p>
            <div className="flex space-x-3 mt-3">
              {socialLinks.map(({ Icon, link, label }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-gray-100 transition"
                  aria-label={label}
                >
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-1">
              {quickLinks.map((link,index) => (
                <li key={index}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-200 hover:text-gray-100 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
  
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-start text-gray-200">
                <FaMapMarkerAlt className="mt-1 mr-2 text-white" />
                <span>123 Construction Ave, Build City BC 12345</span>
              </div>
              <div className="flex items-center text-gray-200">
                <FaEnvelope className="mr-2 text-white" />
                <a href="mailto:info@constructo.com" className="hover:text-gray-100">info@constructo.com</a>
              </div>
              <div className="flex items-center text-gray-200">
                <FaPhoneAlt className="mr-2 text-white" />
                <a href="tel:+1234567890" className="hover:text-gray-100">+1 (234) 567-890</a>
              </div>
              <div className="flex items-center text-gray-200">
                <FaClock className="mr-2 text-white" />
                <span>Mon-Fri: 8 AM - 6 PM</span>
              </div>
            </div>
          </div>

          {/* Email Form */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Send Message</h3>
            <form onSubmit={handleSendEmail} className="space-y-3">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#165DBF] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#165DBF] text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                rows="3"
                required
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 p-2 bg-white text-[#1877F2] rounded-lg font-semibold hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
