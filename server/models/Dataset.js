const mongoose = require("mongoose");

const DatasetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    columns: {
      type: [String],
      required: true,
    },
    rows: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
    source: {
      type: String,
      enum: ["csv", "excel", "manual"],
      default: "manual",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dataset", DatasetSchema);