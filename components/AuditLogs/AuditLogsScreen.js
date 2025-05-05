import classes from './auditlogs.module.css';
import NavbarComponent from "@/components/ui/Navbar/NavbarContainer";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import Link from "next/link";
import RightSideComponent from "@/components/ui/rightside/RightSideComponent";
import ButtonFlexible from "@/components/ui/button-flexible/ButtonFlexible";
import SearchIcon from "@/components/ui/icons/SearchIcon";
import ChevronDownIcon from "@/components/ui/icons/ChevronDownIcon";
import getAllAuditLogs from "@/lib/controllers/auditlogs/getAllAuditLogs";
import AuditLogTable from "@/components/ui/tables/auditLogs/AuditLogTable"; // Import the image

export default async function AuditLogsScreen() {
    const date = new Date();
    const thisYear = date.getFullYear();
    const {auditLogs} = await getAllAuditLogs();
    const NO_OF_COLUMNS = 10;
    return (
        <div className={classes.container}>
            {/* Header */}
            <div className={classes.header}>
               <span>
                   <Link href='/dashboard'>
                       <HomeIcon/>
                   </Link>
                 </span>
                <span> <small>| &nbsp; Admin  &nbsp; | &nbsp; Audit Logs &nbsp; </small></span>

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
                    <p className={classes.title}>Audit Logs</p>
                    {/*<ButtonFlexible*/}
                    {/*    link="#"*/}
                    {/*    width={100}*/}
                    {/*    height={40}*/}
                    {/*    style={{*/}
                    {/*        marginRight: 0,*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <PlusIcon/> New*/}
                    {/*</ButtonFlexible>*/}
                </div>
                <div className={classes.centerContent}>
                    <AuditLogTable allAuditLogs={auditLogs} />
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