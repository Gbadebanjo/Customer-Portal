'use server'

import { createVerificationCode, verifyCode } from "../controllers/mail/verificationCode";
import { revalidatePath } from "next/cache";

export async function generateCode(userId) {
    const code = await createVerificationCode(userId);
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