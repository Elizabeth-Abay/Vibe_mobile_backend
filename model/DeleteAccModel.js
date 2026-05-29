const pool = require('../config/pgConfig');

class DeleteUser {
    static async deleteUser(id) {
        try {
            let query = `
                DELETE FROM
                users WHERE id = $1
                RETURNING id;
            `;

            let values = [id];

            let result = await pool.query(query, values);

            return (result.rowCount === 0) ? { success: false } : { success: true }

        } catch (err) {
            err.from = 'DeleteUser.deleteUser';
            throw err;
        }
    }

}


module.exports = DeleteUser;