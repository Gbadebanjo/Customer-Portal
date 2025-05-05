'use client'
import React from 'react';
import classes from "./activeAssets.module.css";
import SolarImpactIcon from "@/components/ui/icons/dashboardIcons/SolarImpactIcon";
import Co2ReductionIcon from "@/components/ui/icons/dashboardIcons/Co2ReductionIcon";
import TreesSavedIcon from "@/components/ui/icons/dashboardIcons/TreesSavedIcon";
import PowerSupGeneratorIcon from "@/components/ui/icons/dashboardIcons/PowerSupGeneratorIcon";
import PowerSupSolarIcon from "@/components/ui/icons/dashboardIcons/PowerSupSolarIcon";
import PowerSupGridIcon from "@/components/ui/icons/dashboardIcons/PowerSupGridIcon";
import {formatPower, toCommaAmount, toReadableKWh, toReadableMWh, toStringCapacity} from "@/utils/constants";
import DonutChartComponent from "@/components/ui/charts/DonutChartComponent";
import Link from "next/link";

export function ActiveAssetsComponent({assets, totals}) {
    const date = new Date();
    const thisYear = date.getFullYear();

    console.log('inside ActiveAssetsComponent');
    console.log('assets', JSON.stringify(assets));
    console.log('totals', JSON.stringify(totals));
    if (totals) {
        console.log('Totals active > ', totals);
    }

    // Function to get current date and time in desired format
    function getCurrentDateTime() {
        const date = new Date();
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()} ${date.getHours() >= 12 ? "PM" : "AM"}`;
    }

    return (
        <div className={classes.gridContainer}>
            <div className={classes.topLeft}><h2 className={classes.whiteTitle}>Solar Impact</h2></div>
            <div className={classes.topCenter1}>
                <small>({totals && JSON.stringify(totals.HistoricPvEnergyTotalDays)} days active) | Last
                    update: {getCurrentDateTime()}</small>
            </div>
            <div className={classes.topRight}><h2 className={classes.whiteTitle}>Active sites</h2></div>
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
                        >{totals ? toCommaAmount(toReadableMWh(totals.TotalHistoricPvEnergy)) : 0}&nbsp;MWh</h2>
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
                        >{toCommaAmount(totals && totals.TotalCo2Reduction)}&nbsp;kg</h2>
                        <p >
                            <small
                                style={{
                                    alignSelf: 'center',
                                    justifySelf: 'center'
                                }}
                            >
                                CO<sub>2</sub>&nbsp;Reduction</small></p>
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
                        >{toCommaAmount(totals && totals.TotalTreesSaved)} </h2>
                        <p ><small
                            style={{
                                alignSelf: 'center',
                                justifySelf: 'center'
                            }}
                        >
                            Trees&nbsp;saved</small></p>
                    </div>
                </div>
            </div>
            <div className={classes.rightSide}>
                <div className="card">
                    <div className="card-body">
                        <p className="display-information mb-1"><small>{assets.length} sites active</small></p>
                        <div className="ps-0 container sites-inner-container">
                            {assets.length > 0 ? (
                                assets.map(asset => (
                                    <div key={asset.asset_id}>
                                        <div className="d-flex justify-content-between">
                                            <div
                                                className={classes.rightContainer}
                                            >
                                                <span>
                                                     <h3 className="mb-0">{asset.long_name}</h3>
                                                <p className="display-information mb-0"><small>Solar capacity: {asset.total_pv_power ? toStringCapacity(asset.total_pv_power) : ''}</small></p>
                                                </span>
                                                <span>
                                                    <Link
                                                        className="btn btn-outline btn-error"
                                                        href ={`/Assets/Details/${asset.asset_id}`}
                                                    >
                                                        View
                                                    </Link>
                                            </span>
                                            </div>
                                        </div>
                                        <hr/>
                                    </div>
                                ))
                            ) : (
                                <p>No active assets.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.powerGen}><h2 className={classes.whiteTitle} >Power Generation</h2></div>
            <div className={classes.empty}>&nbsp;</div>
            <div className={classes.lastUpdated}><small>Last update: {getCurrentDateTime()}</small></div>
            <div className={classes.donut}>
                <div className={classes.donutContent}>
                    <div className={classes.donutHeader}><small>Today&apos;s power generation across all sites</small>
                    </div>
                    <div className={classes.donutHeaderTwo}><small>Total power
                        consumed {totals?.TotalMostRecentConsumptionPower ? totals.TotalMostRecentConsumptionPower : 0} kW</small>
                    </div>
                    <div className={classes.donutFigure}>
                        <DonutChartComponent
                            totals={totals}
                        />
                    </div>
                    <div className={classes.donutFooter}>
                        <div className={classes.powerSource}>
                            <div className={classes.powerSourceTop}>
                                <span><PowerSupGeneratorIcon/></span>
                                <span>&nbsp;</span>
                                <span>{formatPower(totals?.TotalMostRecentGensetPower ? totals?.TotalMostRecentGensetPower : 0)}</span>
                            </div>
                            <div>
                                <span><small>Power supplied from generator</small></span>
                            </div>
                        </div>
                        <div className={classes.powerSource}>
                            <div className={classes.powerSourceTop}>
                                <span> <PowerSupSolarIcon/></span>
                                <span>&nbsp;</span>
                                <span>{formatPower(totals?.TotalMostRecentPvPower ? totals.TotalMostRecentPvPower : 0)} kW</span>
                            </div>
                            <div>
                                <span><small>Power supplied from solar</small></span>
                            </div>
                        </div>
                        <div className={classes.powerSource}>
                            <div className={classes.powerSourceTop}>
                                <span> <PowerSupGridIcon/></span>
                                <span>&nbsp;</span>
                                <span>{formatPower(totals?.TotalMostRecentPowerFromGrid ? totals.TotalMostRecentPowerFromGrid : 0)} kW</span>
                            </div>
                            <div>
                                <span><small>Power supplied from grid</small></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.copyright}>
                {thisYear} © Daystar Power Energy Solutions
            </div>
        </div>
    );
}
