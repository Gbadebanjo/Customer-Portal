import * as dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();
console.log('SendGrid API Key:', process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const MailTypes = {
  VERIFICATION_CODE: 'VERIFICATION_CODE',
  WELCOME: 'WELCOME',
  PASSWORD_RESET: 'PASSWORD_RESET',
};

export const sendMail = async ({ to, subject, html, text }) => {
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
  switch (type) {
    case MailTypes.VERIFICATION_CODE:
      return sendMail({
        to,
        subject: 'Your Verification Code',
        text: `Your verification code is ${data.code}`,
        html: `
                 <div style="font-family: 'Segoe UI', sans-serif; background-color: #f4f4f7; padding: 40px 20px;">
                  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);">
                    <div style="background-color: #0a1128; color: #ffffff; padding: 24px 32px; text-align: center;">
                       <h2 style="margin: 0; font-size: 24px;">Email Verification</h2>
                    </div>
                    <div style="padding: 32px; color: #333; ">
                       <p style="font-size: 16px;">Hi there,</p>
                       <p style="font-size: 16px;">To complete your verification, please use the code below:</p>
                   <div style="margin: 24px 0; text-align: center;">
                   <span style="display: inline-block; font-size: 32px; font-weight: bold; background-color: #eef2ff; color: #0a1128; padding: 12px 24px; border-radius: 8px; letter-spacing: 4px;">
                    ${data.code}
                   </span>
                   </div>
                   <p style="font-size: 14px; color: #555;">This code will expire in 10 minutes. If you did not request this, you can safely ignore this email.</p>
                   <p style="font-size: 16px; margin-top: 40px;">Thanks,<br><strong>Daystar Power Team</strong></p>
                  </div>
                  <div style="background-color: #f1f1f1; text-align: center; font-size: 12px; color: #777; padding: 16px;">
                    <p style="margin: 0;">Need help? Contact us at <br/> <a href="mailto:support@yourdomain.com" style="color: #0a1128;">idt-servicedesk@daystar-power.com</a></p>
                 </div>
                 </div>
                  </div>
            `,
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
