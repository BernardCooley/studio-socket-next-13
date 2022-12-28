import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
    sendEmailVerification,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../../firebase/clientApp";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;

                const signInPromise = new Promise((resolve, reject) => {
                    signInWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            resolve(userCredential.user);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });

                const res = await signInPromise;

                if (res.email && res.uid && res.emailVerified) {
                    return {
                        email: res.email,
                        id: res.uid,
                    };
                }
                if (!res.emailVerified) {
                    await sendEmailVerification(auth.currentUser);
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: "/signin",
        error: "/signin",
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
