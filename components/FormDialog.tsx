import React, { useRef } from "react";
import { useFormContext } from "../contexts/FormContext";
import useOnClickOutside from "../hooks/useClickOutside";
import { FormMessage, FormMessageType, FormMessageTypes } from "../types";
import CustomButton from "./CustomButton";

interface Props {
    messages: Set<FormMessage>;
    messageIcon: React.ReactNode;
}

const FormDialog = ({ messages, messageIcon }: Props) => {
    const dialogRef = useRef(null);
    const { clearFormMessages, dialogButtons } = useFormContext();

    const handleClickOutside = () => {
        clearFormMessages();
    };

    useOnClickOutside(dialogRef, handleClickOutside);

    const getBorderColour = (type: FormMessageType) => {
        switch (type) {
            case FormMessageTypes.ERROR:
                return "error";
            case FormMessageTypes.WARNING:
                return "warning";
            case FormMessageTypes.SUCCESS:
                return "success";
            case FormMessageTypes.INFO:
                return "primary";
            default:
        }
    };

    return (
        <>
            {messages && messages.size > 0 && (
                <div
                    ref={dialogRef}
                    className={`w-11/12 border-2 rounded-lg p-4 shadow-2xl z-50 flex flex-col items-center absolute bg-primary-light -translate-y-1/2 translate-x-1/2 top-1/2 right-1/2 border-${getBorderColour(
                        Array.from(messages)[0].type
                    )}`}
                >
                    <div className="flex items-center">
                        <div className="min-h-dialog flex items-center pr-4">
                            {messageIcon}
                        </div>
                        <div>
                            {Array.from(messages).map((message) => (
                                <div
                                    className="text-xl"
                                    key={JSON.stringify(message)}
                                >
                                    {message.message}
                                </div>
                            ))}
                        </div>
                    </div>
                    {dialogButtons && dialogButtons.length > 0 && (
                        <div className="w-full flex justify-around text-primary-light mt-4">
                            {dialogButtons.map((button) => (
                                <CustomButton
                                    onClick={button.onClick}
                                    key={button.text}
                                    label={button.text}
                                    type="button"
                                    buttonClassName={button.classes}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default FormDialog;
