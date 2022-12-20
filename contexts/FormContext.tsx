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
}

export const FormContext = createContext<FormContextProps>({
    icon: <Icons iconType="warning" />,
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
});

export const useFormContext = () => useContext(FormContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [formMessages, setFormMessages] = useState<Set<FormMessage>>(
        new Set()
    );
    const [file, setFile] = useState<string>("");
    const [icon, setIcon] = useState<React.ReactNode>(
        <Icons iconType="warning" />
    );
    const [dialogButtons, setDialogButtons] = useState<DialogButton[]>([]);

    const updateIcon = (icon: React.ReactNode) => {
        setIcon(icon);
    };

    const resetIcon = () => {
        setIcon(<Icons iconType="warning" />);
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
            }}
        >
            {children}
        </FormContext.Provider>
    );
};
