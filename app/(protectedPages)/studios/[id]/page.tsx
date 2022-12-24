import React from "react";

interface Props {
    params: { id: number };
}

const Studio = ({ params }: Props) => {
    return <div className="pt-16">{params.id}</div>;
};

export default Studio;
