class ProfileModel {
    async checkUniqueUserName(userName) {
        try {
            let query = 'SELECT id FROM users WHERE user_name = $1';
            let values = [userName];

            let result = await pg.query(query, values);

            return (result.rowCount === 0) ? { success: true } : { success: false }

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'ProfileModel.checkUniqueUserName';
            }
            throw err;
        }
    }

    async settingProfile({ id, name, userName, password }) {
        try {
            let query = `
                UPDATE users(name , user_name , password_hashed)
                VALUES($2,$3,$4)
                WHERE  id = $1
                RETURNING id
            `

            let values = [id, name, userName, password];

            let result = await pg.query(query, values);

            return (result.rowCount === 0) ? { success: false } : { success: true }

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'ProfileModel.puttingInPassword';
            }
            throw err;
        }
    }



}

module.exports = ProfileModel;