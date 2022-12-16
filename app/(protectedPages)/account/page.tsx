"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";
import CustomButton from "../../../components/CustomButton";

interface Props {}

const Account = ({}: Props) => {
    const { data: session } = useSession();

    return (
        <div className="">
            <CustomButton
                label={"Sign out"}
                type="submit"
                onClick={() => signOut({ callbackUrl: "/" })}
            />
        </div>
    );
};

export default Account;
