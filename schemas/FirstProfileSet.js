const Joi = require('joi');

class UserInfoSchema {
    static userInformationFirstTime = Joi.object({
        userName: Joi.alphanum().required(),
        password: Joi.string().length(8),
        name : Joi.string().required()
    });

    static userNameTakenChecker = Joi.object({
        userName: Joi.alphanum().length(5).required()
    });
}


module.exports = UserInfoSchema;

