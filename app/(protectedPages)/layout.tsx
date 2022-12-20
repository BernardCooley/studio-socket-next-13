"use client";

import FilterModal from "../../components/FilterModal";
import FormDialog from "../../components/FormDialog";
import Navigation from "../../components/Navigation";
import { FilterContextProvider } from "../../contexts/FilterContext";
import { useFormContext } from "../../contexts/FormContext";

interface Props {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
    const { icon, formMessages } = useFormContext();
    return (
        <FilterContextProvider>
            <div className="pt-16 relative">
                <FilterModal />
                <FormDialog messages={formMessages} messageIcon={icon} />
                <Navigation />
                {children}
            </div>
        </FilterContextProvider>
    );
};

export default ProtectedLayout;
