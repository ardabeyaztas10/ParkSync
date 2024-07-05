const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded.userId;
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken
};
