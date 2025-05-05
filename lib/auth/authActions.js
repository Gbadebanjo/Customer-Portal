'use server';
import { hashUserPassword, verifyPassword } from "@/lib/auth/hash";
import {permanentRedirect, redirect} from "next/navigation";
import getUserByEmail from "@/lib/controllers/users/getUserByEmail";
import { revalidatePath } from "next/cache";
import { createAuthSession, destroySession } from "@/lib/auth/auth";

export async function signup(prevState, formData) {
    // Signup logic (commented out for now)
}

export async function login(formData) {
    console.log('<<<<< INSIDE LOGIN >>>>>');
    const email = formData.get('email');
    const password = formData.get('password');

    console.log('<<<<< EMAIL >>>>>', email);
    console.log('<<<<< PASSWORD >>>>>', password);

    const existingUser = await getUserByEmail(email);
    console.log('<<<<< existingUser >>>>>', JSON.stringify(existingUser));

    if (!existingUser) {
        return {
            errors: {
                email: 'Could not authenticate user, please check your credentials.',
            },
        };
    }

    if (!existingUser.password) {
        return {
            errors: {
                password: 'Could not authenticate user, please check your credentials.',
            },
        };
    }

    try {
        const isValidPassword = await verifyPassword(existingUser.password, password);
        console.log('<<<<< isValidPassword >>>>>', isValidPassword);

        if (!isValidPassword) {
            return {
                errors: {
                    password: 'Could not authenticate user, please check your credentials.',
                },
            };
        }

        await createAuthSession(existingUser.id);
        console.log('<<<<< Session Created >>>>>');
    } catch (error) {
        console.error('<<<<< Error During Login >>>>>', error);
        return {
            errors: {
                password: 'An error occurred during authentication.',
            },
        };
    }
    redirect("/dashboard");
}

export async function logout() {
    await destroySession();
    redirect('/');
}
