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
<<<<<<< HEAD
const PetugasSPS = require("../model/petugasSPS");
=======
>>>>>>> 60e1c70b980672ea79bf5966143895f77479c965

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
<<<<<<< HEAD
      idPetugasUkur,
      namaPetugasUkur,
      idPetugasSPS,
      namaPetugasSPS,
      tanggalSPS,
=======
      namaPetugasSPS,
      tanggalSPS,
      idPetugasUkur,
>>>>>>> 60e1c70b980672ea79bf5966143895f77479c965
      statusAlihMedia,
      statusBayarPNBP,
      idUser,
      PIC,
<<<<<<< HEAD
=======
      dateIn,
      dateUp,
>>>>>>> 60e1c70b980672ea79bf5966143895f77479c965
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
<<<<<<< HEAD
      idPetugasUkur,
      namaPetugasUkur,
      idPetugasSPS,
      namaPetugasSPS,
      tanggalSPS,
=======
      namaPetugasSPS,
      tanggalSPS,
      idPetugasUkur: idPetugasUkur || null,
>>>>>>> 60e1c70b980672ea79bf5966143895f77479c965
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
<<<<<<< HEAD
      dateUp: null,
=======
      dateUp: dateUp || null,
>>>>>>> 60e1c70b980672ea79bf5966143895f77479c965
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

<<<<<<< HEAD
router.put("/update/:idBerkas", async (req, res) => {
  try {
    const { idBerkas } = req.params;
    const {
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
      idPetugasUkur,
      namaPetugasUkur,
      idPetugasSPS,
      namaPetugasSPS,
      tanggalSPS,
      statusAlihMedia,
      statusBayarPNBP,
      PIC,
      dateUp,
    } = req.body;

    // Validasi keberadaan data
    const existingBerkas = await Berkas.findOne({ idBerkas });
    if (!existingBerkas) {
      return res.status(404).json({ error: "Data berkas tidak ditemukan." });
    }

    // Validasi jumlah PIC
    if (PIC && PIC.length > 2) {
      return res.status(400).json({ error: "Maksimal 2 PIC diperbolehkan." });
    }

    // Perbarui data berkas
    existingBerkas.noBerkas = noBerkas || existingBerkas.noBerkas;
    existingBerkas.tahunBerkas = tahunBerkas || existingBerkas.tahunBerkas;
    existingBerkas.tanggalTerima = tanggalTerima || existingBerkas.tanggalTerima;
    existingBerkas.idKegiatan = idKegiatan || existingBerkas.idKegiatan;
    existingBerkas.namaSubsek = namaSubsek || existingBerkas.namaSubsek;
    existingBerkas.namaKegiatan = namaKegiatan || existingBerkas.namaKegiatan;
    existingBerkas.idPemohon = idPemohon || existingBerkas.idPemohon;
    existingBerkas.namaPemohon = namaPemohon || existingBerkas.namaPemohon;
    existingBerkas.idJenisHak = idJenisHak || existingBerkas.idJenisHak;
    existingBerkas.JenisHak = JenisHak || existingBerkas.JenisHak;
    existingBerkas.noHak = noHak || existingBerkas.noHak;
    existingBerkas.idDesa = idDesa || existingBerkas.idDesa;
    existingBerkas.namaDesa = namaDesa || existingBerkas.namaDesa;
    existingBerkas.namaKecamatan = namaKecamatan || existingBerkas.namaKecamatan;
    existingBerkas.idPetugasSPS = namaPetugasSPS || existingBerkas.idPetugasSPS;
    existingBerkas.namaPetugasSPS = namaPetugasSPS || existingBerkas.namaPetugasSPS;
    existingBerkas.tanggalSPS = tanggalSPS || existingBerkas.tanggalSPS;
    existingBerkas.idPetugasUkur = idPetugasUkur || existingBerkas.idPetugasUkur;
    existingBerkas.namaPetugasUkur = namaPetugasUkur || existingBerkas.namaPetugasUkur;
    existingBerkas.statusAlihMedia =
      typeof statusAlihMedia === "boolean" ? statusAlihMedia : existingBerkas.statusAlihMedia;
    existingBerkas.statusBayarPNBP =
      typeof statusBayarPNBP === "boolean" ? statusBayarPNBP : existingBerkas.statusBayarPNBP;
    existingBerkas.PIC = PIC || existingBerkas.PIC;
    existingBerkas.dateUp = dateUp || new Date().toISOString();

    // Simpan data yang diperbarui
    const updatedBerkas = await existingBerkas.save();

    res.status(200).json({
      message: "Berkas berhasil diperbarui.",
      data: updatedBerkas,
    });
  } catch (error) {
    console.error("Gagal memperbarui data berkas:", error);
    res.status(500).json({ error: "Terjadi kesalahan server." });
  }
});


=======
>>>>>>> 60e1c70b980672ea79bf5966143895f77479c965
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

<<<<<<< HEAD
router.get("/petugasSPS", async (req, res) => {
  try {
    const PetugasSPSList = await PetugasSPS.find();
    res.status(200).json(PetugasSPSList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const roleStatusAccess = {
  Admin: [],
  PelaksanaEntri: ["Proses SPJ"],
  PelaksanaSPJ: ["Proses SPJ"],
  PelaksanaInventaris: ["Inventaris dan Distribusi", "Ukur Gambar", "Inventaris Berkas"],
  PelaksanaKoordinator: ["Periksa Hasil PU", "QC Pemeriksa Koordinator"],
  PelaksanaPemetaan: ["QC Bidang/Integrasi"],
  PelaksanaPencetakan: ["Pencetakan/Validasi Sitata"],
  Korsub: ["Approval SPJ Korsub", "Paraf Produk Berkas"],
  Kasi: ["Approval SPJ Kasi", "TTD Produk Berkas", "Penyelesaian 307"],
};

router.post("/", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const role = req.body.role; // Role dari body
=======
const roleStatusAccess = {
  Admin: [], 
  SPJ: ["Proses SPJ"], 
  Kasi: ["Approval Kasi"], 
};


router.post("/", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const role = req.body.role; // Role dari header
>>>>>>> 60e1c70b980672ea79bf5966143895f77479c965

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
<<<<<<< HEAD
        // Ambil status terakhir dari array status
        {
          $addFields: {
            lastStatus: {
              $arrayElemAt: ["$status", -1], // Ambil elemen terakhir dari array status
=======
        // Ambil status terakhir dari status.statusDetail
        {
          $addFields: {
            lastStatus: {
              $arrayElemAt: ["$status.statusDetail", -1], // Ambil elemen terakhir dari statusDetail
>>>>>>> 60e1c70b980672ea79bf5966143895f77479c965
            },
          },
        },
        {
          $match: {
<<<<<<< HEAD
            "lastStatus.name": { $in: allowedStatuses }, // Periksa apakah lastStatus.name sesuai role
=======
            "lastStatus.nama": { $in: allowedStatuses }, // Periksa apakah status terakhir sesuai role
>>>>>>> 60e1c70b980672ea79bf5966143895f77479c965
          },
        },
      ];

      data = await Berkas.aggregate(pipeline);
<<<<<<< HEAD

      // Debugging hasil akhir
    }

    // Kirim data ke frontend
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
=======
    }
      res.status(200).json(data);
  } catch (error) {
>>>>>>> 60e1c70b980672ea79bf5966143895f77479c965
    res.status(500).json({ error: error.message });
  }
});

<<<<<<< HEAD
router.post("/filter", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const { role, tanggalTerimaStart, tanggalTerimaEnd, kegiatan, jenisHak, desa, petugasUkur } =
    req.body;

  try {
    const user = await verifyToken(token);

    // Validasi Role
    if (!user.role.includes(role)) {
      return res.status(403).json({ message: "Anda tidak memiliki akses role tersebut" });
    }

    let pipeline = [];

    // Role Admin (akses semua data)
    if (role === "Admin") {
      pipeline.push({ $match: {} });
    } else {
      const allowedStatuses = roleStatusAccess[role];
      if (!allowedStatuses) {
        return res.status(403).json({ message: "Role tidak dikenali." });
      }

      pipeline.push(
        {
          $addFields: {
            lastStatus: {
              $arrayElemAt: ["$status", -1],
            },
          },
        },
        {
          $match: {
            "lastStatus.name": { $in: allowedStatuses },
          },
        }
      );
    }

    // Tambahkan $addFields untuk konversi `tanggalTerima` ke tipe Date
    pipeline.push({
      $addFields: {
        tanggalTerimaDate: { $toDate: "$tanggalTerima" },
      },
    });

    // Filter berdasarkan parameter
    const filters = {};

    if (tanggalTerimaStart || tanggalTerimaEnd) {
      filters.tanggalTerimaDate = {};
      if (tanggalTerimaStart) filters.tanggalTerimaDate.$gte = new Date(tanggalTerimaStart);
      if (tanggalTerimaEnd) filters.tanggalTerimaDate.$lte = new Date(tanggalTerimaEnd);
    }

    if (kegiatan) filters.idKegiatan = kegiatan;
    if (jenisHak) filters.idJenisHak = jenisHak;
    if (desa) filters.idDesa = desa;
    if (petugasUkur) filters.idPetugasUkur = petugasUkur;

    if (Object.keys(filters).length > 0) {
      pipeline.push({ $match: filters });
    }

    // Debug pipeline
    console.log("Pipeline Debug:", JSON.stringify(pipeline, null, 2));

    const data = await Berkas.aggregate(pipeline);

    // Debug hasil data
    console.log("Data Ditemukan:", JSON.stringify(data, null, 2));

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching filtered data:", error);
    res.status(500).json({ message: "Gagal memfilter data.", error: error.message });
  }
});





=======
>>>>>>> 60e1c70b980672ea79bf5966143895f77479c965
module.exports = router;
