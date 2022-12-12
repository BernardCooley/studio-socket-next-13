export const routes = [
    {
        name: "Landing",
        path: "/",
        protected: false,
        showInNav: false,
    },
    {
        name: "Login",
        path: "/login",
        protected: false,
        showInNav: false,
    },
    {
        name: "Register",
        path: "/register",
        protected: false,
        showInNav: false,
    },
    {
        name: "Dashboard",
        path: "/dashboard",
        protected: true,
        showInNav: true,
    },
    {
        name: "Devices",
        path: "/devices",
        protected: true,
        showInNav: true,
    },
    {
        name: "Studios",
        path: "/studios",
        protected: true,
        showInNav: true,
    },
    {
        name: "Account",
        path: "/account",
        protected: true,
        showInNav: false,
    },
    {
        name: "Settings",
        path: "/settings",
        protected: true,
        showInNav: false,
    },
];
