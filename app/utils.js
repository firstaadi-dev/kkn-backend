/**
 * Dipake untuk convert doc yang diambil dari Mongoose ke data untuk response
 * @param doc - Single document dari fetch database
 * @return data - Data yang bisa langsung dioper untuk response
 */
const convertDocToData = (doc) => {
  const id = doc._id;
  delete doc._doc._id;
  delete doc._doc.__v;
  const data = {...doc._doc, id};

  return data;
};
module.exports = {convertDocToData};
