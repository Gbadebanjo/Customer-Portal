'use server'
import User from '@/database/models/User';
import {v4 as uuidv4} from "uuid";
import xss from "xss";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import AddUserToCustomerUserArray from "@/lib/controllers/customers/AddUserToCustomerUserArray";

export default async function AddUser(formData) {
    console.log('<<<<< INSIDE ADD USER >>>>>');
    try {
        const userName = xss(formData.get('UserName'));
        const surName = xss(formData.get('Surname'));
        const name = xss(formData.get('Name'));
        const email = xss(formData.get('Email'));
        const phone = xss(formData.get('Phone'));
        const timezone = xss(formData.get('Timezone'));
        const ammpApiKey = xss(formData.get('AMMP_API_key'));
        const selectedCustomer = xss(formData.get('SelectedCustomer'));
        const roles = JSON.parse(formData.get('roles'));

        const userData = {
            id: uuidv4(),
            username: userName,
            email: email,
            phone_number: phone,
            name: name.toUpperCase(),
            surname: surName.toUpperCase(),
            ammp_api_key: ammpApiKey,
            customer: selectedCustomer,
            roles: roles,
            timezone: timezone,
            is_locked_out: false, // Assuming default values
            not_active: false,
            email_confirmed: false,
            is_external: false,
            creation_time: new Date(),
            modification_time: new Date(),
        }

        console.log('userData', userData);

        const newUser = await User.create(userData);
        console.log('successfully saved', newUser);

        const {id} = newUser;

        console.log('new user Id', id);
        console.log('selectedCustomer', selectedCustomer);

        AddUserToCustomerUserArray(id, selectedCustomer)

        revalidatePath('/admin/identity/users')
        redirect('/admin/identity/users')
    } catch (error) {
        console.log(error);
    }

}
