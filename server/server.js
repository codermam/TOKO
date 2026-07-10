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

app.use(cors());
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