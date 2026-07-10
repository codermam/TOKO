require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");

const uploadRoutes = require("./routes/uploadRoutes");
const chartRoutes = require("./routes/chartRoutes");

const app = express();

// ensure uploads folder exists
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL, // set this in Render after frontend is deployed
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/chart", chartRoutes);

app.get("/", (req, res) => res.send("Toko API is running"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));