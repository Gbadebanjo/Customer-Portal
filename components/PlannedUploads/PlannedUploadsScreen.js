import classes from './planneduploads.module.css';
import NavbarComponent from "@/components/ui/Navbar/NavbarContainer";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import Link from "next/link";
import RightSideComponent from "@/components/ui/rightside/RightSideComponent";
import getAllPowerProductionPlans from "@/lib/controllers/powerProductionPlan/getAllPowerProductionPlans";
import CreatePlannedDataUploadModal
    from "@/components/ui/modals/creates/createPlannedDataUpload/CreatePlannedDataUploadModal";
import PlannedMainDataTable from "@/components/ui/tables/plannedData/PlannedMainDataTable"; // Import the image

export default async function PlannedUploadsScreen() {
    const date = new Date();
    const thisYear = date.getFullYear();
    const {powerProductionPlans} = await getAllPowerProductionPlans();
    const NO_OF_COLUMNS = 5;
    return (<div className={classes.container}>
        {/* Header */}
        <div className={classes.header}>
                <span>
                   <Link href='/dashboard'>
                       <HomeIcon/>
                   </Link>
                 </span>
            <span><small> | &nbsp; Planned Data Upload</small></span>
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
                <p className={classes.title}>Planned Data Uploads</p>
                <CreatePlannedDataUploadModal />
            </div>
            <div className={classes.centerContent}>
                <PlannedMainDataTable
                    allPowerProductionPlans={powerProductionPlans}
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