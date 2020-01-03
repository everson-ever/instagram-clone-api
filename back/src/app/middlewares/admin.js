const adminAutheticate = (roles = []) => {
	if (typeof roles === 'string') {
		roles = [ roles ];
	}

	return [
		(req, res, next) => {
			if (roles.length && !roles.includes(req.userRole)) {
				return res.status(401).json({ message: 'Unauthorized', status: false });
			}
			next();
		}
	];
};

module.exports = adminAutheticate;
