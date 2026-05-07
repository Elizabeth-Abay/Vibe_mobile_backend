const Joi = require('joi');

class UserInfoSchema {
    static userInformationFirstTime = Joi.object({
        userName: Joi.alphanum().length(5).required(),
        password: Joi.string().length(8)
    });

    static userNameTakenChecker = Joi.object({
        userName: Joi.alphanum().length(5).required()
    });
}


module.exports = UserInfoSchema;

