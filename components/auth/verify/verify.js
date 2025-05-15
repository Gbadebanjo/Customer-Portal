'use client';
import { useEffect, useRef, useState } from 'react';
import { validateCode } from "@/lib/auth/verificationActions"
import classes from '../login/login.module.css';
// import Link from "next/link";
import WarnCircleBigIcon from "@/components/ui/icons/WarnCircleBigIcon";
// import { ButtonSaveSubmit } from "@/components/ui/ButtonSaveAndSubmit/ButtonSaveAndSubmit";
import { ButtonDefault } from "@/components/ui/ButtonDefault/ButtonDefault";
import CustomTextField from '@/components/ui/CustomTextField/CustomTextInput';
import CopyRight from '@/components/ui/CopyRight/copyright';

function VerifyComponent () {
    const [code, setCode] = useState("");
    // const [isCustomAlertModalOpen, setIsCustomAlertModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const customAlertPopupRef = useRef(null);

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

   const handleVerify = (e) => {
        e.preventDefault();

        if ( !code || code.length < 6 ) {
            openCustomAlertPopup('Invalid code');
            return;
        }
    }


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
                                <div className={classes.instructionText}>A verification code has been sent to <span>youremail.gmail.com</span>. Enter the code to continue </div>
                            </div>
                            <form action={login} ref={loginRef} className={classes.loginForm}>
                                <CustomTextField
                                    label="Code"
                                    value={code}
                                    name="code"
                                    onChange={(e) => setEmail(e.target.value)}
                                />

                            </form>

                            <ButtonDefault
                                className="btn"
                                buttonText={'Submit'}
                                type="submit"
                                onClick={handlePreLogin}
                            />
                            <div className={classes.forgotPassword}>
                                <Link href={'/forgot-password'}>Resend Code</Link>
                            </div>
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
}

export default VerifyComponent;
