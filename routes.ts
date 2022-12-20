/* eslint-disable import/no-anonymous-default-export */
export default {
    home: () => ({
        href: "/",
        as: "/",
    }),
    signin: () => ({
        href: "/signin",
        as: "/signin/",
    }),
    register: () => ({
        href: "/register",
        as: "/register/",
    }),
    dashboard: () => ({
        href: "/dashboard",
        as: "/dashboard/",
    }),
    devices: () => ({
        href: "/devices",
        as: "/devices/",
    }),
    device: (id: string) => ({
        href: "/devices/[id]",
        as: `/devices/${id}/`,
    }),
    studios: () => ({
        href: "/studios",
        as: "/studios/",
    }),
    studio: (id: string) => ({
        href: "/studio/[id]",
        as: `/studio/${id}/`,
    }),
    account: () => ({
        href: "/account",
        as: "/account/",
    }),
    settings: () => ({
        href: "/settings",
        as: "/settings/",
    }),
};
