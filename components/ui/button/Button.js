import Link from "next/link";
import classes from './button.module.css'

function Button(props) {
    const {link, children, onClick} = props;

    return <Link href={link} passHref>
        <div className={classes.btn}  onClick={onClick}>
            {children}
        </div>
    </Link>;
}

export default Button