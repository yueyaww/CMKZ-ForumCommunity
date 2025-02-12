let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = mongoose.Schema({
	用户名: String,
	邮箱号: String,
	手机号: String,
	密码盐: String,
	密码哈希: String,
	余额: Number,
	创建时间: Date,
	权限: {type: Schema.Types.ObjectId, ref: 'Role'}
});

module.exports = mongoose.model('User', UserSchema);