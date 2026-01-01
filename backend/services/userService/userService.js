const User = require('../../model/userModel/usermodel');


// Find user by email
const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};


//  Find user by ID
const findUserById = async (id) => {
    return await User.findById(id);
};


//  Create a new user
const createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};


//  Update user by ID
const updateUser = async (id, updateData) => {
    return await User.findByIdAndUpdate({ _id: id }, updateData, { new: true });
};


//   Update user password
const updateUserPassword = async (id, hashedPassword) => {
    return await User.findByIdAndUpdate({ _id: id }, { password: hashedPassword }, { new: true });
};

module.exports = {
    findUserByEmail,
    findUserById,
    createUser,
    updateUser,
    updateUserPassword
};


