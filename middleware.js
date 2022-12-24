export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/devices/:path*",
        "/studios/:path*",
        "/account/:path*",
        "/settings/:path*",
    ],
    callbacks: {
        authorized({ req, token }) {
            if (token) return true;
        },
    },
};
