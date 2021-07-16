const {Mongoose} = require('../config/database');

const wargaModel = Mongoose.model(
  'daftar_warga',
  {
    nik: Number,
    nama: String,
    jabatan: String,
    jenis_kelamin: String,
    ttl: String,
    status_perkawinan: String,
    agama: String,
    alamat: String,
    pendidikan: String,
    pekerjaan: String,
  },
  'daftar_warga'
);

module.exports = {wargaModel};
