const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	content: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	like: {
		type: Number,
		default: 0
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Post', PostSchema);
