const express = require("express");
const router = express.Router();
const Berkas = require("../model/berkas"); // Assuming the model for Berkas is correctly set up

// Endpoint untuk data jumlah berkas per bulan
router.get("/jumlah-berkas-per-bulan", async (req, res) => {
    try {
        const dataPerMonth = await Berkas.aggregate([
            // 1. Pastikan data memiliki tanggalTerima yang valid dan bukan null
            {
                $match: {
                    tanggalTerima: { $exists: true, $ne: null }
                }
            },
            // 2. Mengubah tanggalTerima menjadi format Date jika berbentuk string
            {
                $addFields: {
                    tanggalTerimaDate: { $toDate: "$tanggalTerima" }  // Pastikan tanggalTerima dapat dikonversi menjadi Date
                }
            },
            // 3. Mengubah tanggalTerima menjadi format YYYY-MM (Bulan dan Tahun)
            {
                $project: {
                    monthYear: {
                        $dateToString: { format: "%Y-%m", date: "$tanggalTerimaDate" }
                    }
                }
            },
            // 4. Kelompokkan berdasarkan bulan dan tahun dan hitung jumlah baris (berkas)
            {
                $group: {
                    _id: "$monthYear",  // Kelompokkan berdasarkan bulan dan tahun
                    totalJumlahBerkas: { $sum: 1 }  // Hitung jumlah baris/berkas per bulan
                }
            },
            // 5. Urutkan berdasarkan bulan/tahun secara menurun
            {
                $sort: { _id: -1 }
            },
            // 6. Format hasil output agar lebih mudah dibaca
            {
                $project: {
                    name: "$_id",  // Ganti nama field _id menjadi 'name'
                    jumlahBerkas: "$totalJumlahBerkas",  // Total berkas berdasarkan jumlah baris
                    _id: 0  // Jangan tampilkan _id
                }
            }
        ]);

        // Mengirimkan response ke frontend
        res.status(200).json(dataPerMonth);
    } catch (error) {
        console.error("Error retrieving jumlah berkas per bulan:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
