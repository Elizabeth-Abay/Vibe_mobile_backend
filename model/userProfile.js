class UserProfile {
    async checkUniqueUserName(userName) {
        try {


        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'UserProfile.checkUniqueUserName';
            }
            throw err;
        }
    }

    async settingProfile({ name , userName , email, password }) {
        try {
            let query=`
                UPDATE users(user_name , password_hashed , name)
                VALUES($1,$2,$3)
                WHERE  email=$4
                RETURNING id
            `

            let values=[userName,password ,name ];

            let result = await pg.query(query , values);




        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                // this is so that if lower layer's message won't be masked
                err.from = 'UserProfile.puttingInPassword';
            }
            throw err;
        }
    }


    
}