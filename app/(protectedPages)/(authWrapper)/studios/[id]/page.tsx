import React from "react";
import { useNavContext } from "../../../../../contexts/NavContext";

interface Props {
    params: { id: number };
}

const Studio = ({ params }: Props) => {
    const { navOpen } = useNavContext();

    return (
        <div className={`pt-16 ${navOpen ? "disable" : ""}`}>{params.id}</div>
    );
};

export default Studio;
