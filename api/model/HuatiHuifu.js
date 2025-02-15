let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let HuatiSchema = mongoose.Schema({
	话题: {type: Schema.Types.ObjectId, ref: 'huati'},
	作者: String,
	文本类型: String,
	文本内容: String,
	创建时间: Date
});

module.exports = mongoose.model('HuatiHuifu', HuatiSchema);