'use client'
import {useEffect, useState} from 'react';
import classes from "./rightSide.module.css";
import ProfileIcon from "@/components/ui/icons/ProfileIcon";
import ProfilePopUp from "@/components/ui/popups/profilepopup/ProfilePopUp";

export default function RightSideComponent(props) {
    const [profilePopupVisible, setProfilePopupVisible] = useState(false); // State to manage profile popup visibility

    // Function to toggle profile popup visibility
    const toggleProfilePopup = () => {
        setProfilePopupVisible(!profilePopupVisible);
    };

    // Function to close profile popup when clicking outside
    const handleClickOutside = (event) => {
        if (event.target.closest(`.${classes.rightSide}`) === null && profilePopupVisible) {
            setProfilePopupVisible(false);
        }
    };

    useEffect(() => {
        // Attach click event listener to document to detect clicks outside the profile popup
        if (profilePopupVisible) {
            document.addEventListener('click', handleClickOutside);
        }

        // Clean up the event listener when component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [profilePopupVisible, handleClickOutside]);

    return (
        <div className={classes.rightSide}>
            {/* Right Side */}
            <div className={classes.profileIconDiv} onClick={toggleProfilePopup}>
                <ProfileIcon/>
            </div>
            <div className={classes.profileUserDiv} onClick={toggleProfilePopup}>
                Profile
            </div>
            {/* Render profile popup if visible */}
            {profilePopupVisible && <ProfilePopUp/>}
        </div>
    );
}
