'use server'
import SupportQuery from '@/database/models/SupportQuery';

export default async function getSupportQueryById(supportQueryId) {
    const supportQuery = await SupportQuery.findByPk(supportQueryId);
    return { supportQuery };
}
