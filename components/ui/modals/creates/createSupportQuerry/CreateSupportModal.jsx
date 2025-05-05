'use client'
import React, { useEffect, useRef, useState } from 'react';
import ButtonFlexible from "@/components/ui/button-flexible/ButtonFlexible";
import PlusIcon from "@/components/ui/icons/PlusIcon";
import classes from "./createSupportModal.module.css";
import XMarkIcon from "@/components/ui/icons/XMarkIcon";
import Link from "next/link";
import {
    normalizeString,
    SupportQueryConstants
} from "@/utils/constants";
import {ButtonSaveSubmit} from "@/components/ui/ButtonSaveAndSubmit/ButtonSaveAndSubmit";
import {ButtonWhiteClose} from "@/components/ui/ButtonWhiteClose/ButtonWhiteClose";
import AddSupportQuery from "@/lib/controllers/supportQuery/AddSupportQuery";
import WarnCircleBigIcon from "@/components/ui/icons/WarnCircleBigIcon";

const CreateSupportModal = ({ supportQueryCategories }) => {
    const [isCreateSupportModalOpen, setIsCreateSupportModalOpen] = useState(false);
    const [selectedSupportCategory, setSelectedSupportCategory] = useState(""); // State to hold the selected category
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isCustomAlertModalOpen, setIsCustomAlertModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const customAlertPopupRef = useRef(null);
    const createSupportModalRef = useRef(null);

    useEffect(() => {
        if (isCreateSupportModalOpen) {
            createSupportModalRef.current.showModal();
        } else {
            createSupportModalRef.current.close();
        }
    }, [isCreateSupportModalOpen]);


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

    const openCreateSupportModal = () => {
        setIsCreateSupportModalOpen(true);
    };

    const closeCreateSupportModal = () => {
        setIsCreateSupportModalOpen(false);
    };

    const handleSubmit = () => {
        // Invoke closeCreateSupportModal after clearing inputs
        const form = createSupportModalRef.current.querySelector('form');
        const formData = new FormData(form);

        // Validate individual fields
        if (formData.get('title').length < SupportQueryConstants.TitleMinLength ||
            formData.get('title').length > SupportQueryConstants.TitleMaxLength) {
            // Handle invalid userName length
            openCustomAlertPopup('Invalid title length');
            return null;
        }

        if (formData.get('description').length < SupportQueryConstants.DescriptionMinLength ||
            formData.get('description').length > SupportQueryConstants.DescriptionMaxLength) {
            // Handle invalid userName length
            openCustomAlertPopup('Invalid description length');
            return null;
        }


        closeCreateSupportModal();
        setTimeout(() => {
            // Clear input fields and reset select menus
            setSelectedSupportCategory("");
            setTitle("");
            setDescription("");
        }, 1000); // Delay clearing inputs for 1 second
    };

    return (
        <div style={{display: "flex", alignItems: "flex-end"}}>
            <ButtonFlexible
                className="btn"
                onClick={openCreateSupportModal}
                width={190}
                height={35}
                style={{marginRight: 0}}
                link="#"
            >
                <PlusIcon/> <small>New Support Query</small>
            </ButtonFlexible>

            <dialog
                id="import_modal"
                className="modal"
                ref={createSupportModalRef}
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                }}
            >
                <div className="modal-box" style={{background: '#0D202F', borderColor: '#0D202F'}}>
                    <div className={classes.popUpHeader}>
                        <h2 className="font-bold text-lg">New Support Query</h2>
                        <Link href={"#"} onClick={closeCreateSupportModal}>
                            <XMarkIcon/>
                        </Link>
                    </div>
                    <div className="py-4">
                        <form method="dialog" action={AddSupportQuery}>
                            <div aria-labelledby="create-customerer-modal-tabs_0-tab" id="create-user-modal-tabs_0"
                                 role="tabpanel">
                                <div>
                                    <label className="form-control w-full"
                                           style={{marginBottom: '20px', maxWidth: '133%'}}>
                                        <div>
                                            <span className="label-text">Category</span>
                                        </div>
                                        <select
                                            className="select select-bordered w-full"
                                            name="supportCategory"
                                            value={selectedSupportCategory}
                                            onChange={(e) => setSelectedSupportCategory(e.target.value)}
                                            required
                                        >
                                            <option disabled value="">Select a category</option>
                                            {supportQueryCategories.map(category => (
                                                <option key={category.id}
                                                        value={category.id}>{normalizeString(category.name)}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="form-control w-full"
                                           style={{marginBottom: '20px', maxWidth: '133%'}}>
                                        <div className="label">
                                            <span className="label-text">Title</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="input input-bordered input-md w-full"
                                            id="title"
                                            max="16"
                                            name="title"
                                            value={title}
                                            required
                                            onChange={(e) => setTitle(e.target.value)}
                                            style={{backgroundColor: '#123751', borderColor: '#23262a'}}
                                        />
                                    </label>
                                    <label className="form-control w-full"
                                           style={{
                                               marginBottom: '20px',
                                               maxWidth: '133%'
                                    }}>
                                        <div className="label">
                                            <span className="label-text">Description</span>
                                        </div>
                                        <textarea
                                            className="textarea textarea-bordered w-full"
                                            id="description"
                                            name="description"
                                            value={description}
                                            required
                                            onChange={(e) => setDescription(e.target.value)}
                                            style={{
                                                backgroundColor: '#123751',
                                                borderColor: '#23262a'
                                            }}
                                        />
                                    </label>
                                </div>
                                <div className="modal-action">
                                    <div className={classes.buttonContainer}>
                                        <div style={{marginRight: 5}}>
                                            <ButtonWhiteClose onClick={closeCreateSupportModal}/>
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

export default CreateSupportModal;