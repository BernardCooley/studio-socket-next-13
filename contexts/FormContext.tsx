import React, { createContext, ReactNode, useContext, useState } from "react";
import { DialogButton, FormMessage, FormMessageTypes } from "../types";
import Icons from "../icons";

interface FormContextProps {
    icon: React.ReactNode;
    updateIcon: (icon: React.ReactNode) => void;
    file: string;
    updateFile: (value: string) => void;
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
