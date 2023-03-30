"use client";

import Navigation from "../../components/Navigation";
import AllContexts from "../../contexts/AllContexts";

interface Props {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
    return (
        <AllContexts>
            <div className="relative h-full min-h-screen">
                {/* <Navigation /> */}
                {children}
            </div>
        </AllContexts>
    );
};

export default ProtectedLayout;
