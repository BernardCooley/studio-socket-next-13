/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getUserProfile } from "../../../bff/requests";
import { useAuthContext } from "../../../contexts/AuthContext";
import { ODevFilterContextProvider } from "../../../contexts/ODevFilterContext";
import { SearchContextProvider } from "../../../contexts/SearchContext";
import { YDevFilterContextProvider } from "../../../contexts/YDevFilterContext";

interface Props {
    children: React.ReactNode;
}

const AuthWrapperLayout = ({ children }: Props) => {
    const { data } = useSession();
    const { updateUser } = useAuthContext();

    useEffect(() => {
        getUser();
    }, [data]);

    const getUser = async () => {
        if (data?.user.id) {
            const usr = await getUserProfile(data.user.id);
            updateUser(usr);
        }
    };

    return (
        <SearchContextProvider>
            <ODevFilterContextProvider>
                <YDevFilterContextProvider>
                    <div className="relative h-full  min-h-screen">
                        {children}
                    </div>
                </YDevFilterContextProvider>
            </ODevFilterContextProvider>
        </SearchContextProvider>
    );
};

export default AuthWrapperLayout;
