'use server'
import SupportQueryCategory from '@/database/models/SupportQueryCategory';

export default async function getSupportQueryCategoryById(supportQueryCategoryId) {
    console.log('INSIDE getSupportQueryCategoryById');
    console.log('getSupportQueryCategoryById', supportQueryCategoryId);
    const supportQueryCategory = await SupportQueryCategory.findByPk(supportQueryCategoryId);
    console.log('THE supportQueryCategory', supportQueryCategory);
    return { supportQueryCategory };
}
