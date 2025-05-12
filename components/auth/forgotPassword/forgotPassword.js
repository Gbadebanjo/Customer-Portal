'use client';
import classes from '../login/login.module.css';
import Button from "@/components/ui/button/Button";
import ButtonWhite from "@/components/ui/button-white/Button";
import CustomTextField from '@/components/ui/CustomTextField/CustomTextInput';
import { useState } from "react";
function ForgotPasswordComponent() {
    const [email, setEmail] = useState("");
    const date = new Date();
    const thisYear = date.getFullYear();
    return (
        <div className={classes.loginPage}>
            <div className={classes.flexContainer}>
                <div className={classes.leftPart} />
                <div className={classes.rightPart}>
                    <div className={classes.rightPartForm}>
                        <div className={classes.dayStarLogo} />
                        <div className={classes.loginTextContainer}>
                            <div className={classes.loginText}>
                                Forgot Password?
                            </div>
                            <div className={classes.instructionText}>
                                Enter your e-mail address and we’ll send you a link to reset your password
                            </div>
                        </div>
                        <form className={classes.loginForm}>
                            <CustomTextField
                                label="Email Address"
                                value={email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </form>
                        <div className={classes.buttonContainer}>
                            <div style={{ width: '47%' }}>
                                <ButtonWhite link={"/"}>
                                    Back
                                </ButtonWhite>
                            </div>
                            <div style={{ width: '47%' }}>
                                <Button link={"/403"}>
                                    Send
                                </Button>
                            </div>
                        </div>
                        <div className={classes.copyright}>
                            {thisYear} Daystar Power Solutions
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default ForgotPasswordComponent;