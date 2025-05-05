import classes from './securitylogs.module.css';
import NavbarComponent from "@/components/ui/Navbar/NavbarContainer";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import Link from "next/link";
import RightSideComponent from "@/components/ui/rightside/RightSideComponent";
import getAllSecurityLogs from "@/lib/controllers/securityLogs/getAllSecurityLogs";
import SecurityLogMainDataTable from "@/components/ui/tables/securityLogs/SecurityLogMainDataTable";

export default async function SecurityLogsScreen() {
    const date = new Date();
    const thisYear = date.getFullYear();
    const {securityLogs} = await getAllSecurityLogs();
    const NO_OF_COLUMNS = 8;
    return (
        <div className={classes.container}>
            {/* Header */}
            <div className={classes.header}>
               <span>
                   <Link href='/dashboard'>
                       <HomeIcon/>
                   </Link>
                 </span>
                <span> <small> | &nbsp; Dashboard</small></span>

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
                    <p className={classes.title}>Security Logs</p>
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
                  <SecurityLogMainDataTable
                      allSecurityLogs={securityLogs}
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