const User = require('./../models/User');

class FollowController {
	async index(req, res) {
		try {
			const followers = await User.findById({ _id: req.userId }, 'following').populate('following', [
				'_id',
				'name'
			]);

			return res.status(200).json(followers);
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}

	async store(req, res) {
		try {
			const { id } = req.body;

			if (id === req.userId) return res.status(400).json({ message: 'Bad request', status: false });

			/* Verify if user to follow exists */
			const userFollow = await User.findOne({ _id: id });
			if (!userFollow) return res.status(400).json({ message: 'Bad request', status: false });

			/* Verify in followers list of the user to followe if already is following
			, else follow and save */
			if (!userFollow.followers.includes(req.userId)) {
				userFollow.followers.push(req.userId);
				userFollow.save();
			}

			const user = await User.findOne({ _id: req.userId });

			/* Verify if already is in following list, else follow and save */
			if (!user.following.includes(id)) {
				user.following.push(id);
				user.save();
			}

			return res.status(201).json({ message: 'Created', status: true });
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}

	async destroy(req, res) {
		try {
			const { id } = req.params;

			const user = await User.findOne({ _id: req.userId });

			if (!user.following.includes(id)) {
				return res.status(400).json({ message: 'Bad request', status: false });
			}
			const userFollowing = await User.findOne({ _id: id });

			userFollowing.followers = userFollowing.followers.filter((idFollower) => idFollower != req.userId);
			userFollowing.save();

			user.following = user.following.filter((idFollowing) => idFollowing != id);
			user.save();

			return res.status(200).json({ status: true });
		} catch (err) {
			return res.status(500).json({ message: 'Internal server error', status: false });
		}
	}
}

module.exports = new FollowController();
