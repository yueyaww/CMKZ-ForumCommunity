let HuatiHuifu = require('../model/HuatiHuifu.js');

exports.post = (req,res) =>{
	let param = req.body;
	let huatiHuifu = new HuatiHuifu(param);
	if(param._id){
		HuatiHuifu.updateOne({_id: param._id}, huatiHuifu, err =>{});
	}else{
		huatiHuifu.save();
	}
	res.json({
		status: 200,
		body: huatiHuifu
	});
};

exports.gets = (req,res) =>{
	HuatiHuifu.find()
	.where({'话题': req.query.话题})
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
	HuatiHuifu.findOne()
	.where({'_id': req.query.id})
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

exports.delete = (req,res) =>{
	let param = req.body;
	HuatiHuifu.deleteMany({'_id': {$in: param.id}}, err =>{});
	res.json({
		status: 200
	});
};