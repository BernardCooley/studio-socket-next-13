import React, { createContext, ReactNode, useContext, useState } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface AuthContextProps {
    dialogMessages: string[];
    icon: React.ReactNode;
    updateDialogMessages: (messages: string[]) => void;
    updateIcon: (icon: React.ReactNode) => void;
    file: string;
    updateFile: (value: string) => void;
}

export const AuthContext = createContext<AuthContextProps>({
    dialogMessages: [],
    updateDialogMessages: () => {},
    icon: (
        <WarningAmberIcon
            style={{
                color: "red",
                fontSize: "132px",
            }}
        />
    ),
    updateIcon: () => {},
    file: "",
    updateFile: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [dialogMessages, setDialogMessages] = useState<string[]>([]);
    const [file, setFile] = useState<string>("");
    const [icon, setIcon] = useState<React.ReactNode>(
        <WarningAmberIcon
            style={{
                color: "red",
                fontSize: "132px",
            }}
        />
    );

    const updateDialogMessages = (messages: string[]) => {
        setDialogMessages(messages);
    };

    const updateIcon = (icon: React.ReactNode) => {
        setIcon(icon);
    };

    const updateFile = (value: string) => {
        setFile(value);
    };

    return (
        <AuthContext.Provider
            value={{
                dialogMessages,
                updateDialogMessages,
                icon,
                updateIcon,
                file,
                updateFile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
