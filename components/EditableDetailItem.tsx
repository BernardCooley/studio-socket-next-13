import React, { forwardRef, LegacyRef, useEffect } from "react";

interface Props {
    title: string;
    subtitle: string;
    clasName?: string;
    showIcons: boolean;
    iconNotEditing?: JSX.Element;
    iconEditing?: JSX.Element;
    editing?: boolean;
    defaultValue?: string;
    errorMessages?: string[];
}

const EditableDetailItem = forwardRef(
    (
        {
            title,
            subtitle,
            clasName,
            iconNotEditing,
            iconEditing,
            editing = false,
            defaultValue,
            showIcons,
            errorMessages,
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
                                        className="bg-transparent w-full"
                                        onChange={(e) =>
                                            setValue(e.target.value)
                                        }
                                        ref={ref}
                                    />
                                    <div className="text-error">
                                        {errorMessages &&
                                            errorMessages.length > 0 &&
                                            errorMessages.map((error) => (
                                                <div
                                                    key={JSON.stringify(error)}
                                                >
                                                    {error}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-xl">{subtitle}</div>
                            )}
                            {showIcons && (
                                <div>
                                    {editing ? iconEditing : iconNotEditing}
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
