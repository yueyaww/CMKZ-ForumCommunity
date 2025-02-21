let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserGroupSchema = mongoose.Schema({
	名称: String,
	用户: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}]
});

module.exports = mongoose.model('UserGroup', UserGroupSchema);