import types from './../actions/types/';
import { ITrack } from '../../app/definitions/ITrack';
import tracks from '../../data/tracks';

interface IPlayState {
    isPlaying: boolean,
    trackIndex: number,
    tracks:Array<ITrack>,
}

const initialState:IPlayState = {
    isPlaying: false,
    trackIndex: 0,
    tracks: tracks,
}

const reducer = (state:IPlayState = initialState, action:any) => {
    switch (action.type) {
        case types.SET_PLAYING:
            return { ...state, isPlaying: action.payload.isPlaying}
        case types.SET_TRACKINDEX:
            return { ...state, trackIndex: action.payload.trackIndex}
        default:
            return state;
    }
}
export default reducer;