import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";

export default NextAuth({
    providers: [
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            issuer: process.env.AUTH0_ISSUER,
            authorization: {
                params: {
                    prompt: "login",
                },
            },
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.username,
                    email: profile.email,
                    image: profile.picture,
                    email_verified: profile.email_verified,
                };
            },
        }),
    ],
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
                token.email_verified = user.email_verified;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user.id = token.id;
            session.user.emailVerified = token.email_verified;

            return session;
        },
    },
});
