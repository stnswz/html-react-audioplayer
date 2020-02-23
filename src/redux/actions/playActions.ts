import types from './types';

export function setPlaying( isPlaying:boolean ) {
    return async (dispatch:any, getState:any) => {
        dispatch({
            type: types.SET_PLAYING,
            payload: {
                isPlaying:isPlaying,
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
            }
        });

    };
}
export function skipForward() {
    return async (dispatch:any, getState:any) => {
        dispatch({
            type: types.SET_TRACKINDEX,
            payload: {
                trackIndex:0,
            }
        });
    };
}
export function skipBackward() {
    return async (dispatch:any, getState:any) => {
        dispatch({
            type: types.SET_TRACKINDEX,
            payload: {
                trackIndex:0,
            }
        });
    };
}
