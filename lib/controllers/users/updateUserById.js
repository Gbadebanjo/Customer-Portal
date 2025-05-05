'use server'
import User from '@/database/models/User';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import AddUserToCustomerUserArray from "@/lib/controllers/customers/AddUserToCustomerUserArray";

export default async function updateUserById(userId, newData) {
    console.log('<<<<< INSIDE updateUserById >>>>>>>');

    // Extract new customer ID from newData
    const { customer: newCustomerId } = newData;
    console.log('new Customer Id', newCustomerId);

    // Fetch old user data
    const oldUser = await User.findByPk(userId);
    const { customer: oldCustomerId } = oldUser;
    console.log('old Customer Id', oldCustomerId);

    // Update user data
    const [updatedRowsCount] = await User.update(newData, {
        where: {
            id: userId
        }
    });

    console.log('Updated Rows Count', updatedRowsCount);

    // If the customer ID has changed, update the customer user array
    if (oldCustomerId !== newCustomerId) {
        await AddUserToCustomerUserArray(userId, newCustomerId);
    }

    // Revalidate and redirect
    await revalidatePath('/admin/identity/users');
    redirect('/admin/identity/users');

    return { updatedRowsCount };
}
