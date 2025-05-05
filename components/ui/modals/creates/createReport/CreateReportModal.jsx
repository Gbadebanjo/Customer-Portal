'use client'
import React, { useEffect, useRef, useState } from 'react';
import ButtonFlexible from "@/components/ui/button-flexible/ButtonFlexible";
import PlusIcon from "@/components/ui/icons/PlusIcon";
import classes from "./createReportModal.module.css";
import XMarkIcon from "@/components/ui/icons/XMarkIcon";
import Link from "next/link";
import AddReport from "@/lib/controllers/report/AddReport";
import {ButtonWhiteClose} from "@/components/ui/ButtonWhiteClose/ButtonWhiteClose";
import {ButtonSaveSubmit} from "@/components/ui/ButtonSaveAndSubmit/ButtonSaveAndSubmit";
import WarnCircleBigIcon from "@/components/ui/icons/WarnCircleBigIcon";
import {CustomerConstants, ReportConstants} from "@/utils/constants";

const CreateReportModal = () => {
    const [isCreateReportModalOpen, setIsCreateReportModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [file, setFile] = useState(null); // assuming file is a state
    const [isCustomAlertModalOpen, setIsCustomAlertModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const customAlertPopupRef = useRef(null);

    const createReportModalRef = useRef(null);

    useEffect(() => {
        if (isCreateReportModalOpen) {
            createReportModalRef.current.showModal();
        } else {
            createReportModalRef.current.close();
        }
    }, [isCreateReportModalOpen]);


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

    const openCreateReportModal = () => {
        setIsCreateReportModalOpen(true);
    };

    const closeCreateReportModal = () => {
        setIsCreateReportModalOpen(false);
    };

    const handleSaveSubmit = () => {
        const form = createReportModalRef.current.querySelector('form');
        const formData = new FormData(form);

        // Validate individual fields
        if (formData.get('name').length < ReportConstants.NameMinLength ||
            formData.get('name').length > ReportConstants.NameMaxLength) {
            // Handle invalid userName length
            openCustomAlertPopup('Invalid  name length');
            return null;
        }


        // Clear input fields
        closeCreateReportModal();

        // Invoke closeCreateReportModal after clearing fields
        setTimeout(() => {
            setName('');
            setFile(null);
            // Reset select menus if applicable
        }, 1000); // Delay closing modal for 1 second
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
                onClick={openCreateReportModal}
                width={150}
                height={35}
                style={{
                    marginRight: 0,
                }}
                link="#"
            >
                <PlusIcon/> <small>Upload Report</small>
            </ButtonFlexible>

            <dialog
                id="import_modal"
                className="modal"
                ref={createReportModalRef}
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
                        <h2 className="font-bold text-lg"> Upload Report </h2>
                        <Link
                            href={"#"}
                            onClick={closeCreateReportModal}
                        >
                            <XMarkIcon/>
                        </Link>
                    </div>
                    <div className="py-4">
                        <form
                            encType="multipart/form-data"
                            method="dialog"
                            action={AddReport}
                        >
                            <div aria-labelledby="create-reporter-modal-tabs_0-tab"
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
                                            <span className="label-text">Name *</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="input input-bordered input-md w-full"
                                            id="name"
                                            max="name"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            style={{
                                                backgroundColor: '#123751',
                                                borderColor: '#23262a',
                                            }}
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
                                            <span className="label-text">File *</span>
                                        </div>
                                        <input
                                            type="file"
                                            name="file"
                                            id="file"
                                            className="file-input file-input-bordered w-full"
                                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                            onChange={(e) => setFile(e.target.files[0])}
                                        />
                                    </label>
                                    <label
                                        className="form-control w-full"
                                        style={{
                                            marginBottom: '20px',
                                            maxWidth: '133%'
                                        }}
                                    >
                                        Supported file formats are xlsx and CSV
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
                                            <ButtonWhiteClose onClick={closeCreateReportModal}/>
                                        </div>
                                        <div
                                            style={{
                                                marginLeft: 5
                                            }}
                                        >
                                            <ButtonSaveSubmit onClick={handleSaveSubmit}/>
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
                                            <div>
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

export default CreateReportModal;

