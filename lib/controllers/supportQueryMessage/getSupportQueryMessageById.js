'use server'
import SupportQueryMessage from '@/database/models/SupportQueryMessage';

export default async function getSupportQueryMessageById(supportQueryMessageId) {
    console.log('getSupportQueryMessageById', supportQueryMessageId);
    const supportQueryMessage = await SupportQueryMessage.findByPk(supportQueryMessageId);
    console.log('getSupportQueryMessageById', supportQueryMessage);
    return { supportQueryMessage };
}
