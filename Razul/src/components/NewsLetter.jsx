import React, { useState, useEffect } from "react";
import axios from "axios";
import {toast} from 'react-hot-toast';

let backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api";
const NewsletterPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  

  // Show popup on first visit if not subscribed
  useEffect(() => {
    const subscribed = localStorage.getItem("subscribedToNewsletter");
    if (!subscribed) {
      // Delay popup a bit (optional)
      setTimeout(() => setShowPopup(true), 2000);
    }
  }, []);

  const handleSubscribe = async () => {
    if (!email.includes("@")) {
      setMessage("Enter a valid email!");
      toast.error("Enter a valid email!");
      return;
    }

    try {
      // Call your backend API
      await axios.post(`${backendURL}/user/subscribe`, { email });

      // Mark as subscribed in localStorage
      localStorage.setItem("subscribedToNewsletter", "true");

      setMessage("Subscribed successfully! 🎉");
      toast.success("Subscribed successfully! 🎉");
      setEmail("");

      // Close popup after subscribing
      setTimeout(() => setShowPopup(false), 1500);
    } catch (error) {
      setMessage("Something went wrong, try again.");
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg p-6 w-80 sm:w-96 shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={() => setShowPopup(false)}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          Subscribe to our Newsletter
        </h2>

        <p className="text-sm text-gray-600 mb-4 text-center">
          Get the latest updates delivered to your inbox!
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleSubscribe}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Subscribe
        </button>

        {message && (
          <p className="text-sm text-green-600 mt-3 text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default NewsletterPopup;
