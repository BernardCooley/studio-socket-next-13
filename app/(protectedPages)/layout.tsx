"use client";

import Navigation from "../../components/Navigation";

interface Props {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
    return (
        <div className="pt-20">
            <Navigation />
            {children}
        </div>
    );
};

export default ProtectedLayout;
