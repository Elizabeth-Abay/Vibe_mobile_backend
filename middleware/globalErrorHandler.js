function errorHandler(err, req, res, next) {
    console.log(`Error while ${err.from} , ${err.message}`);
    return res.status(500).send({
        success: false,
        reason: err.message
    })

}

// the format for error handling

module.exports = errorHandler;