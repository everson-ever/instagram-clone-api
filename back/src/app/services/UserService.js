const User = require('../models/User');

class UserService {

    checkRequiredParams(fields, requiredFields) {
        const errors = [];
        for (const field of requiredFields) {
            if(!fields[field]) {
                const error = `O parâmetro '${field}' é obrigatório`;
                errors.push(error);
            }
        }

        return errors;
    }

    async getUsers() {
        const users = await User.find().select([ '-password', '-posts', '-following', '-followers' ]);
        return users;
    }

    async findByEmail(email) {
        const user = await User.findOne({ email });
        return user;
    }

    async create({ name, email, gender, password }) {
        const user = await User.create({ name, email, gender, password });
        return user;
    }

}

module.exports = new UserService();