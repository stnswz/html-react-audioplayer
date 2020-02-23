import types from './../actions/types/';
import { IPlayState } from '../../app/definitions/IPlayState';
import tracks from '../../data/tracks';

const initialState:IPlayState = {
    isPlaying: false,
    isPaused: false,
    trackIndex: 0,
    tracks: tracks,
    selectedTrack: tracks[0],
}

const reducer = (state:IPlayState = initialState, action:any) => {
    switch (action.type) {
        case types.SET_PLAYING:
            return { ...state, isPlaying: action.payload.isPlaying, isPaused:action.payload.isPaused }
        case types.SET_TRACKINDEX:
            return { ...state, trackIndex: action.payload.trackIndex, selectedTrack:action.payload.selectedTrack }
        default:
            return state;
    }
}
export default reducer;