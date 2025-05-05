import classes from './dashboard.module.css';
import NavbarComponent from "@/components/ui/Navbar/NavbarContainer";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import Link from "next/link";
import RightSideComponent from "@/components/ui/rightside/RightSideComponent";
import {DashboardComponent} from "@/components/Dashboard/DashboardComponent";
import AmmpServices from "@/lib/services/ammp/AmmpServices";
import {ServiceConstants} from "@/utils/constants";

export default async function DashboardScreen() {
    console.log('inside DashboardScreen');


    const {access_token} = await AmmpServices().getAuthToken();
    const token = access_token;
    console.log('access_token 1: >>', token);

    const assets = await AmmpServices().getAssets(token);
    console.log('assets Length >>', assets.length);
    // console.log('assets  assets>>', assets);
    let myTotals;
    if (assets.length < ServiceConstants.MaxAssets && assets.length >0) {
        myTotals = await AmmpServices().fetchAndCalculateHistoricEnergyData(assets, token);
        console.log('myTotals', JSON.stringify(myTotals));
    }


    return (
        <div className={classes.container}>
            <div className={classes.header}>
                    <span>
                        <Link href='/dashboard'>
                            <HomeIcon/>
                        </Link>
                    </span>
                <span> | <small> &nbsp; Dashboard</small></span>
            </div>
            <div className={classes.nav}>
                    <NavbarComponent/>
            </div>
            <div className={classes.content}>
                <DashboardComponent assets={assets} totals={myTotals}/>
            </div>
            <RightSideComponent/>
        </div>
    );

}
