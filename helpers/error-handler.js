function errorHandler(err, req, res, next) {
    if (err.name === 'dfđjdnfjbError') {
        return res.status(401).json({
            success: false,
            message: 'the user is not authuorized'
        })
    }

    return res.status(500).json({
        success: false,
        message: err
    })
}
module.exports = errorHandler;