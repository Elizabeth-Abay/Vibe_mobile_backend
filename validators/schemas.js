const Joi = require('joi');


// when user registers email is sent
const registrationChecker = Joi.object({
    email: Joi.string().email().required()
});

const verifyUser = Joi.object({
    userId: Joi.string().uuid().required(),
    otp: Joi.string().length(6).required()
});

const userInformationFirstTime = Joi.object({
    userName: Joi.alphanum().length(5).required(),
    password: Joi.string().length(8)
});

const userNameTakenChecker = Joi.object({
    userName: Joi.alphanum().length(5).required()
});


const logInValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().length(8)
});


module.exports = {
    registrationChecker,
    verifyUser,
    userInformationFirstTime,
    userNameTakenChecker,
    logInValidator
}

