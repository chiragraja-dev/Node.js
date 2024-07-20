const jwt = require('jsonwebtoken');
const { models } = require('mongoose');
const { authorize } = require('passport');

const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ error: "Invalid token" });
    }
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()

    } catch (error) {
        res.status(401).json({ error: "Unauthorized123" })
    }
}

const generateToken = (userData) => {
    return jwt.sign({ userData }, process.env.JWT_SECRET, { expiresIn: 3000 })
}

module.exports = { jwtAuthMiddleware, generateToken }