import classes from "./ButtonDefault.module.css";

export function ButtonDefault(props) {
    return <button
        type="submit"
        className={classes.btn}
        onClick={props.onClick}
    >
        <div className={ classes.btnDiv}>
            <span>
                    {props.buttonText ? props.buttonText : "Save"}
            </span>
        </div>
    </button>;
}