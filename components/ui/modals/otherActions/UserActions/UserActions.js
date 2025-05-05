'use client'
import React, {useEffect, useRef, useState} from 'react';
import ButtonFlexible from '@/components/ui/button-flexible/ButtonFlexible';
import Link from 'next/link';
import classes from "./userActions.module.css";
import XMarkIcon from "@/components/ui/icons/XMarkIcon";
import {ButtonWhiteClose} from "@/components/ui/ButtonWhiteClose/ButtonWhiteClose";
import {ButtonSaveSubmit} from "@/components/ui/ButtonSaveAndSubmit/ButtonSaveAndSubmit";
import SettingsSmallIcon from "@/components/ui/icons/SettingsSmallIcon";
import ChevronDownSmallIcon from "@/components/ui/icons/ChevronDownSmallIcon";
import WarnCircleBigIcon from "@/components/ui/icons/WarnCircleBigIcon";
import getUserById from "@/lib/controllers/users/getUserById";
import deleteUserById from "@/lib/controllers/users/deleteUserById";
import updateUserById from "@/lib/controllers/users/updateUserById";
import {AllTimezones} from "@/utils/constants";

const UserActions = ({ menuItems, customers }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);

    const editPopupRef = useRef(null);
    const deletePopupRef = useRef(null);
    const customAlertPopupRef = useRef(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCustomAlertModalOpen, setIsCustomAlertModalOpen] = useState(false);

    const [alertMessage, setAlertMessage] = useState('');
    const [userIdToEdit, setUserIdToEdit] = useState('');
    const [userIdToDelete, setUserIdToDelete] = useState('');
    const [file, setFile] = useState(null);
    const [existingUserObject, setExistingUserObject] = useState(null);

    const [activeTab, setActiveTab] = useState('userInfo');
    const [selectedTimezone, setSelectedTimezone]  = useState(AllTimezones[0]);
    const [selectedCustomer, setSelectedCustomer]  = useState('');
    const [adminRoleChecked, setAdminRoleChecked] = useState(false);
    const [daystarPortalAdminRoleChecked, setDaystarPortalAdminRoleChecked] = useState(false);
    const [daystarCustomerAdminRoleChecked, setDaystarCustomerAdminRoleChecked] = useState(false);
    const [customerRoleChecked, setCustomerRoleChecked] = useState(true);
    const [userName, setUserName] = useState('');
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [ammpApiKey, setAmmpApiKey] = useState('');
    const [phone, setPhone] = useState('');
    const [customer, setCustomer] = useState('');
    const [roles, setRoles] = useState('');
    const [isLockedOut, setIsLockedOut] = useState(false);
    const [notActive, setNotActive] = useState(false);
    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [isExternal, setIsExternal] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const selectDialogue = (itemElement, id) => {
        if (itemElement === 'openEditModal') {
            openEditModal(id);
        } else if (itemElement === 'openDeleteModal') {
            openDeleteModal(id);
        } else {
            alert('nothing selected')
        }
    }

    const openCustomAlertPopup = (msg) => {
        setAlertMessage(msg);
        setIsCustomAlertModalOpen(true);
    };

    useEffect(() => {
        if (isEditModalOpen) {
            editPopupRef.current.showModal();
        } else {
            editPopupRef.current.close();
        }
    }, [isEditModalOpen]);

    useEffect(() => {
        if (isDeleteModalOpen) {
            deletePopupRef.current.showModal();
        } else {
            deletePopupRef.current.close();
        }
    }, [isDeleteModalOpen]);

    useEffect(() => {
        if (isCustomAlertModalOpen) {
            customAlertPopupRef.current.showModal();
        } else {
            customAlertPopupRef.current.close();
        }
    }, [isCustomAlertModalOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const openEditModal = async (id) => {
        setIsEditModalOpen(true);
        setUserIdToEdit(id)
        const { user } = await getUserById(id);
        if (user) {
            const {
                username,
                email,
                phone_number,
                name,
                surname ,
                ammp_api_key,
                customer,
                timezone,
                roles,
                is_locked_out,
                not_active,
                email_confirmed,
                is_external,
            } = user;
            setUserName(username);
            setEmail(email);
            setPhone(phone_number);
            setName(name);
            setSurname(surname);
            setAmmpApiKey(ammp_api_key);
            setSelectedCustomer(customer);
            setSelectedTimezone(timezone);
            setRoles(roles);
            setIsLockedOut(is_locked_out);
            setNotActive(not_active);
            setEmailConfirmed(email_confirmed);
            setIsExternal(is_external);
            setExistingUserObject(user)
        } else {
            alert('<<<<<>>>>> NO user');
        }
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setIsOpen(false);
    };

    const openDeleteModal = async (id) => {
        setIsDeleteModalOpen(true);
        setUserIdToDelete(id)
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setIsOpen(false);
    };

    const closeCustomAlertModal = () => {
        setIsCustomAlertModalOpen(false);
        setIsOpen(false);
    };

    const deleteUser = async () => {
        try {
            openCustomAlertPopup("User deleted successfully");
            await deleteUserById(userIdToDelete);
            setIsDeleteModalOpen(false);
            setIsOpen(false);
        } catch (error) {
            alert('An error occurred while deleting the user.');
            setIsDeleteModalOpen(false);
            setIsOpen(false);
        }
    };

    const updateUser = async () => {
        try {
            const newRoles = [];

            // Check if admin role checkbox is checked and add it to roles array if checked
            if (adminRoleChecked) {
                newRoles.push({ name: 'Admin', isAssigned: true });
            }

            // Check if customer role checkbox is checked and add it to roles array if checked
            if (customerRoleChecked) {
                newRoles.push({ name: 'Customer', isAssigned: true });
            }

            // Check if daystarCustomerAdmin role checkbox is checked and add it to roles array if checked
            if (daystarCustomerAdminRoleChecked) {
                newRoles.push({ name: 'Daystar Customer Admin', isAssigned: true });
            }

            // Check if daystarPortalAdmin role checkbox is checked and add it to roles array if checked
            if (daystarPortalAdminRoleChecked) {
                newRoles.push({ name: 'Daystar Portal Admin', isAssigned: true });
            }

            const userData = {
                username: userName,
                email: email,
                phone_number: phone,
                name: name.toUpperCase(),
                surname: surname.toUpperCase(),
                ammp_api_key: ammpApiKey,
                customer: selectedCustomer,
                roles: newRoles,
                timezone: selectedTimezone,
                is_locked_out: isLockedOut,
                not_active: notActive,
                email_confirmed: emailConfirmed,
            }
            await updateUserById(userIdToEdit, userData);
            setIsEditModalOpen(false);
            setIsOpen(false);

            setUserName('');
            setEmail('');
            setPhone('');
            setName('');
            setSurname('');
            setAmmpApiKey('');
            setSelectedCustomer('');
            setSelectedTimezone(AllTimezones[0]);
            setRoles('');
            setIsLockedOut(false);
            setNotActive(false);
            setEmailConfirmed(false);
            setIsExternal(false);

            openCustomAlertPopup("User updated successfully")
        } catch (error) {
            alert('An error occurred while updating the user.');
            setIsEditModalOpen(false);
            setIsOpen(false);
        }
    };

    return (
        <div ref={popupRef} className={classes.actionsPopup}>
            <ButtonFlexible
                link="#"
                width={110}
                height={30}
                onClick={togglePopup}
                style={{
                    marginRight: 0,
                }}
            >
                <SettingsSmallIcon/> &nbsp; <small>Actions</small> <ChevronDownSmallIcon/>
            </ButtonFlexible>
            {isOpen && (
                <ul className={classes.dropdownMenu}>
                    {menuItems.map((item, index) => (
                        <li key={index} className={classes.dropdownItem}>
                            {item[2] === 'dialogue' ? (
                                <Link
                                    href={'#'}
                                    className={classes.dropdownLink}
                                    onClick={() => selectDialogue(item[1], item[3])}
                                >
                                    {item[0]}
                                </Link>
                            ) : (
                                <Link href={item[1]} className={classes.dropdownLink}>
                                    {item[0]}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            <dialog
                id="import_modal"
                className="modal"
                ref={editPopupRef}
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                }}
            >
                <div className="modal-box" style={{background: '#0D202F', borderColor: '#0D202F'}}>
                    <div className={classes.popUpHeader}>
                        <h2 className="font-bold text-lg">Update</h2>
                        <Link href={"#"} onClick={closeEditModal}><XMarkIcon/></Link>
                    </div>
                    <div className="py-4">
                            <div aria-labelledby="create-user-modal-tabs_0-tab" id="import-user-modal-tabs_0"
                                 role="tabpanel">
                                <div role="tablist" className="tabs tabs-bordered">
                                    <Link
                                        href={'#'}
                                        role="tab"
                                        className={`tab ${activeTab === 'userInfo' ? 'tab-active' : ''}`}
                                        onClick={() => setActiveTab('userInfo')}
                                    >
                                        User Information
                                    </Link>
                                    <Link
                                        href={'#'}
                                        role="tab"
                                        className={`tab ${activeTab === 'roles' ? 'tab-active' : ''}`}
                                        onClick={() => setActiveTab('roles')}
                                    >
                                        Roles
                                    </Link>
                                </div>
                                <div className="py-4">
                                    {activeTab === 'userInfo' && (
                                        // User Information Tab Content
                                        <form
                                            method="dialog"
                                            action={updateUser}
                                        >
                                            <div aria-labelledby="create-user-modal-tabs_0-tab"
                                                 id="create-user-modal-tabs_0"
                                                 role="tabpanel">
                                                <div>
                                                    {/*<span> User Name </span>*/}
                                                    <label
                                                        className="form-control w-full"
                                                        style={{
                                                            marginBottom: '20px',
                                                            maxWidth: '133%'
                                                        }}
                                                    >
                                                        <div className="label">
                                                            <span className="label-text">User Name &nbsp; *</span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="input input-bordered input-md w-full"
                                                            id="userName"
                                                            max="256"
                                                            name="userName"
                                                            disabled="disabled"
                                                            style={{
                                                                backgroundColor: '#123751',
                                                                borderColor: '#23262a',
                                                                maxWidth: '133%'
                                                            }}
                                                            value={userName}
                                                            onChange={(e) => setUserName(e.target.value)}
                                                        />
                                                    </label>
                                                    {/*<span> Surname </span>*/}
                                                    <label
                                                        className="form-control w-full"
                                                        style={{
                                                            marginBottom: '20px',
                                                            maxWidth: '133%'
                                                        }}
                                                    >
                                                        <div className="label">
                                                            <span className="label-text">Surname</span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="input input-bordered input-md w-full"
                                                            id="Surname"
                                                            max="256"
                                                            name="Surname"
                                                            style={{
                                                                backgroundColor: '#123751',
                                                                borderColor: '#23262a',
                                                            }}
                                                            value={surname}
                                                            onChange={(e) => setSurname(e.target.value)}
                                                        />
                                                    </label>

                                                    {/*<span> Name </span>*/}
                                                    <label
                                                        className="form-control w-full"
                                                        style={{
                                                            marginBottom: '20px',
                                                            maxWidth: '133%'
                                                        }}
                                                    >
                                                        <div className="label">
                                                            <span className="label-text">Name &nbsp; *</span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="input input-bordered input-md w-full"
                                                            id="Name"
                                                            max="256"
                                                            name="Name"
                                                            style={{
                                                                backgroundColor: '#123751',
                                                                borderColor: '#23262a',
                                                            }}
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                        />
                                                    </label>

                                                    {/*<span> Email </span>*/}
                                                    <label
                                                        className="form-control w-full"
                                                        style={{
                                                            marginBottom: '20px',
                                                            maxWidth: '133%'
                                                        }}
                                                    >
                                                        <div className="label">
                                                            <span className="label-text">Email Address &nbsp; *</span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="input input-bordered input-md w-full"
                                                            id="Email"
                                                            max="256"
                                                            name="Email"
                                                            disabled="disabled"
                                                            style={{
                                                                backgroundColor: '#123751',
                                                                borderColor: '#23262a',
                                                            }}
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </label>
                                                    <label
                                                        style={{
                                                            marginBottom: '20px',
                                                            maxWidth: '133%'
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                marginBottom: '5px',
                                                                maxWidth: '133%'
                                                            }}
                                                        >
                                                            <span className="label-text">Timezone</span>
                                                        </div>
                                                        <select
                                                            className="select select-bordered w-full"
                                                            value={selectedTimezone}
                                                            onChange={(e) => setSelectedTimezone(e.target.value)}
                                                        >
                                                            <option value="Africa/Lagos">Africa/Lagos</option>
                                                            <option disabled value="">-None-</option>
                                                            {AllTimezones.map(singleTimezone => (
                                                                <option key={singleTimezone.id}
                                                                        value={singleTimezone.id}>{singleTimezone.name}</option>
                                                            ))}
                                                        </select>

                                                    </label>


                                                    <div className="mb-3">
                                                        {/*<span> AMMP </span>*/}
                                                        <label
                                                            className="form-control w-full"
                                                            style={{
                                                                marginBottom: '20px',
                                                                maxWidth: '133%'
                                                            }}
                                                        >
                                                            <div className="label">
                                                                <span className="label-text">AMMP  API key</span>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="input input-bordered input-md w-full"
                                                                id="ammpApiKey"
                                                                max="255"
                                                                min="2"
                                                                name="ammpApiKey"
                                                                style={{
                                                                    backgroundColor: '#123751',
                                                                    borderColor: '#23262a',
                                                                }}
                                                                value={ammpApiKey}
                                                                onChange={(e) => setAmmpApiKey(e.target.value)}
                                                            />
                                                        </label>

                                                        <label
                                                            className="form-control w-full"
                                                            style={{
                                                                marginBottom: '20px',
                                                                maxWidth: '133%'
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    marginBottom: '5px'
                                                                }}
                                                            >
                                                                <span className="label-text">Select Customer</span>
                                                            </div>
                                                            <select
                                                                className="select select-bordered w-full"
                                                                name="SelectedCustomer"
                                                                value={selectedCustomer}
                                                                onChange={(e) => setSelectedCustomer(e.target.value)}
                                                            >
                                                                <option disabled value="">-None-</option>
                                                                {customers.map(singleCustomer => (
                                                                    <option key={singleCustomer.id}
                                                                            value={singleCustomer.id}>{singleCustomer.company_name}</option>
                                                                ))}
                                                            </select>
                                                        </label>
                                                    </div>

                                                    <div className="mb-3">
                                                        {/*<span> Phone Number </span>*/}
                                                        <label
                                                            className="form-control w-full"
                                                            style={{
                                                                marginBottom: '20px',
                                                                maxWidth: '133%'
                                                            }}
                                                        >
                                                            <div className="label">
                                                                <span className="label-text">Phone  number</span>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="input input-bordered input-md w-full"
                                                                id="Phone"
                                                                max="16"
                                                                name="Phone"
                                                                style={{
                                                                    backgroundColor: '#123751',
                                                                    borderColor: '#23262a',
                                                                    maxWidth: '133%'
                                                                }}
                                                                value={phone}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                            />
                                                        </label>
                                                    </div>

                                                </div>

                                                <div className="mb-2 custom-checkbox custom-control form-check">
                                                    <input
                                                        type="checkbox" checked="checked" data-val="true"
                                                        data-val-required="The Active field is required."
                                                        id="UserInfo_IsActive" name="UserInfo.IsActive"
                                                        value="true"
                                                        className="form-check-input "/>
                                                    &nbsp;
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="UserInfo_IsActive">Active</label>
                                                </div>

                                                <div className="mb-2 custom-checkbox custom-control form-check">
                                                    <input
                                                        type="checkbox" checked="checked" data-val="true"
                                                        data-val-required="The Account lockout field is required."
                                                        id="UserInfo_LockoutEnabled"
                                                        name="UserInfo.LockoutEnabled"
                                                        value="true" disabled="" className="form-check-input "/>
                                                    &nbsp;
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="UserInfo_LockoutEnabled">Account
                                                        lockout</label></div>
                                                <input type="hidden" id="UserInfo_LockoutEnabled"
                                                       name="UserInfo.LockoutEnabled" value="True"/>

                                                <div className="mb-2 custom-checkbox custom-control form-check">
                                                    <input
                                                        type="checkbox" checked="checked" data-val="true"
                                                        data-val-required="The Send invitation email field is required."
                                                        id="UserInfo_SendConfirmationEmail"
                                                        name="UserInfo.SendConfirmationEmail" value="true"
                                                        className="form-check-input "
                                                    />
                                                    &nbsp;
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="UserInfo_SendConfirmationEmail">Send
                                                        invitation email
                                                    </label>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                    {activeTab === 'roles' && (
                                        // Roles Tab Content
                                        <div id="create-user-modal-tabs_1-tab">
                                            {/* Content for the "Roles" tab */}
                                            <div id="create-user-modal-tabs_1-tab">
                                                {/* Your form components for the "Roles" tab */}
                                                <div className="mb-2 custom-checkbox custom-control form-check">
                                                    <input
                                                        id="admin_role_checkbox"
                                                        name="adminRoleCheckbox"
                                                        type="checkbox"
                                                        checked={adminRoleChecked}
                                                        onChange={() => setAdminRoleChecked(!adminRoleChecked)}
                                                        data-val="true"
                                                        data-val-required="The IsAssigned field is required."
                                                        value="true"
                                                        className="form-check-input "/>
                                                    &nbsp;
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="Roles_0__IsAssigned">admin</label>
                                                </div>
                                                <div className="mb-2 custom-checkbox custom-control form-check">
                                                    <input
                                                        // checked="checked"
                                                        checked={customerRoleChecked}
                                                        onChange={() => setCustomerRoleChecked(!adminRoleChecked)}
                                                        id="customer_role_checkbox"
                                                        name="customerRoleCheckbox"
                                                        type="checkbox"
                                                        value="true"
                                                        className="form-check-input "
                                                    />
                                                    &nbsp;
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="Roles_1__IsAssigned">Customer
                                                        User</label>
                                                </div>
                                                {/* <input id="Roles_1__Name" name="Roles[1].Name" type="hidden"
                                           value="Customer User"/>*/}
                                                <div className="mb-2 custom-checkbox custom-control form-check">
                                                    <input
                                                        id="daystar_customer_admin_role_checkbox"
                                                        name="daystarCustomerAdminRoleCheckbox"
                                                        checked={daystarCustomerAdminRoleChecked}
                                                        onChange={() => setDaystarCustomerAdminRoleChecked(!daystarCustomerAdminRoleChecked)}
                                                        type="checkbox"
                                                        value="true"
                                                        className="form-check-input "
                                                    />
                                                    &nbsp;
                                                    <label
                                                        className="form-check-label" htmlFor="Roles_2__IsAssigned">Daystar
                                                        Customer Admin</label></div>
                                                {/* <input id="Roles_2__Name" name="Roles[2].Name" type="hidden"
                                           value="Daystar Customer Admin"/>*/}
                                                <div className="mb-2 custom-checkbox custom-control form-check">
                                                    <input
                                                        id="daystar_portal_admin_role_checkbox"
                                                        name="daystarPortalAdminRoleCheckbox"
                                                        checked={daystarPortalAdminRoleChecked}
                                                        onChange={() => setDaystarPortalAdminRoleChecked(!daystarPortalAdminRoleChecked)}
                                                        type="checkbox"
                                                        value="true"
                                                        className="form-check-input "/>
                                                    &nbsp;
                                                    <label
                                                        className="form-check-label" htmlFor="Roles_3__IsAssigned">Daystar
                                                        Portal Admin</label></div>
                                                {/*<input id="Roles_3__Name" name="Roles[3].Name" type="hidden"
                                           value="Daystar Portal Admin"/>*/}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="modal-action">
                                    <div className={classes.buttonContainer}>
                                        <div style={{marginRight: 5}}>
                                            <ButtonWhiteClose onClick={closeEditModal}/>
                                        </div>
                                        <div style={{marginLeft: 5}}>
                                            <ButtonSaveSubmit onClick={updateUser}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </dialog>

            <dialog
                id="export_modal"
                className="modal"
                ref={deletePopupRef}
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                }}
            >
                <div className="modal-box" style={{background: '#0D202F', borderColor: '#0D202F'}}>
                    <div className={classes.popUpHeader}></div>
                    <div className="py-4">
                        <form method="dialog">
                            <div aria-labelledby="export-user-modal-tabs_0-tab" id="create-user-modal-tabs_0"
                                 role="tabpanel">
                                <div>
                                    <center>
                                        <div><WarnCircleBigIcon/></div>
                                        <div><h2 className="font-bold text-xl lg">Are you sure</h2></div>
                                        <div><p>Are you sure you want to delete this record?</p></div>
                                        <div>
                                            <div className={classes.buttonContainer}>
                                                <div style={{marginRight: 5}}>
                                                    <ButtonWhiteClose onClick={closeDeleteModal}/>
                                                </div>
                                                <div style={{marginLeft: 5}}>
                                                    <ButtonSaveSubmit buttonText={'Yes'} onClick={deleteUser}/>
                                                </div>
                                            </div>
                                        </div>
                                    </center>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog
                id="custom_modal"
                className="modal"
                ref={customAlertPopupRef}
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                }}
            >
                <div className="modal-box" style={{background: '#0D202F', borderColor: '#0D202F'}}>
                    <div className={classes.popUpHeader}></div>
                    <div className="py-4">
                        <form method="dialog">
                            <div aria-labelledby="export-user-modal-tabs_0-tab" id="create-user-modal-tabs_0"
                                 role="tabpanel">
                                <div>
                                    <center>
                                        <div><WarnCircleBigIcon/></div>
                                        <div><h2 className="font-bold text-xl lg">{alertMessage}</h2></div>
                                        {/*<div><p>Are you sure you want to delete this record?</p></div>*/}
                                        <div>
                                            <div className={classes.buttonContainer}>
                                                <div style={{marginLeft: 5}}>
                                                    <ButtonSaveSubmit buttonText={'Ok'} onClick={closeCustomAlertModal}/>
                                                </div>
                                            </div>
                                        </div>
                                    </center>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default UserActions;