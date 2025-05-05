'use server'
import SupportQuery from '@/database/models/SupportQuery';
import { v4 as uuidv4 } from "uuid";
import getAllSupportQueryStatuses from "@/lib/controllers/supportQueryStatus/getAllSupportQueryStatuses";
import getAllCustomers from "@/lib/controllers/customers/getAllCustomers";
import getAllUsers from "@/lib/controllers/users/getAllUsers";
import xss from "xss";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export default async function AddSupportQuery(formData) {
    console.log('<<<<< INSIDE ADD SUPPORT N>>>>>');

    try{
        const allStatuses = await getAllSupportQueryStatuses(); // Make sure to await the function call since it's asynchronous
        console.log('allStatuses', JSON.stringify(allStatuses));

        const allCustomers = await getAllCustomers();

        const allUsers = await getAllUsers();

        let firstStatusId = ""; // Initialize firstStatusId variable

        // Check if allStatuses array is not empty and the first status has an id
        if (allStatuses.supportQueryStatuses.length > 0 && allStatuses.supportQueryStatuses[0].id) {
            firstStatusId = allStatuses.supportQueryStatuses[0].id; // Set firstStatusId to the id of the first status
        }

        console.log('firstStatusId', firstStatusId);

        const title = xss(formData.get('title'));
        const description = xss(formData.get('description'));
        const category_id = xss(formData.get('supportCategory'));

        const supportQueryData = {
            id: uuidv4(),
            title: title.toUpperCase(),
            description: description,
            category_id: category_id.toUpperCase(),
            status_id: firstStatusId,
            support_query_messages: [
                {
                    client: description,
                }
            ],
            user_id: uuidv4(),
        };

        console.log('supportQueryData', supportQueryData);

        const newSupportQuery = await SupportQuery.create(supportQueryData);
        console.log('successfully saved', newSupportQuery);

        revalidatePath('/support')
        redirect('/support')
    }catch(error){
        console.log(error);
    }

}