import React from "react";

interface Props {
    label: string | null;
    type: "button" | "submit" | "reset";
    buttonClassName?: string;
    onClick?: () => void;
    labelClassName?: string;
    disabled?: boolean;
}

const CustomButton = ({
    label,
    type,
    buttonClassName,
    onClick,
    labelClassName,
    disabled,
}: Props) => {
    return (
        <button
            disabled={disabled}
            className={`disabled:opacity-50 disabled:cursor-not-allowed ${buttonClassName}`}
            onClick={onClick}
            type={type}
        >
            <span className={labelClassName}>{label}</span>
        </button>
    );
};

export default CustomButton;
