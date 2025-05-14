import classes from "./ButtonSave.module.css";
import CheckIcon from "@/components/ui/icons/CheckIcon";

export function ButtonSaveSubmit(props) {
    return <button
        type="submit"
        className={classes.btn}
        onClick={props.onClick}
    >
        <div className={ classes.btnDiv}>
            <span>
                <CheckIcon />
            </span>
            <span>
                    {props.buttonText ? props.buttonText : "Save"}
            </span>
        </div>
    </button>;
}