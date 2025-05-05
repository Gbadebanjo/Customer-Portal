import SupportQueryStatus from '@/database/models/SupportQueryStatus';

export const dynamic = "force dynamic";

export default async function getAllSupportQueryStatuses() {
    const supportQueryStatuses = await SupportQueryStatus.findAll();
    return { supportQueryStatuses };
}
