let Shequ = require('../model/Shequ.js');

exports.post = (req,res) =>{
	let param = req.body;
	let shequ = new Shequ(param);
	if(param._id){
		Shequ.updateOne({_id: param._id}, shequ, err =>{});
	}else{
		shequ.save();
	}
	res.json({
		status: 200,
		body: shequ
	});
};

exports.gets = (req,res) =>{
	Shequ.find()
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
	Shequ.deleteMany({'_id': {$in: param.id}}, err =>{});
	res.json({
		status: 200
	});
};