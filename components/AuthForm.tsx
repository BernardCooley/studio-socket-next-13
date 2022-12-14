import React, { FormEvent } from "react";
import CustomButton from "./CustomButton";

interface Props {
    handleSubmit: (e: FormEvent) => Promise<void>;
    onFormClick?: () => void;
    children: React.ReactNode;
    buttonLabel: string;
}

const AuthForm = ({
    handleSubmit,
    onFormClick,
    children,
    buttonLabel,
}: Props) => {
    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flexCenter flex-col p-8 bg-primary-light"
            noValidate={true}
            onClick={onFormClick}
        >
            <div className="w-full flex flex-col justify-center items-center">
                {children}
                <CustomButton
                    label={buttonLabel}
                    type="submit"
                    buttonClassName={`authSubmitButton`}
                />
            </div>
        </form>
    );
};

export default AuthForm;
