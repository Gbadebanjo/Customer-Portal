'use client';
import { useEffect, useRef, useState } from 'react'; // Import useState hook
import classes from './login.module.css';
import ButtonBlue from "@/components/ui/button-blue/ButtonBlue";
import Link from "next/link";
import Button from "@/components/ui/button/Button";
import EyeSlashIcon from "@/components/ui/icons/EyeSlashIcon";
import EyeIcon from "@/components/ui/icons/EyeIcon";
import { login } from "@/lib/auth/authActions";
import { CustomerConstants } from "@/utils/constants";
import WarnCircleBigIcon from "@/components/ui/icons/WarnCircleBigIcon";
import { ButtonSaveSubmit } from "@/components/ui/ButtonSaveAndSubmit/ButtonSaveAndSubmit";
import ButtonFlexible from "@/components/ui/button-flexible/ButtonFlexible";
import { ButtonDefault } from "@/components/ui/ButtonDefault/ButtonDefault";
import { TextField, InputAdornment, IconButton } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomTextField from '@/components/ui/CustomTextField/CustomTextInput';
function LoginScreen() {
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isCustomAlertModalOpen, setIsCustomAlertModalOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const loginRef = useRef(null);
    const customAlertPopupRef = useRef(null);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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

    const handlePreLogin = (event) => {
        event.preventDefault(); // Prevent form from submitting

        const form = loginRef.current;
        const formData = new FormData(form);

        // Validate individual fields
        if (
            formData.get('email').length < CustomerConstants.CompanyNameMinLength ||
            formData.get('email').length > CustomerConstants.CompanyNameMaxLength ||
            formData.get('password').length < CustomerConstants.CompanyNameMinLength ||
            formData.get('password').length > CustomerConstants.CompanyNameMaxLength
        ) {
            // Handle invalid userName length
            openCustomAlertPopup('Invalid data');
            return null;
        }

        // If validation passes, submit the form
        form.submit();
    };

    const date = new Date();
    const thisYear = date.getFullYear();

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
                            {/* <form action={login} ref={loginRef} > */}
                            {/* <div className={classes.top1}>
                                <div className={classes.top2}>
                                    <div className={classes.top3}>
                                        <div
                                            style={{
                                                id: 'input_1',
                                                marginTop: '5px',
                                                marginLeft: '20px',
                                                marginRight: '20px'
                                            }}>
                                            <input
                                                type="email"
                                                className={classes.inputText}
                                                placeholder="Email address"
                                                max={256}
                                                name="email"
                                                id="email"
                                                style={{
                                                    marginBottom: '5px',
                                                    marginLeft: '5px'
                                                }}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            {/* <div className={classes.top4}>
                                <div className={classes.top5}>
                                    <div className={classes.top6}>
                                        <div className={classes.top7} style={{ position: 'relative' }}>
                                            <input
                                                type={showPassword ? "text" : "password"} // Use showPassword state to toggle input type
                                                className={classes.inputText}
                                                placeholder="Password"
                                                name="password"
                                                id="password"
                                                max={256}
                                                style={{
                                                    marginTop: '5px',
                                                    marginLeft: '-3px'
                                                }}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <div onClick={togglePasswordVisibility}>
                                                <ButtonBlue
                                                    className={classes.togglePasswordButton}
                                                    link={"#"}
                                                    width={50}>
                                                    {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                                                </ButtonBlue>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <TextField
                                fullWidth
                                label="Email Address"
                                variant="filled"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                margin="dense"
                                sx={{
                                    input: {
                                        backgroundColor: '#123751',
                                        color: '#E1E7ED',
                                        borderRadius: '10px',
                                        height : '30px',
                                        fontSize: '20px',
                                    },
                                    label: {
                                        color: '#E1E7ED',
                                        '&.Mui-focused': {
                                            color: '#ff7d70',
                                        },
                                    },
                                    '& .MuiFilledInput-root': {
                                        backgroundColor: '#ff7d70',
                                        color: '#000',
                                        borderRadius: '10px',
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                variant="filled"
                                value={password}
                                onChange={(e) => setEmail(e.target.value)}
                                margin="dense"
                                sx={{
                                    input: {
                                        backgroundColor: '#123751',
                                        color: '#E1E7ED',
                                        borderRadius: '10px',
                                        height : '30px',
                                        fontSize: '20px',
                                    },
                                    label: {
                                        color: '#E1E7ED',
                                        '&.Mui-focused': {
                                            color: '#ff7d70',
                                        },
                                    },
                                    '& .MuiFilledInput-root': {
                                        backgroundColor: '#ff7d70',
                                        color: '#000',
                                        borderRadius: '10px',
                                    },
                                }}
                            />

<CustomTextField
  label="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<CustomTextField
  label="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  isPassword={true}
/>


                            <ButtonDefault
                                // width={300}
                                // height={54}
                                className="btn"
                                buttonText={'Login'}
                                type="submit"
                                onClick={handlePreLogin}
                            />
                            {/* </form> */}
                            <div className={classes.forgotPassword}>
                                <Link href={'/forgot-password'}>Forgot Password?</Link>
                            </div>
                            <div className={classes.copyright}>
                                {thisYear} © Daystar Power Solutions
                            </div>
                        </div>
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

export default LoginScreen;
