const express = require('express');
const contactController = require('../controllers/contactController/contactController');

const contactRouter = express.Router();

// Send contact message
contactRouter.post('/send', contactController.sendContactMessage);

module.exports = contactRouter;
