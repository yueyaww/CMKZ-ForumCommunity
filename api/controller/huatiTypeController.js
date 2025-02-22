let HuatiType = require('../model/HuatiType.js');

exports.post = (req,res) =>{
	let param = req.body;
	let huatiType = new HuatiType(param);
	if(param._id){
		HuatiType.updateOne({_id: param._id}, huatiType, err =>{});
	}else{
		huatiType.save();
	}
	res.json({
		status: 200,
		body: huatiType
	});
};

exports.gets = (req, res) =>{
	HuatiType.find({'社区': req.query.社区})
	.populate('用户')
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
	HuatiType.findOne()
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
	HuatiType.deleteMany({'_id': {$in: param.ids}}, err =>{});
	res.json({
		status: 200
	});
};