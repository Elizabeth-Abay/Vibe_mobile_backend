const Joi = require('joi');

class UserProfile {
    static userInformationFirstTime = Joi.object({
        userName: Joi.alphanum().length(5).required(),
        password: Joi.string().length(8)
    });

    static userNameTakenChecker = Joi.object({
        userName: Joi.alphanum().length(5).required()
    });
}


module.exports = UserProfile;

