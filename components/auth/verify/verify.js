'use client';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { validateCode } from "@/lib/auth/verificationActions"
import { redirect } from 'next/navigation';
import classes from '../login/login.module.css';
// import Link from "next/link";
import WarnCircleBigIcon from "@/components/ui/icons/WarnCircleBigIcon";
import { ButtonSaveSubmit } from "@/components/ui/ButtonSaveAndSubmit/ButtonSaveAndSubmit";
import { ButtonDefault } from "@/components/ui/ButtonDefault/ButtonDefault";
import CustomTextField from '@/components/ui/CustomTextField/CustomTextInput';
import CopyRight from '@/components/ui/CopyRight/copyright';

function VerifyComponent() {
    const [code, setCode] = useState("");
    // const [isCustomAlertModalOpen, setIsCustomAlertModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const customAlertPopupRef = useRef(null);
    const searchParams = useSearchParams();
    const userId = searchParams.get('id')
    const email = searchParams.get('email');

    if (!email) {
        redirect('/login');
    }

    useEffect(() => {
        if (isModalOpen) {
            customAlertPopupRef.current.showModal();
        } else {
            customAlertPopupRef.current.close();
        }
    }, [isModalOpen]);

    const openCustomAlertPopup = (msg) => {
        setAlertMessage(msg);
        setModalOpen(true);
    };

    const closeCustomAlertModal = () => {
        setModalOpen(false);
    };

    //    const handleVerify = (e) => {
    //         e.preventDefault();

    //         if ( !code || code.length !== 6 ) {
    //             openCustomAlertPopup('Please enter a valid 6-digit code.');
    //             return;
    //         }

    //         setIsSubmitting(true);
    //         const result = await validateCode(userId, code);
    //         setIsSubmitting(false);
    //     }


    const handleVerify = async (e) => {
        e.preventDefault();

        if (!code || code.length !== 6) {
            openCustomAlertPopup("Please enter a valid code.");
            return;
        }

        setIsSubmitting(true);
        const result = await validateCode(userId, code);
        setIsSubmitting(false);

        if (!result.success) {
            openCustomAlertPopup(result.message || "Verification failed.");
        } else {
            // Optional: redirect or update UI
            setTimeout(() => redirect('/dashboard'), 1500); 
            openCustomAlertPopup("Code verified successfully!");
        }
    };




    return (
        <div className={classes.loginPage}>
            <div className={classes.flexContainer}>
                <div className={classes.leftPart}></div>
                <div className={classes.rightPart}>
                    <div className={classes.rightContainer} >
                        <div className={classes.rightPartForm}>
                            <div className={classes.dayStarLogo}></div>
                            <div className={classes.loginTextContainer}>
                                <div className={classes.loginText}>Verify Password</div>
                                <div className={classes.instructionText}>A verification code has been sent to <span className={classes.instructionBoldText}>{email}</span>. Enter the code to continue. </div>
                            </div>
                            <form onSubmit={handleVerify} className={classes.loginForm}>
                                <CustomTextField
                                    label="Verification Code"
                                    value={code}
                                    name="code"
                                    onChange={(e) => setCode(e.target.value)}
                                    inputMode="numeric"
                                    maxLength={6}
                                />
                                <ButtonDefault
                                    // className="btn"
                                    buttonText={'Submit'}
                                    type="submit"
                                    loading={isSubmitting}
                                />
                            </form>
                            <div className={classes.forgotPassword}>
                                {/* <button type="button" onClick={handleResendCode}>Resend Code</button>                            </div> */}
                            </div>
                            <CopyRight />
                        </div>
                    </div>
                </div>

                <dialog
                    id="custom_modal"
                    className="modal"
                    ref={customAlertPopupRef}
                    style={{
                        display: "flex",
                        alignItems: "center",
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
        </div>
    );
}

export default VerifyComponent;
