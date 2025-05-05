import ButtonWhite from "@/components/ui/button-white/Button";

export function ButtonWhiteClose(props) {
    return <ButtonWhite
        className="btn btn-active btn-ghost"
        link={"#"}
        width={80}
        height={50}
        onClick={props.onClick}
    >
        <div
            style={{
                width: "80px",
                height: "50px",
                paddingLeft: "16px",
                paddingRight: "16px",
                paddingTop: "14px",
                paddingBottom: "12px",
                borderRadius: "15px",
                fontSize: 16,
                fontFamily: "sans-serif",
                fontWeight: "600",
                textAlign: "center",
            }}
        >
            Close
        </div>

    </ButtonWhite>;
}
