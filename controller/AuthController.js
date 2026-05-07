const AuthService = require('../service/authService');

const authService = new AuthService();

class AuthController {
    constructor() { }

    async createUser(req, res, next) {
        // to be able to call the global error handler in case of error
        try {
            // validator already called in the routes
            let { data} = await authService.createUser();

            // the data = id of the user

            return res.status(201).json({id : data});

        } catch (err) {
            err.from = "AuthControllers.createUser";
            next(err); // this will call the error handler
        }
    }


    async verifyUserOtp(req, res, next) {
        try {
            // otp matching 

        } catch (err) {
            err.from = 'AuthControllers.verifyUser';
            next(err);
        }
    }

    async enterUserInfo(req, res, next) {
        try {
            // username and password

        } catch (err) {
            err.from = ' AuthControllers.enterUserInfo';
            next(err);
        }
    }


    async checkUniqueUserName(req, res, next) {
        try {
            // username and password

        } catch (err) {
            err.from = 'AuthControllers.checkUniqueUserName';
            next(err);
        }
    }


    async logIn(req, res, next) {
        try {
            // username and password

        } catch (err) {
            err.from = 'AuthControllers.logIn';
            next(err);
        }
    }


    async logOut(req, res, next) {
        try {
            // username and password

        } catch (err) {
            err.from = 'AuthControllers.logOut';
            next(err);
        }
    }

}


module.exports = AuthController;