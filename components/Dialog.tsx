import React, { useRef } from "react";
import { useFormContext } from "../contexts/FormContext";
import useOnClickOutside from "../hooks/useClickOutside";
import Icons from "../icons";
import { FormMessage, FormMessageType, FormMessageTypes } from "../types";
import CustomButton from "./CustomButton";

interface Props {
    messages: Set<FormMessage>;
    messageIcon: React.ReactNode;
}

const Dialog = ({ messages, messageIcon }: Props) => {
    const dialogRef = useRef(null);
    const {
        clearFormMessages,
        dialogButtons,
        canCloseDialog,
        addFormMessages,
    } = useFormContext();

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
                    className={`modal z-50 realtive border-${getBorderColour(
                        Array.from(messages)[0].type
                    )}`}
                >
                    {canCloseDialog && (
                        <div className="w-full flex justify-end">
                            <Icons
                                iconType="close"
                                onClick={() => addFormMessages(new Set([]))}
                                fontSize="92px"
                            />
                        </div>
                    )}
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

export default Dialog;
