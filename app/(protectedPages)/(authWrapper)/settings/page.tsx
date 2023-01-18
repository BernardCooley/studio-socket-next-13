import React from "react";
import PageTitle from "../../../../components/PageTitle";
import { useNavContext } from "../../../../contexts/NavContext";

interface Props {}

const Settings = ({}: Props) => {
    const { navOpen } = useNavContext();

    return (
        <div className={`pt-16 ${navOpen ? "disable" : ""}`}>
            <PageTitle title="Settings" />
        </div>
    );
};

export default Settings;
