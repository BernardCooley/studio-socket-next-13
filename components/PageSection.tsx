import React from "react";

interface Props {
    children: React.ReactNode;
    title: string;
}

const PageSection = ({ children, title }: Props) => {
    return (
        <div className="grid gap-4 grid-cols-2 relative w-11/12 shadow-xl mt-10 p-4 pt-7 border-2 border-primary-light-border rounded-md">
            <div className="absolute left-1/2 -translate-x-1/2 -top-4 text-xl px-4 bg-primary-light text-primary border-primary-light-border border-2 rounded-full">
                {title}
            </div>
            {children}
        </div>
    );
};

export default PageSection;
