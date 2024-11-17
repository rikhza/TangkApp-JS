const Token = require("../model/token");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token tidak ditemukan" });
  }

  try {
    // Periksa apakah token ada di database dan belum kedaluwarsa
    const tokenRecord = await Token.findOne({ token });
    if (!tokenRecord) {
      return res.status(403).json({ error: "Token tidak valid atau telah dicabut" });
    }

    if (new Date() > tokenRecord.expiresAt) {
      return res.status(403).json({ error: "Token telah kedaluwarsa" });
    }

    // Verifikasi token JWT
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Token tidak valid" });
      }

      req.user = user; // Simpan data user untuk endpoint berikutnya
      next();
    });
  } catch (error) {
    res.status(500).json({ error: "Kesalahan server saat memverifikasi token" });
  }
};

module.exports = verifyToken;
