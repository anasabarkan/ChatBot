const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const router = express.Router();

dotenv.config(); // Load environment variables

const API_KEY = process.env.GEMINI_API_KEY; // Load API key from environment variables
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-flash:generateText"; // Gemini API URL

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Invalid input message." });
  }

  try {
    // Make a request to the Gemini API
    const response = await axios.post(
      GEMINI_URL,
      {
        prompt: { text: message },
        maxOutputTokens: 256, // Adjust the token limit as needed
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`, // API key passed here
        },
      }
    );

    // Extract the reply from the API response
    const botReply = response.data.candidates?.[0]?.output || "No reply generated.";

    res.json({ reply: botReply });
  } catch (error) {
    console.error("Error communicating with Gemini API:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to process the request." });
  }
});

module.exports = router;
