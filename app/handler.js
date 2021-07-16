const {wargaModel} = require('./models');

const getAllWargaHandler = async (request, h) => {
  const result = await wargaModel.find({});
  if (result.length !== 0) {
    return h
      .response({
        status: 'success',
        message: 'Daftar warga berhasil ditemukan',
        data: result,
      })
      .code(201);
  } else if (result.length === 0) {
    return h
      .response({
        status: 'fail',
        message: 'Daftar warga tidak ditemukan',
      })
      .code(404);
  }
  return h
    .response({
      status: 'fail',
      message: 'Terjadi kesalahan pada server',
    })
    .code(500);
};

const addWargaHandler = async (request, h) => {
  try {
    const warga = new wargaModel(request.payload);
    const result = await warga.save();
    return h
      .response({
        status: 'success',
        message: 'Data warga berhasil ditambahkan',
        data: result,
      })
      .code(201);
  } catch {
    return h
      .response({
        status: 'fail',
        message: 'Data warga gagal ditambahkan',
      })
      .code(500);
  }
};

const getWargaByNikHandler = async (request, h) => {
  const {nik} = request.params;
  const result = await wargaModel.find({nik: nik}).exec();
  if (result.length !== 0) {
    return h
      .response({
        status: 'success',
        message: 'Data warga berhasil ditemukan',
        data: result,
      })
      .code(201);
  }
  return h
    .response({
      status: 'fail',
      message: 'Data warga tidak ditemukan',
    })
    .code(404);
};

const updateWargaByNikHandler = async (request, h) => {
  const {nik} = request.params;
  const result = await wargaModel.findOneAndUpdate(
    {nik: nik},
    request.payload,
    {new: true, useFindAndModify: false}
  );
  if (result !== null) {
    return h.response({
      status: 'success',
      message: 'Data warga berhasil diperbarui',
      data: result,
    });
  } else if (result === null) {
    return h
      .response({
        status: 'fail',
        message: 'Data tidak ditemukan',
      })
      .code(404);
  }
  return h
    .response({
      status: 'fail',
      message: 'Terjadi kesalahan pada server',
    })
    .code(500);
};

const deleteWargaByNikHandler = async (request, h) => {
  const {nik} = request.params;
  const result = await wargaModel.deleteOne({nik: nik});
  if (result.deletedCount !== 0) {
    return h
      .response({
        status: 'success',
        message: 'Data berhasil dihapus',
      })
      .code(200);
  } else if (result.deletedCount === 0) {
    return h
      .response({
        status: 'fail',
        message: 'Data tidak ditemukan',
      })
      .code(404);
  }
  return h
    .response({
      status: 'fail',
      message: 'Terjadi kesalahan pada server',
    })
    .code(500);
};

module.exports = {
  getAllWargaHandler,
  addWargaHandler,
  getWargaByNikHandler,
  updateWargaByNikHandler,
  deleteWargaByNikHandler,
};
