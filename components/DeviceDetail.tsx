import React from "react";

interface Props {
    title: string;
    subtitle: string;
}

const DeviceDetail = ({ title, subtitle }: Props) => {
    return (
        <>
            {subtitle && (
                <div className="mb-4">
                    <div className="text-3xl">{title}</div>
                    <div className="text-xl">{subtitle}</div>
                </div>
            )}
        </>
    );
};

export default DeviceDetail;
