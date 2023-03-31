import { Button, ButtonGroup } from "@chakra-ui/react";
import React, { RefObject } from "react";
import Icons from "../icons";
import { SelectOption } from "../types";
import { getErrorMessages } from "../utils";
import CustomSelect from "./CustomSelect";
import CustomTextInput from "./CustomTextInput";

interface Props {
    options: SelectOption[];
    onSubmit: () => void;
    nameRef: RefObject<HTMLInputElement>;
    descriptionRef: RefObject<HTMLInputElement>;
    connectorRef: RefObject<HTMLInputElement>;
    errors: string[];
    onCancelClick: () => void;
    onAddDescription?: () => void;
    descriptions?: string[];
}

const AddConnectionForm = ({
    options,
    nameRef,
    descriptionRef,
    connectorRef,
    errors,
    onCancelClick,
    onSubmit,
    onAddDescription,
    descriptions,
}: Props) => {
    return (
        <div>
            <div className="w-full border-2 p-4 mt-4 rounded-xl">
                <div>
                    <CustomTextInput
                        id="name"
                        type="text"
                        label="Name"
                        name="name"
                        ref={nameRef}
                        errorMessages={getErrorMessages(errors, "name")}
                    />
                    <div className="w-full">
                        <div className="w-full flex justify-between items-center">
                            <CustomTextInput
                                id="description"
                                type="text"
                                label="Description"
                                name="description"
                                ref={descriptionRef}
                                errorMessages={getErrorMessages(
                                    errors,
                                    "description"
                                )}
                            />
                            <Icons
                                iconType="add"
                                onClick={onAddDescription}
                                fontSize="72px"
                            />
                        </div>
                        <ul className="relative -top-12 pl-4">
                            {descriptions &&
                                descriptions.map((description) => (
                                    <li className="list-disc" key={description}>
                                        {description}
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <CustomSelect
                        name="connector"
                        options={options}
                        label="Connector"
                        ref={connectorRef}
                        errorMessages={getErrorMessages(errors, "connector")}
                    />
                    <ButtonGroup display="flex" justifyContent="space-between">
                        <Button
                            size="lg"
                            variant="primary"
                            onClick={onCancelClick}
                        >
                            Cancel
                        </Button>
                        <Button size="lg" variant="primary" onClick={onSubmit}>
                            Add
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );
};

export default AddConnectionForm;
