import React from "react";
import { useSelector } from 'react-redux';
import TitleImage from "./playerElements/TitleImage";
import ButtonBar from "./playerElements/ButtonBar";
import TimeSlider from "./playerElements/TimeSlider";
import VolumeControl from "./playerElements/VolumeControl";
import { IRootState } from '../redux/store/index'
import { ITrack } from "../app/definitions/ITrack";
import './../css/rangeInput.css';

function Player() {

    const tracks: Array<ITrack> = useSelector((state: IRootState) => state.playState.tracks)
    const trackIndex: number = useSelector((state: IRootState) => state.playState.trackIndex)

    return (
        <div id="player">
            <div className="inner">
                <div className="playerContent">
                    <div className="titleTop">{tracks[trackIndex].interpret}</div>
                    <TitleImage />
                    <div className="titleBottom">{tracks[trackIndex].title}</div>
                    <ButtonBar />
                    <VolumeControl />
                </div>

                <div className="playerFooter">
                    <TimeSlider />
                </div>
            </div> 
        </div> 
    )
}

export default Player
