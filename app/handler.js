const {wargaModel, iuranModel} = require('./models');
const {Mongoose} = require('../config/database');
const {convertDocToData} = require('./utils');

const getAllWargaHandler = async (request, h) => {
  try {
    const {sort, range} = request.query;

    // Untuk header
    const count = await wargaModel.countDocuments({});

    const sortParsed =
      sort !== undefined
        ? sort.replace(/[\[\]\'\"']+/g, '').split(',')
        : undefined;
    const sortParameter = sortParsed !== undefined ? sortParsed[0] : undefined;
    const sortType =
      sortParsed !== undefined && sortParsed[1] == 'DESC' ? -1 : 1;

    const rangeParsed =
      range !== undefined
        ? range.replace(/[\[\]']+/g, '').split(',')
        : undefined;
    const min =
      rangeParsed !== undefined ? parseInt(rangeParsed[0]) : undefined;
    const max =
      rangeParsed !== undefined ? parseInt(rangeParsed[1]) : undefined;

    const result =
      sort !== undefined && range !== undefined
        ? await wargaModel
            .find()
            .sort([[sortParameter, sortType]])
            .skip(min)
            .limit(max - min + 1)
        : await wargaModel.find({});

    const data = result.map(convertDocToData);

    return h
      .response(data)
      .code(200)
      .header('Access-Control-Expose-Headers', 'X-Total-Count')
      .header('X-Total-Count', count);
  } catch (e) {
    return h
      .response({
        status: 'fail',
        message: 'Terjadi kesalahan pada server',
      })
      .code(500);
  }
};

const addWargaHandler = async (request, h) => {
  try {
    const warga = new wargaModel(request.payload);
    const result = await warga.save();

    const data = convertDocToData(result);

    return h
      .response(data)
      .code(201)
      .header('Access-Control-Expose-Headers', 'X-Total-Count')
      .header('X-Total-Count', result.length);
  } catch (e) {
    return h
      .response({
        status: 'fail',
        message: 'Data warga gagal ditambahkan',
      })
      .code(500);
  }
};

const getWargaByIdHandler = async (request, h) => {
  try {
    const {id} = request.params;
    const result = await wargaModel
      .find({_id: new Mongoose.Types.ObjectId(id)})
      .exec();
    if (result.length !== 0) {
      const data = convertDocToData(result[0]);

      return h
        .response(data)
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
  } catch (e) {
    return h
      .response({
        status: 'fail',
        message: 'Terjadi kesalahan pada server',
      })
      .code(500);
  }
};

const updateWargaByIdHandler = async (request, h) => {
  try {
    const {id} = request.params;

    const result = await wargaModel.findOneAndUpdate(
      {_id: new Mongoose.Types.ObjectId(id)},
      request.payload,
      {new: true, useFindAndModify: false}
    );
    if (result !== null) {
      const data = convertDocToData(result);

      return h
        .response(data)
        .code(200)
        .header('Access-Control-Expose-Headers', 'X-Total-Count')
        .header('X-Total-Count', result.length);
    }

    return h
      .response({
        status: 'fail',
        message: 'Data tidak ditemukan',
      })
      .code(404);
  } catch (e) {
    return h
      .response({
        status: 'fail',
        message: 'Terjadi kesalahan pada server',
      })
      .code(500);
  }
};

const deleteWargaByIdHandler = async (request, h) => {
  try {
    const {id} = request.params;

    // Ambil docnya untuk response, di admin panel bisa Undo jadi perlu docnya
    const doc = await wargaModel
      .find({_id: new Mongoose.Types.ObjectId(id)})
      .exec();

    const result = await wargaModel.deleteOne({
      _id: new Mongoose.Types.ObjectId(id),
    });

    if (result.deletedCount !== 0) {
      const data = convertDocToData(doc[0]);
      return h.response(data).code(200);
    }

    return h
      .response({
        status: 'fail',
        message: 'Data tidak ditemukan',
      })
      .code(404);
  } catch (e) {
    return h
      .response({
        status: 'fail',
        message: 'Terjadi kesalahan pada server',
        error: e,
      })
      .code(500);
  }
};

//=============================================================//

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
