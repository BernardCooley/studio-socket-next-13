import React, { useRef } from "react";
import { useFormContext } from "../contexts/FormContext";
import useOnClickOutside from "../hooks/useClickOutside";
import { FormMessage } from "../types";

interface Props {
    messages: Set<FormMessage>;
    messageIcon: React.ReactNode;
}

const FormDialog = ({ messages, messageIcon }: Props) => {
    const dialogRef = useRef(null);
    const { clearFormMessages } = useFormContext();

    const handleClickOutside = () => {
        clearFormMessages();
    };

    useOnClickOutside(dialogRef, handleClickOutside);

    return (
        <>
            {messages && messages.size > 0 && (
                <div
                    ref={dialogRef}
                    className={`w-11/12 border-2 border-error rounded-lg p-4 shadow-2xl z-50 flex items-center absolute bg-primary-light -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2`}
                >
                    <div className="min-h-dialog flex items-center pr-4">
                        {messageIcon}
                    </div>
                    <div>
                        {Array.from(messages).map((message) => (
                            <div key={JSON.stringify(message)}>
                                {message.message}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default FormDialog;
