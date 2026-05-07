const { AuthModelPg, AuthModelGraph } = require('../model/AuthModel');
const generateOTP = require('../utils/otpGenerator');
const sha1Hasher = require('../utils/shaHasher');
const EmailSendingFunctions = require('./emailSending');
const doesOtpMatch = require('../utils/OtpMatched');

const authModelPg = new AuthModelPg();
const authModelGraph = new AuthModelGraph();

class AuthService {
    async createUser(email) {
        try {
            // check if user exist send them email 
            let isUniqueResult = await authModelPg.checkUserExist(email);

            if (isUniqueResult.data.length !== 0) {
                // means if there is a user with same email
                return {
                    success: false,
                    reason: "User already exists"
                }
            }

            // else generate and hash otp and email it
            let OTP = generateOTP();
            let otpHashed = sha1Hasher(OTP);

            // sending email
            await EmailSendingFunctions.sendingOTPEmail({ email, OTP });

            // creating the user node and the user in pg
            let userInPg = await authModelPg.createUser({ email, otpHashed });

            let { id } = userInPg;

            let userInGraph = await authModelGraph.createGraphNode(id);

            return {
                data : id
            }

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'AuthService.createUser';
            }
            throw err;
        }

    }

    async verifyUser({id , OTP}) {
        try {
            // get Otp and hash and compare it
            // hash otp
            let OtpHashed = sha1Hasher(OTP);

            // get the otp from db
            let { data } = await authModelPg.getOtp(id);

            let otpMatched = doesOtpMatch(data , OtpHashed);

            if (!otpMatched){
                return {
                    success : false,
                    reason : "Otps dont match"
                }
            }

            // else create tokens


        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'AuthService.verifyUser';
            }
            throw err;
        }
    }

    async enterUserInfo(sentInfo) {
        try {

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'AuthService.enterUserInfo';
            }
            throw err;
        }
    }

    async checkUniqueUserName(sentInfo) {
        try {

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'AuthService.checkUniqueUserName';
            }
            throw err;
        }
    }

    async logIn(sentInfo) {
        try {

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'AuthService.logIn';
            }
            throw err;
        }
    }

    async logOut(sentInfo) {
        try {

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'AuthService.logOut';
            }
            throw err;
        }

    }
}


module.exports = AuthService;
