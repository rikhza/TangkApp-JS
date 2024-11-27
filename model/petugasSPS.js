const mongoose = require("mongoose");

const petugasSPSSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  NIK: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("petugasSPS", petugasSPSSchema);
