const mongoose = require("mongoose");

const kegiatanSchema = new mongoose.Schema({
  idKegiatan: {
    type: String,
    required: true,
    unique: true,
  },
  namaSubsek: {
    type: String,
    required: true,
  },
  namaKegiatan: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Kegiatan", kegiatanSchema);
