'use server'
import Customer from '@/database/models/Customer';
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export default async function deleteCustomerById(customerId) {
    const deletedCustomer = await Customer.destroy({
        where: {
            id: customerId
        }
    });
    revalidatePath('/customers')
    redirect('/customers')
    return { deletedCustomer };
}
