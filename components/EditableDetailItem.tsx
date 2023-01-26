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
    iconsEditing?: {
        iconType: string;
        onClick: () => void;
        fontSize: string;
    }[];
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
            iconsEditing,
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
                    <div className={`mb-4 ${clasName}`}>
                        <div className="text-3xl">{title}</div>
                        <div className="w-full flex justify-between items-center">
                            {editing ? (
                                <div className="w-full">
                                    <input
                                        value={value}
                                        type="text"
                                        className="bg-transparent w-full text-2xl"
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
                                <div className="text-xl">{subtitle}</div>
                            )}
                            {showIcons && (
                                <div>
                                    {editing ? (
                                        <div className="flex">
                                            {iconsEditing?.map((icon) => (
                                                <div
                                                    className="mx-1"
                                                    key={icon.iconType}
                                                >
                                                    <Icons
                                                        iconType={icon.iconType}
                                                        onClick={() =>
                                                            icon.onClick()
                                                        }
                                                        fontSize={icon.fontSize}
                                                    />
                                                </div>
                                            ))}
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
