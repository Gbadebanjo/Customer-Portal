'use server'

import { createVerificationCode, verifyCode } from "../controllers/mail/verificationCode";
import { revalidatePath } from "next/cache";
import { MailTypes, sendEmailByType } from "../services/mail/sendMail";

export async function generateCode(userId) {
    const code = await createVerificationCode(userId);

    await sendEmailByType(MailTypes.VERIFICATION_CODE, email, {code} );
    console.log('Verification code sent to:', email);
    console.log('Verification code:', code);
    
    return { success: true, code };
}

export async function validateCode(userId, inputCode) {
    const { success, message } = await verifyCode(userId, inputCode);
    if (success) {
        revalidatePath('/verify');
        return { success: true };
    } else {
        return { success: false, message };
    }
} 