const mongoose = require("mongoose");

const desaSchema = new mongoose.Schema({
  idDesa: {
    type: String,
    required: true,
    unique: true,
  },
  namaDesa: {
    type: String,
    required: true,
  },
  namaKecamatan: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Desa", desaSchema);
