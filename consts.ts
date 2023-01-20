// TODO: Get filter tyles from API
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

export const deviceTypes = [
    "Please select",
    "Synthesizer",
    "Turntable",
    "Speaker",
    "DJ Mixer",
    "Headphones",
    "Sampler",
    "8-track deck",
    "Signal Distribution",
    "Effect",
    "EQ",
    "Turntable Accessory",
    "Amplifier, Pre",
    "Amplifier, Power",
    "Drum Machine",
    "Enclosure / Casing",
    "Mixing Desk",
    "Dynamics",
    "CD",
    "Audio Interface",
    "Instrument Tuner",
    "Turntable Cartridge",
    "Digital Recorder",
    "Power Supply",
    "Control Surface",
    "Media Player",
    "Amplifier, Integrated",
    "Cassette Deck",
    "Tape Machine",
    "Amplifier, Phono",
    "Cable",
    "Radio Receiver",
    "Minidisc",
    "Turntable Stylus",
    "Turntable Tonearm",
    "Receiver",
    "Accessory",
    "Synchronizer / Clock Generator",
    "Microphone",
    "Amplifier, Headphone",
    "Radio Tuner",
    "Amplifier, Guitar",
    "Media & Data Storage",
    "Amplifier, Microphone",
    "Crossover",
    "Turntable Spare Part",
    "Amplifier, Bass",
    "Analog-to-Digital Converter (ADC)",
    "Digital-to-Analog Converter (DAC)",
    "Sequencer",
];

export const connectionTypes = [
    "Please select",
    "RCA (Phono, Cinch)",
    "3.5mm Miniature Phone Jack (1/8)",
    "1/4 Phone Jack (6.35mm)",
    "DIN",
    "XLR",
    "Binding Post",
    "USB",
    "Other",
    "Terminal Block",
    "Binding Post (Universal)",
    "Firewire",
    "BNC",
    "JIS F05 (Toslink, ADAT Lightpipe)",
    "D-Sub",
    "Speakon",
    "RJ45",
    "Spring Terminal",
    "Banana",
    "Combo XLR / 1/4",
];
