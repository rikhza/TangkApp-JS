const mongoose = require("mongoose");

const pemohonSchema = new mongoose.Schema({
  idPemohon: {
    type: String,
    required: true,
    unique: true,
  },
  namaPemohon: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Pemohon", pemohonSchema);
