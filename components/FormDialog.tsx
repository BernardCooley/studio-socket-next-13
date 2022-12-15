import React, { useRef } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import useOnClickOutside from "../hooks/useClickOutside";

interface Props {
    formMessages: string[];
    messageIcon: React.ReactNode;
}

const FormDialog = ({ formMessages, messageIcon }: Props) => {
    const dialogRef = useRef(null);
    const { updateDialogMessages } = useAuthContext();

    const handleClickOutside = () => {
        updateDialogMessages([]);
    };

    useOnClickOutside(dialogRef, handleClickOutside);

    return (
        <>
            {formMessages.length > 0 && (
                <div
                    ref={dialogRef}
                    className={`w-11/12 border-2 border-error rounded-lg p-4 shadow-2xl z-50 flex items-center absolute bg-primary-light -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2`}
                >
                    <div className="min-h-dialog flex items-center pr-4">
                        {messageIcon}
                    </div>
                    <div>
                        {formMessages.map((message) => (
                            <div key={message}>{message}</div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default FormDialog;
