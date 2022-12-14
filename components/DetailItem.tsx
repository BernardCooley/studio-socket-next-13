import React from "react";

interface Props {
    title: string;
    subtitle: string;
    clasName?: string;
    icon?: JSX.Element;
}

const DetailItem = ({ title, subtitle, clasName, icon }: Props) => {
    return (
        <>
            {subtitle && (
                <div className={`mb-4 ${clasName}`}>
                    <div className="text-3xl">{title}</div>
                    <div className="w-full flex justify-between items-center">
                        <div className="text-xl">{subtitle}</div>
                        {icon}
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailItem;
