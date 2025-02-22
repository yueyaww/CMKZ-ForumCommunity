let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ShequSchema = mongoose.Schema({
	社区名: String,
	简称: String
});

module.exports = mongoose.model('Shequ', ShequSchema);