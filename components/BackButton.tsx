import React from "react";
import Icons from "../icons";
import { noop } from "../utils";

interface Props {
    onClick: () => void;
    top?: string;
    left?: string;
    height?: string;
    width?: string;
}

const BackButton = ({ onClick = noop, top = "4", left = "4" }: Props) => {
    return (
        <div
            className={`absolute top-${top} left-${left} h-10 w-8 clickEffectPrimary`}
            onClick={onClick}
        >
            <Icons iconType="back" onClick={onClick} />
        </div>
    );
};

export default BackButton;
