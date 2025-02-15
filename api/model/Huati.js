let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let HuatiSchema = mongoose.Schema({
	社区: {type: Schema.Types.ObjectId, ref: 'Shequ'},
	标题: String,
	作者: String,
	文本类型: String,
	文本内容: String,
	话题已结束: Boolean,
	话题被隐藏: Boolean,
	话题被置顶: Boolean,
	创建时间: Date,
	更新时间: Date,
	特征: String,
	标题阅读权限: String,
	正文阅读权限: String,
	发言权限: String,
	公告编辑权限: String,
	元权限: String
});

module.exports = mongoose.model('Huati', HuatiSchema);