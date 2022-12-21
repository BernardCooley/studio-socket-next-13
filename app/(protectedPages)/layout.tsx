"use client";

import FilterModal from "../../components/FilterModal";
import FormDialog from "../../components/FormDialog";
import Navigation from "../../components/Navigation";
import { YDevFilterContextProvider } from "../../contexts/YDevFilterContext";
import { useFormContext } from "../../contexts/FormContext";
import { NavContextProvider } from "../../contexts/NavContext";
import { ODevFilterContextProvider } from "../../contexts/ODevFilterContext";

interface Props {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
    const { icon, formMessages } = useFormContext();
    return (
        <ODevFilterContextProvider>
            <YDevFilterContextProvider>
                <NavContextProvider>
                    <div className="pt-16 relative">
                        <FilterModal />
                        <FormDialog
                            messages={formMessages}
                            messageIcon={icon}
                        />
                        <Navigation />
                        {children}
                    </div>
                </NavContextProvider>
            </YDevFilterContextProvider>
        </ODevFilterContextProvider>
    );
};

export default ProtectedLayout;
