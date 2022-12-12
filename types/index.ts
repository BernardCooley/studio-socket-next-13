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

interface Connection {
    connector: string;
    description?: any[];
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

export type IDevice =
    | ISynthesizer
    | IEightTrackDeck
    | IAccessory
    | IAmplifierBass
    | IAmplifierGuitar
    | IAmplifierHeadphones
    | IAmplifierIntegrated
    | IAmplifierMicrophone
    | IAmplifierPhono
    | ITurntableTonearm
    | ITurntableStylus
    | ITurntableSparePart
    | ITurnTableCartridge
    | ITurntableAccessory
    | ITurntable
    | ITapeMachine
    | IClockGenerator
    | ISpeaker
    | ISignalDistribution
    | ISequencer
    | ISampler
    | IReceiver
    | IRadioTuner
    | IRadioReceiver
    | IPowerSupply
    | IMixingDesk
    | IMinidisc
    | IMicrophone
    | IMediaPlayer
    | IDataStorage
    | IInstrumentTuner
    | IHeadphones
    | IEQ
    | IEnclosureCasing
    | IEffects
    | IDynamics
    | IDrumMachine
    | IDJMixer
    | IDigitalRecorder
    | IDAC
    | ICrossover
    | IControlSurface
    | ICD
    | ICassetteDeck
    | ICable
    | IAudioInterface
    | IADAC
    | IAmplifierPre
    | IAmplifierPower;

export const getDeviceWithInterface = (types: String[], device: any) => {
    if (types.includes("Synthesizer")) return device as ISynthesizer;
    if (types.includes("Turntable")) return device as ITurntable;
    if (types.includes("Speaker")) return device as ISpeaker;
    if (types.includes("DJ Mixer")) return device as IDJMixer;
    if (types.includes("Headphones")) return device as IHeadphones;
    if (types.includes("Sampler")) return device as ISampler;
    if (types.includes("8-track deck")) return device as IEightTrackDeck;
    if (types.includes("Signal Distribution"))
        return device as ISignalDistribution;
    if (types.includes("Effect")) return device as IEffects;
    if (types.includes("EQ")) return device as IEQ;
    if (types.includes("Turntable Accessory"))
        return device as ITurntableAccessory;
    if (types.includes("Amplifier, Pre")) return device as IAmplifierPre;
    if (types.includes("Amplifier, Power")) return device as IAmplifierPower;
    if (types.includes("Drum Machine")) return device as IDrumMachine;
    if (types.includes("Enclosure / Casing")) return device as IEnclosureCasing;
    if (types.includes("Mixing Desk")) return device as IMixingDesk;
    if (types.includes("Dynamics")) return device as IDynamics;
    if (types.includes("CD")) return device as ICD;
    if (types.includes("Audio Interface")) return device as IAudioInterface;
    if (types.includes("Instrument Tuner")) return device as IInstrumentTuner;
    if (types.includes("Turntable Cartridge"))
        return device as ITurnTableCartridge;
    if (types.includes("Digital Recorder")) return device as IDigitalRecorder;
    if (types.includes("Power Supply")) return device as IPowerSupply;
    if (types.includes("Control Surface")) return device as IControlSurface;
    if (types.includes("Media Player")) return device as IMediaPlayer;
    if (types.includes("Amplifier, Integrated"))
        return device as IAmplifierIntegrated;
    if (types.includes("Cassette Deck")) return device as ICassetteDeck;
    if (types.includes("Tape Machine")) return device as ITapeMachine;
    if (types.includes("Amplifier, Phono")) return device as IAmplifierPhono;
    if (types.includes("Cable")) return device as ICable;
    if (types.includes("Radio Receiver")) return device as IRadioReceiver;
    if (types.includes("Minidisc")) return device as IMinidisc;
    if (types.includes("Turntable Stylus")) return device as ITurntableStylus;
    if (types.includes("Turntable Tonearm")) return device as ITurntableTonearm;
    if (types.includes("Receiver")) return device as IReceiver;
    if (types.includes("Accessory")) return device as IAccessory;
    if (types.includes("Synchronizer / Clock Generator"))
        return device as IClockGenerator;
    if (types.includes("Microphone")) return device as IMicrophone;
    if (types.includes("Amplifier, Headphone"))
        return device as IAmplifierHeadphones;
    if (types.includes("Radio Tuner")) return device as IRadioTuner;
    if (types.includes("Amplifier, Guitar")) return device as IAmplifierGuitar;
    if (types.includes("Media & Data Storage")) return device as IDataStorage;
    if (types.includes("Amplifier, Microphone"))
        return device as IAmplifierMicrophone;
    if (types.includes("Crossover")) return device as ICrossover;
    if (types.includes("Turntable Spare Part"))
        return device as ITurntableSparePart;
    if (types.includes("Amplifier, Bass")) return device as IAmplifierBass;
    if (types.includes("Analog-to-Digital Converter (ADC)"))
        return device as IADAC;
    if (types.includes("Digital-to-Analog Converter (DAC)"))
        return device as IDAC;
    if (types.includes("Sequencer")) return device as ISequencer;
    return device;
};

export interface IFirebaseImage {
    name: string;
    url: string;
}

export interface IRoute {
    name: string;
    path: string;
    protected: boolean;
    showInNav: boolean;
}
