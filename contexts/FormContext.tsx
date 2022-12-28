import React, { createContext, ReactNode, useContext, useState } from "react";
import { DialogButton, FormMessage } from "../types";
import Icons from "../icons";

interface FormContextProps {
    icon: React.ReactNode;
    updateIcon: (icon: React.ReactNode) => void;
    file: string;
    updateFile: (value: string) => void;
    formMessages: Set<FormMessage>;
    addFormMessages: (messages: Set<FormMessage>) => void;
    clearFormMessages: () => void;
    dialogButtons: DialogButton[];
    updateDialogButtons: (buttons: DialogButton[]) => void;
    clearDialogButtons: () => void;
    resetIcon: () => void;
    canCloseDialog: boolean;
    updateCanCloseDialog: (value: boolean) => void;
}

export const FormContext = createContext<FormContextProps>({
    icon: <Icons iconType="warning" className="text-error" fontSize="132px" />,
    updateIcon: () => {},
    file: "",
    updateFile: () => {},
    formMessages: new Set(),
    addFormMessages: () => {},
    clearFormMessages: () => {},
    dialogButtons: [],
    updateDialogButtons: () => {},
    clearDialogButtons: () => {},
    resetIcon: () => {},
    canCloseDialog: false,
    updateCanCloseDialog: () => {},
});

export const useFormContext = () => useContext(FormContext);

export const FormContextProvider = ({ children }: { children: ReactNode }) => {
    const [formMessages, setFormMessages] = useState<Set<FormMessage>>(
        new Set()
    );
    const [file, setFile] = useState<string>("");
    const [icon, setIcon] = useState<React.ReactNode>(
        <Icons iconType="warning" className="text-error" fontSize="132px" />
    );
    const [dialogButtons, setDialogButtons] = useState<DialogButton[]>([]);
    const [canCloseDialog, setCanCloseDialog] = useState<boolean>(false);

    const updateIcon = (icon: React.ReactNode) => {
        setIcon(icon);
    };

    const resetIcon = () => {
        setIcon(
            <Icons iconType="warning" className="text-error" fontSize="132px" />
        );
    };

    const updateFile = (value: string) => {
        setFile(value);
    };

    const addFormMessages = (messages: Set<FormMessage>) => {
        const newMessages: Set<FormMessage> = new Set();
        messages.forEach((message) => {
            newMessages.add({
                message: message.message,
                type: message.type,
            });
        });

        setFormMessages(newMessages);
    };

    const clearFormMessages = () => {
        setFormMessages(new Set());
    };

    const updateDialogButtons = (buttons: DialogButton[]) => {
        setDialogButtons(buttons);
    };

    const clearDialogButtons = () => {
        setDialogButtons([]);
    };

    const updateCanCloseDialog = (value: boolean) => {
        setCanCloseDialog(value);
    };

    return (
        <FormContext.Provider
            value={{
                icon,
                updateIcon,
                file,
                updateFile,
                formMessages,
                addFormMessages,
                clearFormMessages,
                dialogButtons,
                updateDialogButtons,
                clearDialogButtons,
                resetIcon,
                canCloseDialog,
                updateCanCloseDialog,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};
