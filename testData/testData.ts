import { Studio } from "../types";

export const formErrorMessages = [
    "Email/password incorrect.",
    "Too many attempts. Please try again later.",
    "User already exists.",
];

export const options = [
    {
        value: "",
        label: "Please select",
    },
    {
        value: "1",
        label: "Option 1",
    },
    {
        value: "2",
        label: "Option 2",
    },
    {
        value: "3",
        label: "Option 3",
    },
    {
        value: "4",
        label: "Option 4",
    },
    {
        value: "5",
        label: "Option 5",
    },
    {
        value: "6",
        label: "Option 6",
    },
    {
        value: "7",
        label: "Option 7",
    },
    {
        value: "8",
        label: "Option 8",
    },
];

export const testStudios: Studio[] = [
    {
        id: "1",
        title: "Studio 1",
        devices: [
            {
                id: "1",
                name: "Device 1",
                connections: [
                    {
                        connector: "Connector 1",
                        description: ["Description 1", "Description 2"],
                        name: "Name 1",
                        connectedTo: ["Connected to 1", "Connected to 2"],
                    },
                ],
            },
        ],
        userId: "1",
        image: {
            url: "https://picsum.photos/200/300",
            name: "Image 1",
        },
        createdAt: new Date("2021-01-01"),
    },
    {
        id: "2",
        title: "Studio 2",
        devices: [
            {
                id: "2",
                name: "Device 2",
                connections: [
                    {
                        connector: "Connector 2",
                        description: ["Description 2", "Description 3"],
                        name: "Name 2",
                        connectedTo: ["Connected to 2", "Connected to 3"],
                    },
                ],
            },
        ],
        userId: "2",
        image: {
            url: "https://picsum.photos/200/300",
            name: "Image 2",
        },
        createdAt: new Date("2020-03-09"),
    },
    {
        id: "3",
        title: "Studio 3",
        devices: [
            {
                id: "3",
                name: "Device 3",
                connections: [
                    {
                        connector: "Connector 3",
                        description: ["Description 3", "Description 4"],
                        name: "Name 3",
                        connectedTo: ["Connected to 3", "Connected to 4"],
                    },
                ],
            },
        ],
        userId: "3",
        image: {
            url: "https://picsum.photos/200/300",
            name: "Image 3",
        },
        createdAt: new Date("2021-10-02"),
    },
];
