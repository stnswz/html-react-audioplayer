import types from './types';
import {PlayControl} from "./../../utils/PlayControl";
import { ITrack } from '../../app/definitions/ITrack';
import { playStatus } from './../../app/constants/playStatus';

export function setPlaying( play:boolean ) {
    return async (dispatch:any, getState:any) => {

        let status: string = playStatus.STOPPED;
        const control:PlayControl = PlayControl.getInstance();

        if( play ) {
            control.play();
            status = playStatus.PLAYING;
        }
        else {
            control.pause();
            status = playStatus.PAUSED;
        }

        dispatch({
            type: types.SET_PLAYING,
            payload: {
                playStatus: status,
            }
        });
    };
}
export function setVolume( vol:number ) {
    return async (dispatch:any, getState:any) => {
        const control:PlayControl = PlayControl.getInstance();
        control.setVolume( vol );

        dispatch({
            type: types.SET_VOLUME,
            payload: {
                volume: vol,
            }
        });
    }
}
export function setTrackindex( index:number ) {
    return async (dispatch:any, getState:any) => {

        const control:PlayControl = PlayControl.getInstance();
        control.stop();

        dispatch({
            type: types.SET_TRACKINDEX,
            payload: {
                trackIndex:index,
                selectedTrack: getState().playState.tracks[index],
            }
        });

        dispatch( setPlaying( true ) );
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
export function setPlaytimeUpdate( playedTime:number, playedPercent:number ) {
    return async (dispatch:any, getState:any) => {

        dispatch({
            type: types.SET_PLAYTIME_UPDATE,
            payload: {
                playedTime: playedTime,
                playedPercent: playedPercent,
            }
        });
    };
}
export function setTimesliderUpdate( percent:number ) {
    return async (dispatch:any, getState:any) => {

        const control:PlayControl = PlayControl.getInstance();
        control.timeSliderUpdate( percent );

    };
}
export function setPlayingHasFinished() {
    return async (dispatch:any, getState:any) => {
        dispatch({
            type: types.SET_PLAYING_HAS_FINISHED
        });
    };
}
