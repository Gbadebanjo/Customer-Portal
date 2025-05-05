import classes from './assetDetails.module.css';
import NavbarComponent from "@/components/ui/Navbar/NavbarContainer";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import Link from "next/link";
import RightSideComponent from "@/components/ui/rightside/RightSideComponent";
import SolarImpactIcon from "@/components/ui/icons/dashboardIcons/SolarImpactIcon";
import {formatPower, toCommaAmount, toReadableKWh, toReadableMWh, toStringCapacity} from "@/utils/constants";
import AmmpServices from "@/lib/services/ammp/AmmpServices";
import Co2ReductionIcon from "@/components/ui/icons/dashboardIcons/Co2ReductionIcon";
import TreesSavedIcon from "@/components/ui/icons/dashboardIcons/TreesSavedIcon";
import HalfDonutChartComponent from "@/components/ui/charts/HalfDonutChartComponent";
import PowerSupGeneratorIcon from "@/components/ui/icons/dashboardIcons/PowerSupGeneratorIcon";
import PowerSupSolarIcon from "@/components/ui/icons/dashboardIcons/PowerSupSolarIcon";
import PowerSupGridIcon from "@/components/ui/icons/dashboardIcons/PowerSupGridIcon";
import CustomDateRangePicker from "@/components/ui/dateRangePicker/CustomDateRangePicker";
import ProgressBarChartComponent from "@/components/ui/charts/ProgressBarChartComponent";

export default async function AssetDetailsScreen({assetData}) {
    console.log('inside AssetDetailsScreen');

    const date = new Date();
    const thisYear = date.getFullYear();

    console.log('assetData is >> ', JSON.stringify(assetData));

    // Function to get current date and time in desired format
    function getCurrentDateTime() {
        const date = new Date();
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()} ${date.getHours() >= 12 ? "PM" : "AM"}`;
    }

    const {access_token} = await AmmpServices().getAuthToken();
    const token = access_token;
    console.log('access_token 1: >>', token);
    const {asset_id} = assetData
    console.log('asset_id 2  >>', asset_id);
    const [totals] = await Promise.all([AmmpServices().getTodaysEnergy(token, asset_id)]);
    console.log('totals 1: >>', JSON.stringify(totals));
    const progressData={
        energyFromSolar:totals.energyFromSolar,
        energyFromGenerator:totals.energyFromGenerator,
        energyFromGrid:totals.energyFromGrid,
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
                <span>
                    <small> {assetData.long_name}</small>
                </span>
            </div>
            {/* Sidebar */}
            <div className={classes.nav}>
                <div className={classes.sidebar}>
                        {assetData.id}
                    <NavbarComponent/>
                </div>
            </div>
            {/* Top Center */}
            {/* Content */}
            <div className={classes.content}>
                <div className={classes.topRow}>
                    <h2 className={classes.blueTitle}>Solar impact</h2>
                    <p>({totals.totalDays} days active) | Last update:{getCurrentDateTime()}</p>
                </div>
                <div className={classes.centerContent}>
                    {/* Content */}
                    <div className={classes.electricity}>
                        <div className="card">
                            <div className={classes.iconChartWrapper}>
                                <div className={classes.circle}></div>
                                <HalfDonutChartComponent
                                    numerator={totals.percentElectricity}
                                />
                            </div>
                            <div className="card-body"
                                 style={{
                                     alignContent: 'center',
                                     alignItems: 'center'
                                 }}
                            >
                                <h2 className="card-title"
                                    style={{
                                        alignSelf: 'center',
                                    }}
                                >{totals ? Math.ceil(totals.percentElectricity) : 0}&nbsp;%</h2>
                                <p>
                                    <small
                                        style={{
                                            alignSelf: 'center',
                                            justifySelf: 'center',
                                            textWrap: 'break-word'
                                        }}
                                    >
                                        Electricity&nbsp;contributed&nbsp;by&nbsp;solar</small></p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.solar}>
                        <div className="card">
                            <div className={classes.iconWrapper}>
                                <div className={classes.circle}></div>
                                <SolarImpactIcon className={classes.icon}/>
                            </div>
                            <div className="card-body"
                                 style={{
                                     alignContent: 'center',
                                     alignItems: 'center'
                                 }}
                            >
                                <h2 className="card-title"
                                    style={{
                                        alignSelf: 'center',
                                    }}
                                >{totals ? toCommaAmount(toReadableMWh(totals.totalHistoricPvEnergy)) : 0}&nbsp;MWh</h2>
                                <p>
                                    <small
                                        style={{
                                            alignSelf: 'center',
                                            justifySelf: 'center'
                                        }}
                                    >
                                        Solar&nbsp;production</small></p>
                            </div>
                        </div>

                    </div>
                    <div className={classes.co2}>
                        <div className="card">
                            <div className={classes.iconWrapper}>
                                <div className={classes.circle}></div>
                                <Co2ReductionIcon className={classes.icon}/>
                            </div>
                            <div className="card-body"
                                 style={{
                                     alignContent: 'center',
                                     alignItems: 'center'
                                 }}
                            >
                                <h2 className="card-title"
                                    style={{
                                        alignSelf: 'center',
                                    }}
                                >{totals ? toCommaAmount(totals.totalCo2Reduction) : 0}&nbsp;Kg</h2>
                                <p>
                                    <small
                                        style={{
                                            alignSelf: 'center',
                                            justifySelf: 'center',
                                        }}
                                    >
                                        CO<sub>2</sub> reduction</small></p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.trees}>
                        <div className="card">
                            <div className={classes.iconWrapper}>
                                <div className={classes.circle}></div>
                                <TreesSavedIcon className={classes.icon}/>
                            </div>
                            <div className="card-body"
                                 style={{
                                     alignContent: 'center',
                                     alignItems: 'center'
                                 }}
                            >
                                <h2 className="card-title"
                                    style={{
                                        alignSelf: 'center',
                                    }}
                                >{totals ? toCommaAmount(totals.totalTreesSaved) : 0}</h2>
                                <p>
                                    <small
                                        style={{
                                            alignSelf: 'center',
                                            justifySelf: 'center'
                                        }}
                                    >
                                        Trees&nbsp;saved</small></p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.power}>
                        <h2 className={classes.blueTitle}>Power generation</h2>
                    </div>
                    <div className={classes.lastUp}>
                        <small><small>Last update {getCurrentDateTime()}</small></small>
                    </div>
                    <div className={classes.energy}>
                        <h2 className={classes.blueTitle}>Energy production</h2>
                    </div>
                    <div className={classes.lastUp2}>
                        <small><small>Last update {getCurrentDateTime()}</small></small>
                    </div>
                    <div className={classes.totalPower}>
                        <div className={classes.totalPowerHeader}>
                            Current performance on site
                        </div>
                        <div className="card-body">
                            <div className={classes.box}>
                                <div className={classes.topDivContainer}>
                                    <div
                                        className={`gap-3 align-items-stretch row justify-content-center ${classes.topDiv}`}>
                                        <div className={`card-inner-bg col box ${classes.hiddenBox}`} id="box-1"></div>
                                        <div className={`card-inner-bg col box" id="box-2 ${classes.blueBox}`}>
                                            <span
                                                className="card-title">{(formatPower(totals.totalPowerGenerated))}</span><br/>Total
                                            power generated
                                        </div>
                                        <div className={`card-inner-bg col box ${classes.hiddenBox}`} id="box-3"></div>
                                    </div>
                                    <div
                                        className={`gap-3 align-items-stretch row justify-content-center ${classes.bottomDiv}`}>
                                        <div className={`card-inner-bg col box" id="box-4 ${classes.blueBox}`}>
                                            <PowerSupGeneratorIcon/>
                                            <div className="card-title mb-0 mt-1">
                                                <small>{formatPower(totals.powerFromGenerator)}</small>
                                            </div>
                                            <small>Power from generator</small>
                                        </div>
                                        <div className={`card-inner-bg col box" id="box-2 ${classes.blueBox}`}>
                                            <PowerSupSolarIcon/>
                                            <div className="card-title mb-0 mt-1">
                                                <small>{formatPower(totals.powerFromSolar)}</small>
                                            </div>
                                            <small>Power from Solar</small>
                                        </div>
                                        <div className={`card-inner-bg col box" id="box-2 ${classes.blueBox}`}>
                                            <PowerSupGridIcon/>
                                            <div className="card-title mb-0 mt-1">
                                                <small>{(formatPower(totals.powerFromGrid))}</small>
                                            </div>
                                            <small>Power from grid</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.belowLeftParent}>
                                <span className="card-title">{Math.floor(totals.PercentagePowerSuppliedBySolar)}%</span> <span
                                className="ms-2 display-information">Power supplied by solar</span>
                            </div>
                        </div>
                    </div>

                    <div className={`${classes.totalEnergy} card mb-3`}>
                        <div className="js-energy-production card-body"
                             data-asset-id="f46d9c41-f495-473a-855c-c99ec5b4e74a">
                            <div className="header">
                                <div>
                                    <p>Select a day to view</p>
                                </div>
                                <div className={classes.flexRow}>
                                    <CustomDateRangePicker/>
                                </div>
                            </div>
                            <div className="js-details-container h-md-80">

                                <div className="d-md-flex flex-column h-md-80">

                                    <hr/>
                                    <div className="flex-grow-1 mb-3 mb-md-0 row align-items-center">

                                        <div className="p-0 mt-2 mt-md-0 col-md-7">
                                            <small className="font-light">Total energy produced {toStringCapacity(totals.totalEnergyProduced)} </small>
                                            <ProgressBarChartComponent
                                                progressData={progressData}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            {/* Right Side */}
            <RightSideComponent/>
        </div>
    );
}
