const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	description: {
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
	hashtags: {
		type: [ String ]
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Post', PostSchema);
