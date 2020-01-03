const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const authConfig = require('./../../config/auth');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		unique: true
	},
	gender: {
		type: String,
		enum: [ 'm', 'f' ],
		required: true
	},
	password: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

UserSchema.statics.generateToken = function({ _id, name }) {
	return jwt.sign({ _id, name }, authConfig.secretKey, {
		expiresIn: authConfig.ttl
	});
};

module.exports = mongoose.model('User', UserSchema);
