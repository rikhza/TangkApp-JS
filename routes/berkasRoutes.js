const express = require("express");
const router = express.Router();
const momentTimeZone = require('moment-timezone');
const { verifyToken } = require("../function/verifyToken");
const Berkas = require("../model/berkas");
const Desa = require("../model/desa");
const Kegiatan = require("../model/kegiatan");
const Pemohon = require("../model/pemohon");
const JenisHak = require("../model/jenisHak");
const PetugasUkur = require("../model/petugasUkur");

const dbFormatDate = "DD MMMM YYYY";
const dbFormatDateTime = "YYYY-MM-DDTHH:mm:ss";
const userFormat = "dddd DD MMMM YYYY HH:mm:ss";

const SECRET_KEY = "TangkApp"; 

// Endpoint untuk menyimpan data berkas
router.post("/insert", async (req, res) => {
  try {
    const {
      idBerkas,
      noBerkas,
      tahunBerkas,
      tanggalTerima,
      idKegiatan,
      namaSubsek,
      namaKegiatan,
      idPemohon,
      namaPemohon,
      idJenisHak,
      JenisHak,
      noHak,
      idDesa,
      namaDesa,
      namaKecamatan,
      namaPetugasSPS,
      tanggalSPS,
      idPetugasUkur,
      statusAlihMedia,
      statusBayarPNBP,
      idUser,
      PIC,
      dateIn,
      dateUp,
    } = req.body;

    // Validasi jumlah PIC
    if (PIC && PIC.length > 2) {
      return res.status(400).json({ error: "Maksimal 2 PIC diperbolehkan." });
    }

    // Buat instance baru
    const newBerkas = new Berkas({
      idBerkas,
      noBerkas,
      tahunBerkas,
      tanggalTerima,
      idKegiatan,
      namaSubsek,
      namaKegiatan,
      idPemohon,
      namaPemohon,
      idJenisHak,
      JenisHak,
      noHak,
      idDesa,
      namaDesa,
      namaKecamatan,
      namaPetugasSPS,
      tanggalSPS,
      idPetugasUkur: idPetugasUkur || null,
      statusAlihMedia,
      statusBayarPNBP,
      idUser,
      PIC: PIC || [],
      status: [
      {
        name: "Proses SPJ",
        subStatus: "Berjalan",
        dateIn: new Date().toISOString(),
        userIn: idUser,
        statusDetail: [
          {
            nama: "Berjalan",
            dateIn: new Date().toISOString(),
            userIn: idUser
          }
        ],
      }
    ],
      dateIn: new Date().toISOString(),
      dateUp: dateUp || null,
    });

    // Simpan ke database
    const savedBerkas = await newBerkas.save();
    res.status(200).json({
      message: "Berkas berhasil ditambahkan.",
      data: savedBerkas,
    });
  } catch (error) {
    console.error("Gagal menyimpan data berkas:", error);
    res.status(500).json({ error: "Terjadi kesalahan server." });
  }
});

router.get("/desa", async (req, res) => {
  try {
    const desaList = await Desa.find();
    res.status(200).json(desaList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/kegiatan", async (req, res) => {
  try {
    const kegiatanList = await Kegiatan.find();
    res.status(200).json(kegiatanList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/pemohon", async (req, res) => {
  try {
    const pemohonList = await Pemohon.find();
    res.status(200).json(pemohonList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/jenisHak", async (req, res) => {
  try {
    const jenisHakList = await JenisHak.find();
    res.status(200).json(jenisHakList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/petugasUkur", async (req, res) => {
  try {
    const petugasUkurList = await PetugasUkur.find();
    res.status(200).json(petugasUkurList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const roleStatusAccess = {
  Admin: [], 
  SPJ: ["Proses SPJ"], 
  Kasi: ["Approval Kasi"], 
};


router.post("/", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const role = req.body.role; // Role dari header

  try {
    // Verifikasi token
    const user = await verifyToken(token);

    // Periksa apakah role user valid
    if (!user.role.includes(role)) {
      return res.status(403).json({ message: "Anda tidak memiliki akses role tersebut" });
    }

    let data;

    if (role === "Admin") {
      // Admin dapat melihat semua dokumen
      data = await Berkas.find();
    } else {
      // Role lain hanya dapat melihat dokumen berdasarkan status terakhir
      const allowedStatuses = roleStatusAccess[role];
      if (!allowedStatuses) {
        return res.status(403).json({ message: "Role tidak dikenali." });
      }

      const pipeline = [
        // Ambil status terakhir dari status.statusDetail
        {
          $addFields: {
            lastStatus: {
              $arrayElemAt: ["$status.statusDetail", -1], // Ambil elemen terakhir dari statusDetail
            },
          },
        },
        {
          $match: {
            "lastStatus.nama": { $in: allowedStatuses }, // Periksa apakah status terakhir sesuai role
          },
        },
      ];

      data = await Berkas.aggregate(pipeline);
    }
      res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
