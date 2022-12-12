import React from "react";

interface Props {
    showFormMessages: boolean;
    formMessages: string[];
}

const FormDialog = ({ showFormMessages, formMessages }: Props) => {
    return (
        <>
            {showFormMessages && (
                <div className={``}>
                    {formMessages.map((message) => (
                        <div key={message}>{message}</div>
                    ))}
                </div>
            )}
        </>
    );
};

export default FormDialog;
