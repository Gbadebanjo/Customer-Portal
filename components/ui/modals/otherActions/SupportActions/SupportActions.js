'use client'
import React, { useEffect, useRef, useState } from 'react';
import styles from './supportActions.module.css';
import ButtonFlexible from '@/components/ui/button-flexible/ButtonFlexible';
import Link from 'next/link';
import classes from "./supportActions.module.css";
import XMarkIcon from "@/components/ui/icons/XMarkIcon";
import { ButtonWhiteClose } from "@/components/ui/ButtonWhiteClose/ButtonWhiteClose";
import SettingsSmallIcon from "@/components/ui/icons/SettingsSmallIcon";
import ChevronDownSmallIcon from "@/components/ui/icons/ChevronDownSmallIcon";
import WarnCircleBigIcon from "@/components/ui/icons/WarnCircleBigIcon";
import deleteSupportQueryById from "@/lib/controllers/supportQuery/deleteSupportQueryById";
import updateSupportQueryById from "@/lib/controllers/supportQuery/updateSupportQueryById";
import getSupportQueryById from "@/lib/controllers/supportQuery/getSupportQueryById";
import { normalizeString } from "@/utils/constants";
import { v4 as uuidv4 } from "uuid";
import ResolveSupportQueryById from "@/lib/controllers/supportQuery/ResolveSupportQueryById";
import {ButtonSaveSubmit} from "@/components/ui/ButtonSaveAndSubmit/ButtonSaveAndSubmit";

const SupportActions = ({ menuItems, supportQueryCategories }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef(null);

    const editPopupRef = useRef(null);
    const detailsPopupRef = useRef(null);
    const customAlertPopupRef = useRef(null);

    const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCustomAlertModalOpen, setIsCustomAlertModalOpen] = useState(false);

    const [alertMessage, setAlertMessage] = useState('');
    const [supportQueryIdToResolve, setSupportQueryIdToResolve] = useState('');
    const [supportQueryIdToDelete, setSupportQueryIdToDelete] = useState('');
    const [file, setFile] = useState(null);
    const [statId, setStatId] = useState(null);
    const [existingSupportQueryObject, setExistingSupportQueryObject] = useState(null);
    const [selectedSupportCategory, setSelectedSupportCategory] = useState(""); // State to hold the selected category
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const selectDialogue = (itemElement, id) => {
        if (itemElement === 'resolveModal') {
            resolveQuery(id);
        }
/*        else if (itemElement === 'detailsModal') {
            openDetailsModal(id);
        }*/
        else if (itemElement === 'deleteModal') {
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
        if (isResolveModalOpen) {
            editPopupRef.current.showModal();
        } else {
            editPopupRef.current.close();
        }
    }, [isResolveModalOpen]);

    useEffect(() => {
        if (isDeleteModalOpen) {
            detailsPopupRef.current.showModal();
        } else {
            detailsPopupRef.current.close();
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

    async function resolveQuery(query_id) {
        try {
            await ResolveSupportQueryById(query_id);
            openCustomAlertPopup("Support query resolved successfully");
        } catch (error) {
            alert('An error occurred while resolving the support query.');
        }
    }

    /*  const openDetailsModal = async (id) => {
         // setIsResolveModalOpen(true);
         setSupportQueryIdToResolve(id);
         redirect(`/support/details/${id}`)
      /* const { supportQuery } = await getSupportQueryById(id);
        if (supportQuery) {
             const { title, description, support_query_messages, status_id } = supportQuery;
             setTitle(title);
             setDescription(description);
             setSelectedSupportCategory(support_query_messages);
             setStatId(status_id);
             setExistingSupportQueryObject(supportQuery);
         } else {
             alert('<<<<<>>>>> NO supportQuery');
         }
    };
*/
    const closeResolveModal = () => {
        setIsResolveModalOpen(false);
        setIsOpen(false);
    };

    const openDeleteModal = async (id) => {
        setIsDeleteModalOpen(true);
        setSupportQueryIdToDelete(id);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setIsOpen(false);
    };

    const closeCustomAlertModal = () => {
        setIsCustomAlertModalOpen(false);
        setIsOpen(false);
    };

    const deleteSupportQuery = async () => {
        try {
            openCustomAlertPopup("SupportQuery deleted successfully");
            await deleteSupportQueryById(supportQueryIdToDelete);
            setIsDeleteModalOpen(false);
            setIsOpen(false);
        } catch (error) {
            alert('An error occurred while deleting the supportQuery.');
            setIsDeleteModalOpen(false);
            setIsOpen(false);
        }
    };

    const updateSupportQuery = async () => {
        try {
            const supportQueryData = {
                title: title.toUpperCase(),
                description: description,
                category_id: selectedSupportCategory.toUpperCase(),
                status_id: statId,
                support_query_messages: [
                    {
                        client: description,
                    }
                ],
                user_id: uuidv4(),
            };
            await updateSupportQueryById(supportQueryIdToResolve, supportQueryData);
            setIsResolveModalOpen(false);
            setIsOpen(false);
            setTitle('');
            setDescription('');
            setSelectedSupportCategory('');
            setStatId('');
            openCustomAlertPopup("SupportQuery updated successfully");
        } catch (error) {
            alert('An error occurred while updating the supportQuery.');
            setIsResolveModalOpen(false);
            setIsOpen(false);
        }
    };

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
                <SettingsSmallIcon /> &nbsp; <small>Actions</small> <ChevronDownSmallIcon />
            </ButtonFlexible>
            {isOpen && (
                <ul className={styles.dropdownMenu}>
                    {menuItems.map((item, index) => (
                        <li key={index} className={styles.dropdownItem}>
                            {item[2] === 'dialogue' ? (
                                <Link
                                    href={'#'}
                                    className={styles.dropdownLink}
                                    onClick={() => selectDialogue(item[1], item[3])}
                                >
                                    {item[0]}
                                </Link>
                            ) : (
                                <Link href={item[1]} className={styles.dropdownLink}>
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
                <div className="modal-box" style={{ background: '#0D202F', borderColor: '#0D202F' }}>
                    <div className={styles.popUpHeader}>
                        <h2 className="font-bold text-lg">Update</h2>
                        <Link href={"#"} onClick={closeResolveModal}><XMarkIcon /></Link>
                    </div>
                    <div className="py-4">
                        <form method="dialog">
                            <div aria-labelledby="create-user-modal-tabs_0-tab" id="import-user-modal-tabs_0"
                                 role="tabpanel">
                                <div>
                                    <label className="form-control w-full"
                                           style={{ marginBottom: '20px', maxWidth: '133%' }}>
                                        <div>
                                            <span className="label-text">Category</span>
                                        </div>
                                        <select
                                            className="select select-bordered w-full"
                                            name="supportCategory"
                                            value={selectedSupportCategory}
                                            onChange={(e) => setSelectedSupportCategory(e.target.value)}
                                        >
                                            <option disabled value="">Select a category</option>
                                            {supportQueryCategories.map(category => (
                                                <option key={category.id}
                                                        value={category.id}>{normalizeString(category.name)}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <label className="form-control w-full"
                                           style={{ marginBottom: '20px', maxWidth: '133%' }}>
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
                                            onChange={(e) => setTitle(e.target.value)}
                                            style={{ backgroundColor: '#123751', borderColor: '#23262a' }}
                                        />
                                    </label>
                                    <label className="form-control w-full"
                                           style={{ marginBottom: '20px', maxWidth: '133%' }}>
                                        <div className="label">
                                            <span className="label-text">Description</span>
                                        </div>
                                        <textarea
                                            className="textarea textarea-bordered w-full"
                                            id="description"
                                            name="description"
                                            value={description}
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
                                        <div style={{ marginRight: 5 }}>
                                            <ButtonWhiteClose onClick={closeResolveModal} />
                                        </div>
                                        <div style={{ marginLeft: 5 }}>
                                            <ButtonSaveSubmit onClick={updateSupportQuery} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog
                id="export_modal"
                className="modal"
                ref={detailsPopupRef}
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                }}
            >
                <div className="modal-box" style={{ background: '#0D202F', borderColor: '#0D202F' }}>
                    <div className={classes.popUpHeader}></div>
                    <div className="py-4">
                        <form method="dialog">
                            <div aria-labelledby="export-user-modal-tabs_0-tab" id="create-user-modal-tabs_0"
                                 role="tabpanel">
                                <div>
                                    <center>
                                        <div><WarnCircleBigIcon /></div>
                                        <div><h2 className="font-bold text-xl lg">Are you sure</h2></div>
                                        <div><p>Are you sure you want to details this record?</p></div>
                                        <div>
                                            <div className={classes.buttonContainer}>
                                                <div style={{ marginRight: 5 }}>
                                                    <ButtonWhiteClose onClick={closeDeleteModal} />
                                                </div>
                                                <div style={{ marginLeft: 5 }}>
                                                    <ButtonSaveSubmit buttonText={'Yes'} onClick={deleteSupportQuery} />
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
                <div className="modal-box" style={{ background: '#0D202F', borderColor: '#0D202F' }}>
                    <div className={classes.popUpHeader}></div>
                    <div className="py-4">
                        <form method="dialog">
                            <div aria-labelledby="export-user-modal-tabs_0-tab" id="create-user-modal-tabs_0"
                                 role="tabpanel">
                                <div>
                                    <center>
                                        <div><WarnCircleBigIcon /></div>
                                        <div><h2 className="font-bold text-xl lg">{alertMessage}</h2></div>
                                        <div>
                                            <div className={classes.buttonContainer}>
                                                <div style={{ marginLeft: 5 }}>
                                                    <ButtonSaveSubmit buttonText={'Ok'} onClick={closeCustomAlertModal} />
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

export default SupportActions;
