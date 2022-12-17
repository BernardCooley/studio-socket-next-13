"use client";

import React from "react";
import PageSection from "../../../components/PageSection";

interface Props {}

const Dashboard = ({}: Props) => {
    return (
        <div className="flex flex-col items-center bg-primary-light pb-10">
            <PageSection title="Your top devices">
                <div className="p-6"></div>
            </PageSection>
            <PageSection title="Your top studios">
                <div className="p-6"></div>
            </PageSection>
            <PageSection title="Community">
                <div className="p-6"></div>
            </PageSection>
            <PageSection title="Community top devices">
                <div className="p-6"></div>
            </PageSection>
        </div>
    );
};

export default Dashboard;
