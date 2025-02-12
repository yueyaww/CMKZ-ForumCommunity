let Role = require('../model/Role.js');

exports.post = (req,res) =>{
	let param = req.body;
	let role = new Role(param);
	if(param._id){
		Role.updateOne({_id: param._id}, role, err =>{});
	}else{
		role.save();
	}
	res.json({
		status: 200,
		body: role
	});
};

exports.gets = (req,res) =>{
	Role.find()
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

exports.delete = (req,res) =>{
	let param = req.body;
	Role.deleteMany({'_id': {$in: param.id}}, err =>{});
	res.json({
		status: 200
	});
};