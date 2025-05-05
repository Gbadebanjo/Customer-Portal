'use server';
import User from '@/database/models/User';

export default async function getUserByEmail(email) {
    return await User.findOne({ where: { email } });
}
