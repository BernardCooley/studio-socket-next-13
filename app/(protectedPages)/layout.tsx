"use client";

import FilterModal from "../../components/FilterModal";
import FormDialog from "../../components/FormDialog";
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
            <div className="pt-16 relative">
                <FilterModal />
                <SearchModal searchType={pathname?.replace("/", " ")} />
                <FormDialog messages={formMessages} messageIcon={icon} />
                <Navigation />
                {children}
            </div>
        </AllContexts>
    );
};

export default ProtectedLayout;
