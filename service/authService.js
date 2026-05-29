const AuthModelPg = require('../model/AuthModel');
const AuthModelGraph = require('../model/AuthModelG');
const AuthModelMong = require('../model/AuthModelMong');
const generateOTP = require('../utils/otpGenerator');
const shaHasher = require('../utils/shaHasher');
const EmailSendingFunctions = require('./emailSending');
const doesOtpMatch = require('../utils/OtpMatched');
const { RefreshToken, AccessToken } = require('./tokenGeneration');
const BcryptRelated = require('../utils/bcryptRelated');
c

const authModelPg = new AuthModelPg();
const authModelGraph = new AuthModelGraph();
const authModelMong = new AuthModelMong();
const refreshService = new RefreshToken();
const accessService = new AccessToken();

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
            let otpHashed = shaHasher(OTP);

            // sending email
            await EmailSendingFunctions.sendingOTPEmail({ email, OTP });

            // creating the user node and the user in pg
            let userInPg = await authModelPg.createUser({ email, otpHashed });
            // console.log("userinPg" , userInPg);


            let { id } = userInPg.data;

            let userInGraph = await authModelGraph.createGraphNode(id);

            if (!userInGraph.success) return userInGraph;


            let userInMong = await authModelMong.createUser(id);

            if (!userInMong) return userInMong;


            return {
                success: true,
                data: id
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

    async verifyUser({ id, OTP }) {
        try {
            // get Otp and hash and compare it
            // hash otp
            let OtpHashed = shaHasher(OTP);


            // get the otp from db
            let result = await authModelPg.getOtp(id);

            if (!result.success) return result;

            let { otp_hashed } = result.data;

            console.log("db ", otp_hashed, "hashed ", OtpHashed);

            let otpMatched = doesOtpMatch(otp_hashed, OtpHashed);

            if (!otpMatched) {
                return {
                    success: false,
                    reason: "Otps dont match"
                }
            }
            // update status of user to verified
            let gotVerified = await authModelPg.setUserAsVerified(id);

            if (!gotVerified.success) {
                return {
                    success: false,
                    reason: "Couldnt update user status"
                }
            }

            // else create tokens

            let accessToken = accessService.generateAccess(id);
            let refreshToken = await refreshService.generateRefresh(id);
            // console.log("ref " , refreshToken);

            if (!accessToken.success || !refreshToken.success) {
                accessToken.success ? refreshToken : accessToken;
                // means return either one to be the cause
            }

            accessToken = accessToken.data;
            refreshToken = refreshToken.dataForUser;

            // console.log("refreshToken from ser" , refreshToken );



            return {
                success: true,
                data: {
                    accessToken,
                    refreshToken
                }

            }


        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'AuthService.verifyUser';
            }
            throw err;
        }
    }


    async resendOtp(id) {
        try {

            let userInfo = await authModelPg.getUserEmail(id);

            if (!userInfo.success) return userInfo;

            let { email } = userInfo.data;

            // else generate and hash otp and email it
            let OTP = generateOTP();
            let otpHashed = shaHasher(OTP);

            // sending email
            await EmailSendingFunctions.sendingOTPEmail({ email, OTP });

            return { success: true }

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'AuthService.resendOtp';
            }
            throw err;
        }


    }

    async logIn({ email, password }) {
        try {
            let result = await authModelPg.logIn(email);

            if (!result.success) return result;

            // then cr8 access and ref tokens
            // fetch some posts and some new connections

            let { id, password_hashed } = result.data;

            let passwordsMatched = await BcryptRelated.bcryptCompare(password, password_hashed);

            if (!passwordsMatched) return {
                success: false,
                reason: "Password mismatch"
            }


            let accessToken = accessService.generateAccess(id);
            let refreshToken = await refreshService.generateRefresh(id);
            // console.log("ref " , refreshToken);

            if (!accessToken.success || !refreshToken.success) {
                accessToken.success ? refreshToken : accessToken;
                // means return either one to be the cause
            }

            accessToken = accessToken.data;
            refreshToken = refreshToken.dataForUser;

            // console.log("refreshToken from ser" , refreshToken );



            return {
                success: true,
                data: {
                    accessToken,
                    refreshToken
                }

            }



        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'AuthService.logIn';
            }
            throw err;
        }
    }

    async logOut(randomString) {
        try {
            let hashedRandomString = shaHasher(randomString);

            let refreshTokenInfo = await refreshService.getTokenInfo(hashedRandomString);

            if (!refreshTokenInfo.success) return refreshTokenInfo;

            let { user_id } = refreshTokenInfo.data;


            let result = await authModelPg.logOut(user_id);

            return result;

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
