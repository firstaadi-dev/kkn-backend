const {
  wargaModel,
  iuranModel,
  suratModel,
  kegiatanModel,
  kejadianModel,
} = require('./models');
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
  try {
    const {sort, range} = request.query;

    // Untuk header
    const count = await iuranModel.countDocuments({});

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
        ? await iuranModel
            .find()
            .sort([[sortParameter, sortType]])
            .skip(min)
            .limit(max - min + 1)
        : await iuranModel.find({});

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

const addIuranHandler = async (request, h) => {
  try {
    const iuran = new iuranModel(request.payload);
    const result = await iuran.save();

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
        message: 'Data iuran gagal ditambahkan',
      })
      .code(500);
  }
};

const getIuranByIdHandler = async (request, h) => {
  try {
    const {id} = request.params;
    const result = await iuranModel
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
        message: 'Data iuran tidak ditemukan',
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

const updateIuranByIdHandler = async (request, h) => {
  try {
    const {id} = request.params;

    const result = await iuranModel.findOneAndUpdate(
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
const deleteIuranByIdHandler = async (request, h) => {
  try {
    const {id} = request.params;

    // Ambil docnya untuk response, di admin panel bisa Undo jadi perlu docnya
    const doc = await iuranModel
      .find({_id: new Mongoose.Types.ObjectId(id)})
      .exec();

    const result = await iuranModel.deleteOne({
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
const getAllSuratHandler = async (request, h) => {
  try {
    const {sort, range} = request.query;

    // Untuk header
    const count = await suratModel.countDocuments({});

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
        ? await suratModel
            .find()
            .sort([[sortParameter, sortType]])
            .skip(min)
            .limit(max - min + 1)
        : await suratModel.find({});

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
const addSuratHandler = async (request, h) => {
  try {
    const surat = new suratModel(request.payload);
    const result = await surat.save();

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
        message: 'Data surat gagal ditambahkan',
      })
      .code(500);
  }
};
const getSuratByIdHandler = async (request, h) => {
  try {
    const {id} = request.params;
    const result = await suratModel
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
        message: 'Data surat tidak ditemukan',
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
const updateSuratByIdHandler = async (request, h) => {
  try {
    const {id} = request.params;

    const result = await suratModel.findOneAndUpdate(
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
const deleteSuratByIdHandler = async (request, h) => {
  try {
    const {id} = request.params;

    // Ambil docnya untuk response, di admin panel bisa Undo jadi perlu docnya
    const doc = await suratModel
      .find({_id: new Mongoose.Types.ObjectId(id)})
      .exec();

    const result = await suratModel.deleteOne({
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
const getAllKejadianHandler = async (request, h) => {
  try {
    const {sort, range} = request.query;

    // Untuk header
    const count = await kejadianModel.countDocuments({});

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
        ? await kejadianModel
            .find()
            .sort([[sortParameter, sortType]])
            .skip(min)
            .limit(max - min + 1)
        : await kejadianModel.find({});

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
const addKejadianHandler = async (request, h) => {
  try {
    const kejadian = new kejadianModel(request.payload);
    const result = await kejadian.save();

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
        message: 'Data kejadian gagal ditambahkan',
      })
      .code(500);
  }
};
const getKejadianByIdHandler = async (request, h) => {
  try {
    const {id} = request.params;
    const result = await kejadianModel
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
        message: 'Data kejadian tidak ditemukan',
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
const updateKejadianByIdHandler = async (request, h) => {
  try {
    const {id} = request.params;

    const result = await kejadianModel.findOneAndUpdate(
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
const deleteKejadianByIdHandler = async (request, h) => {
  try {
    const {id} = request.params;

    // Ambil docnya untuk response, di admin panel bisa Undo jadi perlu docnya
    const doc = await kejadianModel
      .find({_id: new Mongoose.Types.ObjectId(id)})
      .exec();

    const result = await kejadianModel.deleteOne({
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
const getAllKegiatanHandler = async (request, h) => {
  try {
    const {sort, range} = request.query;

    // Untuk header
    const count = await kegiatanModel.countDocuments({});

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
        ? await kegiatanModel
            .find()
            .sort([[sortParameter, sortType]])
            .skip(min)
            .limit(max - min + 1)
        : await kegiatanModel.find({});

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
const addKegiatanHandler = async (request, h) => {
  try {
    const kegiatan = new kegiatanModel(request.payload);
    const result = await kegiatan.save();

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
        message: 'Data kegiatan gagal ditambahkan',
      })
      .code(500);
  }
};
const getKegiatanByIdHandler = async (request, h) => {
  try {
    const {id} = request.params;
    const result = await kegiatanModel
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
        message: 'Data kegiatan tidak ditemukan',
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
const updateKegiatanByIdHandler = async (request, h) => {
  try {
    const {id} = request.params;

    const result = await kegiatanModel.findOneAndUpdate(
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
const deleteKegiatanByIdHandler = async (request, h) => {
  try {
    const {id} = request.params;

    // Ambil docnya untuk response, di admin panel bisa Undo jadi perlu docnya
    const doc = await kegiatanModel
      .find({_id: new Mongoose.Types.ObjectId(id)})
      .exec();

    const result = await kegiatanModel.deleteOne({
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
  getAllSuratHandler,
  addSuratHandler,
  getSuratByIdHandler,
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
};
