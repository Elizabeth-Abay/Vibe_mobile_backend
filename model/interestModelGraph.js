async linkingInterest(sentInfo) {
    try {
        // linking
        // sentInfo = { userId , interestedIn : { name : value }}
        // convert that to interests : [ { name : something , value : Number(value)}]

        let { userId, interestedIn } = sentInfo;

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

        let result = await signUpGraph.linkingUserWithInterests({ userId, Interest });

        if (result.success) {
            return {
                success: true
            }
        }

        return {
            success: false,
            reason: "data base problem from linkingInterest"

        }
    } catch (err) {
        console.log("Error while  linkingInterest", err.message);

        return {
            success: false,
            reason: "Error while  linkingInterest"
        }
    }

}