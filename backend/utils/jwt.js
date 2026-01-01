const jwt = require('jsonwebtoken');

const JWT_SECRET = 'masai'; 

// Generate a JWT token
const generateToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET);
};


// Verify a JWT token
const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = {
    generateToken,
    verifyToken
};


