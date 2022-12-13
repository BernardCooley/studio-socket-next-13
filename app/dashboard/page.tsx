"use client";

import { signOut } from "next-auth/react";
import React from "react";
import CustomButton from "../../components/CustomButton";

interface Props {}

const Dashboard = ({}: Props) => {
    return (
        <div className="mt-20">
            <CustomButton
                label={"Sign out"}
                type="submit"
                onClick={() => signOut()}
            />
        </div>
    );
};

export default Dashboard;
