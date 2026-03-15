const fs      = require("fs");
const path    = require("path");
const express = require("express");
const readProfileData = require("./utils/fileReader");

const app  = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* ── PROFILE API ── */
app.get("/api/profile", (req, res) => {
  readProfileData((err, data) => {
    if (err) return res.status(500).json({ error: "Error reading profile data" });
    res.json(data);
  });
});

/* ── FEEDBACKS API (for avg rating display) ── */
app.get("/api/feedbacks", (req, res) => {
  fs.readFile("./data/feedback.json", "utf8", (err, data) => {
    if (err || !data.trim()) return res.json([]);
    try { res.json(JSON.parse(data)); }
    catch { res.json([]); }
  });
});

/* ── SERVE INDEX ── */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ── SUBMIT FEEDBACK ── */
app.post("/submit-feedback", (req, res) => {
  const { name, email, message, rating } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newFeedback = {
    name, email, message,
    rating: rating || "0",
    date: new Date().toISOString()
  };

  const feedbackPath = "./data/feedback.json";

  fs.readFile(feedbackPath, "utf8", (err, data) => {
    let feedbacks = [];
    if (!err && data.trim()) {
      try { feedbacks = JSON.parse(data); } catch {}
    }
    feedbacks.push(newFeedback);

    fs.writeFile(feedbackPath, JSON.stringify(feedbacks, null, 2), (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        return res.status(500).json({ message: "Error saving feedback." });
      }
      res.json({ message: "Feedback submitted successfully! Thank you 🎉" });
    });
  });
});

/* ── START ── */
app.listen(PORT, () => {
  console.log(`✅ Server running → http://localhost:${PORT}`);
});
