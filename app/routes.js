const {
  getAllWargaHandler,
  addWargaHandler,
  getWargaByIdHandler,
  updateWargaByIdHandler,
  deleteWargaByIdHandler,
  getAllIuranHandler,
  addIuranHandler,
  getIuranByIdHandler,
  updateIuranByIdHandler,
  deleteIuranByIdHandler,
} = require('./handler');
const {PostWargaValidation} = require('./validation');

const routes = [
  {
    method: 'GET',
    path: '/daftar_warga',
    handler: getAllWargaHandler,
  },
  {
    method: 'POST',
    path: '/daftar_warga',
    options: {
      validate: {
        payload: PostWargaValidation,
        failAction: (request, h, error) => {
          return error.isJoi
            ? h.response(error.details[0]).code(400).takeover()
            : h.response(error).takeover();
        },
      },
    },
    handler: addWargaHandler,
  },
  {
    method: 'GET',
    path: '/daftar_warga/{id}',
    handler: getWargaByIdHandler,
  },
  {
    method: 'PUT',
    path: '/daftar_warga/{id}',
    handler: updateWargaByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/daftar_warga/{id}',
    handler: deleteWargaByIdHandler,
  },
  {
    method: 'GET',
    path: '/iuran',
    handler: getAllIuranHandler,
  },
  {
    method: 'POST',
    path: '/iuran',
    options: {
      validate: {},
    },
    handler: addIuranHandler,
  },
  {
    method: 'GET',
    path: '/iuran/{id}',
    handler: getIuranByIdHandler,
  },
  {
    method: 'PUT',
    path: '/iuran/{id}',
    handler: updateIuranByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/iuran/{id}',
    handler: deleteIuranByIdHandler,
  },
];
module.exports = routes;
