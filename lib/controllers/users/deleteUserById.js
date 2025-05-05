'use server'
import User from '@/database/models/User';
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export default async function deleteUserById(userId) {
    const deletedUser = await User.destroy({
        where: {
            id: userId
        }
    });
    revalidatePath('/admin/identity/users')
    redirect('/admin/identity/users')
    return { deletedUser };
}
