let mongoose = require('mongoose');

let RoleSchema = mongoose.Schema({
	name: String,
	menus: []
});

module.exports = mongoose.model('Role',RoleSchema);