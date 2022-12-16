import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface Props {
    onClick: () => void;
    isShowing: boolean;
}

const TogglePassword = ({ onClick, isShowing }: Props) => {
    return (
        <div className="absolute right-0 bottom-4" onClick={onClick}>
            {isShowing ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </div>
    );
};

export default TogglePassword;
