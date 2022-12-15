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

                if (res.email) {
                    return {
                        email: res.email,
                    };
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
