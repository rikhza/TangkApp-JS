const mongoose = require("mongoose");

const petugasSPSSchema = new mongoose.Schema({
  namaPetugas: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("petugasSPS", petugasSPSSchema);
