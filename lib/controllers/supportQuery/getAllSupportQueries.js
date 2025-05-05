import SupportQuery from '@/database/models/SupportQuery';

export const dynamic = "force dynamic";

export default async function getAllSupportQueries() {
    const supportQueries = await SupportQuery.findAll({
        order: [['created_at', 'DESC']]
    });
    return { supportQueries };
}
