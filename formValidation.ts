import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8, { message: "Password must be 8 or more characters" }),
});

export const RegisterFormSchema = z
    .object({
        email: z.string().email(),
        password: z
            .string()
            .min(8, { message: "Password must be 8 or more characters" }),
        repeatPassword: z
            .string()
            .min(8, { message: "Password must be 8 or more characters" }),
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

export const getFormMessages = (
    errorCode: any,
    formMessages: string[] = []
) => {
    const messages: string[] = [];

    const errorMessages = [
        {
            code: "Firebase: Error (auth/user-not-found).",
            message: "Email/password incorrect.",
        },
        {
            code: "Firebase: Error (auth/wrong-password).",
            message: "Email/password incorrect.",
        },
        {
            code: "Firebase: Error (auth/too-many-requests).",
            message: "Too many attempts. Please try again later.",
        },
        {
            code: "Firebase: Error (auth/email-already-exists).",
            message: "User already exists.",
        },
        {
            code: "Firebase: Error (auth/email-already-in-use).",
            message: "User already exists.",
        },
        {
            code: "Firebase: Error (auth/internal-error).",
            message: "An error has occurred. Please try again later",
        },
    ];

    errorMessages.forEach((message) => {
        if (errorCode === message.code) {
            messages.push(message.message);
        }
    });

    return [...formMessages, ...messages];
};
