"use client";

import Dialog from "../../components/Dialog";
import Navigation from "../../components/Navigation";
import { useFormContext } from "../../contexts/FormContext";
import AllContexts from "../../contexts/AllContexts";
import { usePathname } from "next/navigation";

interface Props {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
    const pathname = usePathname();
    const { icon, formMessages } = useFormContext();
    return (
        <AllContexts>
            <div className="relative h-full min-h-screen">
                <Dialog messages={formMessages} messageIcon={icon} />
                <Navigation />
                {children}
            </div>
        </AllContexts>
    );
};

export default ProtectedLayout;
