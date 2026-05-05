const AuthService = require('../service/authService');

const authService = new AuthService();

class AuthController {
    constructor() { }

    async createUser(req, res, next) {
        // to be able to call the global error handler in case of error
        try {
            // validator already called in the routes
            let result = await authService.createUser()

        } catch (err) {
            req.from = "AuthControllers.createUser";
            next(err); // this will call the error handler
        }
    }


    async verifyUserOtp(req, res, next) {
        try {
            // otp matching 

        } catch (err) {
            req.from = 'AuthControllers.verifyUser';
            next(err);
        }
    }

    async enterUserInfo(req, res, next) {
        try {
            // username and password

        } catch (err) {
            req.from = ' AuthControllers.enterUserInfo';
            next(err);
        }
    }


    async checkUniqueUserName(req, res, next) {
        try {
            // username and password

        } catch (err) {
            req.from = 'AuthControllers.checkUniqueUserName';
            next(err);
        }
    }


    async logIn(req, res, next) {
        try {
            // username and password

        } catch (err) {
            req.from = 'AuthControllers.logIn';
            next(err);
        }
    }


    async logOut(req, res, next) {
        try {
            // username and password

        } catch (err) {
            req.from = 'AuthControllers.logOut';
            next(err);
        }
    }

}