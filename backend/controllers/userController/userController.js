const userService = require('../../services/userService/userService');
const { hashPassword, comparePassword } = require('../../utils/hash');
const { generateToken } = require('../../utils/jwt');


//   Register a new user
const registerUser = async (req, res) => {
    const { username, email, password, gender, number, address, DOB } = req.body;
    try {
        // Check if user already exists
        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ 
                status: false, 
                message: 'Email is already registered' 
            });
        }

        // Hash password and create user
        const securePassword = await hashPassword(password);
        const userData = { username, email, gender, number, address, DOB,password: securePassword };
        await userService.createUser(userData);
        return res.status(201).json({ 
            status: true, 
            message: 'User registered successfully' 
        });
    } catch (err) {
        console.error('Error while registering user:', err);
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            return res.status(409).json({ 
                status: false, 
                message: 'Email is already registered' 
            });
        }
        return res.status(500).json({ 
            status: false,
            message: 'Internal server error' 
        });
    }
};


// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ 
                status: false,
                message: 'Email not found' 
            });
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                status: false,
                message: "Wrong credentials" 
            });
        }

        const token = generateToken({ userId: user._id });
        return res.status(200).json({ 
            status: true, 
            message: "Login successfully", 
            _id: user._id, 
            token: token 
        });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ 
            status: false,
            message: 'Internal server error' 
        });
    }
};


// Get single user details
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await userService.findUserById(id);
        if (!data) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            status: true,
            data: data,
            message: "Got single user info"
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({
            status: false,
            message: "Internal error while fetching user"
        });
    }
};


//  Update user details
const updateUser = async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const data = await userService.updateUser(id, payload);
        if (!data) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            status: true,
            data: data,
            message: "User updated successfully"
        });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({
            status: false,
            message: "Internal error while updating user"
        });
    }
};


// Forgot password - find user by email
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await userService.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User with this email does not exist."
            });
        }
        return res.status(200).json({
            status: true,
            message: "User found. Redirect to reset password page.",
            data: user
        });
    } catch (error) {
        console.error('Error in forgot password process:', error);
        return res.status(500).json({
            status: false,
            message: 'Internal server error. Please try again later.'
        });
    }
};


//  Reset password
const resetPassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
        const hashedPassword = await hashPassword(password, 10);
        const user = await userService.updateUserPassword(id, hashedPassword);

        if (!user) {
            return res.status(404).json({ 
                status: false, 
                message: "User not found." 
            });
        }

        return res.status(200).json({ 
            status: true, 
            message: "Password changed successfully." 
        });
    } catch (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ 
            status: false, 
            message: 'Internal server error.' 
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserById,
    updateUser,
    forgotPassword,
    resetPassword
};


