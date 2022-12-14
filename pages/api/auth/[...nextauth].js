import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/clientApp";

export default NextAuth({
    providers: [
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
    },
});
