const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('./../../config/auth');

module.exports = async (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: 'Token not provided', status: false });
	}

	const [ , token ] = authHeader.split(' ');

	try {
		const decoded = await promisify(jwt.verify)(token, authConfig.secretKey);

		req.userId = decoded._id;
		req.userName = decoded.name;
		req.userRole = decoded.role;

		next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid Token', status: false });
	}
};
