const fs = require("fs");
const express = require("express");
const readProfileData = require("./utils/fileReader");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* ---------------- PROFILE API ---------------- */

app.get("/api/profile", (req, res) => {
  readProfileData((err, data) => {
    if (err) {
      res.status(500).json({ error: "Error reading data" });
    } else {
      res.json(data);
    }
  });
});

/* ---------------- SERVER ---------------- */

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.post("/submit-feedback", (req, res) => {

    const { name, email, message, rating } = req.body;

    const newFeedback = {
        name,
        email,
        message,
        rating
    };

    fs.readFile("./data/feedback.json", "utf8", (err, data) => {

        let feedbacks = [];

        // If file already has data, parse it
        if (!err && data.trim() !== "") {
            feedbacks = JSON.parse(data);
        }

        // Add new feedback
        feedbacks.push(newFeedback);

        // Save back to file
        fs.writeFile(
            "./data/feedback.json",
            JSON.stringify(feedbacks, null, 2),
            (err) => {

                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Error saving feedback" });
                }

                res.json({ message: "Feedback submitted successfully!" });

            }
        );

    });

});

