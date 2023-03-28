export const sortButtons = [
    // TODO: may not be sorting title correctly
    {
        label: "Title: asc",
        sortKey: [
            {
                title: "asc",
            },
        ],
    },
    {
        label: "Title: desc",
        sortKey: [
            {
                title: "desc",
            },
        ],
    },
    {
        label: "Dates produced: asc",
        sortKey: [
            {
                datesProduced: "asc",
            },
        ],
    },
    {
        label: "Dates produced: desc",
        sortKey: [
            {
                datesProduced: "desc",
            },
        ],
    },
    {
        label: "Country: asc",
        sortKey: [
            {
                countryOfManufacturer: "asc",
            },
        ],
    },
    {
        label: "Country: desc",
        sortKey: [
            {
                countryOfManufacturer: "desc",
            },
        ],
    },
];

export const defaultFilterList = [
    {
        name: "deviceTypes",
        filters: [""],
    },
    {
        name: "connectors",
        filters: [""],
    },
    {
        name: "formFactors",
        filters: [""],
    },
];

export const defaultSortList = [
    {
        title: "asc",
    },
];
