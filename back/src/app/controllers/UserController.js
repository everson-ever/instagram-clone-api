const User = require('../models/User');

class UserController {
	async index(req, res) {
		try {
			const users = await User.find().select([ '-password', '-posts', '-following', '-followers' ]);

			return res.status(200).json(users);
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}

	async get(req, res) {
		try {
			const { id } = req.params;

			const user = await User.findById(id)
				.select([ '-password', '-posts' ])
				.populate('following', [ '_id', 'name' ])
				.populate('followers', [ '_id', 'name' ]);

			if (!user) return res.status(404).json({ message: 'Not found', status: false });

			return res.status(200).json(user);
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}

	async store(req, res) {
		try {
			const { name, email, gender, password } = req.body;

			let userExists = await User.findOne({ email });

			if (userExists) return res.status(400).json({ error: 'User already exists' });

			const user = await User.create({ name, email, gender, password });

			if (!user) return res.status(500).json({ message: 'Internal server error', status: false });

			return res.status(201).json(user);
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}

	async update(req, res) {
		try {
			const { id } = req.params;
			if (id !== req.userId) return res.status(403).json({ message: 'Forbidden', status: false });

			const user = await User.findByIdAndUpdate({ _id: id }, req.body);
			if (!user) return res.status(404).json({ message: 'Not found', status: false });

			return res.status(200).json(user);
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}

	async destroy(req, res) {
		try {
			const { id } = req.params;

			if (id !== req.userId) return res.status(403).json({ message: 'Forbidden', status: false });

			const user = await User.findByIdAndDelete(id);
			if (!user) return res.status(404).json({ message: 'Not found', status: false });

			res.status(200).json(user);
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}
}

module.exports = new UserController();
