'use server'
import SiteDetail from '@/database/models/SiteDetail';
import {v4 as uuidv4} from "uuid";

export default async function addSiteDetail(formData) {
    console.log('<<<<< INSIDE ADD SITEDETAIL  N>>>>>');

    const siteDetailData = {
        id: uuidv4(),
        company_name: formData.get('name'),
        logo_file_name: formData.get('image')['name'],
        users: [
            {
                users: 'logged_in_user',
            }
        ],
    }

    console.log('siteDetailData', siteDetailData);

    const newSiteDetail = await SiteDetail.create(siteDetailData);
    return { siteDetail: newSiteDetail };
}
