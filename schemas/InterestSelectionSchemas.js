const Joi = require('joi');

class InterestSchema {
    static interestSchema = Joi.object({
        // Enforce that interestedIn must be an object
        interestedIn: Joi.object()
            // Enforce structure on dynamic keys and values:
            // This reads: Any key string must have a string value
            .pattern(
                Joi.string().min(1).max(50),  // Rules for the dynamic names/keys
                Joi.number().required() // Rules for the dynamic values
            )
            .min(1) // Optional: Requires at least one interest pair to be sent
            .required()
    });

}


module.exports = InterestSchema;