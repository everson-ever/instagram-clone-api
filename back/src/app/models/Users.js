const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
	activated: {
		type: Number,
		default: 1
	},
	role: {
		type: String,
		default: 'user'
	},
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Post'
		}
	],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

UserSchema.statics.generateToken = function({ _id, name, role }) {
	return jwt.sign({ _id, name, role }, authConfig.secretKey, {
		expiresIn: authConfig.ttl
	});
};

UserSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		return next();
	}

	this.password = await bcrypt.hash(this.password, 8)
});

UserSchema.methods =  {
	isPassword(password) {
		return bcrypt.compare(password, this.password);
	}
}



module.exports = mongoose.model('User', UserSchema);
