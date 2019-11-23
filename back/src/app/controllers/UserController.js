const User = require('../models/Users');


class UserController {

    async index(req, res) {
        const users = await User.find();

        return res.status(200).json(users);
    }

    async get(req, res) {
        const { id } = req.params;

        const user = await User.findById(id);
        return res.status(200).json(user); 
    }

    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({error: "User already exists"});
        }

        user = await User.create(req.body);

        return res.json(user);
    }

    async update() {

    }

    async destroy() {

    }

}

module.exports = new UserController();