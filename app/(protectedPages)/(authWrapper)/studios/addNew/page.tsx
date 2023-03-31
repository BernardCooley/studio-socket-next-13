"use client";

import { Button } from "@chakra-ui/react";
import { addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import BackButton from "../../../../../components/BackButton";
import CustomTextInput from "../../../../../components/CustomTextInput";
import PageTitle from "../../../../../components/PageTitle";
import { useNavContext } from "../../../../../contexts/NavContext";
import { db } from "../../../../../firebase/clientApp";
import { StudioSchema } from "../../../../../formValidation";
import routes from "../../../../../routes";
import { NewStudio } from "../../../../../types";
import { getErrorMessages } from "../../../../../utils";

interface Props {}

const AddNewStudio = ({}: Props) => {
    // TODO: Test when db is back up
    const { environment, navOpen } = useNavContext();
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

                    setTimeout(() => {
                        router.push(routes.studio(docRef.id).as);
                    }, 2000);
                } catch (err: any) {}
            }

            return true;
        } catch (err: any) {
            setErrors(err.errors);
            return false;
        }
    };

    return (
        <div className={`pt-16 relative ${navOpen ? "disable" : ""}`}>
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
                        id="title"
                        type="text"
                        label="Title *"
                        name="title"
                        ref={titleRef}
                        errorMessages={getErrorMessages(errors, "title")}
                    />
                    <Button
                        mt="82px"
                        borderRadius="full"
                        size="2xl"
                        variant="primary"
                        type="submit"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddNewStudio;
