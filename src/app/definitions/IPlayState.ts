import { ITrack } from "./ITrack";

export interface IPlayState {
    isPlaying: boolean,
    isPaused: boolean,
    trackIndex: number,
    tracks:Array<ITrack>,
    selectedTrack:ITrack,
}