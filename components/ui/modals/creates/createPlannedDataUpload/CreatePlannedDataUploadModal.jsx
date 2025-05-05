'use client';
import React, { useEffect, useRef, useState } from 'react';
import ButtonFlexible from '@/components/ui/button-flexible/ButtonFlexible';
import PlusIcon from '@/components/ui/icons/PlusIcon';
import classes from './createPlannedDataUploadModal.module.css';
import XMarkIcon from '@/components/ui/icons/XMarkIcon';
import Link from 'next/link';
import { ButtonSaveSubmit } from '@/components/ui/ButtonSaveAndSubmit/ButtonSaveAndSubmit';
import { ButtonWhiteClose } from '@/components/ui/ButtonWhiteClose/ButtonWhiteClose';
import AddPowerProductionPlan from '@/lib/controllers/powerProductionPlan/AddPowerProductionPlan';
import WarnCircleBigIcon from "@/components/ui/icons/WarnCircleBigIcon";
import {
    CustomerConstants as PlannedDataConstants,
    CustomerConstants,
    PowerProductionPlanConstants
} from "@/utils/constants";

const CreatePlannedDataUploadModal = () => {
    const [isCreatePlannedUploadModalOpen, setIsCreatePlannedUploadModalOpen] = useState(false);
    const [fileName, setFileName] = useState('');
    const [note, setNote] = useState('');
    const [isCustomAlertModalOpen, setIsCustomAlertModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const customAlertPopupRef = useRef(null);

    const createPlannedUploadModalRef = useRef(null);

    useEffect(() => {
        if (isCreatePlannedUploadModalOpen) {
            createPlannedUploadModalRef.current.showModal();
        } else {
            createPlannedUploadModalRef.current.close();
        }
    }, [isCreatePlannedUploadModalOpen]);


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

    const openCreatePlannedUploadModal = () => {
        setIsCreatePlannedUploadModalOpen(true);
    };

    const closeCreatePlannedUploadModal = () => {
        setIsCreatePlannedUploadModalOpen(false);
    };

    const handleSubmit = () => {
        // Invoke closeCreatePlannedUploadModal
        const form = createPlannedUploadModalRef.current.querySelector('form');
        const formData = new FormData(form);

        // Validate individual fields
        if (formData.get('fileName').length < PowerProductionPlanConstants.FileNameMinLength ||
            formData.get('fileName').length > PowerProductionPlanConstants.FileNameMaxLength) {
            // Handle invalid userName length
            openCustomAlertPopup('Invalid file name length');
            return null;
        }


        closeCreatePlannedUploadModal();
        setTimeout(() => {
            // // Clear input fields and reset select menus
            setFileName('');
            setNote('');
        }, 2000); // Delay clearing inputs for 1 second
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'flex-end',
            }}
        >
            <ButtonFlexible
                className="btn"
                onClick={openCreatePlannedUploadModal}
                width={300}
                height={35}
                style={{
                    marginRight: 0,
                }}
                link="#"
            >
                <PlusIcon/> <small>Upload Planned Production File</small>
            </ButtonFlexible>
            {/* DaisyUI Modals */}

            <dialog
                id="import_modal"
                className="modal"
                ref={createPlannedUploadModalRef}
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
                        borderColor: '#0D202F',
                    }}
                >
                    <div className={classes.popUpHeader}>
                        <h2 className="font-bold text-lg">Upload Planned Production File</h2>
                        <Link href="#" onClick={closeCreatePlannedUploadModal}>
                            <XMarkIcon/>
                        </Link>
                    </div>
                    <div className="py-4">
                        <form
                            encType="multipart/form-data"
                            method="dialog"
                            action={AddPowerProductionPlan}
                        >
                            <div aria-labelledby="create-plannedUploader-modal-tabs_0-tab" id="create-user-modal-tabs_0"
                                 role="tabpanel">
                                <div>
                                    <label
                                        className="form-control w-full"
                                        style={{
                                            marginBottom: '20px',
                                            maxWidth: '133%',
                                        }}
                                    >
                                        <div className="label">
                                            <span className="label-text">File Name *</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="input input-bordered input-md w-full"
                                            id="fileName"
                                            name="fileName"
                                            value={fileName}
                                            onChange={(e) => setFileName(e.target.value)}
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
                                            maxWidth: '133%',
                                        }}
                                    >
                                        <div className="label">
                                            <span className="label-text">Note</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="input input-bordered input-md w-full"
                                            id="note"
                                            value={note}
                                            name="note"
                                            onChange={(e) => setNote(e.target.value)}
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
                                            maxWidth: '133%',
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
                                        />
                                    </label>
                                </div>
                                {/* place buttons here */}
                                <div className="modal-action">
                                    <div className={classes.buttonContainer}>
                                        <div style={{marginRight: 5}}>
                                            <ButtonWhiteClose onClick={closeCreatePlannedUploadModal}/>
                                        </div>
                                        <div style={{marginLeft: 5}}>
                                            <ButtonSaveSubmit onClick={handleSubmit}/>
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

export default CreatePlannedDataUploadModal;