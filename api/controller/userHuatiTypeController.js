let UserHuatiType = require('../model/UserHuatiType.js');

exports.post = (req,res) =>{
	let param = req.body;
	let userHuatiType = new UserHuatiType(param);
	if(param._id){
		UserHuatiType.updateOne({_id: param._id}, userHuatiType, err =>{});
	}else{
		userHuatiType.save();
	}
	res.json({
		status: 200,
		body: userHuatiType
	});
};

exports.gets = (req, res) =>{
	UserHuatiType.find({'社区': req.query.社区})
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
	UserHuatiType.findOne()
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
	UserHuatiType.deleteMany({'_id': {$in: param.ids}}, err =>{});
	res.json({
		status: 200
	});
};