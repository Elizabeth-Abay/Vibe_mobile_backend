const RefreshTokenService = require('../service/refreshingTokensService');

class TokenController {
    static async tokenGeneration(req, res) {
        try {
            // call the token generation logic
            let { randomString } = req.decodedRefresh;

            let result = await RefreshTokenService.generateNewTokens(randomString);

            return (result.success)
                ?
                res.status(200).json(result)
                :
                res.status(400).json(result)

        } catch (err) {
            req.from = "TokenController.tokenGeneration"
            next(err)
        }
    }
}

module.exports = TokenController;