import types from './types';
import {PlayControl} from "./../../utils/PlayControl";
import { ITrack } from '../../app/definitions/ITrack';

export function setPlaying( play:boolean ) {
    return async (dispatch:any, getState:any) => {

        let isPlaying: boolean = false;
        const control:PlayControl = PlayControl.getInstance();

        if( play ) {
            control.play();
            isPlaying = true;
        }
        else {
            control.pause();
            isPlaying = false;
        }

        dispatch({
            type: types.SET_PLAYING,
            payload: {
                isPlaying: isPlaying,
                isPaused: false,
            }
        });
    };
}
export function setTrackindex( index:number ) {
    return async (dispatch:any, getState:any) => {

        dispatch({
            type: types.SET_TRACKINDEX,
            payload: {
                trackIndex:index,
                selectedTrack: getState().playState.tracks[index],
            }
        });

    };
}
export function skipForward() {
    return async (dispatch:any, getState:any) => {

        const tracks: Array<ITrack> = getState().playState.tracks;
        const trackIndex: number    = getState().playState.trackIndex;

        if( tracks.length-1 !== trackIndex ) {
            // The current track is not the last track in the track list.
            dispatch( setTrackindex( trackIndex+1 ) );
        }
    };
}
export function skipBackward() {
    return async (dispatch:any, getState:any) => {

        const trackIndex: number    = getState().playState.trackIndex;

        if( trackIndex !== 0 ) {
            // The current track is not the first track in the track list.
            dispatch( setTrackindex( trackIndex-1 ) );
        }
    };
}
