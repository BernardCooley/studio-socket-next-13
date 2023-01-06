export const devicesInclude = {
    id: true,
    slug: true,
    title: true,
    deviceId: true,
    countryOfManufacturer: true,
    datesProduced: true,
    signalPath: {
        select: {
            name: true,
        },
    },
    formFactor: {
        select: {
            name: true,
        },
    },
    manufacturers: {
        select: {
            name: true,
        },
    },
    deviceTypes: {
        select: {
            name: true,
        },
    },
    users: {
        select: {
            id: true,
        },
    },
    connections: {
        select: {
            connector: {
                select: {
                    name: true,
                },
            },
            description: {
                select: {
                    name: true,
                },
            },
            devices: {
                select: {
                    id: true,
                },
            },
        },
    },
};
