import { RefObject } from "react";

// Device type interfaces
export interface IEightTrackDeck {
    country_of_manufacture: string;
    channels_voices_tracks: any[];
    title: string;
    controls: Control[];
    slug: string;
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions: Dimension[];
    external_links: ExternalLink[];
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IAccessory {
    country_of_manufacture: string;
    title: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: any[];
    frequency_response: string;
    external_links: ExternalLink[];
    form_factor: string;
    id: number;
    power_source: string;
    signal_path: string;
    dimensions: Dimension[];
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IAmplifierBass {
    country_of_manufacture: string;
    dimensions: Dimension[];
    channels_voices_tracks: ChannelsVoicesTrack[];
    dates_produced: string;
    title: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    external_links: ExternalLink[];
    form_factor: string;
    id: number;
    power_source: string;
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IAmplifierGuitar {
    country_of_manufacture: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    dates_produced: string;
    title: string;
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IAmplifierHeadphones {
    external_links: ExternalLink[];
    country_of_manufacture: string;
    title: string;
    channels_voices_tracks: any[];
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    frequency_response: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IAmplifierIntegrated {
    external_links: any[];
    country_of_manufacture: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    dates_produced: string;
    title: string;
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: any[];
    frequency_response: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IAmplifierMicrophone {
    country_of_manufacture: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    title: string;
    model_number: string;
    controls: any[];
    slug: string;
    connections: any[];
    displays_indicators_meters: any[];
    frequency_response: string;
    external_links: any[];
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IAmplifierPhono {
    external_links: ExternalLink[];
    country_of_manufacture: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    dates_produced: string;
    title: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    frequency_response: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IAmplifierPower {
    external_links: any[];
    country_of_manufacture: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    dates_produced: string;
    title: string;
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: any[];
    frequency_response: string;
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IAmplifierPre {
    external_links: ExternalLink[];
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: any[];
    frequency_response: string;
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IADAC {
    country_of_manufacture: string;
    title: string;
    id: number;
    slug: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IAudioInterface {
    external_links: ExternalLink[];
    country_of_manufacture: string;
    channels_voices_tracks: any[];
    dates_produced: string;
    title: string;
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    frequency_response: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface ICable {
    country_of_manufacture: string;
    channels_voices_tracks: any[];
    dates_produced: string;
    title: string;
    controls: any[];
    slug: string;
    connections: any[];
    displays_indicators_meters: any[];
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface ICassetteDeck {
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    channels_voices_tracks: any[];
    model_number: string;
    controls: any[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: any[];
    frequency_response: string;
    external_links: ExternalLink[];
    form_factor: string;
    id: number;
    power_source: string;
    dimensions: Dimension[];
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface ICD {
    channels_voices_tracks: any[];
    dates_produced: string;
    connections: any[];
    form_factor: string;
    dimensions_string: string;
    id: number;
    dimensions: Dimension[];
    country_of_manufacture: string;
    title: string;
    model_number: string;
    controls: any[];
    displays_indicators_meters: any[];
    signal_path: string;
    external_references: any[];
    slug: string;
    frequency_response: string;
    power_source: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IControlSurface {
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: any[];
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    external_links: ExternalLink[];
    manufacturers: string[];
    deviceTypes: string[];
}

export interface ICrossover {
    external_references: any[];
    country_of_manufacture: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    dates_produced: string;
    title: string;
    model_number: string;
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    frequency_response: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IDAC {
    country_of_manufacture: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    title: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    frequency_response: string;
    external_links: ExternalLink[];
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IDigitalRecorder {
    external_links: ExternalLink[];
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    frequency_response: string;
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IDJMixer {
    country_of_manufacture: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    dates_produced: string;
    title: string;
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: any[];
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    external_links: ExternalLink[];
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IDrumMachine {
    external_links: ExternalLink[];
    country_of_manufacture: string;
    channels_voices_tracks: any[];
    dates_produced: string;
    title: string;
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IDynamics {
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    frequency_response: string;
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    external_links: ExternalLink[];
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IEffects {
    external_links: ExternalLink[];
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    frequency_response: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IEnclosureCasing {
    country_of_manufacture: string;
    channels_voices_tracks: any[];
    title: string;
    model_number: string;
    controls: any[];
    slug: string;
    connections: any[];
    displays_indicators_meters: any[];
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    external_links: ExternalLink[];
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IEQ {
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    model_number: string;
    controls: any[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    external_links: ExternalLink[];
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IHeadphones {
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    frequency_response: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IInstrumentTuner {
    external_links: ExternalLink[];
    country_of_manufacture: string;
    title: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IDataStorage {
    country_of_manufacture: string;
    title: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    signal_path: string;
    form_factor: string;
    id: number;
    dimensions_string: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IMediaPlayer {
    external_links: ExternalLink[];
    country_of_manufacture: string;
    channels_voices_tracks: any[];
    dates_produced: string;
    title: string;
    model_number: string;
    controls: any[];
    slug: string;
    connections: any[];
    displays_indicators_meters: any[];
    frequency_response: string;
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IMicrophone {
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: any[];
    frequency_response: string;
    external_links: any[];
    form_factor: string;
    id: number;
    power_source: string;
    signal_path: string;
    dimensions_string: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IMinidisc {
    external_links: ExternalLink[];
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: any[];
    frequency_response: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IMixingDesk {
    external_links: ExternalLink[];
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    model_number: string;
    controls: Control[];
    slug: string;
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    frequency_response: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IPowerSupply {
    external_links: ExternalLink[];
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    controls: Control[];
    slug: string;
    connections: any[];
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IRadioReceiver {
    external_links: ExternalLink[];
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    channels_voices_tracks: any[];
    model_number: string;
    controls: any[];
    slug: string;
    connections: any[];
    displays_indicators_meters: any[];
    frequency_response: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IRadioTuner {
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: any[];
    frequency_response: string;
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IReceiver {
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    channels_voices_tracks: any[];
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    frequency_response: string;
    external_links: ExternalLink[];
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface ISampler {
    external_links: ExternalLink[];
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    frequency_response: string;
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface ISequencer {
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    external_links: ExternalLink[];
    manufacturers: string[];
    deviceTypes: string[];
}

export interface ISignalDistribution {
    country_of_manufacture: string;
    title: string;
    channels_voices_tracks: any[];
    model_number: string;
    controls: any[];
    slug: string;
    connections: any[];
    displays_indicators_meters: any[];
    frequency_response: string;
    external_links: any[];
    form_factor: string;
    id: number;
    power_source: string;
    signal_path: string;
    dimensions_string: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface ISpeaker {
    country_of_manufacture: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    dates_produced: string;
    title: string;
    controls: any[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    frequency_response: string;
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    external_links: ExternalLink[];
    manufacturers: string[];
    deviceTypes: string[];
}

export interface IClockGenerator {
    external_references: any[];
    country_of_manufacture: string;
    title: string;
    dates_produced: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface ISynthesizer {
    country_of_manufacture: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    dates_produced: string;
    title: string;
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    frequency_response: string;
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    external_links: ExternalLink[];
    manufacturers: string[];
    deviceTypes: string[];
    TYPE: "Synthesizer";
}

export interface ITapeMachine {
    country_of_manufacture: string;
    external_references: any[];
    title: string;
    dates_produced: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    frequency_response: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface ITurntable {
    external_links: ExternalLink[];
    country_of_manufacture: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    dates_produced: string;
    title: string;
    model_number: string;
    controls: Control[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: DisplaysIndicatorsMeter[];
    frequency_response: string;
    signal_path: string;
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface ITurntableAccessory {
    country_of_manufacture: string;
    external_references: any[];
    channels_voices_tracks: any[];
    dates_produced: string;
    title: string;
    controls: any[];
    slug: string;
    connections: any[];
    displays_indicators_meters: any[];
    signal_path: string;
    form_factor: string;
    id: number;
    dimensions_string: string;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface ITurnTableCartridge {
    external_links: ExternalLink[];
    country_of_manufacture: string;
    title: string;
    channels_voices_tracks: ChannelsVoicesTrack[];
    model_number: string;
    controls: any[];
    slug: string;
    connections: any[];
    displays_indicators_meters: any[];
    frequency_response: string;
    signal_path: string;
    form_factor: string;
    id: number;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface ITurntableSparePart {
    country_of_manufacture: string;
    title: string;
    model_number: string;
    slug: string;
    signal_path: string;
    form_factor: string;
    id: number;
    external_links: ExternalLink[];
    manufacturers: string[];
    deviceTypes: string[];
}

export interface ITurntableStylus {
    external_links: ExternalLink[];
    country_of_manufacture: string;
    channels_voices_tracks: any[];
    title: string;
    model_number: string;
    slug: string;
    connections: any[];
    frequency_response: string;
    signal_path: string;
    form_factor: string;
    id: number;
    manufacturers: string[];
    deviceTypes: string[];
}

export interface ITurntableTonearm {
    country_of_manufacture: string;
    external_references: any[];
    channels_voices_tracks: any[];
    dates_produced: string;
    title: string;
    controls: any[];
    slug: string;
    connections: Connection[];
    displays_indicators_meters: any[];
    form_factor: string;
    id: number;
    power_source: string;
    dimensions_string: string;
    signal_path: string;
    manufacturers: string[];
    deviceTypes: string[];
}

// Common interfaces
interface Dimension {
    width: number;
    depth: number;
    height: number;
    notes?: string;
}

interface Control {
    range?: string;
    parameter: string;
    control_type?: string;
    group?: string;
}

interface DisplaysIndicatorsMeter {
    type: string;
    scale?: string;
    indication: string;
}

interface ExternalLink {
    url: string;
    notes: string;
}

export interface Connection {
    connector: string;
    description?: string[];
    name: string;
}

interface ChannelsVoicesTrack {
    type: string;
    additional_information?: string;
    quantity: number | string;
}

// ENUMs

export enum Description {
    Balanced = "Balanced",
    SocketFemale = "Socket (Female)",
    Stereo = "Stereo",
    Unbalanced = "Unbalanced",
}

export enum ControlType {
    RotaryPot = "Rotary Pot",
    SlidePot = "Slide Pot",
    ToggleSwitch = "Toggle Switch",
    RotaryPotWithSwitch = "Rotary Pot with Switch",
    RotarySwitch = "Rotary Switch",
    MomentaryPushSwitch = "Momentary Push Switch",
    RockerSwitch = "Rocker Switch",
    RotaryEncoder = "Rotary Encoder",
    RotaryEncoderWithMomentaryPushSwitch = "Rotary Encoder with Momentary Push Switch",
}

export enum Connector {
    BNC = "BNC",
    DSub = "D-Sub",
    The14PhoneJack635Mm = "1/4 Phone Jack (6.35mm)",
    Xlr = "XLR",
}

export enum Type {
    DiodeGreen = "Diode (Green)",
    DiodeRed = "Diode (Red)",
    DiodeYellow = "Diode (Yellow)",
}

export enum Range {
    AnalogCoaxOpt1Opt2 = "Analog / Coax / Opt1 / Opt2",
    Empty = "",
    RecOffPlay = "Rec / Off / Play",
    OffLowHigh = "Off / Low / High",
    The24CMS12CMS = "2.4 cm/s / 1.2 cm/s",
}

export interface IFirebaseImage {
    name: string;
    url: string;
}

export interface IRoute {
    name: string;
    path: string;
}

export type FormMessageType = "success" | "error" | "warning" | "info";

export interface FormMessage {
    headerText: string;
    bodyText: string;
    type: FormMessageType;
    actionType: string;
    successMessage: string;
}

export enum FormMessageTypes {
    SUCCESS = "success",
    ERROR = "error",
    WARNING = "warning",
    INFO = "info",
}

export interface UserData {
    devices: string[];
    username: string;
    studios?: Studio[];
    imageUrl?: string;
    email?: string;
}

export interface DialogButton {
    text: string;
    onClick: () => void;
    classes?: string;
}

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectedFilterOptions {
    [key: string]: SelectOption[];
}

export interface NewDevice {
    title: string;
    manufacturer: string;
    deviceTypes: DeviceType[];
    connections: Connection[];
    requiresVerification: boolean;
    isTestDevice: boolean;
}

export type DeviceType =
    | "Synthesizer"
    | "Turntable"
    | "Speaker"
    | "DJ Mixer"
    | "Headphones"
    | "Sampler"
    | "8-track deck"
    | "Signal Distribution"
    | "Effect"
    | "EQ"
    | "Turntable Accessory"
    | "Amplifier, Pre"
    | "Amplifier, Power"
    | "Drum Machine"
    | "Enclosure / Casing"
    | "Mixing Desk"
    | "Dynamics"
    | "CD"
    | "Audio Interface"
    | "Instrument Tuner"
    | "Turntable Cartridge"
    | "Digital Recorder"
    | "Power Supply"
    | "Control Surface"
    | "Media Player"
    | "Amplifier, Integrated"
    | "Cassette Deck"
    | "Tape Machine"
    | "Amplifier, Phono"
    | "Cable"
    | "Radio Receiver"
    | "Minidisc"
    | "Turntable Stylus"
    | "Turntable Tonearm"
    | "Receiver"
    | "Accessory"
    | "Synchronizer / Clock Generator"
    | "Microphone"
    | "Amplifier, Headphone"
    | "Radio Tuner"
    | "Amplifier, Guitar"
    | "Media & Data Storage"
    | "Amplifier, Microphone"
    | "Crossover"
    | "Turntable Spare Part"
    | "Amplifier, Bass"
    | "Analog-to-Digital Converter (ADC)"
    | "Digital-to-Analog Converter (DAC)"
    | "Sequencer";

export type ConnectionTypes =
    | "RCA (Phono, Cinch)"
    | "3.5mm Miniature Phone Jack (1/8)"
    | "1/4 Phone Jack (6.35mm)"
    | "DIN"
    | "XLR"
    | "Binding Post"
    | "USB"
    | "Other"
    | "Terminal Block"
    | "Binding Post (Universal)"
    | "Firewire"
    | "BNC"
    | "JIS F05 (Toslink, ADAT Lightpipe)"
    | "D-Sub"
    | "Speakon"
    | "RJ45"
    | "Spring Terminal"
    | "Banana"
    | "Combo XLR / 1/4";

export interface Studio {
    id: string;
    title: string;
    devices: StudioDevice[];
    userId: string;
    image?: IFirebaseImage | null;
    createdAt: Date;
}

export interface StudioDevice {
    id: string;
    name: string;
    connections: StudioConnection[];
}

export interface StudioConnection {
    connector: string;
    description?: string[];
    name: string;
    connectedTo: string[];
}

export interface NewStudio {
    title: string;
    devices: StudioDevice[];
    userId: string;
    createdAt: Date;
}

export interface UserData {
    username: string;
    devices: string[];
}

export interface IDevice {
    id: string;
    slug: string;
    title: string;
    deviceId: string;
    countryOfManufacturer: string | null;
    datesProduced: string | null;
    formFactor: { name: string };
    manufacturers: { name: string }[];
    deviceTypes: { name: string }[];
    users: { id: string }[];
    connections: {
        connector: { name: string };
        description: { name: string }[];
        devices: { id: string }[];
    }[];
    image?: IFirebaseImage;
    signalPath: { name: string } | null;
}

export interface Filters {
    title: string;
    filters: SelectOption[];
    ref: RefObject<HTMLInputElement>;
}

export interface FilterKeys {
    name: string;
    filters: string[];
}
