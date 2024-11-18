const mongoose = require("mongoose");

const petugasUkurSchema = new mongoose.Schema({
  idPetugasUkur: {
    type: String,
    required: true,
    unique: true,
  },
  NIK: {
    type: Number,
    required: true,
    unique: true,
  },
  nama: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PetugasUkur", petugasUkurSchema);
