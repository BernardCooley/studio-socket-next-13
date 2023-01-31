import { z } from "zod";
import { FormMessage, FormMessageTypes } from "./types";

export const SearchSchema = z.object({
    searchTerm: z
        .string()
        .min(3, { message: "Search term must be 3 characters or more" }),
});

export const AddDeviceSchema = z.object({
    title: z.string().min(3, { message: "Title must be 3 characters or more" }),
    manufacturer: z
        .string()
        .min(3, { message: "Manufacturermust be 3 characters or more" }),
    deviceType: z.string().min(1, { message: "Please select a device type" }),
});

export const ConnectionSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Connection name must be 3 characters or more" }),
    description: z
        .array(z.string())
        .min(1, { message: "Please add at least 1 description" }),
    connector: z.string().min(1, { message: "Please select a connector" }),
});

export const ConnectionDescriptionSchema = z.object({
    description: z
        .string()
        .min(3, { message: "Description name must be 3 characters or more" }),
});

export const StudioSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Studio title must be 3 characters or more" }),
});

export const UpdateUsernameSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Username must be 3 characters or more" })
        .max(25, { message: "Username must be 25 characters or less" })
        .regex(/^[a-zA-Z0-9]+$/, {
            message:
                "Username must be alphanumeric and not contain any spaces or special characters",
        }),
});

export const UpdateAvatarTypeSchema = z.object({
    avatar: z.string().regex(/jpg|jpeg|png/, {
        message: "Invalid file type (only jpg, jpeg and png allowed)",
    }),
});

export const UpdateAvatarSizeSchema = z.object({
    avatar: z.number().lte(1000000, {
        message: "File size must be less than 1MB",
    }),
});

export const UpdateEmailSchema = z.object({
    email: z.string().email(),
});

// TODO: Update form messages to reflect auth0 error codes
export const getFormMessages = (errorCode: any) => {
    const messages: Set<FormMessage> = new Set();

    const errorMessages = [
        {
            code: "email-already-exists",
            message: "Email already exists.",
        },
        {
            code: "invalid-argument",
            message: "Sometghing went wrong. Please try again later.",
        },
        {
            code: "internal-error",
            message: "Sometghing went wrong. Please try again later.",
        },
        {
            code: "auth/user-not-found",
            message: "Email/password incorrect.",
        },
        {
            code: "auth/wrong-password",
            message: "Email/password incorrect.",
        },
        {
            code: "auth/too-many-requests",
            message: "Too many attempts. Please try again later.",
        },
        {
            code: "auth/email-already-exists",
            message: "User already exists.",
        },
        {
            code: "auth/email-already-in-use",
            message: "User already exists.",
        },
        {
            code: "auth/internal-error",
            message: "An error has occurred. Please try again later",
        },
        {
            code: "CredentialsSignin",
            message: "Email address not verified. Please check your inbox.",
        },
    ];

    errorMessages.forEach((message) => {
        if (errorCode === message.code) {
            messages.add({
                message: message.message,
                type: FormMessageTypes.ERROR,
            });
        }
    });

    if (errorCode && messages.size === 0) {
        messages.add({
            message: "An error has occurred. Please try again later",
            type: FormMessageTypes.ERROR,
        });
    }

    return messages;
};
