import Link from "next/link";
import classes from './button.module.css'

function Button(props) {
    const {link, width, children, onClick, height} = props;

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
            {children}
        </div>
    </Link>;
}

export default Button