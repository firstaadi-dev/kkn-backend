const {Mongoose} = require('../config/database');

const userModel = Mongoose.model(
  'daftar_user',
  {
    username: {type: String, unique: true},
    password: String,
    token: String,
  },
  'daftar_user'
);
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
    nama_iuran: String,
    nominal: Number,
    tanggal: Date,
    status: Boolean,
    keterangan: String,
  },
  'iuran_warga'
);

const suratModel = Mongoose.model(
  'daftar_surat',
  {
    no: Number,
    perihal: String,
    isi: String,
    tanggal: Date,
    pengirim: String,
    keterangan: String,
  },
  'daftar_surat'
);

const kejadianModel = Mongoose.model(
  'daftar_kejadian',
  {
    nama: String,
    deskripsi: String,
    tanggal: Date,
  },
  'daftar_kejadian'
);

const kegiatanModel = Mongoose.model(
  'daftar_kegiatan',
  {
    nama: String,
    deskripsi: String,
    tanggal: Date,
    tempat: String,
    jumlah_peserta: Number,
  },
  'daftar_kegiatan'
);

const kasModel = Mongoose.model(
  'daftar_kas',
  {
    no: Number,
    tanggal: Date,
    ref: String,
    debit: Number,
    kredit: Number,
    rincian: String,
  },
  'daftar_kas'
);
module.exports = {
  userModel,
  wargaModel,
  iuranModel,
  suratModel,
  kejadianModel,
  kegiatanModel,
  kasModel,
};
