import SiteDetail from '@/database/models/SiteDetail';

export default async function getSiteDetailById(siteDetailId) {
    const siteDetail = await SiteDetail.findByPk(siteDetailId);
    return { siteDetail };
}
