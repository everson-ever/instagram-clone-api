const User = require('./../models/User');

class FollowController {
	async store(req, res) {
		try {
			const { id } = req.body;

			const userFollow = await User.findOne({ _id: id });
			if (!userFollow) return res.status(400).json({ message: 'Bad request', status: false });

			if (!userFollow.followers.includes(req.userId)) {
				userFollow.followers.push(req.userId);
				userFollow.save();
			}

			const user = await User.findOne({ _id: req.userId });

			if (!user.following.includes(id)) {
				user.following.push(id);
				user.save();
			}

			return res.status(201).json({ message: 'Created', status: true });
		} catch (err) {}
	}
}

module.exports = new FollowController();
