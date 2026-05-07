// access token - user id and expires at
// refresh token - user id and iat and expires at
// why do we need to have random string in ref token


const jwt = require('jsonwebtoken');
// library used to sign ur token
const dotenv = require('dotenv');
const path = require('path');
const crypto = require('crypto');

const { refreshTokenModel } = require('../model/refreshToken');



dotenv.config({
    path: path.resolve(__dirname, '../../.env')
});

let { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const refreshModel = new refreshTokenModel();

class AccessToken {
    static generateAccess(id) {
        let signedInfo = {
            id
        }

        let expirationTime = 3600; // 1hr in seconds

        let currently = Math.floor(Date.now() / 1000); // Convert to seconds
        // expire after 1 hr so 

        signedInfo.exp = currently + expirationTime;

        let accessToken = jwt.sign(signedInfo, ACCESS_TOKEN_SECRET);

        return {
            success: true,
            data: {
                accessToken
            }
        }

    }


}


class RefreshToken {
    static async generateRefresh(sentInfo) {
        try {
            // two things to be done in here
            // one sign the randomstring and exp  and send to the client 
            // create a record in refreshToken table

            // sentInfo = { randomString , userId}

            let { randomString, userId } = sentInfo;

            // for the db hash , for user exp
            let twenty_days_from_now = 20 * 24 * 60 * 60;
            let exp = Date.now() / 1000 + twenty_days_from_now;

            let sentToBeSigned = { exp, randomString };

            let hashedTokenInfo = crypto.createHash('sha256').update(randomString).digest('hex');

            let sentToDataBase = { userId, hashedTokenInfo }

            let refToken = await refreshModel.puttingInfoIntoRefTokenInfo(sentToDataBase);

            if (!refToken.success) {
                return {
                    success: false,
                    reason: "Problem in database"
                }
            }

            // if putting info into refToken table was successful then sign and send the ref token

            let refreshToken = jwt.sign(sentToBeSigned, REFRESH_TOKEN_SECRET)

            // then return this as a data
            return {
                success: true,
                data: {
                    refreshToken
                }
            }



        } catch (err) {
            console.log("Error while Token.generateRefresh ", err.message);
            return {
                success: false,
                reason: "Error while Token.generateRefresh"
            }
        }
    }


    static async invalidateRefresh(sentInfo) {
        try {
            // do an update to set isvalid = false
            // sentInfo = { randomString }
            // hash and send to model

            let { randomString } = sentInfo;
            let hashedTokenInfo = crypto.createHash("sha256").update(randomString).digest("hex");

            let res = await refreshModel.invalidateRefresh({ hashedTokenInfo });

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

    static invalidateAllRefresh(sentInfo){
        
    }


    static async generateAccessFromRef(sentInfo) {
        try {
            // steps first get info from database
            // create access from that 

            // sentInfo = { randomString } - decoded from the refresh token
            // we have verified using the jwt.verify while decoding

            let { randomString } = sentInfo;
            // hash 
            let hashedTokenInfo = crypto.createHash("sha256").update(randomString).digest("hex");

            let result = await refreshModel.retrieveRefTokenInfo(hashedTokenInfo);

            if (!result.success) {
                return {
                    success: false,
                    reason: "Error while retrieveRefTokenInfo"
                }
            }

            if (!result.isvalid) {
                return {
                    success: false,
                    reason: "Invalid refresh token while retrieveRefTokenInfo"
                }
            }

            let { user_id } = result;

            let AccessCaller = this.generateAccess({ id: user_id });

            let { accessToken } = AccessCaller.data;

            return {
                success: true,
                data: {
                    accessToken
                }
            }
        } catch (err) {
            console.log("Error while Token.generateAccessFromRef ", err.message);
            return {
                success: false,
                reason: "Error while Token.generateAccessFromRef"
            }
        }
    }

}


const refreshTokenService = new RefreshToken();
const accessTokenService = new AccessToken();

class TokenService {
    static async Handler({ id, randomString, iat }) {
        try {
            // id = userId and iat is the issued date
            // refresh token gets sent
            // obv generate access token
            // but u have to check if the issued time is there

            let finalObj = {}

            let date = 12 // find a way to know the difference

            if (date - iat >= 4) {
                // create a new ref token too

                let res = await refreshTokenService.invalidateRefresh()





            }




        } catch (err) {
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'TokenService.Handler';
            }
            throw err;
        }
    }
}
