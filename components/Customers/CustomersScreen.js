import classes from './customers.module.css';
import NavbarComponent from "@/components/ui/Navbar/NavbarContainer";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import Link from "next/link";
import RightSideComponent from "@/components/ui/rightside/RightSideComponent";
import getAllCustomers from "@/lib/controllers/customers/getAllCustomers";
import CreateCustomerModal from "@/components/ui/modals/creates/createCustomer/CreateCustomerModal";
import CustomerMainDataTable from "@/components/ui/tables/customer/CustomerMainDataTable";

export default async function CustomersScreen() {
    const date = new Date();
    const thisYear = date.getFullYear();
    const allCustomers = await getAllCustomers();


    console.log('before rows')
    console.log(JSON.stringify(allCustomers));
    console.log('after rows')


    return (
        <div className={classes.container}>
            {/* Header */}
            <div className={classes.header}>
                <span>
                   <Link href='/dashboard'>
                       <HomeIcon/>
                   </Link>
                 </span>
                <span> <small>| &nbsp; Customers</small></span>
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
                    <p className={classes.title}>Customers</p>
                    <CreateCustomerModal/>
                </div>
                <div className={classes.centerContent}>

                    <CustomerMainDataTable allCustomers={allCustomers} />

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
