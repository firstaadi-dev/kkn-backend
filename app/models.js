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

const iuranModel = Mongoose.model(
  'iuran_warga',
  {
    nik: Number,
    nama: String,
    jenis: String,
    nominal: Number,
    tanggal: Date,
    Keterangan: String,
  },
  'iuran_warga'
);
module.exports = {wargaModel, iuranModel};
