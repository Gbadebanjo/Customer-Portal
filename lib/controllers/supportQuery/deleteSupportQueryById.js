'use server'
import SupportQuery from '@/database/models/SupportQuery';
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export default async function deleteSupportQueryById(supportQueryId) {
    const deletedSupportQuery = await SupportQuery.destroy({
        where: {
            id: supportQueryId
        }
    });
    revalidatePath('/support')
    redirect('/support')
    return { deletedSupportQuery };
}
