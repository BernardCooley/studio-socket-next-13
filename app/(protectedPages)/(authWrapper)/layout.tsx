/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ToastProvider } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { getUserProfile } from "../../../bff/requests";
import { useAuthContext } from "../../../contexts/AuthContext";

interface Props {
    children: React.ReactNode;
}

const AuthWrapperLayout = ({ children }: Props) => {
    const { data } = useSession();
    const { updateUser, user } = useAuthContext();

    useEffect(() => {
        if (user && !user.email_verified) {
            setTimeout(() => {
                signOut({ callbackUrl: "/" });
            }, 10000);
        }
    }, [user]);

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
        <>
            <ToastProvider />
            <div className="relative h-full  min-h-screen">{children}</div>
        </>
    );
};

export default AuthWrapperLayout;
