const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fenzuSchema = mongoose.Schema({
	用户组: String,
	独立用户们: [{type: Schema.Types.ObjectId, ref: 'User'}]
});


const HuatiTypeSchema = mongoose.Schema({
	社区: {type: Schema.Types.ObjectId, ref: 'Shequ'},
	类型名称: String,
	特征: String,
	
	标题阅读权限: fenzuSchema,
	正文阅读权限: fenzuSchema,
	公告编辑权限: fenzuSchema,
	元权限: fenzuSchema,
	
	结束后标题阅读权限: fenzuSchema,
	结束后正文阅读权限: fenzuSchema,
	结束后公告编辑权限: fenzuSchema,
	结束后发言权限: fenzuSchema,
	结束后元权限: fenzuSchema
});

module.exports = mongoose.model('HuatiType', HuatiTypeSchema);