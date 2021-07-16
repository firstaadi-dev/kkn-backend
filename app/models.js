const {Mongoose} = require('../config/database');

const wargaModel = Mongoose.model(
  'daftar_warga',
  {
    nik: Number,
    nama: String,
    jabatan: String,
    jenis_kelamin: String,
    tempat_lahir: String,
    tanggal_lahir: Date,
    status_perkawinan: String,
    agama: String,
    alamat: String,
    pendidikan: String,
    pekerjaan: String,
  },
  'daftar_warga'
);

module.exports = {wargaModel};
