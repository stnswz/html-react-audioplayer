import types from './../actions/types/';
import { ITrack } from '../../app/definitions/ITrack';
import tracks from '../../data/tracks';

interface IPlayState {
    isPlaying: boolean,
    trackIndex: number,
    tracks:Array<ITrack>,
    selectedTrack:ITrack,
}

const initialState:IPlayState = {
    isPlaying: false,
    trackIndex: 0,
    tracks: tracks,
    selectedTrack: tracks[0],
}

const reducer = (state:IPlayState = initialState, action:any) => {
    switch (action.type) {
        case types.SET_PLAYING:
            return { ...state, isPlaying: action.payload.isPlaying}
        case types.SET_TRACKINDEX:
            return { ...state, trackIndex: action.payload.trackIndex, selectedTrack:action.payload.selectedTrack }
        default:
            return state;
    }
}
export default reducer;