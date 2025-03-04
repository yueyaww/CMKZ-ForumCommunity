const User = require('../model/User.js');
const crypto = require('crypto');

exports.denglu = (req,res) =>{
	let param = req.body;
	User.findOne({
	  $or: [
	    { '手机号': param.账号 },
	    { '用户名': param.账号 }
	  ] 
	})
	.populate('角色')
	.then(doc => {
		if(doc){
			let hashPassword = crypto
			      .pbkdf2Sync(param.密码, doc.密码盐, 1000, 64, 'sha256')
			      .toString('hex');
			if(hashPassword!=doc.密码哈希){
				res.status(204).end();
				return;
			}
			res.json({
				status: 200,
				body: doc
			});
		}else{
			res.status(204).end();
		}
	}).catch(err => {
	  res.status(204).end();
	});
};

exports.zhuce = (req, res) =>{
	let param = req.body;
	let salt = crypto.randomBytes(16).toString('hex'); //随机盐
	let hashPassword = crypto
        .pbkdf2Sync(param.密码, salt, 1000, 64, 'sha256')
        .toString('hex'); 
				
	let user = new User(param);
	user.密码盐 = salt;
	user.密码哈希 = hashPassword;
	let result = '_';
	for (let i = 0; i < 8; i++) {
			result += Math.floor(Math.random() * 10);
	}
	user.用户名 = "CMKZ_EY"+result;
	user.角色 = '67ac5c803e4ed447c98fa652';
	user.save();
	res.json({
		status: 200,
		body: user
	});
};

exports.update = (req, res) =>{
	let param = req.body;
	if(param._id){
		User.updateOne({_id: param._id}, param, err =>{});
	}
	res.json({
		status: 200
	});
};

exports.gets = (req, res) =>{
	let param = req.query;
	let sql = [];
	// if(param.role){
	// 	sql.push({"role": param.role})
	// }
	User.find()
	// .and(sql)
	.populate('角色')
	.exec((err,docs) =>{
		if(!err){
			res.json({
				status: 200,
				body: docs
			});
		}else{
			res.status(500).end();
		}
	});
};

exports.get = (req,res) =>{
	let param = req.query;
	let sql = [];
	if(param.id){
		sql.push({"_id": param.id})
	}
	if(param.用户名){
		sql.push({"用户名": param.用户名})
	}
	User.findOne()
	.and(sql)
	.populate('角色')
	.exec((err,doc) =>{
		if(!err){
			res.json({
				status: 200,
				body: doc
			});
		}else{
			res.status(500).end();
		}
	});
};