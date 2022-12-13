"use client";

import { signOut } from "next-auth/react";
import React from "react";
import CustomButton from "../../../components/CustomButton";

interface Props {}

const Account = ({}: Props) => {
    return (
        <div className="">
            <CustomButton
                label={"Sign out"}
                type="submit"
                onClick={() => signOut()}
            />
        </div>
    );
};

export default Account;
