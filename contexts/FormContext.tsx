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
    loadingMessage: string;
    updateLoadingMessage: (value: string) => void;
}

export const FormContext = createContext<FormContextProps | null>(null);

export const useFormContext = () => {
    const formContext = useContext(FormContext);

    if (!formContext) {
        throw new Error(
            "useFormContext must be used within a FormContextProvider"
        );
    }

    return formContext;
};

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
    const [loadingMessage, setLoadingMessage] = useState<string>("");

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

    const updateLoadingMessage = (value: string) => {
        setLoadingMessage(value);
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
                loadingMessage,
                updateLoadingMessage,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};
