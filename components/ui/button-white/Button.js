import Link from "next/link";
import classes from './button.module.css'

function ButtonWhite(props) {
    const {link, width, height, children, onClick} = props;

    const buttonStyles = {
        width: `${width}px`,
        height: `${height}px`,
    }

    return <Link
        href={link}
        passHref
    >
        <div
            className={classes.btn}
            style={buttonStyles}
            onClick={onClick}
        >
            <div className={classes.btnText}>{children}</div>
        </div>
    </Link>;
}

export default ButtonWhite