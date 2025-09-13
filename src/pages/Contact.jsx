import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    findOut: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Track window size for confetti
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:8000/api/contact/", formData);
      setModalMessage("Your message has been sent successfully!");
      setModalOpen(true);
      setShowConfetti(true); // Fire confetti
      setFormData({
        name: "",
        email: "",
        phone: "",
        reason: "",
        findOut: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setModalMessage("Something went wrong. Please try again.");
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setShowConfetti(false); // Stop confetti
  };

  return (
    <main className="max-w-7xl mx-auto p-8 bg-white mt-28 relative">
      {/* Confetti */}
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={200} />}

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-8 max-w-sm w-full text-center shadow-lg"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <p className="text-gray-800 font-semibold mb-4">{modalMessage}</p>
              <button
                onClick={handleCloseModal}
                className="bg-[#1f526b] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#153a4a] transition-colors duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        Contact Us
      </motion.h1>

      <div className="flex flex-col md:flex-row items-start justify-between gap-8">
        {/* Left Side: Contact Form */}
        <motion.div
          className="w-full md:w-1/2"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                required
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">E-mail Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                required
              />
            </div>
            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              />
            </div>
            {/* Reason */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Reason to Contact</label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                required
              >
                <option value="">Select a reason</option>
                <option value="buy">Buy a bike</option>
                <option value="sell">Sell a bike</option>
                <option value="support">Customer Support</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* How did you find out */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">How did you find out about us?</label>
              <select
                name="findOut"
                value={formData.findOut}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              >
                <option value="">Select an option</option>
                <option value="search">Search Engine</option>
                <option value="social">Social Media</option>
                <option value="friend">Friend/Referral</option>
                <option value="ad">Advertisement</option>
              </select>
            </div>
            {/* Message */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1f526b] text-white py-3 rounded-lg font-semibold shadow-md hover:bg-[#153a4a] transition-colors duration-300 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </motion.div>

        {/* Right Side: Map & Contact Info */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col items-center space-y-6"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <div className="rounded-xl overflow-hidden shadow-lg w-full h-96">
            <iframe
              title="Drive RP Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.123456789!2d80.283333!3d12.682222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f123456789ab%3A0xabcdef123456!2sDrive%20RP!5e0!3m2!1sen!2sin!4v1694385678901!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="w-full text-left space-y-4">
            <p className="font-bold text-gray-800">Address:</p>
            <p className="text-gray-600">51, Rajaji Street, GST Road, Chengalpattu-603104.</p>
            <p className="font-bold text-gray-800">Website:</p>
            <a href="#" className="text-blue-500 hover:underline">www.DriveRp.in</a>
            <p className="font-bold text-gray-800">Phone:</p>
            <p className="text-gray-600">+91 987 952 1234</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ContactUs;
