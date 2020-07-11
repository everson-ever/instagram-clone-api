const UserService = require('../services/UserService');
const { badRequest, serverError } = require('../helpers/httpHelper');
const MissingParamError = require('../errors/MissingParamError');

class SignupController {

    async store(req, res) {
		try {
            const fields = req.body;
            const { email } = req.body;      
            const requiredFields = ['name', 'email', 'gender', 'password'];
            const errors = UserService.checkRequiredParams(fields, requiredFields);

            if (errors.length) {
                return res.status(404).json(badRequest(new MissingParamError(errors)));
            }

            let userExists = await UserService.findByEmail(email);
            const error = ['Este E-email já foi cadastrado no sistema']
            if (userExists)
                return res.status(400).json(badRequest(new MissingParamError(error)));

			let user = await UserService.create(fields);
            
            delete user.password;

			return res.status(201).json(user);
		} catch (err) {
			return res.status(500).json(serverError());
		}
	}

}

module.exports = new SignupController();