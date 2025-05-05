'use server'
import PowerProductionPlan from '@/database/models/PowerProductionPlan';

export default async function getPowerProductionPlanById(powerProductionPlanId) {
    console.log('<< INSIDE getPowerProductionPlanById >>>>');
    const powerProductionPlan = await PowerProductionPlan.findByPk(powerProductionPlanId);
    console.log('BEFORE powerProductionPlan');
    console.log(powerProductionPlan);
    console.log('AFTER powerProductionPlan');
    return { powerProductionPlan };
}
