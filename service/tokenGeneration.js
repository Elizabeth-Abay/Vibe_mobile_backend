// access token - user id and expires at
// refresh token - user id and iat and expires at
// why do we need to have random string in ref token


const jwt = require('jsonwebtoken');
// library used to sign ur token
const dotenv = require('dotenv');
const path = require('path');
const crypto = require('crypto');

const stringGenerator = require('../utils/stringGenerator')
const refreshTokenModel = require('../model/refreshToken.js');
const shaHasher = require('../utils/shaHasher');



dotenv.config({
    path: path.resolve(__dirname, '../../.env')
});

let { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const refreshModel = new refreshTokenModel();

class AccessToken {
    generateAccess(id) {

        let expirationTime = 3600; // 1hr in seconds

        let currently = Math.floor(Date.now() / 1000); // Convert to seconds
        // expire after 1 hr 

        let signedInfo = {
            exp: currently + expirationTime,
            id
        }

        let accessToken = jwt.sign(signedInfo, ACCESS_TOKEN_SECRET);

        return {
            success: true,
            data: accessToken
        }

    }


}


class RefreshToken {
    async generateRefresh(userId) {
        try {
            // sent to db and sent to user

            // sentInfo = { randomString , userId}

            let randomString = stringGenerator();

            let twenty_days_from_now = 20 * 24 * 60 * 60;
            let exp = Date.now() / 1000 + twenty_days_from_now;


            let hashedRandomString = shaHasher(randomString);

            // sent to the database
            let refToken = await refreshModel.createRef({ userId, hashedRandomString });

            // if putting info into refToken table was successful then sign and send the ref token

            // contents of the refresh token
            let refreshToken = jwt.sign({ exp, randomString }, REFRESH_TOKEN_SECRET)

            // then return this as a data
            return {
                data: refreshToken
            }
        } catch (err) {
            console.log("Error while Token.generateRefresh ", err.message);
            return {
                success: false,
                reason: "Error while Token.generateRefresh"
            }
        }
    }

    async getTokenInfo(hashedTokenString) {
        try {
            
            let result = await refreshModel.getRefTokenInfo(hashedTokenString);

            return {
                data: re
            }

        } catch (err) {
            console.log("Error while Token.generateAccessFromRef ", err.message);
            return {
                success: false,
                reason: "Error while Token.generateAccessFromRef"
            }
        }
    }


    async invalidateRefresh(hashedString) {
        try {
            // do an update to set isvalid = false

            let res = await refreshModel.invalidateRefresh(hashedString);

            if (!res.success) {
                return {
                    success: false,
                    reason: "Error while calling refreshModel.invalidateRefresh"
                }
            }

            return {
                success: true
            }

        } catch (err) {
            console.log("Error while Token.invalidateRefresh ", err.message);
            return {
                success: false,
                reason: "Error while Token.invalidateRefresh"
            }

        }
    }

    invalidateAllRefresh(userId) {
        try {
            // revoke all tokens if expired token used
            let res = await refreshModel.invalidateAll(userId);

            if (!res.success) {
                return res
            }

            return {
                success: true
            }



        } catch (err) {
            console.log("Error while Token.invalidateRefresh ", err.message);
            return {
                success: false,
                reason: "Error while Token.invalidateRefresh"
            }

        }
    }
}


const refreshTokenService = new RefreshToken();
const accessTokenService = new AccessToken();


module.exports = {
    RefreshToken ,
    AccessToken
}