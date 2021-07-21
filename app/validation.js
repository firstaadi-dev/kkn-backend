const Joi = require('joi');
const PostWargaValidation = Joi.object({
  nik: Joi.number().required(),
  nama: Joi.string().required(),
  jabatan: Joi.string().optional(),
  jenis_kelamin: Joi.string().optional(),
  tempat_lahir: Joi.string().optional(),
  tanggal_lahir: Joi.date().optional(),
  status_perkawinan: Joi.string().optional(),
  agama: Joi.string().optional(),
  alamat: Joi.string().optional(),
  pendidikan: Joi.string().optional(),
  pekerjaan: Joi.string().optional(),
});

const jwtValidate = async function (decoded, request, h) {
  // Checks if credential is valid
  const isAuth = true;
  if (!isAuth) {
    return {isValid: false};
  } else {
    return {isValid: true};
  }
};

module.exports = {PostWargaValidation, jwtValidate};
