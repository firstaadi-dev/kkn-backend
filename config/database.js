const Mongoose = require('mongoose');
require('dotenv').config();

Mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
	console.log('Connection with database succeeded');
});
exports.Mongoose = Mongoose;
exports.db = db;
