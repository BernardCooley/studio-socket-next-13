import { z } from "zod";
import { FormMessage, FormMessageTypes } from "./types";

export const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: "Password must be 8 or more characters" }),
});

export const RegisterFormSchema = z
    .object({
        username: z
            .string()
            .min(3, { message: "Username must be 3 or more characters" }),
        email: z.string().email(),
        password: z
            .string()
            .min(8, { message: "Password must be 8 or more characters" }),
        repeatPassword: z
            .string()
            .min(8, { message: "Password must be 8 or more characters" }),
        avatar: z.union([
            z.string().regex(/jpg|jpeg|png/, {
                message: "Invalid file type (only jpg, jpeg and png allowed)",
            }),
            z.null(),
        ]),
    })
    .superRefine(({ repeatPassword, password }, ctx) => {
        if (repeatPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
                path: ["repeatPassword"],
            });
        }
    });

export const SearchSchema = z.object({
    search: z
        .string()
        .min(3, { message: "Search term must be 3 or more characters" }),
});

export const AddDeviceSchema = z.object({
    title: z.string().min(3, { message: "Title must be 3 or more characters" }),
    manufacturer: z
        .string()
        .min(3, { message: "Manufacturermust be 3 or more characters" }),
    deviceType: z.string().min(1, { message: "Please select a device type" }),
});

export const ConnectionSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Connection name must be 3 or more characters" }),
    description: z
        .array(z.string())
        .min(1, { message: "Please add at least 1 description" }),
    connector: z.string().min(1, { message: "Please select a connector" }),
});

export const ConnectionDescriptionSchema = z.object({
    description: z
        .string()
        .min(3, { message: "Description name must be 3 or more characters" }),
});

export const StudioSchema = z.object({
    title: z
        .string()
        .min(3, { message: "Studio title must be 3 or more characters" }),
});

export const UpdateUsernameSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Username must be 3 or more characters" }),
});

export const UpdateEmailSchema = z.object({
    email: z.string().email(),
});

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
