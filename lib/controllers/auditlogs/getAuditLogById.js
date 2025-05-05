import AuditLog from '@/database/models/AuditLog';

export default async function getAuditLogById(auditLogId) {
    const auditLog = await AuditLog.findByPk(auditLogId);
    return { auditLog };
}
