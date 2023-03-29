import React, { forwardRef, LegacyRef, useEffect } from "react";
import Icons from "../icons";
import ErrorMessages from "./ErrorMessages";

interface Props {
    title: string;
    subtitle: string;
    clasName?: string;
    showIcons: boolean;
    iconNotEditing?: JSX.Element;
    editing?: boolean;
    defaultValue?: string;
    errorMessages?: string[];
    onTickClick: () => void;
    onXClick: () => void;
}

const EditableDetailItem = forwardRef(
    (
        {
            title,
            subtitle,
            clasName,
            iconNotEditing,
            editing = false,
            defaultValue,
            showIcons,
            errorMessages,
            onTickClick,
            onXClick,
        }: Props,
        ref: LegacyRef<HTMLInputElement> | undefined
    ) => {
        const [value, setValue] = React.useState<string>(defaultValue || "");

        useEffect(() => {
            setValue(defaultValue || "");
        }, [defaultValue]);

        return (
            <>
                {subtitle && (
                    <div className={`mb-2 ${clasName}`}>
                        <div className="text-2xs">{title}</div>
                        <div className="w-full flex justify-between items-center">
                            {editing ? (
                                <div className="w-full">
                                    <input
                                        value={value}
                                        type="text"
                                        className="bg-transparent w-full text-2xs p-0 pl-1"
                                        onChange={(e) =>
                                            setValue(e.target.value)
                                        }
                                        ref={ref}
                                    />
                                    <ErrorMessages
                                        errorMessages={errorMessages}
                                    />
                                </div>
                            ) : (
                                <div className="text-xs">{subtitle}</div>
                            )}
                            {showIcons && (
                                <div>
                                    {editing ? (
                                        <div className="flex">
                                            <Icons
                                                iconType="tick"
                                                onClick={onTickClick}
                                                fontSize="28px"
                                            />
                                            <Icons
                                                iconType="close"
                                                onClick={onXClick}
                                                fontSize="28px"
                                            />
                                        </div>
                                    ) : (
                                        <div>{iconNotEditing}</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </>
        );
    }
);

EditableDetailItem.displayName = "EditableDetailItem";

export default EditableDetailItem;
