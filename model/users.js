const mongoose = require("mongoose");

const users = mongoose.model("users", {
  NIK: {
    type: String,
  },
  nama: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: Array,
  },
  dateIn: {
    type: String,
  },
  dateUp: {
    type: String,
  },
});

module.exports = users;
