const Berkas = require("../model/berkas"); // Sesuaikan path ke model Berkas
const Role = require("../model/roles"); // Sesuaikan path ke model Berkas
const router = require("express").Router();
const users = require("../model/users");
const momentTimeZone = require("moment-timezone");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../function/verifyToken");
const Token = require("../model/token");
const { getBerkasByRole } = require("../function/queryByRole");

const SECRET_KEY = process.env.SECRET_KEY || "TangkApp"; // Simpan di environment variable
const SECRET_CODE = process.env.SECRET_CODE || "TangkApp_password";

router.post("/", async (req, res) => {
	try {
		const { role } = req.body;
		const today = momentTimeZone().tz("Asia/Jakarta");

		// Validasi role
		const roleData = await Role.findOne({ nama: role });
		if (!roleData) {
			return res.status(400).json({
				success: false,
				message: "Role tidak valid atau tidak ditemukan.",
			});
		}

		// Daftar status yang bisa diakses oleh role
		const allowedStatuses = roleData.accessStatus; // ambil accessStatus dari role
		const allowedValues = allowedStatuses.map((status) => status.nama);
		if (allowedValues.length === 0) {
			return res.status(200).json({
				success: true,
				data: {
					berkas: {
						berjalan: 0,
						selesai: 0,
						terhenti: 0,
					},
					alertSystem: 0,
					berjalan: [],
					terhenti: [],
				},
			});
		}

		// Query MongoDB menggunakan model
		const results = await Berkas.aggregate([
			{ $match: { "status.name": { $in: allowedValues } } },
			{ $unwind: "$status" },
			{ $match: { "status.name": { $in: allowedValues } } },
			{
				$group: {
					_id: "$status.subStatus",
					count: { $sum: 1 },
				},
			},
			{
				$project: {
					_id: 0,
					status: "$_id",
					count: 1,
				},
			},
		]);
		const kategoriBerkas = roleData.kategoriBerkas;
		
		const berkasForRole = await getBerkasByRole(role, kategoriBerkas);
		const twoDaysAgo = momentTimeZone(today).subtract(2, "days");

		const isBerjalanMoreThan2Days = (status) => {
			return status.statusDetail.some((detail) => {
				const detailDate = momentTimeZone(detail.dateIn);
				return (
					detail.nama === "Berjalan" &&
					detailDate.isBefore(twoDaysAgo)
				);
			});
		};
		// Format hasil menjadi objek dengan status "Berjalan", "Selesai", dan "Terhenti"
		const formattedResult = {
			berkas: {
				berjalan:
					results.find((item) => item.status === "Berjalan")?.count ||
					0,
				selesai:
					results.find((item) => item.status === "Selesai")?.count ||
					0,
				terhenti:
					results.find((item) => item.status === "Terhenti")?.count ||
					0,
			},
			alertSystem: berkasForRole.filter((berkas) =>
				berkas.status.some((status) => isBerjalanMoreThan2Days(status))
			).length,
			terhenti: berkasForRole
				.filter((berkas) => berkas.lastStatus?.subStatus === "Terhenti")
				.map((berkas) => ({
					_id: berkas._id,
					noBerkas: berkas.noBerkas,
					tahunBerkas: berkas.tahunBerkas,
					dateIn: berkas.lastStatus?.dateIn,
				})),
			berjalan: berkasForRole
				.filter((berkas) => berkas.lastStatus?.subStatus === "Berjalan")
				.map((berkas) => ({
					_id: berkas._id,
					noBerkas: berkas.noBerkas,
					tahunBerkas: berkas.tahunBerkas,
					dateIn: berkas.lastStatus?.dateIn,
				})),
		};

		res.status(200).json({
			success: true,
			data: formattedResult,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Terjadi kesalahan pada server.",
		});
	}
});

module.exports = router;
