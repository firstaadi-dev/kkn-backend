const {
  registerHandler,
  loginHandler,
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
  getAllSuratHandler,
  getSuratByIdHandler,
  addSuratHandler,
  updateSuratByIdHandler,
  deleteSuratByIdHandler,
  getAllKejadianHandler,
  addKejadianHandler,
  getKejadianByIdHandler,
  updateKejadianByIdHandler,
  deleteKejadianByIdHandler,
  getAllKegiatanHandler,
  addKegiatanHandler,
  getKegiatanByIdHandler,
  updateKegiatanByIdHandler,
  deleteKegiatanByIdHandler,
  getAllKasHandler,
  addKasHandler,
  getKasByIdHandler,
  updateKasByIdHandler,
  deleteKasByIdHandler,
} = require('./handler');
const {PostWargaValidation} = require('./validation');

const routes = [
  {
    method: 'POST',
    path: '/register',
    config: {auth: false},
    handler: registerHandler,
  },
  {
    method: 'POST',
    path: '/login',
    config: {auth: false},
    handler: loginHandler,
  },
  {
    method: 'GET',
    path: '/restricted',
    config: {auth: 'jwt'},
    handler: function (request, h) {
      const response = h.response({text: 'You used a Token!'});
      response.header('Authorization', request.headers.authorization);
      return response;
    },
  },
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
  //=============================================================//
  {
    method: 'GET',
    path: '/daftar_iuran',
    handler: getAllIuranHandler,
  },
  {
    method: 'POST',
    path: '/daftar_iuran',
    options: {
      validate: {},
    },
    handler: addIuranHandler,
  },
  {
    method: 'GET',
    path: '/daftar_iuran/{id}',
    handler: getIuranByIdHandler,
  },
  {
    method: 'PUT',
    path: '/daftar_iuran/{id}',
    handler: updateIuranByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/daftar_iuran/{id}',
    handler: deleteIuranByIdHandler,
  },
  //=============================================================//
  {
    method: 'GET',
    path: '/daftar_surat',
    handler: getAllSuratHandler,
  },
  {
    method: 'POST',
    path: '/daftar_surat',
    options: {
      validate: {},
    },
    handler: addSuratHandler,
  },
  {
    method: 'GET',
    path: '/daftar_surat/{id}',
    handler: getSuratByIdHandler,
  },

  {
    method: 'PUT',
    path: '/daftar_surat/{id}',
    handler: updateSuratByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/daftar_surat/{id}',
    handler: deleteSuratByIdHandler,
  },
  //=============================================================//
  {
    method: 'GET',
    path: '/daftar_kejadian',
    handler: getAllKejadianHandler,
  },
  {
    method: 'POST',
    path: '/daftar_kejadian',
    options: {
      validate: {},
    },
    handler: addKejadianHandler,
  },
  {
    method: 'GET',
    path: '/daftar_kejadian/{id}',
    handler: getKejadianByIdHandler,
  },

  {
    method: 'PUT',
    path: '/daftar_kejadian/{id}',
    handler: updateKejadianByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/daftar_kejadian/{id}',
    handler: deleteKejadianByIdHandler,
  },
  //=============================================================//
  {
    method: 'GET',
    path: '/daftar_kegiatan',
    handler: getAllKegiatanHandler,
  },
  {
    method: 'POST',
    path: '/daftar_kegiatan',
    options: {
      validate: {},
    },
    handler: addKegiatanHandler,
  },
  {
    method: 'GET',
    path: '/daftar_kegiatan/{id}',
    handler: getKegiatanByIdHandler,
  },

  {
    method: 'PUT',
    path: '/daftar_kegiatan/{id}',
    handler: updateKegiatanByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/daftar_kegiatan/{id}',
    handler: deleteKegiatanByIdHandler,
  },
  //=============================================================//
  {
    method: 'GET',
    path: '/daftar_kas',
    handler: getAllKasHandler,
  },
  {
    method: 'POST',
    path: '/daftar_kas',
    options: {
      validate: {},
    },
    handler: addKasHandler,
  },
  {
    method: 'GET',
    path: '/daftar_kas/{id}',
    handler: getKasByIdHandler,
  },

  {
    method: 'PUT',
    path: '/daftar_kas/{id}',
    handler: updateKasByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/daftar_kas/{id}',
    handler: deleteKasByIdHandler,
  },
];
module.exports = routes;
