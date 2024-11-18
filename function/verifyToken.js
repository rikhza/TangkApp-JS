const jwt = require("jsonwebtoken");
const Token = require("../model/token");

const SECRET_KEY = "TangkApp";

const verifyToken = async (token) => {
  if (!token) {
    throw { status: 401, message: "Token tidak ditemukan" };
  }

  // Periksa apakah token ada di database
  const tokenRecord = await Token.findOne({ token });
  if (!tokenRecord) {
    throw { status: 403, message: "Token tidak valid atau telah dicabut" };
  }

  // Verifikasi token JWT
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return reject({ status: 403, message: "Token tidak valid atau kadaluarsa" });
      }

      // Return user jika token valid
      resolve({
        NIK: user.NIK,
        nama: user.nama,
        role: user.role,
      });
    });
  });
};

module.exports = { verifyToken };
