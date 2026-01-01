const express = require('express');
const userController = require('../controllers/userController/userController');
const authenticate = require('../middleware/adminauth.middleware');

const userRouter = express.Router();

// REGISTER
userRouter.post('/register', userController.registerUser);

// LOGIN
userRouter.post('/login', userController.loginUser);

// Get single user details
userRouter.get('/:id', authenticate, userController.getUserById);

// Update user details
userRouter.put('/:id', authenticate, userController.updateUser);

// Forgot password
userRouter.post('/forgot-password', userController.forgotPassword);

// Reset password
userRouter.put('/reset-password/:id', userController.resetPassword);

module.exports = userRouter;
