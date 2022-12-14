import React, { FormEvent } from "react";
import CustomButton from "./CustomButton";
import FormDialog from "./FormDialog";

interface Props {
    handleSubmit: (e: FormEvent) => Promise<void>;
    onFormClick?: () => void;
    formMessages: string[];
    showFormMessages: boolean;
    submitButtonDisabled: boolean;
    children: React.ReactNode;
    buttonLabel: string;
}

const AuthForm = ({
    handleSubmit,
    onFormClick,
    formMessages,
    showFormMessages,
    submitButtonDisabled,
    children,
    buttonLabel,
}: Props) => {
    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flexCenter flex-col p-8"
            noValidate={true}
            onClick={onFormClick}
        >
            <div className="w-full flex flex-col justify-center items-center">
                <FormDialog
                    formMessages={formMessages}
                    showFormMessages={showFormMessages}
                />
                {children}
                <CustomButton
                    label={buttonLabel}
                    type="submit"
                    buttonClassName={`authSubmitButton ${
                        showFormMessages ? "pointer-events-none" : ""
                    }`}
                    disabled={submitButtonDisabled}
                />
            </div>
        </form>
    );
};

export default AuthForm;
