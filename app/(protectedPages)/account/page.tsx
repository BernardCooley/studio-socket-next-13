"use client";

import { signOut } from "next-auth/react";
import React from "react";
import CustomButton from "../../../components/CustomButton";
import PageTitle from "../../../components/PageTitle";

interface Props {}

const Account = ({}: Props) => {
    return (
        <div className="pt-16">
            <PageTitle title="Account" />
            <CustomButton
                label={"Sign out"}
                type="submit"
                onClick={() => signOut({ callbackUrl: "/" })}
            />
        </div>
    );
};

export default Account;
