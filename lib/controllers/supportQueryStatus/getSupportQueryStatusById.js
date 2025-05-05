import SupportQueryStatus from '@/database/models/SupportQueryStatus';

export default async function getSupportQueryStatusById(supportQueryStatusId) {
    const supportQueryStatus = await SupportQueryStatus.findByPk(supportQueryStatusId);
    return { supportQueryStatus };
}
