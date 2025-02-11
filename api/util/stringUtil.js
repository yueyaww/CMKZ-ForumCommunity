let mongoose = require('mongoose');

exports.paseObjIds = (ids) =>{
	let objIds = [];
	for(let id of ids){
		objIds.push(mongoose.Types.ObjectId(id));
	}
	return objIds;
}

exports.prefixZero = (num, n) =>{
	return (Array(n).join(0) + num).slice(-n);
}