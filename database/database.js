const mongoose = require("mongoose");

const db = mongoose.connect(process.env.DB_URL);

module.exports = db;