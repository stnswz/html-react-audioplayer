import types from './../actions/types/';
import { IPlayState } from '../../app/definitions/IPlayState';
import { playStatus } from '../../app/constants/playStatus';
import tracks from '../../data/tracks';

const initialState:IPlayState = {
    playStatus: playStatus.STOPPED,
    playedTime: 0,
    playedPercent: 0,
    volume: 0.75,
    trackIndex: 0,
    selectedTrack: tracks[0],
    tracks: tracks,
}

const reducer = (state:IPlayState = initialState, action:any) => {
    switch (action.type) {
        case types.SET_PLAYING:
            return { ...state, playStatus: action.payload.playStatus }
        case types.SET_TRACKINDEX:
            return { ...initialState, trackIndex: action.payload.trackIndex, selectedTrack:action.payload.selectedTrack, volume: state.volume }
        case types.SET_PLAYTIME_UPDATE:
            return { ...state, playedTime: action.payload.playedTime, playedPercent:action.payload.playedPercent }
        case types.SET_VOLUME: 
            return { ...state, volume: action.payload.volume }
        case types.SET_PLAYING_HAS_FINISHED:
            return { ...state, playStatus: playStatus.STOPPED, playedTime:0, playedPercent:0 }
        default:
            return state;
    }
}
export default reducer;