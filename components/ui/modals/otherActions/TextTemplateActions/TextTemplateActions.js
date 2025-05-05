'use client'
import React, {useEffect, useRef, useState} from 'react';
import ButtonFlexible from "@/components/ui/button-flexible/ButtonFlexible";
import classes from "./textTemplate.module.css";
import Link from "next/link";
import XMarkIcon from "@/components/ui/icons/XMarkIcon";
import {ButtonWhiteClose} from "@/components/ui/ButtonWhiteClose/ButtonWhiteClose";
import {ButtonSaveSubmit} from "@/components/ui/ButtonSaveAndSubmit/ButtonSaveAndSubmit";
import getTextTemplateById from "@/lib/controllers/textTemplates/getTextTemplateById";
import updateTextTemplateById from "@/lib/controllers/textTemplates/updateTextTemplateById";

const TextTemplateActions = ({id}) => {
    const editPopupRef = useRef(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [textTemplateIdToEdit, setTextTemplateIdToEdit] = useState('');
    const [content, setContent] = useState('');
    const [isCustomAlertModalOpen, setIsCustomAlertModalOpen] = useState(false);
    const [existingTextTemplateObject, setExistingTextTemplateObject] = useState(null);

    const [name, setName] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        if (isEditModalOpen) {
            editPopupRef.current.showModal();
        } else {
            editPopupRef.current.close();
        }
    }, [isEditModalOpen, id]);

    const openEditModal = async (id) => {

        setIsEditModalOpen(true);
        setTextTemplateIdToEdit(id)
        const { textTemplate } = await getTextTemplateById(id);
        // alert(JSON.format(textTemplate));
        if (textTemplate) {
            const { display_name, content } = textTemplate;
            setName(display_name);
            setContent(JSON.stringify(content));
            setExistingTextTemplateObject(textTemplate)
        } else {
            alert('<<<<<>>>>> NO textTemplate');
        }
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

const updateTextTemplate = async () => {
        try {
            const textTemplateData = {
                // company_name: name,
                // logo_content_name: content ? content.name : '',
                // users: [
                //     {
                //         users: 'logged_in_user',
                //     }
                // ],
            }
            await updateTextTemplateById(textTemplateIdToEdit, textTemplateData);
            setIsEditModalOpen(false);
            setName('');
            setContent('');
            openCustomAlertPopup("TextTemplate updated successfully")
        } catch (error) {
            alert('An error occurred while updating the textTemplate.');
            setIsEditModalOpen(false);
        }
    };

    const openCustomAlertPopup = (msg) => {
        setAlertMessage(msg);
        setIsCustomAlertModalOpen(true);
    };

    return (
        <div>
            <ButtonFlexible
                link="#"
                height={30}
                width={100}
                onClick={() => openEditModal(id)}
            >
                <small><b>Edit Content</b></small>
            </ButtonFlexible>

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
                        <form method="dialog">
                            <div aria-labelledby="create-user-modal-tabs_0-tab" id="import-user-modal-tabs_0"
                                 role="tabpanel">
                                <div>
                                    <label className="form-control w-full"
                                           style={{marginBottom: '20px', maxWidth: '133%'}}>
                                        <div className="label">
                                            <span className="label-text">TextTemplate Name</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="input input-bordered input-md w-full"
                                            id="name"
                                            max="16"
                                            name="name"
                                            value={name}
                                            style={{backgroundColor: '#123751', borderColor: '#23262a'}}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </label>
                                    <label className="form-control w-full"
                                           style={{marginBottom: '20px', maxWidth: '133%'}}>
                                        <div>
                                            <span className="label-text">Content</span>
                                        </div>
                                        <textarea
                                            style={{
                                                maxWidth: '133%',
                                                height: '200px'
                                        }}
                                            name="content"
                                            id="content"
                                            value={content}
                                            className="textarea textarea-bordered textarea-sm w-full max-w-xs"
                                            onChange={(e) => setContent(e.target.value)}                                        />
                                    </label>
                                </div>

                                <div className="modal-action">
                                    <div className={classes.buttonContainer}>
                                        <div style={{marginRight: 5}}>
                                            <ButtonWhiteClose
                                                onClick={closeEditModal}
                                            />
                                        </div>
                                        <div style={{marginLeft: 5}}>
                                            <ButtonSaveSubmit
                                                onClick={updateTextTemplate}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default TextTemplateActions;