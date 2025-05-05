import classes from './SupportDetails.module.css';
import NavbarComponent from "@/components/ui/Navbar/NavbarContainer";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import Link from "next/link";
import RightSideComponent from "@/components/ui/rightside/RightSideComponent";
import SupportDetailsClient from "@/components/SupportDetailsClient/SupportDetailsClient";
import getAllSupportQueryStatuses from "@/lib/controllers/supportQueryStatus/getAllSupportQueryStatuses";


export default  async function SupportDetailsScreen({support_id}) {
    console.log("SupportDetailsScreen", support_id);
    const date = new Date();
    const thisYear = date.getFullYear();
    const {supportQueryStatuses} = await getAllSupportQueryStatuses();

    return (
        <div className={classes.container}>
            {/* Header */}
            <div className={classes.header}>
                 <span>
                   <Link href='/dashboard'>
                       <HomeIcon/>
                   </Link>
                 </span>
                <span>
                    <small> Support details |  &nbsp;Page not found</small></span>
            </div>
            {/* Sidebar */}
            <div className={classes.nav}>
                <div className={classes.sidebar}>
                    {/* Sidebar Menu */}
                    <NavbarComponent/>
                </div>
            </div>
            {/* Top Center */}
            {/* Content */}
            <div className={classes.content}>

                <SupportDetailsClient
                    support_id={support_id}
                    allSupportQueryStatuses={supportQueryStatuses}
                />

            </div>
            {/* Right Side */}
            <RightSideComponent/>
        </div>
    );
}