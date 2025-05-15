import * as dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();

sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

export const MailTypes = {
    VERIFICATION_CODE: 'VERIFICATION_CODE',
    WELCOME: 'WELCOME',
    PASSWORD_RESET: 'PASSWORD_RESET',
};

export const sendMail = async ({to, subject, html, text }) => {
    const msg = {
        to,
        from: process.env.FROM_EMAIL,
        subject,
        text,
        html,
    };

    try {
        await sgMail.send(msg);
        console.log('Email sent to:', to);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export const sendEmailByType = async (type, to, data = {}) => {
    switch(type) {
        case MailTypes.VERIFICATION_CODE:
            return sendMail({
                to,
                subject: 'Your Verification Code',
                text: `Your verification code is ${data.code}`,
                html: `<p>Your verification code is <strong>${data.code}</strong></p>`,
            });

        case MailTypes.WELCOME:
            return sendMail({
                to,
                subject: 'Welcome to Daystar Power',
                text: `Welcome ${data.name}, we're glad to have you.`,
                html: `<h2>Welcome ${data.name}!</h2><p>We're glad to have you on board.</p>`,
            });

        case MailTypes.PASSWORD_RESET:
            return sendMail({
                to,
                subject: 'Password Reset Request',
                text: `To reset your password, please click the link below: ${data.resetLink}`,
                html: `<p>To reset your password, please click the link below:</p><a href="${data.resetLink}">Reset Password</a>`,
            });

        default:
            throw new Error('Invalid mail type');
    }
}
