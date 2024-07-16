const jwt = require('jsonwebtoken')
const jwtSecret = process.env.ADMIN_JWT_SECRET;


const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (!token) {
        console.log("Token not found in request headers");
        return res.status(401).json({ message: "Admin Token Not Found" });
    }

    try {
        const decodedToken = jwt.verify(token.split(' ')[1], jwtSecret);
        req.ownerId = decodedToken.ownerId;
        next();
    } catch (error) {
        console.log("Error verifying token:", error);
        return res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = {
    verifyToken
}