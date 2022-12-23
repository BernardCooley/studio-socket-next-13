import React, { RefObject } from "react";
import Icons from "../icons";
import { Connection, SelectOption } from "../types";
import AddConnectionForm from "./AddConnectionForm";
import Connections from "./Connections";

interface Props {
    connectionShow: boolean;
    onShowForm: () => void;
    onHideForm: () => void;
    connectorRef: RefObject<HTMLInputElement>;
    descriptionRef: RefObject<HTMLInputElement>;
    nameRef: RefObject<HTMLInputElement>;
    errors: string[];
    onAddConnection: () => void;
    options: SelectOption[];
    onAddDescription: () => void;
    descriptions: string[];
    connections: Connection[];
    onDeleteConnection: (index: number) => void;
    title: string;
}

const AddConnectionSection = ({
    connectionShow,
    onShowForm,
    onHideForm,
    connectorRef,
    descriptionRef,
    nameRef,
    errors,
    onAddConnection,
    options,
    onAddDescription,
    descriptions,
    connections,
    onDeleteConnection,
    title,
}: Props) => {
    return (
        <div className="w-full mb-4">
            <div className="flex justify-between">
                <div className="text-2xl">{title}</div>
                {!connectionShow && (
                    <div>
                        <Icons
                            onClick={onShowForm}
                            iconType="add"
                            className="border-2 rounded-full"
                        />
                    </div>
                )}
            </div>
            {connectionShow && (
                <AddConnectionForm
                    connectorRef={connectorRef}
                    descriptionRef={descriptionRef}
                    nameRef={nameRef}
                    errors={errors}
                    onCancelClick={onHideForm}
                    onSubmit={onAddConnection}
                    options={options}
                    onAddDescription={onAddDescription}
                    descriptions={descriptions}
                />
            )}
            {connections.length > 0 && (
                <Connections
                    onActionClick={onDeleteConnection}
                    connections={connections}
                    title=""
                    className="mt-4"
                    actionIcon={
                        <Icons
                            className="text-sm"
                            iconType="close"
                            fontSize="62px"
                        />
                    }
                />
            )}
        </div>
    );
};

export default AddConnectionSection;
