const Post = require('./../models/Post');
const User = require('./../models/User');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

class PostController {
	async index(req, res) {
		try {
			let posts = await Post.find().populate('author', [ '_id', 'name', 'gender' ]);

			const user = await User.findById(req.userId).select([ 'following' ]);

			user.following.push(req.userId);

			posts = posts.filter((post) => user.following.includes(post.author.id));

			return res.status(200).json({ message: 'sucesso', status: 200, posts });
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: 500 });
		}
	}

	async get(req, res) {
		try {
			const { id } = req.params;

			const post = await Post.findById({ _id: id }).populate('author');

			if (!post) return res.status(404).json({ message: 'Post não encontrado', status: 404 });

			return res.status(200).json({ message: 'sucesso', status: 200, post });
		} catch (err) {
			if (err instanceof mongoose.CastError) {
				return res.status(400).json({ message: 'id inválido', status: 400 });
			}
			return res.status(500).json({ message: 'Internal server error', status: 500 });
		}
	}

	async store(req, res) {
		try {
			let { description, hashtags } = req.body;
			const { filename: image } = req.file;

			hashtags = hashtags.split(',').map((hashtag) => hashtag.trim());

			const post = await Post.create({ description, image, hashtags, author: req.userId });

			if (!post) return res.status(500).json({ message: 'Não foi possível criar a postagem', status: false });

			return res.status(201).json({ message: 'post criado', status: 201, post });
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: 500 });
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params;
			const { description } = req.body;

			const post = await Post.findById(id);
			if (!post) return res.status(404).json({ message: 'Post não encontrado', status: 404 });

			const { author } = post;

			if (author._id.toString() !== req.userId)
				return res.status(403).json({ message: 'Impossível editar este post', status: 403 });

			await post.updateOne({ description });

			post.save();

			return res.status(200).json({ message: 'Post editado', status: 200, post });
		} catch (err) {
			if (err instanceof mongoose.CastError) {
				return res.status(400).json({ message: 'id inválido', status: 400 });
			}
			return res.status(500).json({ message: 'Internal server error', status: 500 });
		}
	}

	async destroy(req, res) {
		try {
			const { id } = req.params;

			const post = await Post.findOne({ _id: id });

			if (!post) return res.status(404).json({ message: 'Post Não encontrado', status: 404 });

			const { author } = post;

			if (author._id.toString() !== req.userId)
				return res.status(403).json({ message: 'Impossível excluir este post', status: 403 });

			await post.remove();

			fs.unlinkSync(path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', 'posts', post.image));

			res.status(200).json({ message: 'Post excluído', status: 200 });
		} catch (err) {
			if (err instanceof mongoose.CastError) {
				return res.status(400).json({ message: 'id inválido', status: 400 });
			}
			return res.status(500).json({ message: 'Internal server error', status: 500 });
		}
	}
}

module.exports = new PostController();
