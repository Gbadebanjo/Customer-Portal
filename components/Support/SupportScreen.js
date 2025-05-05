'use server'
import classes from './support.module.css';
import NavbarComponent from "@/components/ui/Navbar/NavbarContainer";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import Link from "next/link";
import RightSideComponent from "@/components/ui/rightside/RightSideComponent";
import getAllSupportQueries from "@/lib/controllers/supportQuery/getAllSupportQueries";
import CreateSupportModal from "@/components/ui/modals/creates/createSupportQuerry/CreateSupportModal";
import getAllSupportQueryCategories from "@/lib/controllers/supportQueryCategory/getAllSupportQueryCategories";
import SupportMainDataTable from "@/components/ui/tables/support/SupportMainDataTable";
import getAllSupportQueryStatuses from "@/lib/controllers/supportQueryStatus/getAllSupportQueryStatuses";
import getAllCustomers from "@/lib/controllers/customers/getAllCustomers";

  export default async function SupportScreen() {
    const date = new Date();
    const thisYear = date.getFullYear();
    const {supportQueries} = await getAllSupportQueries();
    const {supportQueryCategories} = await getAllSupportQueryCategories();
    const {supportQueryStatuses} = await getAllSupportQueryStatuses();
    const allCustomers = await getAllCustomers();

    return (
        <div className={classes.container}>
            {/* Header */}
            <div className={classes.header}>
                 <span>
                   <Link href='/dashboard'>
                       <HomeIcon/>
                   </Link>
                 </span>
                <span> <small>| &nbsp; Support</small></span>
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
                    <p className={classes.title}>Support</p>
                    <CreateSupportModal
                        supportQueryCategories={supportQueryCategories}
                    />
                </div>
                <div className={classes.centerContent}>
                   <SupportMainDataTable
                       allSupportQueries={supportQueries}
                       allSupportQueryCategories={supportQueryCategories}
                       allSupportQueryStatuses={supportQueryStatuses}
                       allCustomers={allCustomers}
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