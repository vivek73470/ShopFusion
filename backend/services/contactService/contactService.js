const Contact = require('../../model/contact/contactmodel');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.MailerGmail,
        pass: process.env.MailerPass
    }
});


//  Create a new contact entry
const createContact = async (contactData) => {
    const newContact = new Contact(contactData);
    return await newContact.save();
};


//  Send email using nodemailer

const sendEmail = async (to, subject, htmlContent) => {
    return await transporter.sendMail({
        from: process.env.MailerGmail,
        to: to,
        subject: subject,
        html: htmlContent
    });
};


//  Format contact email content
const formatContactEmail = (contactData) => {
    const { name, email, phone, message } = contactData;
    return `
        <h3>Contact Form Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
    `;
};

module.exports = {
    createContact,
    sendEmail,
    formatContactEmail
};


