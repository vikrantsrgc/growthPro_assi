const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Static SEO headlines
const seoHeadlines = [
  "Discover why NAME is LOCATION's favorite spot in 2025",
  "How NAME is changing the game in LOCATION",
  "Explore the best of LOCATION with NAME",
  "Why customers in LOCATION love NAME",
  "NAME: The heart of LOCATION’s local scene",
];

// POST /business-data
app.post("/business-data", (req, res) => {
  const { name, location } = req.body;

  const headline = `Why ${name} is ${location}'s Sweetest Spot in 2025`;

  res.json({
    rating: 4.3,
    reviews: 127,
    headline,
  });
});

// GET /regenerate-headline
app.get("/regenerate-headline", (req, res) => {
  const { name, location } = req.query;

  const template = seoHeadlines[Math.floor(Math.random() * seoHeadlines.length)];
  const headline = template
    .replace("NAME", name || "This Business")
    .replace("LOCATION", location || "Your Area");

  res.json({ headline });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
