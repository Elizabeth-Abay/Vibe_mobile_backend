function validatorCreator(schema , data){
    const { error , value } = schema.validate(
        data , {
            abortEarly : false
        }
    )

    if (err){
        // err.details is an array of obj`
        let reason = err.details.map(i => i.message).join(' ,');
        return {
            success : false,
            reason 
        }
    }


    return {
        success : true,
        data : value
    }
    
}


module.exports = validatorCreator;