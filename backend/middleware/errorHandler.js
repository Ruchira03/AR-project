
const errorHandler = (err, req, res, next) => {
    console.log(err);

    let error = {...err}
    error.message = err.message;

    res.status(err.statusCode || 500).json({
        success: false,
        errorMessage : error.message || 'Server Error'
    })
}

module.exports = errorHandler;