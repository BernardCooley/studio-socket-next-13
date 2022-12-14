import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/clientApp";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;

                try {
                    const res = await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );

                    const user = {
                        email: res.user.email,
                    };

                    return user;
                } catch (e) {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/signin",
    },
    secret: process.env.JWT_SECRET,
    callbacks: {
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user.id = token.sub;
            return session;
        },
        async signIn({ credentials, provider }) {
            if (provider === "google") {
                try {
                    await signInWithEmailAndPassword(
                        auth,
                        credentials.email,
                        credentials.password
                    );
                    return true;
                } catch (e) {
                    return false;
                }
            } else {
                return true;
            }
        },
    },
});
