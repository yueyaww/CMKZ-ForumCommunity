let Huati = require('../model/Huati.js');

exports.post = (req,res) =>{
	let param = req.body;
	let huati = new Huati(param);
	if(param._id){
		Huati.updateOne({_id: param._id}, huati, err =>{});
	}else{
		huati.save();
	}
	res.json({
		status: 200,
		body: huati
	});
};

exports.gets = (req,res) =>{
	Huati.find()
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
	Huati.findOne()
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

exports.page = (req,res) =>{
	let param = req.body;
	let size = Number(param.size);
	let cur = Number(param.cur);
	
	let searchForm = param.searchForm;
	let sql = [{'_id': {$ne: null}}];
	if(searchForm){
		if(searchForm.社区){
			sql.push({"社区": searchForm.社区})
		}
	}
	Huati.find()
	.and(sql)
	.select("_id")
	.exec((err, count) =>{
		Huati.find()
		.and(sql)
		.limit(size)
		.skip((cur-1) * size)
		.sort({'更新时间': -1})
		.exec((err ,docs) =>{
			res.json({
				status: 200,
				body: {
					datas: docs,
					count: count!=null? count.length: 0
				}
			});
		});
	});
}

exports.delete = (req,res) =>{
	let param = req.body;
	Huati.deleteMany({'_id': {$in: param.id}}, err =>{});
	res.json({
		status: 200
	});
};