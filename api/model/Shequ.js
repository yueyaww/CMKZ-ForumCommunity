let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ShequSchema = mongoose.Schema({
	社区名: String,
	权限类别: String,
	用户: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Shequ', ShequSchema);