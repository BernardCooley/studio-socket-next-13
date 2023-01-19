import { Connection } from "@prisma/client";
import React from "react";

interface Props {
    connections: Connection[];
    title?: string;
    className?: string;
    actionIcon?: JSX.Element;
    onActionClick?: (connectionIndex: number) => void;
}

const Connections = ({
    connections,
    title = "Connections",
    className,
    actionIcon,
    onActionClick,
}: Props) => {
    const handleActionClick = (index: number) => {
        if (onActionClick) {
            onActionClick(index);
        }
    };

    return (
        <div className={`${className}`}>
            <div className="text-3xl">{title}</div>
            <table className="table-fixed w-full text-xl mb-4 border-2 border-separate rounded-xl shadow-2xl">
                <tbody>
                    <tr className="font-medium">
                        <th className="border-primary border-b-2">Name</th>
                        <th className="border-primary border-b-2">Type</th>
                        <th className="border-primary border-b-2">
                            Description
                        </th>
                        {actionIcon && (
                            <th className="border-primary border-b-2">
                                Action
                            </th>
                        )}
                    </tr>
                    {connections &&
                        connections.map(
                            (connection: Connection, index: number) => (
                                <tr key={connection.name}>
                                    <td className="text-center capitalize border-primary">
                                        {connection.name.toLowerCase()}
                                    </td>
                                    <td className="text-center border-primary">
                                        {connection.connector.name}
                                    </td>
                                    <td className="text-center border-primary">
                                        {connection.description?.join(", ")}
                                    </td>
                                    {actionIcon && (
                                        <td
                                            onClick={() =>
                                                handleActionClick(index)
                                            }
                                            className="text-center border-primary"
                                        >
                                            {actionIcon}
                                        </td>
                                    )}
                                </tr>
                            )
                        )}
                </tbody>
            </table>
        </div>
    );
};

export default Connections;
