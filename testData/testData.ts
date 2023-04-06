import { Edge, Position } from "reactflow";
import { Studio } from "../types";
import { IDeviceNode } from "../bff/types";

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

export const userDevicesTest = [
    {
        deviceTypes: ["Turntable Accessory"],
        manufacturers: ["End of an Ear"],
        slug: "89593-end-of-an-ear-45-adapter",
        id: 89593,
        dates_produced: "",
        title: "45 Adapter",
    },
    {
        deviceTypes: ["Amplifier, Power"],
        signal_path: "Analog Hardware",
        country_of_manufacture: "Denmark",
        form_factor: "Standard Width",
        id: 47133,
        model_number: "Reference 1",
        channels_voices_tracks: [
            {
                additional_information: "",
                type: "Channel",
                quantity: "1",
            },
        ],
        title: "Reference Monoblock",
        dates_produced: "1992 to 1996",
        dimensions_string: "",
        frequency_response: "10Hz-350kHz ±1.5dB",
        manufacturers: ["Gryphon Audio Designs"],
        slug: "47133-gryphon-audio-designs-reference-monoblock",
        connections: [
            {
                description: ["Balanced", "Socket (Female)", "Mono"],
                connector: "XLR",
                name: "Input",
            },
            {
                connector: "Binding Post",
                description: ["Mono"],
                name: "Output",
            },
        ],
        power_source: "100-120V +10%/200-240V +10%",
        image: {
            url: "https://firebasestorage.googleapis.com/v0/b/studio-socket.appspot.com/o/gear_images%2F47133.png?alt=media&token=3ea4a9fc-5d34-480f-9635-22bfa1e378ce",
            name: "47133.png",
        },
    },
    {
        frequency_response:
            "35 Hz ~ 14 kHz ±3db (Normal Tape), 35 Hz ~ 15 kHz ±3db (CrO2 Tape), 35 Hz ~ 14 kHz ±3db (Metal Tape)",
        manufacturers: ["Marantz"],
        form_factor: "Portable",
        signal_path: "Analog Hardware",
        external_links: [
            {
                notes: "walkman-archive.com",
                url: "http://www.walkman-archive.com/wa/project/marantz-pmd-430-3-head-walkman-in-very-good-condition-serviced-and-working/#!prettyPhoto[gallery]/0/",
            },
        ],
        id: 47196,
        dates_produced: "1984 ?",
        dimensions_string: "227mm (9) x 50mm (2) x 165mm (6.5)",
        displays_indicators_meters: [
            {
                scale: "",
                indication: "",
                type: "Volume Unit (VU) meter",
            },
        ],
        model_number: "CP430",
        power_source: "120 V 50/60 Hz (Battery 3D cells or RB430)",
        slug: "47196-marantz-pmd430",
        channels_voices_tracks: [],
        country_of_manufacture: "Designed in USA & Produced in Japan",
        title: "PMD430",
        connections: [
            {
                connector: "DIN",
                description: [],
                name: "REC/Play (5 pin)",
            },
            {
                description: ["Stereo"],
                connector: "RCA (Phono, Cinch)",
                name: "In/Out",
            },
            {
                description: ["Stereo"],
                connector: "1/4 Phone Jack (6.35mm)",
                name: "Mic",
            },
            {
                description: ["Stereo"],
                connector: "1/4 Phone Jack (6.35mm)",
                name: "Phones",
            },
        ],
        deviceTypes: ["Tape Machine", "Tape Machine"],
        image: {
            url: "https://firebasestorage.googleapis.com/v0/b/studio-socket.appspot.com/o/gear_images%2F47196.png?alt=media&token=4704a5d3-b2bd-4d70-b62f-953d25346add",
            name: "47196.png",
        },
    },
    {
        country_of_manufacture: "Japan",
        title: "SB-E100",
        signal_path: "Analog Hardware",
        id: 47225,
        slug: "47225-technics-sb-e100",
        manufacturers: ["Technics"],
        form_factor: "Freestanding",
        deviceTypes: ["Speaker"],
        dates_produced: "1978",
        image: {
            url: "https://firebasestorage.googleapis.com/v0/b/studio-socket.appspot.com/o/gear_images%2F47225.png?alt=media&token=b8df456b-3676-417a-871f-e482e97d975d",
            name: "47225.png",
        },
    },
    {
        country_of_manufacture: "",
        id: 47311,
        form_factor: "Keyboard",
        title: "Sub 37",
        channels_voices_tracks: [
            {
                type: "Voice",
                quantity: "1",
                additional_information: "",
            },
        ],
        deviceTypes: ["Synthesizer"],
        slug: "47311-moog-sub-37",
        signal_path: "Analog Hardware",
        manufacturers: ["Moog"],
        image: {
            url: "https://firebasestorage.googleapis.com/v0/b/studio-socket.appspot.com/o/gear_images%2F47311.png?alt=media&token=e4221e84-1a0e-43e8-91ee-d586dabddb6d",
            name: "47311.png",
        },
    },
    {
        id: 3416,
        manufacturers: ["Roland", "Roland Boutique"],
        signal_path: "Hybrid Analog / Digital Hardware",
        dates_produced: "2015 -",
        country_of_manufacture: "China",
        channels_voices_tracks: [
            {
                quantity: "4",
                additional_information: "",
                type: "Voice",
            },
        ],
        deviceTypes: ["Synthesizer", "Sequencer", "Audio Interface"],
        slug: "3416-roland-jx-03",
        connections: [
            {
                name: "MIDI IN",
                description: ["Socket (Female)"],
                connector: "DIN",
            },
            {
                description: ["Socket (Female)"],
                connector: "DIN",
                name: "MIDI OUT",
            },
            {
                description: ["Stereo", "Socket (Female)"],
                connector: "3.5mm Miniature Phone Jack (1/8)",
                name: "LINE OUTPUT",
            },
            {
                name: "LINE INPUT",
                connector: "3.5mm Miniature Phone Jack (1/8)",
                description: ["Stereo", "Socket (Female)"],
            },
            {
                connector: "USB",
                description: ["Socket (Female)"],
                name: "USB",
            },
        ],
        power_source: "(AA, LR6) x 4 - USB Bus power - 500mA",
        dimensions_string: "300 x 128 x 46 mm (WxDxH)",
        controls: [
            {
                control_type: "Rotary Pot",
                range: "",
                parameter: "VOLUME",
            },
        ],
        title: "JX-03",
        form_factor: "Desktop",
        image: {
            url: "https://firebasestorage.googleapis.com/v0/b/studio-socket.appspot.com/o/gear_images%2F3416.png?alt=media&token=29515506-cd61-46e1-90ff-5beeb18d6c33",
            name: "3416.png",
        },
    },
    {
        channels_voices_tracks: [],
        id: 47475,
        title: "MPC 5000",
        manufacturers: ["Akai Professional"],
        form_factor: "Desktop",
        signal_path: "Digital Hardware (including Analog Connections)",
        deviceTypes: ["Sampler", "Sequencer", "Synthesizer"],
        slug: "47475-mpc-5000",
        image: {
            url: "https://firebasestorage.googleapis.com/v0/b/studio-socket.appspot.com/o/gear_images%2F47475.png?alt=media&token=b42d046d-cb3b-4843-97db-a0ab189ddd0c",
            name: "47475.png",
        },
    },
];

export const allDevicesTest = [
    {
        power_source: "Mains, 110v / 220v selectable",
        country_of_manufacture: "Japan",
        title: "SL-1210 MK2",
        form_factor: "Tabletop",
        slug: "8-sl-1210-mk2",
        channels_voices_tracks: [
            {
                type: "Channel",
                quantity: 1,
                additional_information: "",
            },
        ],
        dimensions: [
            {
                width: 0.453,
                height: 0.162,
                depth: 0.36,
            },
        ],
        manufacturers: ["Technics"],
        dates_produced: "1979 - 2010",
        frequency_response: "",
        displays_indicators_meters: [
            {
                indication: "On / Speed Strobe",
                scale: "",
                type: "Light",
            },
            {
                type: "LED",
                scale: "",
                indication: "Centre Pitch Indicator",
            },
        ],
        id: 8,
        deviceTypes: ["Turntable"],
        external_links: [
            {
                url: "http://www.manualslib.com/manual/387774/Technics-Sl-1200mk2.html#product-SL-1210MK2",
                notes: "User Manual",
            },
            {
                url: "http://www.service-manual.eu/model.php?id=885",
                notes: "Service Manual",
            },
        ],
        signal_path: "Analog Hardware",
        controls: [
            {
                group: "",
                range: "+/- 8%",
                parameter: "Pitch",
                control_type: "Slide Pot",
            },
            {
                group: "",
                parameter: "Speed",
                range: "33.3 RPM",
                control_type: "Momentary Push Switch",
            },
            {
                parameter: "Speed",
                range: "45 RPM",
                control_type: "Momentary Push Switch",
            },
            {
                control_type: "Latching Push Switch",
                group: "",
                parameter: "Start/Stop",
                range: "",
            },
            {
                range: "",
                group: "",
                control_type: "Rotary Pot with Switch",
                parameter: "On/Off",
            },
        ],
        connections: [
            {
                description: ["Plug (Male)", "Cable Mount"],
                name: "Audio Out",
                connector: "RCA (Phono, Cinch)",
            },
        ],
    },
    {
        frequency_response: "20Hz-25kHz ±2dB",
        manufacturers: ["Cerwin Vega"],
        dimensions: [
            {
                height: 1.8288036576073152,
                depth: 0,
                width: 0.15240030480060962,
                notes: "Line Array",
            },
            {
                notes: "Line Array with Wings",
                width: 0.30480060960121924,
                depth: 0,
                height: 1.8288036576073152,
            },
            {
                width: 0.8128016256032513,
                depth: 0.5080010160020321,
                notes: "Midbass/Bass Unit",
                height: 0.4572009144018288,
            },
        ],
        dates_produced: "1979",
        deviceTypes: ["Speaker"],
        form_factor: "Floorstanding",
        country_of_manufacture: "United States",
        id: 102989,
        title: "Metron SUFT-FET",
        slug: "102989-metron-suft-fet",
        image: {
            url: "https://firebasestorage.googleapis.com/v0/b/studio-socket.appspot.com/o/gear_images%2F102989.png?alt=media&token=2c867e84-c2ca-483d-8b2e-07da8007c021",
            name: "102989.png",
        },
    },
    {
        power_source: "Eurorack +/- 12 Volts",
        slug: "24-intellijel-dixie-ii",
        title: "Dixie II",
        channels_voices_tracks: [
            {
                type: "Voice",
                quantity: "1",
                additional_information: "",
            },
        ],
        controls: [
            {
                control_type: "Rotary Pot",
                parameter: "Coarse (Tune)",
                range: "VCO: 1hz to 24khz, LFO: 0.01hz (100 seconds) to 240hz",
                group: "",
            },
            {
                control_type: "Rotary Pot",
                parameter: "Fine (Tune)",
                range: "+6 to -6 Semitones",
                group: "",
            },
            {
                range: "",
                group: "",
                control_type: "Slide Switch",
                parameter: "LFO / VCO",
            },
        ],
        dimensions_string: "6hp",
        form_factor: "Modular - Eurorack",
        signal_path: "Analog Hardware",
        country_of_manufacture: "Canada",
        id: 24,
        manufacturers: ["Intellijel"],
        deviceTypes: ["Synthesizer"],
        external_links: [
            {
                url: "http://www.intellijel.com/eurorack-modules/dixie-ii/",
                notes: "Manufacturers Page",
            },
        ],
        connections: [
            {
                description: [],
                name: "1v/Oct",
                connector: "3.5mm Miniature Phone Jack (1/8)",
            },
            {
                name: "Lin FM",
                connector: "3.5mm Miniature Phone Jack (1/8)",
                description: [],
            },
            {
                description: [],
                name: "Sync",
                connector: "3.5mm Miniature Phone Jack (1/8)",
            },
            {
                description: [],
                connector: "3.5mm Miniature Phone Jack (1/8)",
                name: "PWM",
            },
            {
                name: "Triangle Out",
                connector: "3.5mm Miniature Phone Jack (1/8)",
                description: [],
            },
            {
                name: "Sine Out",
                description: [],
                connector: "3.5mm Miniature Phone Jack (1/8)",
            },
            {
                description: [],
                connector: "3.5mm Miniature Phone Jack (1/8)",
                name: "Sawtooth Out",
            },
            {
                name: "Zigzag Out",
                connector: "3.5mm Miniature Phone Jack (1/8)",
                description: [],
            },
            {
                connector: "3.5mm Miniature Phone Jack (1/8)",
                description: [],
                name: "Square Out",
            },
            {
                name: "Pulse Out",
                connector: "3.5mm Miniature Phone Jack (1/8)",
                description: [],
            },
        ],
        displays_indicators_meters: [
            {
                indication: "Frequency",
                type: "LED",
                scale: "",
            },
        ],
        image: {
            url: "https://firebasestorage.googleapis.com/v0/b/studio-socket.appspot.com/o/gear_images%2F24.png?alt=media&token=bd91d0eb-3b3c-4cda-b6fd-dd7ee2dd4f1a",
            name: "24.png",
        },
    },
    {
        deviceTypes: ["Turntable Accessory"],
        id: 89593,
        manufacturers: ["End of an Ear"],
        dates_produced: "",
        slug: "89593-end-of-an-ear-45-adapter",
        title: "45 Adapter",
    },
    {
        channels_voices_tracks: [
            {
                type: "Voice",
                additional_information: "",
                quantity: "8",
            },
        ],
        model_number: "1000",
        manufacturers: ["E-mu", "E-mu Systems, Inc."],
        country_of_manufacture: "USA",
        controls: [
            {
                group: "",
                parameter: "Volume",
                range: "",
                control_type: "Slide Pot",
            },
            {
                range: "",
                parameter: "Data",
                control_type: "Slide Encoder",
                group: "",
            },
            {
                control_type: "Momentary Push Switch",
                parameter: "Numerical Keypad",
                group: "",
                range: "",
            },
            {
                control_type: "Momentary Push Switch",
                range: "",
                parameter: "Yes, No",
            },
            {
                range: "",
                parameter: "Left, Right",
                control_type: "Momentary Push Switch",
            },
            {
                control_type: "Momentary Push Switch",
                range: "",
                parameter: "Transpose",
            },
            {
                parameter: "Dynamic Allocation",
                range: "",
                control_type: "Momentary Push Switch",
            },
            {
                control_type: "Momentary Push Switch",
                range: "",
                parameter: "Load All",
            },
            {
                range: "",
                control_type: "Momentary Push Switch",
                parameter: "Enter",
            },
            {
                control_type: "Momentary Push Switch",
                range: "",
                parameter: "Sequencer: Select",
            },
            {
                range: "",
                control_type: "Momentary Push Switch",
                parameter: "Sequencer: Setup",
            },
            {
                range: "",
                control_type: "Momentary Push Switch",
                parameter: "Sequencer: Manage",
            },
            {
                control_type: "Momentary Push Switch",
                range: "",
                parameter: "Sequencer: Record",
            },
            {
                control_type: "Momentary Push Switch",
                parameter: "Sequencer: Play",
                range: "",
            },
            {
                parameter: "Sequencer: Stop",
                range: "",
                control_type: "Momentary Push Switch",
            },
            {
                parameter: "Modules: Master",
                control_type: "Momentary Push Switch",
                range: "",
            },
            {
                control_type: "Momentary Push Switch",
                range: "",
                parameter: "Modules: Sample",
            },
            {
                range: "",
                parameter: "Modules: Digital Processing",
                control_type: "Momentary Push Switch",
            },
            {
                control_type: "Momentary Push Switch",
                parameter: "Modules: Preset Management",
                range: "",
            },
            {
                range: "",
                control_type: "Momentary Push Switch",
                parameter: "Modules: Preset Definition",
            },
            {
                range: "",
                parameter: "Modules: Analog Processing",
                control_type: "Momentary Push Switch",
            },
        ],
        displays_indicators_meters: [
            {
                indication: "",
                type: "16 x 2 LCD Display",
                scale: "",
            },
        ],
        form_factor: "Keyboard",
        slug: "3398-e-mu-emax-se",
        id: 3398,
        deviceTypes: ["Sampler"],
        dates_produced: "1986 - ?",
        power_source: "240 / 120 Volts, Switchable",
        connections: [
            {
                name: "Sample Input, Left /Stereo, Right / Mono, Channel Outputs 1-8",
                connector: "1/4 Phone Jack (6.35mm)",
                description: ["Unbalanced"],
            },
            {
                name: "Foot Switch 1 / 2, Clock In / Out, Pedal",
                description: ["Unbalanced"],
                connector: "1/4 Phone Jack (6.35mm)",
            },
            {
                description: ["5 Way"],
                name: "Midi In, Midi Out / Thru",
                connector: "DIN",
            },
        ],
        title: "Emax SE",
        signal_path: "Hybrid Analog / Digital Hardware",
        dimensions_string: "",
    },
    {
        connections: [
            {
                name: "Input",
                description: ["Balanced", "Socket (Female)", "Mono"],
                connector: "XLR",
            },
            {
                connector: "Binding Post",
                name: "Output",
                description: ["Mono"],
            },
        ],
        dates_produced: "1992 to 1996",
        frequency_response: "10Hz-350kHz ±1.5dB",
        power_source: "100-120V +10%/200-240V +10%",
        title: "Reference Monoblock",
        signal_path: "Analog Hardware",
        deviceTypes: ["Amplifier, Power"],
        country_of_manufacture: "Denmark",
        id: 47133,
        model_number: "Reference 1",
        channels_voices_tracks: [
            {
                additional_information: "",
                type: "Channel",
                quantity: "1",
            },
        ],
        form_factor: "Standard Width",
        dimensions_string: "",
        slug: "47133-gryphon-audio-designs-reference-monoblock",
        manufacturers: ["Gryphon Audio Designs"],
        image: {
            url: "https://firebasestorage.googleapis.com/v0/b/studio-socket.appspot.com/o/gear_images%2F47133.png?alt=media&token=3ea4a9fc-5d34-480f-9635-22bfa1e378ce",
            name: "47133.png",
        },
    },
    {
        manufacturers: ["Sony"],
        channels_voices_tracks: [
            {
                type: "Channel",
                additional_information: "",
                quantity: "7.1",
            },
        ],
        deviceTypes: ["Amplifier, Integrated"],
        signal_path: "Digital Hardware (including Analog Connections)",
        id: 47135,
        slug: "47135-sony-str-dn850",
        title: "STR DN850",
        displays_indicators_meters: [],
        controls: [],
    },
    {
        slug: "47139-novation-x-station-25",
        form_factor: "Keyboard",
        manufacturers: ["Novation"],
        connections: [
            {
                connector: "",
                description: [],
                name: "USB",
            },
        ],
        deviceTypes: ["Synthesizer", "Audio Interface"],
        title: "X Station 25",
        id: 47139,
        signal_path: "Digital Hardware (including Analog Connections)",
    },
    {
        id: 47196,
        power_source: "120 V 50/60 Hz (Battery 3D cells or RB430)",
        dimensions_string: "227mm (9) x 50mm (2) x 165mm (6.5)",
        signal_path: "Analog Hardware",
        country_of_manufacture: "Designed in USA & Produced in Japan",
        slug: "47196-marantz-pmd430",
        dates_produced: "1984 ?",
        frequency_response:
            "35 Hz ~ 14 kHz ±3db (Normal Tape), 35 Hz ~ 15 kHz ±3db (CrO2 Tape), 35 Hz ~ 14 kHz ±3db (Metal Tape)",
        channels_voices_tracks: [],
        title: "PMD430",
        connections: [
            {
                description: [],
                connector: "DIN",
                name: "REC/Play (5 pin)",
            },
            {
                description: ["Stereo"],
                name: "In/Out",
                connector: "RCA (Phono, Cinch)",
            },
            {
                connector: "1/4 Phone Jack (6.35mm)",
                description: ["Stereo"],
                name: "Mic",
            },
            {
                description: ["Stereo"],
                name: "Phones",
                connector: "1/4 Phone Jack (6.35mm)",
            },
        ],
        form_factor: "Portable",
        displays_indicators_meters: [
            {
                indication: "",
                type: "Volume Unit (VU) meter",
                scale: "",
            },
        ],
        manufacturers: ["Marantz"],
        model_number: "CP430",
        deviceTypes: ["Tape Machine", "Tape Machine"],
        external_links: [
            {
                url: "http://www.walkman-archive.com/wa/project/marantz-pmd-430-3-head-walkman-in-very-good-condition-serviced-and-working/#!prettyPhoto[gallery]/0/",
                notes: "walkman-archive.com",
            },
        ],
        image: {
            url: "https://firebasestorage.googleapis.com/v0/b/studio-socket.appspot.com/o/gear_images%2F47196.png?alt=media&token=4704a5d3-b2bd-4d70-b62f-953d25346add",
            name: "47196.png",
        },
    },
    {
        manufacturers: ["Behringer"],
        slug: "47204-behringer-nox-606",
        id: 47204,
        deviceTypes: ["DJ Mixer"],
        country_of_manufacture: "China",
        form_factor: "Desktop",
        signal_path: "Digital Hardware (including Analog Connections)",
        title: "NOX 606",
        image: {
            url: "https://firebasestorage.googleapis.com/v0/b/studio-socket.appspot.com/o/gear_images%2F47204.png?alt=media&token=128073b2-13b3-4324-8c7d-21818df81755",
            name: "47204.png",
        },
    },
    {
        title: "SB-E100",
        country_of_manufacture: "Japan",
        dates_produced: "1978",
        id: 47225,
        slug: "47225-technics-sb-e100",
        form_factor: "Freestanding",
        manufacturers: ["Technics"],
        signal_path: "Analog Hardware",
        deviceTypes: ["Speaker"],
        image: {
            url: "https://firebasestorage.googleapis.com/v0/b/studio-socket.appspot.com/o/gear_images%2F47225.png?alt=media&token=b8df456b-3676-417a-871f-e482e97d975d",
            name: "47225.png",
        },
    },
    {
        form_factor: "Portable",
        deviceTypes: ["Tape Machine"],
        id: 47230,
        dates_produced: "1999-2003",
        signal_path: "Analog Hardware",
        manufacturers: ["Sony", "Walkman"],
        slug: "47230-sony-wm-fx888",
        country_of_manufacture: "Japan",
        title: "WM-FX888",
    },
    {
        title: "WM-EX615",
        manufacturers: ["Sony", "Walkman"],
        slug: "47233-sony-wm-ex615",
        form_factor: "Portable",
        dates_produced: "2000",
        country_of_manufacture: "Japan",
        id: 47233,
        deviceTypes: ["Tape Machine"],
    },
    {
        external_links: [
            {
                url: "http://www.rolls.com/product.php?pid=VP29",
                notes: "Company Site",
            },
            {
                url: "http://www.rolls.com/pdf/M_VP29.pdf",
                notes: "Manual",
            },
        ],
        slug: "47240-rolls-vp29",
        connections: [
            {
                connector: "RCA (Phono, Cinch)",
                description: [],
                name: "RCA in",
            },
            {
                connector: "RCA (Phono, Cinch)",
                description: [],
                name: "RCA out",
            },
            {
                name: "1/8'' out",
                description: [],
                connector: "3.5mm Miniature Phone Jack (1/8)",
            },
        ],
        title: "VP29",
        controls: [],
        form_factor: "Desktop",
        power_source: "12-15V DC",
        id: 47240,
        deviceTypes: ["Amplifier, Pre"],
        manufacturers: ["Rolls"],
        dimensions_string: "3.25''x2''x1.5''",
        country_of_manufacture: "USA",
        channels_voices_tracks: [],
        frequency_response: "+ / - 1.5dB 20 Hz - 20 kHz",
        image: {
            url: "https://firebasestorage.googleapis.com/v0/b/studio-socket.appspot.com/o/gear_images%2F47240.png?alt=media&token=4f289b68-5d95-45a5-a813-9a8143fe094e",
            name: "47240.png",
        },
    },
    {
        displays_indicators_meters: [
            {
                type: "Display",
                scale: "16x2",
                indication: "LCD backlit",
            },
        ],
        form_factor: "Keyboard",
        power_source: "12V 500mA - Kawai PS-121G",
        channels_voices_tracks: [
            {
                type: "Voice",
                quantity: "16",
                additional_information: "",
            },
        ],
        country_of_manufacture: "Japan",
        manufacturers: ["Kawai"],
        id: 47242,
        controls: [],
        connections: [
            {
                description: ["Stereo"],
                name: "L/R",
                connector: "1/4 Phone Jack (6.35mm)",
            },
            {
                connector: "1/4 Phone Jack (6.35mm)",
                description: [],
                name: "Headphones",
            },
            {
                description: [],
                name: "MIDI IN",
                connector: "DIN",
            },
            {
                description: [],
                connector: "DIN",
                name: "MIDI THRU",
            },
            {
                name: "MIDI OUT",
                connector: "DIN",
                description: [],
            },
        ],
        deviceTypes: ["Synthesizer"],
        slug: "47242-kawai-k4",
        external_links: [
            {
                notes: "PDF Manual",
                url: "https://www.google.cz/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&cad=rja&uact=8&ved=0ahUKEwiCm9iqyonTAhWGApoKHRTRCyYQFggqMAE&url=https%3A%2F%2Fwww.kawaius-tsd.com%2FOM%2FK_SYNTH%2FKC10SP~1.PDF&usg=AFQjCNFTa9yJDyFIY_PoWd8ZxaBkC2sZxQ&sig2=Yt21S8M66cVLbC9jOON9ZQ",
            },
        ],
        dimensions_string: "1020mm x 310,8mm x 88,5mm",
        title: "K4",
        dates_produced: "1989",
        signal_path: "Digital Hardware (including Analog Connections)",
        image: {
            url: "https://firebasestorage.googleapis.com/v0/b/studio-socket.appspot.com/o/gear_images%2F47242.png?alt=media&token=ca29ed6a-f676-4099-b4dc-de0c872e221d",
            name: "47242.png",
        },
    },
    {
        dates_produced: "2015 -",
        manufacturers: ["Roland", "Roland Boutique"],
        slug: "3414-roland-ju-06",
        controls: [
            {
                control_type: "Rotary Pot",
                parameter: "VOLUME",
                range: "",
            },
            {
                range: "ON, OFF",
                control_type: "Slide Switch",
                parameter: "POWER",
            },
        ],
        deviceTypes: ["Synthesizer", "Sequencer", "Audio Interface"],
        id: 3414,
        form_factor: "Desktop",
        country_of_manufacture: "China",
        title: "JU-06",
        signal_path: "Hybrid Analog / Digital Hardware",
        channels_voices_tracks: [
            {
                type: "Voice",
                quantity: "4",
                additional_information: "",
            },
        ],
        power_source: "(AA, LR6) x 4 - USB Bus power - 500mA",
        dimensions_string: "300 x 128 x 45 mm (WxDxH)",
        connections: [
            {
                name: "MIDI IN",
                connector: "DIN",
                description: ["Socket (Female)"],
            },
            {
                description: ["Socket (Female)"],
                name: "MIDI OUT",
                connector: "DIN",
            },
            {
                connector: "3.5mm Miniature Phone Jack (1/8)",
                name: "LINE OUTPUT",
                description: ["Stereo", "Socket (Female)"],
            },
            {
                connector: "3.5mm Miniature Phone Jack (1/8)",
                name: "LINE INPUT",
                description: ["Stereo", "Socket (Female)"],
            },
            {
                connector: "3.5mm Miniature Phone Jack (1/8)",
                description: ["Stereo", "Socket (Female)"],
                name: "PHONES",
            },
            {
                description: ["Socket (Female)"],
                name: "USB",
                connector: "USB",
            },
            {
                description: ["Socket (Female)"],
                connector: "Other",
                name: "KENSINGTON LOCK",
            },
        ],
        image: {
            url: "https://firebasestorage.googleapis.com/v0/b/studio-socket.appspot.com/o/gear_images%2F3414.png?alt=media&token=eba64496-9c72-41b2-a808-22ca71506a91",
            name: "3414.png",
        },
    },
    {
        channels_voices_tracks: [
            {
                additional_information: "",
                quantity: "2",
                type: "Voice",
            },
        ],
        controls: [],
        manufacturers: ["Casio"],
        connections: [
            {
                name: "L/R",
                connector: "3.5mm Miniature Phone Jack (1/8)",
                description: ["Stereo"],
            },
        ],
        power_source: "DC 6V/7,5V or 4x1,5V AA batteries",
        slug: "47244-casio-sa-5",
        id: 47244,
        title: "SA-5",
        signal_path: "Digital Hardware (including Analog Connections)",
        country_of_manufacture: "China",
        deviceTypes: ["Synthesizer"],
        dates_produced: "1993",
        dimensions_string: "382mm x 125mm x 41mm",
        form_factor: "Keyboard",
        external_references: [],
        image: {
            url: "https://firebasestorage.googleapis.com/v0/b/studio-socket.appspot.com/o/gear_images%2F47244.png?alt=media&token=afafd561-035d-46cc-a426-3003a1d4d078",
            name: "47244.png",
        },
    },
    {
        dimensions_string: "406 x 314 x 194mm",
        country_of_manufacture: "Japan",
        dates_produced: "1972-1975",
        frequency_response: "30Hz to 23kHz (7½ ips)",
        id: 47264,
        form_factor: "Freestanding",
        signal_path: "Analog Hardware",
        channels_voices_tracks: [
            {
                quantity: "4",
                type: "Track",
                additional_information: "(2x stereo)",
            },
        ],
        controls: [
            {
                range: "",
                control_type: "Rotary Pot",
                parameter: "Left Channel Recording Level",
            },
            {
                parameter: "Right Channel Recording Level",
                control_type: "Rotary Pot with Switch",
                range: "(Pull-out switch disables this channel for mono playback)",
            },
            {
                parameter: "Recording Safeswitch",
                control_type: "Momentary Push Switch",
                range: "",
            },
            {
                control_type: "Momentary Push Switch",
                range: "",
                parameter: "Tape Counter Reset",
            },
            {
                parameter: "Motor Power Switch",
                range: "50Hz / 60Hz",
                control_type: "Latching Push Switch",
            },
            {
                range: "110 - 240v",
                parameter: "Mains Voltage Switch",
                control_type: "Slide Switch",
            },
            {
                range: "Tape / Source",
                parameter: "Monitor Switch",
                control_type: "Rocker Switch",
            },
            {
                control_type: "Rocker Switch",
                parameter: "S.O.S. Switch",
                range: "On / Off",
            },
            {
                control_type: "Rocker Switch",
                parameter: "Equalization Switch",
                range: "7½ / 3¾",
            },
            {
                parameter: "Tape Selector Switch",
                range: "Normal / S.R.T.",
                control_type: "Rocker Switch",
            },
            {
                parameter: "Auto Power Shut Off Switch",
                range: "On / Shut Off",
                control_type: "Rocker Switch",
            },
            {
                control_type: "Toggle Switch",
                range: "",
                parameter: "Pause",
            },
            {
                parameter: "Rewind Switch",
                control_type: "Rotary Switch",
                range: "Rewind / Off / Fast Forward",
            },
            {
                control_type: "Rotary Switch",
                parameter: "Play Switch",
                range: "Off / Play / Record (Third position only engages when safeswitch is pushed)",
            },
            {
                range: "3-2 / Stereo /1-4",
                parameter: "Track Switch (For Use In Mono Playback)",
                control_type: "Rotary Switch",
            },
        ],
        displays_indicators_meters: [
            {
                scale: "-20 to +5",
                indication: "VU",
                type: "Needle meters",
            },
        ],
        external_links: [
            {
                url: "http://www.hifiengine.com/manual_library/akai/4000ds.shtml",
                notes: "",
            },
            {
                url: "http://audio-heritage.jp/AKAI/player/4000ds.html",
                notes: "",
            },
        ],
        manufacturers: ["Akai"],
        slug: "47264-akai-4000ds",
        title: "4000DS",
        deviceTypes: ["Tape Machine"],
        connections: [
            {
                name: "Line Out",
                connector: "RCA (Phono, Cinch)",
                description: ["Stereo", "Unbalanced", "Socket (Female)"],
            },
            {
                description: ["Stereo", "Unbalanced", "Socket (Female)"],
                name: "Line In",
                connector: "RCA (Phono, Cinch)",
            },
            {
                name: "Line In/Out",
                description: ["Stereo", "Unbalanced", "Plug (Male)"],
                connector: "DIN",
            },
            {
                connector: "1/4 Phone Jack (6.35mm)",
                description: ["Stereo"],
                name: "Headphones Out",
            },
            {
                name: "Mic In (Left Channel)",
                description: ["Mono", "Unbalanced"],
                connector: "1/4 Phone Jack (6.35mm)",
            },
            {
                connector: "1/4 Phone Jack (6.35mm)",
                description: ["Mono", "Unbalanced"],
                name: "Mic In (Right Channel)",
            },
        ],
        power_source: "Mains (switchable voltage)",
    },
    {
        dimensions_string: "430 х 285 х 110 mm",
        country_of_manufacture: "Soviet Union",
        id: 47275,
        controls: [
            {
                parameter: "Power On/Off",
                range: "",
                control_type: "Latching Push Switch",
            },
            {
                parameter: "Headphones' Volume (Separate For Each Channel)",
                range: "",
                control_type: "Rotary Pot with Switch",
            },
            {
                control_type: "Momentary Push Switch",
                range: "",
                parameter: "Play/Pause",
            },
            {
                control_type: "Momentary Push Switch",
                parameter: "Stop",
                range: "",
            },
            {
                parameter: "Eject/Load",
                range: "",
                control_type: "Momentary Push Switch",
            },
            {
                parameter: "Repeat",
                range: "",
                control_type: "Momentary Push Switch",
            },
            {
                parameter: "Rewind Track",
                range: "",
                control_type: "Momentary Push Switch",
            },
            {
                control_type: "Momentary Push Switch",
                range: "",
                parameter: "Fast Forward Track",
            },
            {
                parameter: "Display Mode",
                range: "",
                control_type: "Momentary Push Switch",
            },
            {
                range: "",
                control_type: "Momentary Push Switch",
                parameter: "Previous Track/Begin Anew",
            },
            {
                range: "",
                parameter: "Next Track",
                control_type: "Momentary Push Switch",
            },
            {
                parameter: "Cancel",
                control_type: "Momentary Push Switch",
                range: "",
            },
            {
                range: "",
                parameter: "Program Tracks",
                control_type: "Momentary Push Switch",
            },
        ],
        displays_indicators_meters: [
            {
                type: "Vacuum Fluorescent Display (VFD)",
                scale: "",
                indication: "Display",
            },
        ],
        model_number: "122С",
        connections: [
            {
                name: "Line Out",
                description: ["Stereo", "Unbalanced"],
                connector: "RCA (Phono, Cinch)",
            },
            {
                connector: "3.5mm Miniature Phone Jack (1/8)",
                name: "Headphones Out",
                description: ["Stereo"],
            },
        ],
        frequency_response: "20Hz - 20000Hz",
        form_factor: "Standard Width",
        external_links: [
            {
                url: "http://rw6ase.narod.ru/00/pkd/wega_pkd122s.html",
                notes: "",
            },
        ],
        channels_voices_tracks: [
            {
                type: "Channel",
                additional_information: "Stereo",
                quantity: "2",
            },
        ],
        manufacturers: ["Вега", "Бердский радиозавод"],
        signal_path: "Digital Hardware (including Analog Connections)",
        slug: "47275-vega-pkd-122s",
        title: "ПКД-122С",
        power_source: "220v mains",
        dates_produced: "1991",
        deviceTypes: ["CD"],
    },
    {
        deviceTypes: ["Speaker"],
        id: 47304,
        country_of_manufacture: "Japan",
        signal_path: "Analog Hardware",
        form_factor: "Floorstanding",
        manufacturers: ["Victor"],
        title: "SX-3ii",
        dates_produced: "1974",
        slug: "47304-victor-sx-3ii",
        image: {
            url: "https://firebasestorage.googleapis.com/v0/b/studio-socket.appspot.com/o/gear_images%2F47304.png?alt=media&token=164dffe8-c31f-468b-9182-54e3e63c1af9",
            name: "47304.png",
        },
    },
];

export const defaultEdges: Edge[] = [
    {
        label: "test",
        labelStyle: {
            fontSize: 32,
        },
        labelBgStyle: {
            fill: "transparent",
        },
        style: {
            stroke: "black",
        },
        markerStart: "arrow",
        markerEnd: "arrow",
        source: "92BlPsYg5IORxQjeTFr1nNaH6",
        sourceHandle: "a",
        target: "wourlK9gTv4YJKwhlniw2Q8jb",
        targetHandle: "b",
        id: "reactflow__edge-92BlPsYg5IORxQjeTFr1nNaH6a-wourlK9gTv4YJKwhlniw2Q8jbb",
    },
];

export const defaultNodes: IDeviceNode[] = [
    {
        id: "92BlPsYg5IORxQjeTFr1nNaH6",
        position: {
            x: -346.5565164339581,
            y: -39.247534749804174,
        },
        type: "deviceNode",
        data: {
            id: "cldjetplz862vjhaluhis81nd",
            slug: "90211-1-echo",
            title: "#1 Echo",
            deviceId: "90211",
            countryOfManufacturer: "USA",
            datesProduced: null,
            signalPath: {
                name: "Digital Hardware (including Analog Connections)",
            },
            formFactor: {
                name: "Footswitch",
            },
            manufacturers: [
                {
                    name: "Electro-Harmonix",
                },
            ],
            deviceTypes: [
                {
                    name: "Effect",
                },
            ],
            users: [
                {
                    id: "cldk0gpk30000jh5ring92f0w",
                },
            ],
            connections: [
                {
                    connector: {
                        name: "1/4 Phone Jack (6.35mm)",
                    },
                    description: [
                        {
                            name: "Mono",
                        },
                    ],
                    devices: [
                        {
                            id: "cldjetplz862vjhaluhis81nd",
                        },
                    ],
                },
                {
                    connector: {
                        name: "1/4 Phone Jack (6.35mm)",
                    },
                    description: [
                        {
                            name: "Mono",
                        },
                    ],
                    devices: [
                        {
                            id: "cldjetplz862vjhaluhis81nd",
                        },
                    ],
                },
            ],
        },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        width: 239,
        height: 184,
        selected: false,
        positionAbsolute: {
            x: -346.5565164339581,
            y: -39.247534749804174,
        },
        dragging: false,
    },
    {
        id: "wourlK9gTv4YJKwhlniw2Q8jb",
        position: {
            x: -448.7849212037087,
            y: 430.6730433266846,
        },
        type: "deviceNode",
        data: {
            id: "cldjetpm2867rjhal19lf5lm1",
            slug: "943-novation-super-bass-station",
            title: "Super Bass Station",
            deviceId: "943",
            countryOfManufacturer: "",
            datesProduced: "1997-",
            signalPath: {
                name: "Analog Hardware",
            },
            formFactor: {
                name: "19 Rackmount",
            },
            manufacturers: [
                {
                    name: "Novation",
                },
            ],
            deviceTypes: [
                {
                    name: "Synthesizer",
                },
            ],
            users: [
                {
                    id: "cldk0gpk30000jh5ring92f0w",
                },
            ],
            connections: [],
        },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        width: 258,
        height: 186,
        selected: true,
        positionAbsolute: {
            x: -448.7849212037087,
            y: 430.6730433266846,
        },
        dragging: true,
    },
    {
        id: "L4jrwArffVgSyS8xNL5RSkX8Y",
        position: {
            x: 326.2585507414795,
            y: -123.63188136328027,
        },
        type: "deviceNode",
        data: {
            id: "cldjetpng886kjhal3wy8b926",
            slug: "7920-zoom-h4n",
            title: "H4n",
            deviceId: "7920",
            countryOfManufacturer: null,
            datesProduced: null,
            signalPath: null,
            formFactor: {
                name: "Portable",
            },
            manufacturers: [
                {
                    name: "Zoom",
                },
            ],
            deviceTypes: [
                {
                    name: "Digital Recorder",
                },
            ],
            users: [
                {
                    id: "cldk0gpk30000jh5ring92f0w",
                },
            ],
            connections: [
                {
                    connector: {
                        name: "Combo XLR / 1/4",
                    },
                    description: [],
                    devices: [
                        {
                            id: "cldjetpng886kjhal3wy8b926",
                        },
                    ],
                },
                {
                    connector: {
                        name: "Combo XLR / 1/4",
                    },
                    description: [],
                    devices: [
                        {
                            id: "cldjetpng886kjhal3wy8b926",
                        },
                    ],
                },
                {
                    connector: {
                        name: "3.5mm Miniature Phone Jack (1/8)",
                    },
                    description: [],
                    devices: [
                        {
                            id: "cldjetpng886kjhal3wy8b926",
                        },
                    ],
                },
                {
                    connector: {
                        name: "3.5mm Miniature Phone Jack (1/8)",
                    },
                    description: [],
                    devices: [
                        {
                            id: "cldjetpng886kjhal3wy8b926",
                        },
                    ],
                },
                {
                    connector: {
                        name: "USB",
                    },
                    description: [],
                    devices: [
                        {
                            id: "cldjetpng886kjhal3wy8b926",
                        },
                    ],
                },
            ],
        },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        width: 92,
        height: 184,
        selected: false,
        positionAbsolute: {
            x: 326.2585507414795,
            y: -123.63188136328027,
        },
        dragging: false,
    },
];
