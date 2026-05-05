const Joi = require('joi');


class AuthSchemas {
    static registrationChecker = Joi.object({
        email: Joi.string().email().required()
    });

    static verifyUserOtp = Joi.object({
        userId: Joi.string().uuid().required(),
        otp: Joi.string().length(6).required()
    });

    static userInformationFirstTime = Joi.object({
        userName: Joi.alphanum().length(5).required(),
        password: Joi.string().length(8)
    });

    static userNameTakenChecker = Joi.object({
        userName: Joi.alphanum().length(5).required()
    });


    static logInValidator = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().length(8)
    });


}





module.exports = AuthSchemas;

