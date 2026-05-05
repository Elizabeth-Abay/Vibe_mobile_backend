class TokenController {
    // here 2 things
    // if the refresh access issued at and current time >= 4 
    // then issue a new refresh token
    // else generate only access token
    async tokenGeneration(req , res){
        try{
            // call the token generation logic

        }catch (err){
            req.from = "TokenController.tokenGeneration"
            next(err)
        }
    }
}