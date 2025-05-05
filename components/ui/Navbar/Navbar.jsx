'use client';
import {useState} from 'react';
import classes from './navbar.module.css';
import Image from 'next/image';
import DayStarLogo from '@/public/img/daystar/sidenav-logo-bottom.png';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import DashboardIcon from '@/components/ui/icons/DashboardIcon';
import CustomerIcon from '@/components/ui/icons/CustomerIcon';
import SupportIcon from '@/components/ui/icons/SupportIcon';
import ChartIcon from '@/components/ui/icons/ChartIcon';
import WrenchIcon from '@/components/ui/icons/WrenchIcon';
import ReportIcon from '@/components/ui/icons/ReportIcon';
import ChevronUpIcon from '@/components/ui/icons/ChevronUpIcon';
import ChevronDownIcon from '@/components/ui/icons/ChevronDownIcon';
import IdentityIcon from '@/components/ui/icons/IdentityIcon';
import TextTemplatesIcon from '@/components/ui/icons/TextTemplatesIcon';
import AuditLogsIcon from '@/components/ui/icons/AuditLogsIcon';
import SettingsIcon from '@/components/ui/icons/SettingsIcon';

export default function Navbar({user}) {
    const path = usePathname();
    const [adminMenuOpen, setAdminMenuOpen] = useState(path.includes('/admin/'));
    const [identityMenuOpen, setIdentityMenuOpen] = useState(path.includes('/admin/identity'));

    return (
        <div className={classes.sidebarMenu}>
            {/* Display user name */}
            <div className={classes.sidebarHeader}> {user}</div>
            {/* Sidebar Menu Items */}
            <Link href='/dashboard'>
                <div
                    className={path.startsWith('/dashboard') ? `${classes.menuItemOrange} ${classes.menuItem}` : classes.menuItem}>
          <span>
            <DashboardIcon/>
          </span>
                    <span>Dashboard</span>
                </div>
            </Link>
            <Link href='/customers'>
                <div
                    className={path.startsWith('/customers') ? `${classes.menuItemOrange} ${classes.menuItem}` : classes.menuItem}>
          <span>
            <CustomerIcon/>
          </span>
                    <span>Customers</span>
                </div>
            </Link>
            <Link href='/support'>
                <div
                    className={path.startsWith('/support') ? `${classes.menuItemOrange} ${classes.menuItem}` : classes.menuItem}>
          <span>
            <SupportIcon/>
          </span>
                    <span>Support</span>
                </div>
            </Link>
            <Link href='/planned-data-upload'>
                <div
                    className={path.startsWith('/planned-data-upload') ? `${classes.menuItemOrange} ${classes.menuItem}` : classes.menuItem}>
          <span>
            <ChartIcon/>
          </span>
                    <span>Planned Data Upload</span>
                </div>
            </Link>
            <Link href='/planned-vs-actual'>
                <div
                    className={path.startsWith('/planned-vs-actual') ? `${classes.menuItemOrange} ${classes.menuItem}` : classes.menuItem}>
          <span>
            <ChartIcon/>
          </span>
                    <span>Planned Vs. Actual Upload</span>
                </div>
            </Link>
            <Link href='/reports'>
                <div
                    className={path.startsWith('/reports') ? `${classes.menuItemOrange} ${classes.menuItem}` : classes.menuItem}>
          <span>
            <ReportIcon/>
          </span>
                    <span>Reports</span>
                </div>
            </Link>
            {/* Administration */}
            <Link href="#">
                <div onClick={() => setAdminMenuOpen(!adminMenuOpen)}>
                    <div className={adminMenuOpen ? classes.menuItemOrange : classes.menuItem}>
            <span>
              <WrenchIcon/>
            </span>
                        <span>Administration</span>
                        <span>{adminMenuOpen ? <ChevronUpIcon/> : <ChevronDownIcon/>}</span>
                    </div>
                </div>
            </Link>
            {adminMenuOpen && (
                <ul className={classes.innerMenu}>
                    {/* Identity Management */}
                    <li className={classes.innerMenuItem}
                        style={{
                            marginLeft: 10,
                            marginBottom: -10,
                            marginTop: -5,
                        }}
                    >
                        <Link href='#'>
                            <div
                                onClick={() => setIdentityMenuOpen(!identityMenuOpen)}
                                className={path.includes('/admin/identity') ?
                                    classes.subMenuOrangeIdentity :
                                    classes.subMenuItemIdentity}
                            >
                <span>
                  <IdentityIcon/>
                </span>
                                <span>Identity &nbsp; &nbsp;  </span>
                                <span>{identityMenuOpen ? <ChevronUpIcon/> : <ChevronDownIcon/>}</span>
                            </div>
                        </Link>
                        {identityMenuOpen && (
                            <ul className={classes.innerMenu}>
                                <li className={classes.innerMenuItem}>
                                    <Link href='/admin/identity/roles'>
                                        <div
                                            className={path.startsWith('/admin/identity/roles') ?
                                                classes.subSubMenuItemOrange :
                                                classes.subSubMenuItem}
                                            style={{
                                                marginTop: -10,
                                            }}
                                        >
                                            Roles
                                        </div>
                                    </Link>
                                </li>
                                <li className={classes.innerMenuItem}>
                                    <Link href='/admin/identity/users'>
                                        <div
                                            className={path.startsWith('/admin/identity/users') ?
                                                classes.subSubMenuItemOrange :
                                                classes.subSubMenuItem}
                                        >
                                            Users
                                        </div>
                                    </Link>
                                </li>
                                <li className={classes.innerMenuItem}
                                    style={{
                                        marginBottom: 10,
                                    }}
                                >
                                    <Link href='/admin/identity/security-logs'>
                                        <div className={path.startsWith('/admin/identity/security-logs') ?
                                            classes.subSubMenuItemOrange :
                                            classes.subSubMenuItem}
                                        >
                                            Security Logs
                                        </div>
                                    </Link>
                                </li>
                                {/* grand child menu items ends here */}
                            </ul>
                        )}
                    </li>
                    {/* Other menu items */}
                    <li className={classes.innerMenuItem}>
                        <Link href='/admin/text-templates'>
                            <div
                                className={path.startsWith('/admin/text-templates') ?
                                    classes.subMenuOrange :
                                    classes.subMenuItem}
                            >
                <span>
                  <TextTemplatesIcon/>
                </span>
                                <span>Text Templates</span>
                            </div>
                        </Link>
                    </li>
                    <li className={classes.innerMenuItem}>
                        <Link href='/admin/audit-logs'>
                            <div
                                className={path.startsWith('/admin/audit-logs') ?
                                    classes.subMenuOrange :
                                    classes.subMenuItem}
                            >
                <span>
                  <AuditLogsIcon/>
                </span>
                                <span>Audit Logs</span>
                            </div>
                        </Link>
                    </li>
                    <li className={classes.innerMenuItem}>
                        <Link href='/admin/settings'>
                            <div
                                className={path.startsWith('/admin/settings') ?
                                    classes.subMenuOrange :
                                    classes.subMenuItem}
                            >
                <span>
                  <SettingsIcon/>
                </span>
                                <span>Settings</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            )}
            {/* Image */}
            <div className={classes.dayStarLogoForMenu}>
                <Image src={DayStarLogo} alt='Daystar Logo' priority/>
            </div>
        </div>
    );
}
