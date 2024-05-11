// authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.body.token; // Get the token directly from the request body
    if (!token) {
        return res.status(401).send({ message: "No authentication token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(403).send({ message: "Invalid or expired token." });
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
