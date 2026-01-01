const contactService = require('../../services/contactService/contactService');
require('dotenv').config();



const sendContactMessage = async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ 
            status: false,
            error: 'All fields are required' 
        });
    }

    try {
        const contactData = { name, email, phone, message };
        await contactService.createContact(contactData);

        const emailContent = contactService.formatContactEmail(contactData);
        await contactService.sendEmail(
            process.env.MailerGmail, 
            'Contact Form Submission', 
            emailContent
        );

        return res.status(200).json({ 
            status: true,
            message: 'Email sent successfully!' 
        });
    } catch (error) {
        console.error('Error while sending contact message:', error);
        return res.status(500).json({ 
            status: false,
            message: 'Something went wrong, please try again.' 
        });
    }
};

module.exports = {
    sendContactMessage
};

