// controllers/newsletterController.js
import Newsletter from "../models/Newsletter.js";

// 📌 Subscribe user
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check existing subscription
    const alreadySubscribed = await Newsletter.findOne({ email });
    if (alreadySubscribed) {
      return res.status(409).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    // Save email
    await Newsletter.create({ email });

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully 🎉",
    });

  } catch (error) {
    console.error("Newsletter error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// 📌 Get all subscribers (Admin use)
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });

    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch subscribers",
    });
  } //
};
