let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let HuatiSchema = mongoose.Schema({
	社区: {type: Schema.Types.ObjectId, ref: 'Shequ'},
	标题: String,
	作者: String,
	话题已结束: Boolean,
	话题被隐藏: Boolean,
	话题被置顶: Boolean,
	创建时间: Date,
	更新时间: Date
});

module.exports = mongoose.model('Huati', HuatiSchema);