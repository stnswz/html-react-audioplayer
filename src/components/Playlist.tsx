import React from "react";
import { useSelector } from 'react-redux';
import PlaylistEntry from "./playlistElements/PlaylistEntry";
import WaveEffect from "./playlistElements/WaveEffect";
import { IRootState } from '../redux/store/index'
import { ITrack } from "./../app/definitions/ITrack";
import {TimeCalc} from "./../utils/TimeCalc";
import './../css/waveeffect.css';

function Playlist() {

    const tracks: Array<ITrack> = useSelector((state: IRootState) => state.playState.tracks)
    const trackIndex: number = useSelector((state: IRootState) => state.playState.trackIndex)
    const numberTracks:number = tracks.length
    const curTrackNumber:number = trackIndex + 1

    return (
        <div id="playlist">
            <div className="inner">
                <div className="listEntries">
                    { tracks.map( (track, index) => <PlaylistEntry key={track.id} index={index} track={track} /> ) }
                </div> 

                <div className="listFooterBorder"></div>

                <div className="listFooter">
                    <div className="listFooterLeft">{ curTrackNumber } / { numberTracks }</div>
                    <div className="listFooterCenter">
                        <WaveEffect />
                    </div>
                    <div className="listFooterRight">{ TimeCalc.getCalculatedFulltime(tracks) }</div>
                </div>
            </div> 
        </div> 
    )
}

export default Playlist
