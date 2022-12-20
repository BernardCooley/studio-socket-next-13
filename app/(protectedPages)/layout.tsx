"use client";

import FormDialog from "../../components/FormDialog";
import Navigation from "../../components/Navigation";
import { useFormContext } from "../../contexts/FormContext";

interface Props {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
    const { icon, formMessages } = useFormContext();
    return (
        <div className="pt-12">
            <FormDialog messages={formMessages} messageIcon={icon} />
            <Navigation />
            {children}
        </div>
    );
};

export default ProtectedLayout;
