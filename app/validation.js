const Joi = require('joi');
const PostWargaValidation = Joi.object({
  nik: Joi.number().required(),
  nama: Joi.string().required(),
  jabatan: Joi.string().optional(),
  jenis_kelamin: Joi.string().optional(),
  ttl: Joi.string().optional(),
  status_perkawinan: Joi.string().optional(),
  agama: Joi.string().optional(),
  alamat: Joi.string().optional(),
  pendidikan: Joi.string().optional(),
  pekerjaan: Joi.string().optional(),
});

module.exports = {PostWargaValidation};
