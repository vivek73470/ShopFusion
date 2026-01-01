const bcrypt = require('bcrypt');


// Hash a password using bcrypt
const hashPassword = async (password, saltRounds = 10) => {
    return await bcrypt.hash(password, saltRounds);
};


//  Compare a plain text password with a hashed password
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    hashPassword,
    comparePassword
};


