const {
  getAllWargaHandler,
  addWargaHandler,
  getWargaByIdHandler,
  updateWargaByIdHandler,
  deleteWargaByIdHandler,
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
];
module.exports = routes;
