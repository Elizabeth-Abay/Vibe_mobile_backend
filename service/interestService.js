const InterestModelG = require('../model/interestModelGraph');


const interestModelG = new InterestModelG();

class InterestService {
    async linkingInterest({ id, interestedIn }) {
        try {
            // linking
            // sentInfo = { userId , interestedIn : { name : value }}
            // convert that to interests : [ { name : something , value : Number(value)}]

            let Interest = [];

            for (let interest in interestedIn) {
                // interest is the key;
                let key = interest;
                let val = interestedIn[interest]

                let Obj = {
                    name: key,
                    value: Number(val)
                }

                Interest.push(Obj)
            }

            let result = await interestModelG.linkingUserWithInterests({ id, Interest });

            return (result.success) ? { success: true } : {
                success: false,
                reason: "data base problem from linkingInterest"

            }

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'InterestService.linkingInterest';
            }
            throw err;
        }

    }


    async updatingLinksOfInterests({ id, interestedIn }) {
        try {
            // linking
            // sentInfo = { userId , interestedIn : { name : value }}
            // convert that to interests : [ { name : something , value : Number(value)}]

            let Interest = [];

            for (let interest in interestedIn) {
                // interest is the key;
                let key = interest;
                let val = interestedIn[interest]

                let Obj = {
                    name: key,
                    value: Number(val)
                }

                Interest.push(Obj)
            }

            let result = await interestModelG.updatingLinksOfInterests({ id, Interest });

            return (result.success) ? { success: true } : {
                success: false,
                reason: "data base problem from linkingInterest"

            }

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'InterestService.linkingInterest';
            }
            throw err;
        }

    }


    async getUserInterest(id) {
        try {

            let result = await interestModelG.gettingAllInterest(id);

            return (result.success) ? { success: true, data: result.data } : {
                success: false,
                reason: "data base problem from linkingInterest"

            }

        } catch (err) {
            // the lower layers will throw error and the upper layer will be the one to catch that
            if (typeof err === 'object' && !err.from) {
                err.from = 'InterestService.linkingInterest';
            }
            throw err;
        }

    }
}





module.exports = InterestService;