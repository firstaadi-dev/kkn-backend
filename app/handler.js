const {wargaModel, iuranModel} = require('./models');
const {Mongoose} = require('../config/database');

const getAllWargaHandler = async (request, h) => {
  const {sort, range} = request.query;

  const sortParsed =
    sort !== undefined
      ? sort.replace(/[\[\]\'\"']+/g, '').split(',')
      : undefined;
  const sortParameter = sortParsed !== undefined ? sortParsed[0] : undefined;
  const sortType = sortParsed !== undefined && sortParsed[1] == 'DESC' ? -1 : 1;

  const rangeParsed =
    range !== undefined ? range.replace(/[\[\]']+/g, '').split(',') : undefined;
  const min = rangeParsed !== undefined ? parseInt(rangeParsed[0]) : undefined;
  const max = rangeParsed !== undefined ? parseInt(rangeParsed[1]) : undefined;

  const result =
    sort !== undefined && range !== undefined
      ? await wargaModel
          .find()
          .sort([[sortParameter, sortType]])
          .skip(min)
          .limit(max - min + 1)
      : await wargaModel.find({});

  if (result.length !== 0) {
    return h
      .response({
        status: 'success',
        message: 'Daftar warga berhasil ditemukan',
        docs: result,
        items: {
          total: result.length,
          sort: sort,
          range: range,
        },
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
        docs: result,
        items: {total: result.length},
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

const getAllIuranHandler = async (request, h) => {
  const result = await iuranModel.find({});
  if (result.length !== 0) {
    return h
      .response({
        status: 'success',
        message: 'Daftar iuran berhasil ditemukan',
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
      message: 'Terjadi kesalahan pada server',
    })
    .code(500);
};
const getIuranByIdHandler = async (request, h) => {
  const {id} = request.params;
  const result = await iuranModel
    .find({_id: new Mongoose.Types.ObjectId(id)})
    .exec();
  if (result.length !== 0) {
    return h
      .response({
        status: 'success',
        message: 'Data iuran berhasil ditemukan',
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
      message: 'Data iuran tidak ditemukan',
    })
    .code(404);
};
const addIuranHandler = async (request, h) => {
  try {
    const iuran = new iuranModel(request.payload);
    const result = await iuran.save();
    return h
      .response({
        status: 'success',
        message: 'Data iuran berhasil ditambahkan',
        docs: result,
        items: {total: result.length},
      })
      .code(201)
      .header('Access-Control-Expose-Headers', 'X-Total-Count')
      .header('X-Total-Count', result.length);
  } catch (error) {
    return h
      .response({
        status: 'fail',
        message: error,
      })
      .code(500);
  }
};
const updateIuranByIdHandler = async (request, h) => {
  const {id} = request.params;
  const result = await iuranModel.findOneAndUpdate(
    {_id: new Mongoose.Types.ObjectId(id)},
    request.payload,
    {new: true, useFindAndModify: false}
  );
  if (result !== null) {
    return h
      .response({
        status: 'success',
        message: 'Data iuran berhasil diperbarui',
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
const deleteIuranByIdHandler = async (request, h) => {
  const {id} = request.params;
  const result = await iuranModel.deleteOne({
    _id: new Mongoose.Types.ObjectId(id),
  });
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
  getWargaByIdHandler,
  updateWargaByIdHandler,
  deleteWargaByIdHandler,
  getAllIuranHandler,
  getIuranByIdHandler,
  addIuranHandler,
  updateIuranByIdHandler,
  deleteIuranByIdHandler,
};
