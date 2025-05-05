import PowerProductionPlanItem from '@/database/models/PowerProductionPlanItem';

export default async function getPowerProductionPlanItemById(powerProductionPlanItemId) {
    const powerProductionPlanItem = await PowerProductionPlanItem.findByPk(powerProductionPlanItemId);
    return { powerProductionPlanItem };
}
