// token middlewares 
// for access and refresh token they will verify -> decode

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, '../../.env')
})

let { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;


class TokenDecoder {
    // this class checks the signature and expiration
    static accessDecode(req, res, next) {
        try {
            // access token - header
            // signedInfo = { id , exp} 
            let token = req.headers['authorization'];

            let access = token.split(' ')[1];

            let accessDecoded = jwt.verify(access, ACCESS_TOKEN_SECRET);

            req.decodedAccess = accessDecoded;


            return next();

        } catch (err) {
            err.status = 401;
            
            next(err)
        }
    }



    static refreshDecoder(req, res, next) {

        let { refreshToken } = req.body;

        try {
            req.decodedRefresh = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

            return next();
        } catch (err) {
            err.status = 401;
            if (err.name === 'TokenExpiredError') {
                err.message += "Token Expired"
            }

            else if (err.name === 'JsonWebTokenError') {
                err.message += 'Invalid Token'
            }

            next(err);
        }

    }

}





module.exports = TokenDecoder;