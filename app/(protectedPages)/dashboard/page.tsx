"use client";

import { useSession } from "next-auth/react";
import React from "react";

interface Props {}

const Dashboard = ({}: Props) => {
    const { data: session } = useSession();
    console.log("🚀 ~ file: page.tsx:9 ~ Dashboard ~ session", session);
    return <div className="">Dashboard</div>;
};

export default Dashboard;
