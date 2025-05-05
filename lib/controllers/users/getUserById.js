'use server'
import User from '@/database/models/User';

export default async function getUserById(userId) {
    const user = await User.findByPk(userId);
    return { user };
}
