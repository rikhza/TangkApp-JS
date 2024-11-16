const express = require("express");
const router = express.Router();
const Berkas = require("../model/berkas");
const momentTimeZone = require('moment-timezone');

const dbFormatDate = "DD MMMM YYYY";
const dbFormatDateTime = "YYYY-MM-DDTHH:mm:ss";
const userFormat = "dddd DD MMMM YYYY HH:mm:ss";

router.post("/insert", async (req, res) => {
  const {
    idBerkas,
    noBerkas,
    tahunBerkas,
    tanggalTerima,
    idKegiatan,
    idPemohon,
    idJenisHak,
    noHak,
    idDesa,
    idSPS,
    idPetugasUkur,
    idUser,
    PIC,
    idUSer
  } = req.body;
  const today = momentTimeZone().tz("Asia/Jakarta");

  if (!idBerkas || !noBerkas || !tahunBerkas || !tanggalTerima) {
    return res.status(400).json({ error: "Field idBerkas, noBerkas, tahunBerkas, dan tanggalTerima wajib diisi." });
  }

  try {
    const existingBerkas = await Berkas.findOne({ noBerkas, tahunBerkas });

    if (existingBerkas) {
      return res.status(400).json({ error: "Kombinasi noBerkas dan tahunBerkas sudah ada." });
    }

    const newBerkas = new Berkas({
      idBerkas,
      noBerkas,
      tahunBerkas,
      tanggalTerima,
      idKegiatan,
      idPemohon,
      idJenisHak,
      noHak,
      idDesa,
      idSPS,
      idPetugasUkur: idPetugasUkur || null, 
      statusAlihMedia: false,
      statusBayarPNBP: false,
      idUser,
      PIC: PIC || [], 
      status: {
        name: "Approval SPJ",
        subStatus: "Berjalan",
        dateIn: today.format(dbFormatDateTime),
        dateUp: null,
        statusDetail: [
            {
                nama: "Proses SPJ",
                dateIn: today.format(dbFormatDateTime),
                dateUp: null,
                "subStatus": [
                    {
                        nama: "Berjalan",
                        dateIn: today.format(dbFormatDateTime),
                        idUSer
                    }
                ]
            }
        ]
    }, 
      dateIn: today.format(dbFormatDateTime),
      dateUp: null, 
    });

    const savedBerkas = await newBerkas.save();

    res.status(201).json({
      message: "Data berkas berhasil ditambahkan.",
      data: savedBerkas,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
