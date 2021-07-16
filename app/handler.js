const {wargaModel} = require('./models');

const getAllWargaHandler = async (request, h) => {
  try {
    var warga = await wargaModel.find({});
    return h.response(warga);
  } catch {
    return h
      .response({
        status: 'fail',
        message: 'Data warga tidak ditemukan',
      })
      .code(404);
  }
};
const addWargaHandler = async (request, h) => {
  try {
    var warga = new wargaModel(request.payload);
    var result = await warga.save();
    return h.response(result);
  } catch (error) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan data warga',
      })
      .code(500);
  }
};

module.exports = {
  getAllWargaHandler,
  addWargaHandler,
};
