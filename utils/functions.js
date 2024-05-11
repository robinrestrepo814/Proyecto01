// functions.js
function throwCustomError(code, message) {
    throw new Error(JSON.stringify({code, message}));
}

function respondWithError(res, e) {
    const error = JSON.parse(e.message);
    res.status(error.code).json({
        message: "Failed✌",
        error: error.message,
    })
}

module.exports = {
    throwCustomError,
    respondWithError
}
