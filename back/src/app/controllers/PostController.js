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

			return res.status(200).json({ message: 'sucesso', status: true, posts });
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}

	async get(req, res) {
		try {
			const { id } = req.params;

			const post = await Post.findById({ _id: id }).populate('author');

			if (!post) return res.status(404).json({ message: 'Post não encontrado', status: false });

			return res.status(200).json({ message: 'sucesso', status: true, post });
		} catch (err) {
			if (err instanceof mongoose.CastError) {
				return res.status(400).json({ message: 'id inválido', status: false });
			}
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}

	async store(req, res) {
		try {
			const { description } = req.body;
			const { filename: image } = req.file;

			const post = await Post.create({ description, image, author: req.userId });

			if (!post) return res.status(500).json({ message: 'Não foi possível criar a postagem', status: false });

			return res.status(201).json({ message: 'post criado', status: true, post });
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params;
			const { description } = req.body;

			const post = await Post.findById(id);
			if (!post) return res.status(404).json({ message: 'Post não encontrado', status: false });

			const { author } = post;

			if (author._id.toString() !== req.userId)
				return res.status(403).json({ message: 'Impossível editar este post', status: false });

			await post.update({ description });

			post.save();

			return res.status(200).json({ message: 'Post editado', status: true, post });
		} catch (err) {
			if (err instanceof mongoose.CastError) {
				return res.status(400).json({ message: 'id inválido', status: false });
			}
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}

	async destroy(req, res) {
		try {
			const { id } = req.params;

			const post = await Post.findOne({ _id: id });

			if (!post) return res.status(404).json({ message: 'Post Não encontrado', status: false });

			const { author } = post;

			if (author._id.toString() !== req.userId)
				return res.status(403).json({ message: 'Impossível excluir este post', status: false });

			await post.remove();

			fs.unlinkSync(path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', 'posts', post.image));

			res.status(200).json({ message: 'Post excluído', status: true });
		} catch (err) {
			if (err instanceof mongoose.CastError) {
				return res.status(400).json({ message: 'id inválido', status: false });
			}
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}
}

module.exports = new PostController();
