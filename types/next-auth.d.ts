import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken: string;
        user: {
            id: string;
            emailVerified: boolean;
            image: string;
            name: string;
        } & DefaultSession["user"];
    }
}
