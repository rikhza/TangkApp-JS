const router = require("express").Router();
const users = require("../model/users");
const momentTimeZone = require('moment-timezone');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require('../function/verifyToken');
const Token = require('../model/token')

const dbFormatDate = "DD MMMM YYYY";
const dbFormatDateTime = "YYYY-MM-DDTHH:mm:ss";
const userFormat = "dddd DD MMMM YYYY HH:mm:ss";

const SECRET_KEY = "TangkApp"; 

const SECRET_CODE = "TangkApp_password"; // Simpan ini di environment variable

router.post("/login", async (req, res) => {
    const { NIK, password } = req.body;
    const today = momentTimeZone().tz("Asia/Jakarta");
  
    // Validasi pengguna
    const user = await users.findOne({ NIK });
    if (!user) {
      return res.status(404).json({ error: "User tidak ditemukan." });
    }
  
    const combinedPassword = password + SECRET_CODE;
    const isPasswordValid = await bcrypt.compare(combinedPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Password salah." });
    }
  
    // Buat token JWT
    const token = jwt.sign(
      {
        NIK: user.NIK,
        nama: user.nama,
        role: user.role,
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
  
    // Simpan token ke database
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1 jam dari sekarang
    const newToken = new Token({
      token,
      NIK: user.NIK,
      expiresAt,
    });
  
    await newToken.save();
  
    res.status(200).json({
      message: "Login berhasil.",
      token,
      user: {
        NIK: user.NIK,
        nama: user.nama,
        role: user.role,
      },
    });
  });

router.post("/login", async (req, res) => {
    const { NIK, password } = req.body;

    if (!NIK || !password) {
        return res.status(400).json({ error: "NIK dan password wajib diisi." });
    }

    try {
        // Cari user berdasarkan NIK
        const user = await users.findOne({ NIK });
        if (!user) {
            return res.status(404).json({ error: "User tidak ditemukan." });
        }

        // Gabungkan password dengan secret code
        const combinedPassword = password + SECRET_CODE;

        // Periksa password
        const isPasswordValid = await bcrypt.compare(combinedPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Password salah." });
        }

        // Buat token JWT
        const token = jwt.sign(
            {
                NIK: user.NIK,
                nama: user.nama,
                role: user.role,
            },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login berhasil.",
            token,
            user: {
                NIK: user.NIK,
                nama: user.nama,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/check-token", async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ error: "Token tidak ditemukan" });
    }
  
    try {
      // Periksa apakah token ada di database
      const tokenRecord = await Token.findOne({ token });
      if (!tokenRecord) {
        return res.status(403).json({ error: "Token tidak valid atau telah dicabut" });
      }
  
      // Verifikasi token JWT
      jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({ error: "Token tidak valid atau kadaluarsa" });
        }
  
        // Kirim data user jika token valid
        res.json({
          user: {
            NIK: user.NIK,
            nama: user.nama,
            role: user.role,
          },
        });
      });
    } catch (error) {
      res.status(500).json({ error: "Kesalahan server saat memverifikasi token" });
    }
  });

router.get("/protected", verifyToken, (req, res) => {
    res.status(200).json({ message: "Anda memiliki akses ke endpoint ini.", user: req.user });
  });

router.post("/logout", async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (!token) {
      return res.status(400).json({ error: "Token tidak ditemukan" });
    }
  
    try {
      // Hapus token dari database
      await Token.findOneAndDelete({ token });
  
      res.status(200).json({ message: "Logout berhasil. Token telah dihapus." });
    } catch (error) {
      res.status(500).json({ error: "Kesalahan server saat menghapus token" });
    }
  });
  

module.exports = router;