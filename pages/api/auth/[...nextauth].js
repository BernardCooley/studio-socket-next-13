import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "../../../supabase/supabaseClient";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;

                let { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                });

                if (data) {
                    const user = {
                        email: data.user.email,
                        id: data.user.id,
                    };
                    return user;
                }

                if (error) {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/signin",
        error: "/signin",
    },
    secret: process.env.JWT_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 3000,
    },
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken;
            session.user.id = token.id;

            return session;
        },
    },
});
