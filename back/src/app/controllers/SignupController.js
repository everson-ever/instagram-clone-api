const UserService = require('../services/UserService');
const { badRequest, serverError, ok } = require('../helpers/httpHelper');
const MissingParamError = require('../errors/MissingParamError');
const InvalidParamError = require('../errors/InvalidParamError');

class SignupController {

    async store(req, res) {
		try {
            const fields = req.body;
            const { email, gender } = fields;      
            const requiredFields = ['name', 'email', 'gender', 'password'];
            const genders = ['m', 'f'];
            const missingParams = UserService.checkRequiredParams(fields, requiredFields);

            if (missingParams) {
                return res.status(400).json(badRequest(new MissingParamError(missingParams)));
            }

            if (!genders.includes(gender.toLowerCase())) {
                const error = 'O parâmetro gender deve ser M ou F'
                return res.status(400).json(badRequest(new InvalidParamError([error])));
            }

            let userExists = await UserService.findByEmail(email);
            if (userExists) {
                const error = ['Este E-email já foi cadastrado no sistema'];
                return res.status(400).json(badRequest(new InvalidParamError(error)));
            }

			let user = await UserService.create(fields);
            
            delete user.password;

			return res.status(201).json(ok(user));
		} catch (err) {
			return res.status(500).json(serverError());
		}
	}

}

module.exports = new SignupController();