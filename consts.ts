export const filters = [
    {
        title: "Device type",
        buttons: [
            {
                label: "Synthesizer",
                filterKey: "synthesizer",
            },
            {
                label: "Drum machine",
                filterKey: "drumMachine",
            },
            {
                label: "Sampler",
                filterKey: "sampler",
            },
            {
                label: "Sequencer",
                filterKey: "sequencer",
            },
            {
                label: "MIDI controller",
                filterKey: "midiController",
            },
            {
                label: "MIDI device",
                filterKey: "midiDevice",
            },
            {
                label: "Audio interface",
                filterKey: "audioInterface",
            },
            {
                label: "Mixer",
                filterKey: "mixer",
            },
            {
                label: "Speaker",
                filterKey: "speaker",
            },
            {
                label: "Other",
                filterKey: "other",
            },
        ],
    },
    {
        title: "Connection type",
        buttons: [
            {
                label: "USB",
                filterKey: "usb",
            },
            {
                label: "MIDI In",
                filterKey: "midiIn",
            },
            {
                label: "MIDI Out",
                filterKey: "midiOut",
            },
            {
                label: "MIDI Thru",
                filterKey: "midiThru",
            },
            {
                label: "Autio In",
                filterKey: "audioIn",
            },
            {
                label: "Audio Out",
                filterKey: "audioOut",
            },
        ],
    },
    {
        title: "Form factor",
        buttons: [
            {
                label: "Desktop",
                filterKey: "desktop",
            },
            {
                label: "Rack",
                filterKey: "rack",
            },
            {
                label: "Floorstanding",
                filterKey: "floorstanding",
            },
        ],
    },
];

export const sortButtons = [
    {
        label: "Date Added: asc",
        sortKey: "dateAddedAsc",
    },
    {
        label: "Date Added: desc",
        sortKey: "dateAddedDesc",
    },
    {
        label: "Year Released: asc",
        sortKey: "yearReleasedAsc",
    },
    {
        label: "Year Released: desc",
        sortKey: "yearReleasedDesc",
    },
    {
        label: "Manufacturer: asc",
        sortKey: "manufacturerAsc",
    },
    {
        label: "Manufacturer: desc",
        sortKey: "manufacturerDesc",
    },
    {
        label: "Most used: asc",
        sortKey: "mostUsedAsc",
    },
    {
        label: "Most used: desc",
        sortKey: "mostUsedDesc",
    },
    {
        label: "Device type: asc",
        sortKey: "deviceTypeAsc",
    },
    {
        label: "Device type: desc",
        sortKey: "deviceTypeDesc",
    },
];
