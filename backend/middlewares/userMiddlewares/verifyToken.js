require('dotenv').config();
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.USER_JWT_SECRET;


const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: "User Token Not Found" });
    }

    try {
        const decodedToken = jwt.verify(token.split(' ')[1], jwtSecret);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = {
    verifyToken
}