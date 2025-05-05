'use client'
import React, {useEffect, useRef, useState} from 'react';
import styles from './actionsPopup.module.css';
import ButtonFlexible from "@/components/ui/button-flexible/ButtonFlexible";
import SettingsIcon from "@/components/ui/icons/SettingsIcon";
import ChevronDownIcon from "@/components/ui/icons/ChevronDownIcon";
import Link from "next/link";
import SettingsSmallIcon from "@/components/ui/icons/SettingsSmallIcon";
import ChevronDownSmallIcon from "@/components/ui/icons/ChevronDownSmallIcon";

const ActionsPopup = ({menuItems}) => {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={popupRef} className={styles.actionsPopup}>
            <ButtonFlexible
                link="#"
                width={110}
                height={30}
                onClick={togglePopup}
                style={{
                    marginRight: 0,
                }}
            >
                <SettingsSmallIcon /> &nbsp;  <small>Actions</small> <ChevronDownSmallIcon />
            </ButtonFlexible>
            {isOpen && (
                <ul className={styles.dropdownMenu}>
                    {menuItems.map((item, index) => (
                        <li key={index} className={styles.dropdownItem}>
                            <Link href={item[1]} className={styles.dropdownLink}>
                                {item[0]}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ActionsPopup;
