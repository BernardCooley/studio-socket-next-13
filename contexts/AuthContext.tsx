import React, { createContext, ReactNode, useContext, useState } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface AuthContextProps {
    dialogMessages: string[];
    icon: React.ReactNode;
    updateDialogMessages: (messages: string[]) => void;
    updateIcon: (icon: React.ReactNode) => void;
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
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [dialogMessages, setDialogMessages] = useState<string[]>([]);
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

    return (
        <AuthContext.Provider
            value={{
                dialogMessages,
                updateDialogMessages,
                icon,
                updateIcon,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
