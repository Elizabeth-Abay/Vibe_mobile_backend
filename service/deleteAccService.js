const shaHasher = require('../utils/shaHasher');
const { RefreshToken } = require('./tokenGeneration');
const DeleteAcc = require('../model/DeleteAccModel');

const refToken = new RefreshToken();


class DeleteAccService {
    static async deleteAcc(randomString) {
        try {
            // get the info from randomString
            let hashedRandom = shaHasher(randomString);

            let result = await refToken.getTokenInfo(hashedRandom);

            if (!result.success) return result;

            let { user_id } = result.data;

            // invalidate all refresh tokend
            let invalidateAllRef = await refToken.invalidateAllRefresh(user_id);

            if (!invalidateAllRef) return invalidateAllRef;

            // delete the user
            let deleteUserResult = await DeleteAcc.deleteUser(user_id);

            return deleteUserResult;

        } catch (err) {
            if (typeof err === 'object' && !err.from) {
                err.from = 'DeleteAccController.deleteAcc';
            }
            next(err);
        }
    }
}

module.exports = DeleteAccService;