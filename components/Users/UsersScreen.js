import classes from './users.module.css';
import NavbarComponent from "@/components/ui/Navbar/NavbarContainer";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import Link from "next/link";
import RightSideComponent from "@/components/ui/rightside/RightSideComponent";
import getAllUsers from "@/lib/controllers/users/getAllUsers";
import CreateUsersComponent from "@/components/ui/modals/creates/createUsers/CreateUsersModal"
import getAllCustomers from "@/lib/controllers/customers/getAllCustomers";
import getCustomerById from "@/lib/controllers/customers/getCustomerById";
import UsersMainDataTable from "@/components/ui/tables/users/UsersMainDataTable";

export default async function UsersScreen() {
    const date = new Date();
    const thisYear = date.getFullYear();
    const {users} = await getAllUsers();
    const customers = await getAllCustomers();

/*
       console.log('before USERS >>')
       console.log(JSON.stringify(users))
       console.log('after USERS >>')
*/
    async function getMyCustomerById(customerId) {
        const customerObject = await getCustomerById(customerId);
        console.log('<<<<< BEFORE >>>>>>>')
        console.log(JSON.stringify(customerObject));
        console.log('<<<<< AFTER >>>>>>>')
        let output = '';

        if (customerObject.customer) {
            output = customerObject.customer.company_name;
        }
        return output;
    }

    return (
        <div className={classes.container}>
            {/* Header */}
            <div className={classes.header}>
               <span>
                   <Link href='/dashboard'>
                       <HomeIcon/>
                   </Link>
                 </span>
                <span> <small>| &nbsp; Admin  &nbsp; | &nbsp; Users &nbsp; </small></span>

            </div>
            {/* Sidebar */}
            <div className={classes.nav}>
                <div className={classes.sidebar}>
                    {/* Sidebar Header */}
                    
                    {/* Sidebar Menu */}
                    <NavbarComponent/>
                </div>
            </div>
            {/* Content */}
            <div className={classes.content}>
                {/* Top Center */}
                <div className={classes.topCenter}>
                    <div
                        style={{
                            alignItems: 'left'
                        }}
                    >
                        <p className={classes.title}>Users</p>
                    </div>
                    <CreateUsersComponent
                        customers={customers}
                        users={users}
                    />

                </div>
                <div className={classes.centerContent}>
                   <UsersMainDataTable
                       AllUsers={users}
                       AllCustomers={customers}
                   />
                   <div className={classes.copyright}>
                        {thisYear} © Daystar Power Energy Solutions
                    </div>
                </div>
            </div>
            {/* Right Side */}
            <RightSideComponent/>
        </div>
    );
}