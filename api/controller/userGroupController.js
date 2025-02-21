let UserGroup = require('../model/UserGroup.js');

exports.post = (req,res) =>{
	let param = req.body;
	let userGroup = new UserGroup(param);
	if(param._id){
		UserGroup.updateOne({_id: param._id}, userGroup, err =>{});
	}else{
		userGroup.save();
	}
	res.json({
		status: 200,
		body: userGroup
	});
};

exports.gets = (req,res) =>{
	UserGroup.find()
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
	UserGroup.findOne()
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
	UserGroup.deleteMany({'_id': {$in: param.id}}, err =>{});
	res.json({
		status: 200
	});
};