import UserRole from '@/database/models/UserRole';

export const dynamic = "force dynamic";

export default async function getAllUserRoles(){
    const userRoles = await UserRole.findAll()
    return {userRoles};
}

/*import UserRole from '@/database/models/UserRole';
import AuditLog from '@/database/models/AuditLog';
import Customer from '@/database/models/Customer';
import PowerProductionPlan from '@/database/models/PowerProductionPlan';
import PowerProductionPlanItem from '@/database/models/PowerProductionPlanItem';
import Report from '@/database/models/Report';
import SecurityLogs from '@/database/models/SecurityLog';
import SiteDetail from '@/database/models/SiteDetail';
import SupportQuery from '@/database/models/SupportQuery';
import SupportQueryCategory from '@/database/models/SupportQueryCategory';
import SupportQueryMessage from '@/database/models/SupportQueryMessage';
import SupportQueryStatus from '@/database/models/SupportQueryStatus';
import User from '@/database/models/User';

export const dynamic = "force dynamic";

export default async function getAllCustomers(modelType) {
    let data;
    switch (modelType) {
        case 'UserRole':
            data = await UserRole.findAll();
            break;
        case 'AuditLog':
            data = await AuditLog.findAll();
            break;
        case 'Customer':
            data = await Customer.findAll();
            break;
        case 'PowerProductionPlan':
            data = await PowerProductionPlan.findAll();
            break;
        case 'PowerProductionPlanItem':
            data = await PowerProductionPlanItem.findAll();
            break;
        case 'Report':
            data = await Report.findAll();
            break;
        case 'SecurityLogs':
            data = await SecurityLogs.findAll();
            break;
        case 'SiteDetail':
            data = await SiteDetail.findAll();
            break;
        case 'SupportQuery':
            data = await SupportQuery.findAll();
            break;
        case 'SupportQueryCategory':
            data = await SupportQueryCategory.findAll();
            break;
        case 'SupportQueryMessage':
            data = await SupportQueryMessage.findAll();
            break;
        case 'SupportQueryStatus':
            data = await SupportQueryStatus.findAll();
            break;
        case 'User':
            data = await User.findAll();
            break;
        default:
            throw new Error('Invalid modelType');
    }
    return { data };
}*/
