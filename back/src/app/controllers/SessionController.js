const User = require('../models/User');


class Session {

    async store(req, res) {
        const { email, password } = req.body

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({message: "Credenciais incorretas", status: false});
        }

        if (!await user.isPassword(password)) {
            return res.status(404).json({message: "Credenciais incorretas", status: false});
        }

        if (user.userBlocked(user)) {
            return res.status(403).json({ message: 'Conta bloqueada', status: false });
        }
        
        return res.status(200).json({ token: User.generateToken(user) });

    }

}

module.exports = new Session();