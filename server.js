const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fetch = require("node-fetch"); // or "undici" if needed

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS, icons, manifest)
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

// Route for the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Route to serve manifest.json
app.get("/manifest.json", (req, res) => {
  res.sendFile(path.join(__dirname, "public/manifest.json"));
});

// Example route to serve API for AI question solving
app.post("/api/solve", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "No question provided." });
  }

  try {
    // Replace this with your actual AI API call
    const response = await fetch("https://api.openrouter.ai/v1/your-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-or-v1-yourapikey"
      },
      body: JSON.stringify({
        prompt: question,
        model: "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",
        max_tokens: 500
      })
    });

    const data = await response.json();
    res.json({ answer: data.answer || data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch answer from AI." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`EduHelper AI server running on http://localhost:${PORT}`);
});
// Serve static files including index.html, CSS, JS, icons, manifest
app.use(express.static(path.join(__dirname, "public")));

// Serve manifest.json
app.get("/manifest.json", (req, res) => {
  res.sendFile(path.join(__dirname, "public/manifest.json"));
});

// Serve service worker
app.get("/sw.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public/sw.js"));
});
