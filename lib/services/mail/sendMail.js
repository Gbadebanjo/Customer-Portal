import * as dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();

export const sendMail = async (to, message, subject) => {
    sgMail.setApiKey(process.env.SE3ND_GRID_API_KEY);

    const msg = {
        to,
        from: process.env.FROM_EMAIL,
        subject,
        text: message,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Example usage
// sendMail('recipient@example.com', 'This is the message content', 'Important Subject');
