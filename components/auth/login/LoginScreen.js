'use client';
import { useEffect, useRef, useState, useTransition } from 'react'; // Import useState hook
import classes from './login.module.css';
import Link from "next/link";
import { login } from "@/lib/auth/authActions";
import { CustomerConstants } from "@/utils/constants";
import WarnCircleBigIcon from "@/components/ui/icons/WarnCircleBigIcon";
import { ButtonSaveSubmit } from "@/components/ui/ButtonSaveAndSubmit/ButtonSaveAndSubmit";
import { ButtonDefault } from "@/components/ui/ButtonDefault/ButtonDefault";
import CustomTextField from '@/components/ui/CustomTextField/CustomTextInput';
import CopyRight from '@/components/ui/CopyRight/copyright';

function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPending, startTransition] = useTransition();
    const [isCustomAlertModalOpen, setIsCustomAlertModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const loginRef = useRef(null);
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

    const handleLogin = (e) => {
        e.preventDefault();

        if (
            email.length < CustomerConstants.CompanyNameMinLength ||
            email.length > CustomerConstants.CompanyNameMaxLength ||
            password.length < CustomerConstants.CompanyNameMinLength ||
            password.length > CustomerConstants.CompanyNameMaxLength
        ) {
            openCustomAlertPopup('Invalid credentials');
            return;
        }

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        startTransition(async () => {
            const result = await login(formData);
            if (result?.errors) {
                const errorMessage = result.errors.email || result.errors.password || "Login failed.";
                openCustomAlertPopup(errorMessage);
            }
            // On success, redirect is handled on the server side.
        });
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
                                <div className={classes.loginText}>Login</div>
                                <div className={classes.instructionText}>Enter your e-mail address and password</div>
                            </div>
                            <form onSubmit={handleLogin} className={classes.loginForm}>
                                <CustomTextField
                                    label="Email Address"
                                    value={email}
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <CustomTextField
                                    label="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    isPassword={true}
                                    name="password"
                                />
                                <ButtonDefault
                                    className="btn"
                                    buttonText={'Login'}
                                    type="submit"
                                    loading={isPending}
                                />
                            </form>
                            <div className={classes.forgotPassword}>
                                <Link href={'/forgot-password'}>Forgot Password?</Link>
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
    );
}

export default LoginScreen;
