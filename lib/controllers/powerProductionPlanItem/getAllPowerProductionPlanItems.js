import PowerProductionPlanitem from '@/database/models/PowerProductionPlanitem';

export const dynamic = "force dynamic";

export default async function getAllPowerProductionPlanItems(){
    const powerProductionPlanitem = await PowerProductionPlanitem.findAll({
        order: [['created_at', 'DESC']]
    });
    return {powerProductionPlanitem};
}
