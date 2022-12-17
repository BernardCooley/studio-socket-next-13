import React from "react";
import Icons from "../icons";

interface Props {
    onClick: () => void;
    isShowing: boolean;
}

const TogglePassword = ({ onClick, isShowing }: Props) => {
    return (
        <div className="absolute right-0 bottom-4" onClick={onClick}>
            {isShowing ? (
                <Icons iconType="hidePassword" />
            ) : (
                <Icons iconType="showPassword" />
            )}
        </div>
    );
};

export default TogglePassword;
