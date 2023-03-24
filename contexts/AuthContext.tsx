import React, { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextProps {
    user: any;
    updateUser: (user: any) => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuthContext = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error(
            "useAuthContext has to be used within <AuthContext.Provider>"
        );
    }

    return authContext;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);

    const updateUser = (user: any) => {
        setUser(user);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
