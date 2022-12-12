"use client";

import { signOut } from "next-auth/react";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getRoute } from "../../utils";

interface Props {}

const Dashboard = ({}: Props) => {
    const { data: session } = useSession();
    const router = useRouter();

    if (!session) {
        router.push(getRoute("Landing").path);
    }

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
