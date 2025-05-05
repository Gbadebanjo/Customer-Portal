import classes from './template404.module.css';
import NavbarComponent from "@/components/ui/Navbar/NavbarContainer";
import HomeIcon from "@/components/ui/icons/HomeIcon";
import Link from "next/link";
import RightSideComponent from "@/components/ui/rightside/RightSideComponent";
import FrownIcon from "@/components/ui/icons/FrownIcon";
import Button from "@/components/ui/button/Button";
import ButtonBlue from "@/components/ui/button-blue/ButtonBlue"; // Import the image

export default function Template404Screen() {
    const date = new Date();
    const thisYear = date.getFullYear();
    return (
        <div className={classes.container}>
            {/* Header */}
            <div className={classes.header}>
                 <span>
                   <Link href='/dashboard'>
                       <HomeIcon/>
                   </Link>
                 </span>
                <span>
                    <small> 404 |  &nbsp;Page not found</small></span>
            </div>
            {/* Sidebar */}
            <div className={classes.nav}>
                <div className={classes.sidebar}>
                    {/* Sidebar Header */}
                    <div className={classes.sidebarHeader}>
                        404
                    </div>
                    {/* Sidebar Menu */}
                    <NavbarComponent/>
                </div>
            </div>
            {/* Top Center */}
            {/* Content */}
            <div className={classes.content}>

                <div className={classes.centerContent}>
                    {/*Content*/}
                    <div className={classes.leftContent}>
                        <FrownIcon
                            color='dodgerblue'
                        />
                    </div>
                    <div className={classes.rightContent}>
                        <div className="status-content">
                            <h1 className={classes.orangeText}>404</h1>
                            <h2 className={classes.blueButton}>Page Not Found</h2>
                            <h5 className="text-muted">An internal error occurred during your request.</h5>
                            <p className="mt-3 mb-4"></p>
                            <div className={classes.backButton}>
                                <ButtonBlue
                                    link={"javascript:history.back()"}
                                    width={150}
                                    height={50}
                                >
                                    <div style={{
                                        textAlign: 'center',
                                        color: 'dodgerblue',
                                        fontSize: 20,
                                        fontFamily: "sans-serif",
                                        fontWeight: '900',
                                        letterSpacing: 0.50,
                                        wordWrap: 'break-word',
                                    }}>Go Back
                                    </div>
                                </ButtonBlue>
                            </div>

                            <div>
                                <Button
                                    link={"/"}
                                    width={237}
                                >
                                    <div style={{
                                        textAlign: 'center',
                                        color: 'white',
                                        fontSize: 20,
                                        fontFamily: "sans-serif",
                                        fontWeight: '500',
                                        letterSpacing: 0.50,
                                        wordWrap: 'break-word'
                                    }}>Go to the homepage
                                    </div>
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            {/* Right Side */}
            <RightSideComponent/>
        </div>
    );
}