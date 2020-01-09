const Post = require('./../models/Post');
const User = require('./../models/User');

class PostController {
	async index(req, res) {
		try {
			let posts = await Post.find().populate('author', [ '_id', 'name', 'gender' ]);

			const user = await User.findById(req.userId).select([ 'following' ]);

			user.following.push(req.userId);

			posts = posts.filter((post) => user.following.includes(post.author.id));

			return res.status(200).json(posts);
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}

	async get(req, res) {
		try {
			const { id } = req.params;

			const post = await Post.findById({ _id: id }).populate('author');

			if (!post) return res.status(404).json({ message: 'Not found', status: false });

			return res.status(200).json(post);
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}

	async store(req, res) {
		try {
			const { content, image } = req.body;

			const post = await Post.create({ content, image, author: req.userId });

			if (!post) return res.status(500).json({ message: 'Internal server error', status: false });

			return res.status(201).json(post);
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params;

			const post = await Post.findByIdAndUpdate({ _id: id }, req.body);

			return res.status(200).json(post);
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}

	async destroy(req, res) {
		try {
			const { id } = req.params;

			const post = await Post.findByIdAndDelete(id);

			if (!post) return res.status(404).json({ message: 'Not found', status: false });

			res.status(200).json(post);
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}
}

module.exports = new PostController();
