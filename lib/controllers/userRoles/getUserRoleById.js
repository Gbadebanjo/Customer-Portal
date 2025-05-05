import UserRole from '@/database/models/UserRole';

export default async function getUserRoleById(userRoleId) {
    const userRole = await UserRole.findByPk(userRoleId);
    return { userRole };
}
