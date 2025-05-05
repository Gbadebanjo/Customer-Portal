import Users from '@/database/models/User';

export const dynamic = "force dynamic";

export default async function getAllUsers(){
    const users = await Users.findAll({
        order: [['created_at', 'DESC']]
    });
    return {users};
}
