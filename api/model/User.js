let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = mongoose.Schema({
	用户名: String,
	邮箱号: String,
	手机号: String,
	密码盐: String,
	密码哈希: String,
	余额: {
		type: Number,
		default: 0
	},
	创建时间: Date,
	角色: [{
		type: Schema.Types.ObjectId,
		ref: 'Role'
	}]
});

module.exports = mongoose.model('User', UserSchema);