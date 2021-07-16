const {getAllWargaHandler, addWargaHandler} = require('./handler');
const Joi = require('joi');

const routes = [
  {
    method: 'GET',
    path: '/warga',
    handler: getAllWargaHandler,
  },
  {
    method: 'POST',
    path: '/warga',
    options: {
      validate: {
        payload: Joi.object({
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
        }),
        failAction: (request, h, error) => {
          return error.isJoi
            ? h.response(error.details[0]).takeover()
            : h.response(error).takeover();
        },
      },
    },
    handler: addWargaHandler,
  },
];
module.exports = routes;
