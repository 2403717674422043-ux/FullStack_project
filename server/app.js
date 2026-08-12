const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());


// ========================================
// Sample Jobs
// ========================================

const jobs = [
  {
    title: "Upcycling Assistant",
    company: "GreenCraft Studio",
    location: "Chennai",
  },
  {
    title: "Product Designer",
    company: "EcoCreate",
    location: "Coimbatore",
  },
  {
    title: "Social Media Manager",
    company: "Reuse Works",
    location: "Bangalore",
  },
];


// ========================================
// Home API
// ========================================

app.get("/", (req, res) => {
  res.send("Welcome to ReLoop Backend!");
});


// ========================================
// Jobs API
// ========================================

app.get("/api/jobs", (req, res) => {
  res.json(jobs);
});


// ========================================
// Start Server
// ========================================

app.listen(PORT, () => {
  console.log(`ReLoop API running at http://localhost:${PORT}`);
});