import React, { createContext, ReactNode, useContext, useState } from "react";
import { FormMessage } from "../types";
import Icons from "../icons";

interface FormContextProps {
    icon: React.ReactNode;
    updateIcon: (icon: React.ReactNode) => void;
    file: string;
    updateFile: (value: string) => void;
    formMessages: Set<FormMessage>;
    addFormMessages: (messages: Set<FormMessage>) => void;
    clearFormMessages: () => void;
}

export const FormContext = createContext<FormContextProps>({
    icon: <Icons iconType="warning" />,
    updateIcon: () => {},
    file: "",
    updateFile: () => {},
    formMessages: new Set(),
    addFormMessages: () => {},
    clearFormMessages: () => {},
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

    const updateIcon = (icon: React.ReactNode) => {
        setIcon(icon);
    };

    const updateFile = (value: string) => {
        setFile(value);
    };

    const addFormMessages = (messages: Set<FormMessage>) => {
        const newMessages: Set<FormMessage> = new Set();
        console.log(JSON.stringify(formMessages));
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
            }}
        >
            {children}
        </FormContext.Provider>
    );
};
