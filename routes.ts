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
    addDevice: () => ({
        href: "/devices/addNew",
        as: `/devices/addNew/`,
    }),
    studios: () => ({
        href: "/studios",
        as: "/studios/",
    }),
    studio: (id: string) => ({
        href: "/studios/[id]",
        as: `/studios/${id}/`,
    }),
    addStudio: () => ({
        href: "/studios/addNew",
        as: `/studios/addNew/`,
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
