"use client";

import { addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import BackButton from "../../../../components/BackButton";
import CustomButton from "../../../../components/CustomButton";
import CustomTextInput from "../../../../components/CustomTextInput";
import PageTitle from "../../../../components/PageTitle";
import { useFormContext } from "../../../../contexts/FormContext";
import { useNavContext } from "../../../../contexts/NavContext";
import { db } from "../../../../firebase/clientApp";
import { getFormMessages, StudioSchema } from "../../../../formValidation";
import Icons from "../../../../icons";
import routes from "../../../../routes";
import { FormMessageTypes, NewStudio } from "../../../../types";
import { getErrorMessages } from "../../../../utils";

interface Props {}

const AddNewStudio = ({}: Props) => {
    // TODO: Test when db is back up
    const { formMessages, addFormMessages, updateIcon } = useFormContext();
    const { environment } = useNavContext();
    const router = useRouter();
    const [errors, setErrors] = useState([]);
    const titleRef = useRef<HTMLInputElement>(null);
    const { data: user } = useSession();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            StudioSchema.parse({
                title: titleRef.current?.value,
            });
            setErrors([]);

            if (titleRef.current && user) {
                addFormMessages(
                    new Set([
                        {
                            message: "Adding new studio...",
                            type: FormMessageTypes.INFO,
                        },
                    ])
                );
                updateIcon(
                    <Icons iconType="keyboard" className="text-primary" />
                );

                const newStudio: NewStudio = {
                    title: titleRef.current.value,
                    createdAt: new Date(),
                    userId: user.user.id,
                    devices: [],
                };

                try {
                    const docRef = await addDoc(
                        collection(
                            db,
                            environment === "prod" ? "studios" : "testStudios"
                        ),
                        newStudio
                    );

                    addFormMessages(
                        new Set([
                            {
                                message: "New studio saved",
                                type: FormMessageTypes.INFO,
                            },
                        ])
                    );

                    setTimeout(() => {
                        addFormMessages(new Set([]));
                        router.push(routes.studio(docRef.id).as);
                    }, 2000);
                } catch (err: any) {
                    addFormMessages(getFormMessages(err.code));
                }
            }

            return true;
        } catch (err: any) {
            setErrors(err.errors);
            return false;
        }
    };

    return (
        <div className="pt-16 relative">
            <div className="absolute left-6">
                <BackButton />
            </div>
            <PageTitle title="Add new studio" />
            <form
                onSubmit={handleSubmit}
                className="w-full flexCenter flex-col p-8 bg-primary-light"
                noValidate={true}
            >
                <div className="w-full flex flex-col justify-center items-center">
                    <CustomTextInput
                        className={`${
                            formMessages.size > 0 ? "pointer-events-none" : ""
                        }`}
                        id="title"
                        type="text"
                        label="Title *"
                        name="title"
                        ref={titleRef}
                        errorMessages={getErrorMessages(errors, "title")}
                    />
                    <CustomButton
                        label="Save"
                        type="submit"
                        buttonClassName={`authSubmitButton mt-10`}
                    />
                </div>
            </form>
        </div>
    );
};

export default AddNewStudio;
