'use client'
import React, { useState } from 'react';
import SettingsIcon from "@/components/ui/icons/SettingsIcon";
import PowerIcon from "@/components/ui/icons/PowerIcon";
import Link from "next/link";
import classes from './profilepopup.module.css'
import ProfileIconBig from "@/components/ui/icons/ProfileIconBig";
import logout from "@/lib/auth/logout";

const ProfilePopUp = () => {
    const [isOpen, setIsOpen] = useState(true);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <div className={`${classes.popup} ${isOpen ? classes.open : ''}`}>
            <div className={classes.profileIcon} onClick={togglePopup}>

            </div>
            <div className={classes.popupContent}>
                <div className={classes.popupHeader}>
                    <div className={classes.userInfo}>
                        <div className={classes.avatar}>
                            <ProfileIconBig/>
                        </div>
                        <div
                            className={classes.lpxContextMenuUserName}
                            style={{
                                color: '#FF7D70',
                            }}
                        >
                            admin
                        </div>
                    </div>
                    <div>
                        <div
                            className={classes.lpxContextMenuUserEmail}
                        >
                            mike.ekeghe@daystar-power.com
                        </div>
                    </div>
                </div>
                <div className={classes.menuItems}>
                    <ul>
                        <li>
                            <Link href="/account/manage">
                                <div>
                                    <SettingsIcon/>
                                    <span>My account</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <div onClick={handleLogout} className={classes.logout}>
                                <PowerIcon/>
                                <span>Log out</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfilePopUp;
