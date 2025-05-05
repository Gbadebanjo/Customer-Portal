import Customers from '@/database/models/Customer';

export const dynamic = "force dynamic";

export default async function getAllCustomers() {
    try {
        const customers = await Customers.findAll({
            order: [['created_at', 'DESC']]
        });
        console.log('getall customers')
        console.log('before customers')
        console.log(JSON.stringify(customers))
        console.log(JSON.stringify(customers.length))
        console.log('after customers')
        return customers;
    } catch(err) {
        console.log(err);
    }
}
