const mongoose = require("mongoose");

const petugasUkurSchema = new mongoose.Schema({
  NIK: {
    type: Number,
  },
  nama: {
    type: String,
  },
  dateIn: {
    type: Date,
    default: Date.now, 
  },
  dateUp: {
    type: Date,
    default: null, 
  },
});

module.exports = mongoose.model("PetugasUkur", petugasUkurSchema);
