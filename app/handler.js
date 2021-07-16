const {wargaModel} = require('./models');
const {Mongoose} = require('../config/database');

const getAllWargaHandler = async (request, h) => {
  const result = await wargaModel.find({});
  if (result.length !== 0) {
    return h
      .response({
        status: 'success',
        message: 'Daftar warga berhasil ditemukan',
        docs: result,
        items: {total: result.length},
      })
      .code(200)
      .header('Access-Control-Expose-Headers', 'X-Total-Count')
      .header('X-Total-Count', result.length);
  }
  // else if (result.length === 0) {
  //   return h
  //     .response({
  //       status: 'fail',
  //       message: 'Daftar warga tidak ditemukan',
  //     })
  //     .code(404);
  // }
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
      .code(201)
      .header('Access-Control-Expose-Headers', 'X-Total-Count')
      .header('X-Total-Count', result.length);
  } catch {
    return h
      .response({
        status: 'fail',
        message: 'Data warga gagal ditambahkan',
      })
      .code(500);
  }
};

const getWargaByIdHandler = async (request, h) => {
  const {id} = request.params;
  const result = await wargaModel
    .find({_id: new Mongoose.Types.ObjectId(id)})
    .exec();
  if (result.length !== 0) {
    return h
      .response({
        status: 'success',
        message: 'Data warga berhasil ditemukan',
        docs: result,
        items: {total: result.length},
      })
      .code(200)
      .header('Access-Control-Expose-Headers', 'X-Total-Count')
      .header('X-Total-Count', result.length);
  }
  return h
    .response({
      status: 'fail',
      message: 'Data warga tidak ditemukan',
    })
    .code(404);
};

const updateWargaByIdHandler = async (request, h) => {
  const {id} = request.params;
  const result = await wargaModel.findOneAndUpdate(
    {_id: new Mongoose.Types.ObjectId(id)},
    request.payload,
    {new: true, useFindAndModify: false}
  );
  if (result !== null) {
    return h
      .response({
        status: 'success',
        message: 'Data warga berhasil diperbarui',
        docs: result,
        items: {total: result.length},
      })
      .code(200)
      .header('Access-Control-Expose-Headers', 'X-Total-Count')
      .header('X-Total-Count', result.length);
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

const deleteWargaByIdHandler = async (request, h) => {
  const {id} = request.params;
  const result = await wargaModel.deleteOne({
    _id: new Mongoose.Types.ObjectId(id),
  });
  if (result.deletedCount !== 0) {
    return h
      .response({
        status: 'success',
        message: 'Data berhasil dihapus',
        docs: result,
      })
      .code(200)
      
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
  getWargaByIdHandler,
  updateWargaByIdHandler,
  deleteWargaByIdHandler,
};
