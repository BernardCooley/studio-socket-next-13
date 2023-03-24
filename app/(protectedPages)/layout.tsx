"use client";

import Dialog from "../../components/Dialog";
import Navigation from "../../components/Navigation";
import { useFormContext } from "../../contexts/FormContext";
import AllContexts from "../../contexts/AllContexts";
import SearchModal from "../../components/SearchModal";
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
                <SearchModal searchType={pathname?.replace("/", " ")} />
                <Dialog messages={formMessages} messageIcon={icon} />
                <Navigation />
                {children}
            </div>
        </AllContexts>
    );
};

export default ProtectedLayout;
