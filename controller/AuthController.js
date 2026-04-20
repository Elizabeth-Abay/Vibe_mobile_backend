class AuthController {
    constructor() { }

    async createUser(req, res) {
        try {
            // gets sent email only and respond with user id
            // and create the graph node

        } catch (err) {
            console.log("Error while AuthControllers.createUser ", err.message);
            return res.status(500).send({
                success: false,
                reason: err.message
            })
        }
    }


    async verifyUser(req, res) {
        try {
            // otp matching 

        } catch (err) {
            console.log("Error while AuthControllers.verifyUser ", err.message);
            return res.status(500).send({
                success: false,
                reason: err.message
            })
        }
    }

    async enterUserInfo(req, res) {
        try {
            // username and password

        } catch (err) {
            console.log("Error while AuthControllers.enterUserInfo ", err.message);
            return res.status(500).send({
                success: false,
                reason: err.message
            })
        }
    }


    async checkUniqueUserName(req,res){
        try {
            // username and password

        } catch (err) {
            console.log("Error while AuthControllers.checkUniqueUserName ", err.message);
            return res.status(500).send({
                success: false,
                reason: err.message
            })
        }
    }


    async logIn(req,res){
        try {
            // username and password

        } catch (err) {
            console.log("Error while AuthControllers.logIn ", err.message);
            return res.status(500).send({
                success: false,
                reason: err.message
            })
        }
    }


    async logOut(req,res){
        try {
            // username and password

        } catch (err) {
            console.log("Error while AuthControllers.logOut ", err.message);
            return res.status(500).send({
                success: false,
                reason: err.message
            })
        }
    }

}