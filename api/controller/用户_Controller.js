let 用户 = require('../model/用户.js');

exports.denglu = (req,res) =>{
	let param = req.body;
	用户.findOne()
	.where({"用户名": param.用户名,"": param.password})
	.populate('role')
	.exec((err,doc) =>{
		if(!err){
			if(doc){
				res.json({
					status: 200,
					body: doc
				});
			}else{
				res.status(204).end();
			}
		}
	});
};

exports.zhuce = (req,res) =>{
	let param = req.body;
	res.json({
		status: 200,
		body: null
	});
};