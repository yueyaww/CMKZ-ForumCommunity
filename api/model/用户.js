let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let 用户_Schema = mongoose.Schema({
	用户名: String,
	邮箱号: String,
	手机号: String,
	密码盐: String,
	密码哈希: String,
	余额: Number,
	创建时间: Date
});

module.exports = mongoose.model('user', 用户_Schema);