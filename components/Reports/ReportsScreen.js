import classes from './reports.module.css';
import NavbarComponent from "@/components/ui/Navbar/NavbarContainer";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import Link from "next/link";
import RightSideComponent from "@/components/ui/rightside/RightSideComponent";
import getAllReport from "@/lib/controllers/report/getAllReports";
import CreateReportModal from "@/components/ui/modals/creates/createReport/CreateReportModal";
import ReportMainDataTable from "@/components/ui/tables/report/ReportMainDataTable"; // Import the image

export default async function ReportsScreen() {
    const date = new Date();
    const thisYear = date.getFullYear();
    const {report} = await getAllReport();

    return (<div className={classes.container}>
        {/* Header */}
        <div className={classes.header}>
                 <span>
                   <Link href='/dashboard'>
                       <HomeIcon/>
                   </Link>
                 </span>
            <span><small> | &nbsp; Reports</small></span>
        </div>
        {/* Sidebar */}
        <div className={classes.nav}>
            <div className={classes.sidebar}>
                {/* Sidebar Menu */}
                <NavbarComponent/>
            </div>
        </div>
        {/* Content */}
        <div className={classes.content}>
            {/* Top Center */}
            <div className={classes.topCenter}>
                <p className={classes.title}>Reports</p>
                <CreateReportModal />
            </div>
            <div className={classes.centerContent}>
                <ReportMainDataTable
                    allReports={report}
                />

                {/*footer area*/}
                <div className={classes.copyright}>
                    {thisYear} © Daystar Power Energy Solutions
                </div>
            </div>
        </div>
        {/* Right Side */}
        <div className={classes.rightSide}>
            {/*Right Side*/}
            <RightSideComponent/>
        </div>
    </div>);
}