/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getUserProfile } from "../../../bff/requests";
import { useAuthContext } from "../../../contexts/AuthContext";

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
        if (data) {
            const usr = await getUserProfile(data.user.id);
            updateUser(usr);
        }
    };

    return <div className="relative h-screen">{children}</div>;
};

export default AuthWrapperLayout;
