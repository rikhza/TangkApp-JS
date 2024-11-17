const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true, // Token JWT harus ada
  },
  NIK: {
    type: String,
    required: true, // NIK untuk mengidentifikasi pengguna
  },
  createdAt: {
    type: Date,
    default: Date.now, // Tanggal token dibuat
  },
  expiresAt: {
    type: Date, // Waktu token kedaluwarsa
    required: true,
  },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
