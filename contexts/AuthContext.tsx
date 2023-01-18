import React, { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextProps {
    user: any;
    updateUser: (user: any) => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    updateUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

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
