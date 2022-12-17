import React from "react";

interface Props {
    title: string;
}

const PageTitle = ({ title }: Props) => {
    return (
        <div className="text-5xl w-full text-center capitalize font-default">
            {title}
        </div>
    );
};

export default PageTitle;
