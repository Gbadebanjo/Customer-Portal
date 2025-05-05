'use client';
import React, {useEffect, useRef, useState} from 'react';
import ButtonFlexible from "@/components/ui/button-flexible/ButtonFlexible";
import PlusIcon from "@/components/ui/icons/PlusIcon";
import classes from "./createUsersModal.module.css";
import XMarkIcon from "@/components/ui/icons/XMarkIcon";
import Link from "next/link";
import ImportExportUsersComponent from "@/components/ui/modals/creates/ImportExportUsers/ImportExportUsersComponent";
import {AllTimezones, UserConstants} from "@/utils/constants";
import {ButtonSaveSubmit} from "@/components/ui/ButtonSaveAndSubmit/ButtonSaveAndSubmit";
import {ButtonWhiteClose} from "@/components/ui/ButtonWhiteClose/ButtonWhiteClose";
import AddUser from "@/lib/controllers/users/AddUser";
import WarnCircleBigIcon from "@/components/ui/icons/WarnCircleBigIcon";

const CreateUsersModal = ({customers, users}) => {
    const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('userInfo');
    const [selectedTimezone, setSelectedTimezone]  = useState(AllTimezones[0].value);
    const [selectedCustomer, setSelectedCustomer]  = useState('');
    const [adminRoleChecked, setAdminRoleChecked] = useState(false);
    const [daystarPortalAdminRoleChecked, setDaystarPortalAdminRoleChecked] = useState(false);
    const [daystarCustomerAdminRoleChecked, setDaystarCustomerAdminRoleChecked] = useState(false);
    const [customerRoleChecked, setCustomerRoleChecked] = useState(true);
    const [userName, setUserName] = useState('');
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [ammpApiKeyy, setAmmpApiKeyy] = useState('');
    const [phone, setPhone] = useState('');
    const [isCustomAlertModalOpen, setIsCustomAlertModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const customAlertPopupRef = useRef(null);
    const newUserModalRef = useRef(null);

    useEffect(() => {
        if (isNewUserModalOpen) {
            newUserModalRef.current.showModal();
        } else {
            newUserModalRef.current.close();
        }
    }, [isNewUserModalOpen]);

    useEffect(() => {
        if (isCustomAlertModalOpen) {
            customAlertPopupRef.current.showModal();
        } else {
            customAlertPopupRef.current.close();
        }
    }, [isCustomAlertModalOpen]);

    const openNewUserModal = () => {
        setIsNewUserModalOpen(true);
        setActiveTab('userInfo'); // Set default tab to 'userInfo' when opening modal
    };

    const closeNewUserModal = () => {
        setIsNewUserModalOpen(false);
    };

    const openCustomAlertPopup = (msg) => {
        setAlertMessage(msg);
        setIsCustomAlertModalOpen(true);
    };

    const closeCustomAlertModal = () => {
        setIsCustomAlertModalOpen(false);
    };

    const handleFormSubmit = () => {
        const form = newUserModalRef.current.querySelector('form');
        if (!form) {
            console.error("Form element not found.");
            return;
        }
        const formData = new FormData(form);
        const roles = [];

        // Check if admin role checkbox is checked and add it to roles array if checked
        if (adminRoleChecked) {
            roles.push({ name: 'Admin', isAssigned: true });
        }

        // Check if customer role checkbox is checked and add it to roles array if checked
        if (customerRoleChecked) {
            roles.push({ name: 'Customer', isAssigned: true });
        }

        // Check if daystarCustomerAdmin role checkbox is checked and add it to roles array if checked
        if (daystarCustomerAdminRoleChecked) {
            roles.push({ name: 'Daystar Customer Admin', isAssigned: true });
        }

        // Check if daystarPortalAdmin role checkbox is checked and add it to roles array if checked
        if (daystarPortalAdminRoleChecked) {
            roles.push({ name: 'Daystar Portal Admin', isAssigned: true });
        }

        // Append roles data to formData
        formData.append('roles', JSON.stringify(roles));

        // Check if username is already taken
        if (isUsernameTaken(formData.get('UserName'))) {
            openCustomAlertPopup('Username is already taken');
            return;
        }

        // Check if email is already taken
        if (formData.get('Email') && isEmailTaken(formData.get('Email'))) {
            openCustomAlertPopup('Email is already taken');
            return;
        }

        // Validate individual fields
        if (formData.get('UserName').length < UserConstants.NameMinLength ||
            formData.get('UserName').length > UserConstants.NameMaxLength) {
            // Handle invalid userName length
            openCustomAlertPopup('Invalid userName length');
            return;
        }
        // Validate individual fields
        if (formData.get('Name').length < UserConstants.NameMinLength ||
            formData.get('Name').length > UserConstants.NameMaxLength) {
            // Handle invalid Name length
            openCustomAlertPopup('Invalid Name length');
            return;
        }

        if (formData.get('Email') && !validateEmail(formData.get('Email'))) {
            // Handle invalid email format
            openCustomAlertPopup('Invalid email format');
            return;
        }

        // Pass formData to AddUser function
        AddUser(formData)
            .then((response) => {
                console.log(response);
                closeNewUserModal();
            })
            .catch((error) => {
                console.error('Error adding user:', error);
            });

        closeNewUserModal();
        setTimeout(() => {
            // Clear input fields and reset select menus
            setUserName('');
            setSurname('');
            setName('');
            setEmail('');
            setSelectedTimezone('');
            setAmmpApiKeyy('');
            setSelectedCustomer('');
            setSelectedTimezone(AllTimezones[0]);
            setPhone('');
            setAdminRoleChecked(false);
            setDaystarPortalAdminRoleChecked(false);
            setDaystarCustomerAdminRoleChecked(false);
            setCustomerRoleChecked(true);
        }, 1000); // Delay clearing inputs for 1 second
    };

// Function to validate email format
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


// Function to check if username is already taken
    const isUsernameTaken = (username) => {
        // Assuming users object has global scope
        return users.some(user => user.username === username);
    };

// Function to check if email is already taken
    const isEmailTaken = (email) => {
        // Assuming users object has global scope
        return users.some(user => user.email === email);
    };
/*
    console.log('before customers')
    console.log(JSON.stringify(customers))
    console.log('after customers')
 */
    return (
        <div
            style={{
                display: "flex",
                alignItems: "flex-end"
            }}
        >
            <span
                style={{marginRight: '5px'}}> {/* Adjusted from 10px to 6.25px */}
                {/* Use the ImportExportUsersComponent component */}
                <ImportExportUsersComponent
                    input={
                        {
                            name: 'Import',
                            menuItems: [
                                ['File', 'openImportModal'],
                            ],
                            allCustomersObj: customers,
                            allUsersObj: users,
                        }
                    }
                />
            </span>
            <span
                style={{
                    marginLeft: '5px',
                }}
            >
                {/* Use the ImportExportUsersComponent component */}
                <ImportExportUsersComponent
                    input={
                        {
                            name: 'Export',
                            menuItems: [
                                ['To CSV', 'openExportModal'],
                            ],
                            allCustomersObj: customers,
                            allUsersObj: users,
                        }
                    }
                />
            </span>
            <span
                style={{
                    marginLeft: '10px',
                }}
            >
                <ButtonFlexible
                    className="btn"
                    onClick={openNewUserModal}
                    width={100}
                    height={35}
                    link="#"
                >
                    <small> New User</small>  <small> <PlusIcon/></small>
                </ButtonFlexible>
            </span>

            {/* DaisyUI Modals */}
            {/*new user dialogue*/}
            <dialog
                id="new_user_modal"
                className="modal"
                ref={newUserModalRef}
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                }}
            >
                <div className="modal-box" style={{background: '#0D202F', borderColor: '#0D202F'}}>
                    <div className={classes.popUpHeader}>
                        <h2 className="font-bold text-lg">New User</h2>
                        <Link href="#" onClick={closeNewUserModal}>
                            <XMarkIcon/>
                        </Link>
                    </div>
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
                                action={AddUser}
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
                                                id="UserName"
                                                max="256"
                                                name="UserName"
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
                                                type="email"
                                                className="input input-bordered input-md w-full"
                                                id="Email"
                                                max="256"
                                                name="Email"
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
                                                name="Timezone"
                                                onChange={(e) => setSelectedTimezone(e.target.value)}
                                            >
                                                <option
                                                    selected="selected"
                                                    value="Africa/Lagos"
                                                >
                                                    Africa/Lagos
                                                </option>
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
                                                    id="AMMP_API_key"
                                                    max="255"
                                                    min="2"
                                                    name="AMMP_API_key"
                                                    style={{
                                                        backgroundColor: '#123751',
                                                        borderColor: '#23262a',
                                                    }}
                                                    value={ammpApiKeyy}
                                                    onChange={(e) => setAmmpApiKeyy(e.target.value)}
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
                                                    value={selectedCustomer}
                                                    name="SelectedCustomer"
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
                    {/*place buttons here*/}
                    <div className="modal-action">
                        <div className={classes.buttonContainer}>
                            <div
                                style={{
                                    marginRight: 5
                                }}
                            >
                                <ButtonWhiteClose
                                    onClick={closeNewUserModal}
                                />
                            </div>
                            <div
                                style={{
                                    marginLeft: 5
                                }}
                            >
                                <ButtonSaveSubmit
                                    onClick={handleFormSubmit}
                                />
                            </div>

                        </div>

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
                                                <div>
                                                    <ButtonSaveSubmit
                                                        buttonText={'Ok'}
                                                        onClick={closeCustomAlertModal}
                                                    />
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

export default CreateUsersModal;
