import React, { useState } from "react";
import { Helmet } from "react-helmet";
import emailjs from "emailjs-com";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_sxi5npt", // ✅ Your EmailJS Service ID
        "template_ep8z50h", // ✅ Your Template ID
        e.target,
        "KN-xav6KAHr-lINOW" // ✅ Your Public Key
      )
      .then(
        () => {
          setStatus("✅ Message received! We’ll get back to you soon.");
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setStatus("❌ Failed to send message. Please try again later.");
        }
      );

    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-[#0e0f23] text-[#ffffff] px-6 py-16">
      <Helmet>
        <title>Contact | BeyondWhole - Get in Touch</title>
        <meta
          name="description"
          content="Reach out to BeyondWhole for support, feedback, or collaborations. We're here to listen and help you connect emotionally."
        />
        <meta
          name="keywords"
          content="contact beyondwhole, feedback, emotional platform, connect, support"
        />
        <meta property="og:title" content="Contact BeyondWhole - Emotional Support Platform" />
        <meta
          property="og:description"
          content="Send us a message and share your thoughts. BeyondWhole is always here for you."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-lg text-[#ffffff]/90">
          Have feedback or want to collaborate? Just send us a message below —
          we read every one personally.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-[#ffffff]/10 p-8 rounded-2xl shadow-lg space-y-4"
        >
          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            className="w-full p-3 rounded bg-transparent border border-[#ffffff]/30 text-[#ffffff] focus:outline-none focus:border-[#ffffff]"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="w-full p-3 rounded bg-transparent border border-[#ffffff]/30 text-[#ffffff] focus:outline-none focus:border-[#ffffff]"
          />
          <textarea
            name="message"
            required
            placeholder="Your Message"
            rows="5"
            className="w-full p-3 rounded bg-transparent border border-[#ffffff]/30 text-[#ffffff] focus:outline-none focus:border-[#ffffff]"
          ></textarea>

          <button
            type="submit"
            className="bg-[#ffffff] text-[#0e0f23] px-6 py-3 rounded font-semibold hover:bg-[#ffffff]/90 transition"
          >
            Send Message
          </button>

          {status && (
            <p className="text-green-400 mt-4 text-sm font-medium animate-pulse">
              {status}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
