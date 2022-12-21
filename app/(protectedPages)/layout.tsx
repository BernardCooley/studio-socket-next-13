"use client";

import FilterModal from "../../components/FilterModal";
import FormDialog from "../../components/FormDialog";
import Navigation from "../../components/Navigation";
import { useFormContext } from "../../contexts/FormContext";
import AllContexts from "../../contexts/AllContexts";

interface Props {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
    const { icon, formMessages } = useFormContext();
    return (
        <AllContexts>
            <div className="pt-16 relative">
                <FilterModal />
                <FormDialog messages={formMessages} messageIcon={icon} />
                <Navigation />
                {children}
            </div>
        </AllContexts>
    );
};

export default ProtectedLayout;
