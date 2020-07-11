const User = require('../models/User');
const UserService = require('../services/UserService')

class UserController {
	async index(req, res) {
		try {
			const users = await UserService.getUsers();

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

			if (!user) return res.status(404).json({ message: 'Usuário não encontrado', status: false });

			return res.status(200).json(user);
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}



	async update(req, res) {
		try {
			const { id } = req.params;
			if (id !== req.userId) return res.status(403).json({ message: 'Você não tem permissão', status: false });

			const user = await User.findByIdAndUpdate({ _id: id }, req.body);
			if (!user) return res.status(404).json({ message: 'Usuário não encontrado', status: false });

			return res.status(200).json(user);
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}

	async destroy(req, res) {
		try {
			const { id } = req.params;

			if (id !== req.userId) return res.status(403).json({ message: 'Você não tem permissão', status: false });

			const user = await User.findByIdAndDelete(id);
			if (!user) return res.status(404).json({ message: 'Usuário não encontrado', status: false });

			res.status(200).json(user);
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}
}

module.exports = new UserController();
