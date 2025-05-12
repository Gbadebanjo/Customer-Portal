import classes from '../login/login.module.css';
import Button from "@/components/ui/button/Button";
import ButtonWhite from "@/components/ui/button-white/Button";

function ForgotPasswordComponent() {
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
                        <div className={classes.top1}>
                            <div className={classes.top2}>
                                <div className={classes.top3}>
                                    {/*input text 1*/}
                                    <div style={{
                                        id: 'input_1',
                                    }}>
                                        <input
                                            type="email"
                                            className={classes.inputText}
                                            placeholder="Email address"
                                            name="Email address"
                                            id="Email address"
                                            style={{
                                                marginLeft: 5,
                                            }}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className={classes.buttonContainer}>
                            <div
                                style={{
                                    marginRight: 10
                                }}
                            >
                                <ButtonWhite
                                    link={"/"}
                                    width={230}
                                >
                                    <div
                                        style={{
                                            width: '230px',
                                            height: '50px',
                                            paddingLeft: '16px',
                                            paddingRight: '16px',
                                            paddingTop: '11px',
                                            paddingBottom: '13px',
                                            borderRadius: '5px',
                                            textAlign: 'center',
                                            fontSize: 20,
                                            fontFamily: "sans-serif",
                                            fontWeight: '600',
                                            letterSpacing: 0.50,
                                            wordWrap: 'break-word',
                                        }}
                                    >
                                        Back
                                    </div>
                                </ButtonWhite>
                            </div>

                            <div
                                style={{
                                    marginLeft: 10
                                }}
                            >
                                <Button
                                    link={"/403"}
                                    width={230}
                                >
                                    <div style={{
                                        textAlign: 'center',
                                        color: 'white',
                                        fontSize: 20,
                                        fontFamily: "sans-serif",
                                        fontWeight: '500',
                                        letterSpacing: 0.50,
                                        wordWrap: 'break-word'
                                    }}>Send
                                    </div>
                                </Button>
                            </div>


                        </div>

                        <div className={classes.forgotPasswprd}>


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