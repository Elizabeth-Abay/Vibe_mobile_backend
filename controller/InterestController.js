// this is where the linking and unlinking of people with interests happen
class interestLinkerController {
    async firstTimeLinking(req, res) {
        try {
            let { id } = req.decodedAccess;
            let userId = id;
            let { interestedIn } = req.body;
            // { name : value } pairs from frontend bc formdata will be sent


            let result = await interestService.linkingInterest({ userId, interestedIn });

            if (result.success) {
                return res.status(200).json({
                    success: true,
                    message: "Interests linked successfully"
                });
            }

            return res.status(400).json({
                success: false,
                reason: result.reason
            });

        } catch (err) {
            console.log("Error in link interests route", err.message);
            return res.status(500).json({
                success: false,
                reason: "Internal server error"
            });
        }
    }


    async updatingLinks(req, res) {
        try {
            let { id } = req.decodedAccess;
            let userId = id;
            let { interestedIn } = req.body;

            let result = await interestService.updatingLinksOfInterests({ userId, interestedIn });

            if (result.success) {
                return res.status(200).json({
                    success: true,
                    message: "Interests updated successfully"
                });
            }

            return res.status(400).json({
                success: false,
                reason: result.reason
            });

        } catch (err) {
            console.log("Error in update interests route", err.message);
            return res.status(500).json({
                success: false,
                reason: "Internal server error"
            });
        }
    }


    async getUserInterests(req, res) {
        try {
            let { id } = req.decodedAccess;
            let userId = id;
            let result = await interestService.getAllInterests({ userId });

            if (result.success) {
                return res.status(200).json({ message: result.data });
            }

            return res.status(400).json({ reason: result.reason })

        } catch (err) {
            console.log("Error in getUserInterests", err.message);
            return res.status(500).json({
                success: false,
                reason: "Internal server error"
            });
        }
    }
}
