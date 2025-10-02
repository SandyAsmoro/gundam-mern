const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"
        const decodedToken = jwt.verify(token, 'SECRET_KEY_YANG_SANGAT_RAHASIA');
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({ message: "Otentikasi gagal!" });
    }
};