import { ITrack } from "./ITrack";

export interface IPlayState {
    playStatus: string,
    playedTime: number,
    playedPercent: number,
    volume:number,
    trackIndex: number,
    tracks:Array<ITrack>,
    selectedTrack:ITrack,
}