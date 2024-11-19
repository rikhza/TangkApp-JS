const mongoose = require("mongoose");

// Sub-schema untuk SubStatus
const subStatusSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  dateIn: {
    type: String,
    default: "",
  },
  deskripsiKendala: {
    type: String,
    default: "",
  },
  idUser: {
    type: String,
    default: "",
  },
});

// Sub-schema untuk Status Detail
const statusDetailSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  dateIn: {
    type: String,
    default: "",
  },
  dateUp: {
    type: String,
    default: "",
  },
  subStatus: [subStatusSchema],
});

// Sub-schema untuk Status
const statusSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subStatus: {
    type: String,
    default: "",
  },
  dateIn: {
    type: String,
    default: "",
  },
  dateUp: {
    type: String,
    default: "",
  },
  statusDetail: [statusDetailSchema],
});

// Sub-schema untuk PIC
const picSchema = mongoose.Schema({
  namaPIC: {
    type: String,
    default: "",
  },
  kontakPIC: {
    type: String,
    default: "",
  },
});

// Schema utama untuk Berkas
const berkasSchema = mongoose.Schema({
  idBerkas: {
    type: Number,
    required: true,
    unique: true,
  },
  noBerkas: {
    type: Number,
    required: true,
  },
  tahunBerkas: {
    type: Number,
    required: true,
  },
  tanggalTerima: {
    type: String,
    required: true,
  },
  idKegiatan: {
    type: String,
    required: true,
  },
  namaSubsek: {
    type: String,
  },
  namaKegiatan: {
    type: String,
    required: true,
  },
  idPemohon: {
    type: String,
    required: true,
  },
  namaPemohon: {
    type: String,
    required: true,
  },
  idJenisHak: {
    type: String,
    required: true,
  },
  JenisHak: {
    type: String,
    required: true,
  },
  noHak: {
    type: Number,
    required: true,
  },
  idDesa: {
    type: String,
    required: true,
  },
  namaDesa: {
    type: String,
    required: true,
  },
  namaKecamatan: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
  idPetugasUkur: {
    type: String,
    default: null, 
  },
  namaPetugasUkur: {
    type: String,
    default: null, 
  },
  idPetugasSPS: {
    type: String,
    required: true,
  },
=======
>>>>>>> 60e1c70b980672ea79bf5966143895f77479c965
  namaPetugasSPS: {
    type: String,
    required: true,
  },
  tanggalSPS: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
=======
  idPetugasUkur: {
    type: String,
    default: null, // Tidak wajib diisi
  },
>>>>>>> 60e1c70b980672ea79bf5966143895f77479c965
  statusAlihMedia: {
    type: Boolean,
    required: true,
  },
  statusBayarPNBP: {
    type: Boolean,
    required: true,
  },
  idUser: {
    type: String,
    required: true,
  },
  PIC: [picSchema], // Array PIC tidak wajib diisi
<<<<<<< HEAD
  status: [statusSchema],
=======
  status: statusSchema,
>>>>>>> 60e1c70b980672ea79bf5966143895f77479c965
  dateIn: {
    type: String,
  },
  dateUp: {
    type: String,
    default: null, // Tidak wajib diisi
  },
});

const berkas = mongoose.model("Berkas", berkasSchema);

module.exports = berkas;
