const mongoose = require("mongoose");

const jenisHakSchema = new mongoose.Schema({
  idJenisHak: {
    type: String,
    required: true,
    unique: true,
  },
  JenisHak: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("JenisHak", jenisHakSchema);
