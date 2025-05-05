'use server'
import Customer from '@/database/models/Customer';

export default async function getCustomerById(customerId) {
    const customer = await Customer.findByPk(customerId);
    return { customer };
}
