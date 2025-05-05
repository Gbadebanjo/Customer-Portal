'use client';
import React, { useEffect, useRef, useState } from 'react';
import ButtonFlexible from "@/components/ui/button-flexible/ButtonFlexible";
import PlusIcon from "@/components/ui/icons/PlusIcon";
import classes from "./createCustomerModal.module.css";
import XMarkIcon from "@/components/ui/icons/XMarkIcon";
import Link from "next/link";
import AddCustomer from "@/lib/controllers/customers/AddCustomer";
import { ButtonSaveSubmit } from "@/components/ui/ButtonSaveAndSubmit/ButtonSaveAndSubmit";
import { ButtonWhiteClose } from "@/components/ui/ButtonWhiteClose/ButtonWhiteClose";
import {CustomerConstants, UserConstants} from "@/utils/constants";
import WarnCircleBigIcon from "@/components/ui/icons/WarnCircleBigIcon";


const CreateCustomerModal = () => {
    const [isCreateCustomerModalOpen, setIsCreateCustomerModalOpen] = useState(false);
    const [isCustomAlertModalOpen, setIsCustomAlertModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const customAlertPopupRef = useRef(null);
    const createCustomerModalRef = useRef(null);
    // State for input values
    const [name, setName] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (isCreateCustomerModalOpen) {
            createCustomerModalRef.current.showModal();
        } else {
            createCustomerModalRef.current.close();
        }
    }, [isCreateCustomerModalOpen]);

    useEffect(() => {
        if (isCustomAlertModalOpen) {
            customAlertPopupRef.current.showModal();
        } else {
            customAlertPopupRef.current.close();
        }
    }, [isCustomAlertModalOpen]);



    const openCustomAlertPopup = (msg) => {
        setAlertMessage(msg);
        setIsCustomAlertModalOpen(true);
    };

    const closeCustomAlertModal = () => {
        setIsCustomAlertModalOpen(false);
    };

    const openCreateCustomerModal = () => {
        setIsCreateCustomerModalOpen(true);
    };

    const closeCreateCustomerModal = () => {
        setIsCreateCustomerModalOpen(false);
    };

    // Function to clear input values and close modal
    const handleCreateCustomer = () => {
        const form = createCustomerModalRef.current.querySelector('form');
        const formData = new FormData(form);

        // Validate individual fields
        if (formData.get('name').length < CustomerConstants.CompanyNameMinLength ||
            formData.get('name').length > CustomerConstants.CompanyNameMaxLength) {
            // Handle invalid userName length
            openCustomAlertPopup('Invalid company name length');
            return null;
        }


        closeCreateCustomerModal();
        setTimeout(() => {
            setName('');
            setFile(null);
        }, 1000); // Delay clearing inputs for 1 second
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "flex-end"
            }}
        >
            <ButtonFlexible
                className="btn"
                onClick={openCreateCustomerModal}
                width={150}
                height={35}
                style={{
                    marginRight: 0,
                }}
                link="#"
            >
                <PlusIcon/> <small>New Customer</small>
            </ButtonFlexible>
            {/* DaisyUI Modals */}

            <dialog
                id="import_modal"
                className="modal"
                ref={createCustomerModalRef}
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                }}
            >
                <div
                    className="modal-box"
                    style={{
                        background: '#0D202F',
                        borderColor: '#0D202F'
                    }}
                >
                    <div className={classes.popUpHeader}>
                        <h2 className="font-bold text-lg">New Customer</h2>
                        <Link
                            href={"#"}
                            onClick={closeCreateCustomerModal}
                        >
                            <XMarkIcon/>
                        </Link>
                    </div>
                    <div className="py-4">
                        <form
                            encType="multipart/form-data"
                            method="dialog"
                            action={AddCustomer}>
                            <div aria-labelledby="create-customerer-modal-tabs_0-tab"
                                 id="create-user-modal-tabs_0"
                                 role="tabpanel">
                                <div>
                                    <label
                                        className="form-control w-full"
                                        style={{
                                            marginBottom: '20px',
                                            maxWidth: '133%'
                                        }}
                                    >
                                        <div className="label">
                                            <span className="label-text">Customer Name</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="input input-bordered input-md w-full"
                                            id="name"
                                            max="16"
                                            name="name"
                                            style={{
                                                backgroundColor: '#123751',
                                                borderColor: '#23262a',
                                            }}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </label>
                                    <label
                                        className="form-control w-full"
                                        style={{
                                            marginBottom: '20px',
                                            maxWidth: '133%'
                                        }}
                                    >
                                        <div>
                                            <span className="label-text">File</span>
                                        </div>
                                        <input
                                            type="file"
                                            name="image"
                                            className="file-input file-input-bordered w-full"
                                            accept="image/gif, image/jpeg, image/png"
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                    </label>
                                </div>
                                {/*place buttons here*/}
                                <div className="modal-action">
                                    <div className={classes.buttonContainer}>
                                        <div
                                            style={{
                                                marginRight: 5
                                            }}
                                        >
                                            <ButtonWhiteClose onClick={closeCreateCustomerModal}/>
                                        </div>
                                        <div
                                            style={{
                                                marginLeft: 5
                                            }}
                                        >
                                            <ButtonSaveSubmit onClick={handleCreateCustomer}/>
                                        </div>

                                    </div>

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

export default CreateCustomerModal;
