"use client";

import { usePathname } from "next/navigation";
import Navigation from "../../components/Navigation";
import PageTitle from "../../components/PageTitle";

interface Props {
    children: React.ReactNode;
}

const ProtectedLayout = ({ children }: Props) => {
    const pathname = usePathname();

    return (
        <div className="pt-20">
            <Navigation />
            <PageTitle title={pathname?.replace("/", "") || ""} />
            {children}
        </div>
    );
};

export default ProtectedLayout;
