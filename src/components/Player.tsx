import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
import ButtonBar from "./playerElements/ButtonBar";
import TimeSlider from "./playerElements/TimeSlider";
import VolumeControl from "./playerElements/VolumeControl";
import { ITrack } from "../app/definitions/ITrack";
import './../css/rangeInput.css';

interface IState {
    /* empty state */
}
interface IProps {
    tracks?: Array<ITrack>,
    trackIndex?:number,
}

const reduxStore = (store:any) => ({
    tracks: store.playState.tracks,
    trackIndex: store.playState.trackIndex,
});
const actions = (dispatch:any) => ({
    
});

@(connect(reduxStore, actions) as any)
class Player extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
    }

    public render(): ReactElement {

        const tracks:Array<ITrack> = this.props.tracks || [];
        const trackIndex:number    = this.props.trackIndex!;

        return (
            <div id="player">
                <div className="inner">

                    <div className="playerContent">
                        <div className="titleTop">{tracks[trackIndex].interpret}</div>

                        <div className="titleImageBox">
                            <img className="titleImage" src={tracks[trackIndex].image} alt=""></img>
                        </div>

                        <div className="titleBottom">{tracks[trackIndex].title}</div>

                        <ButtonBar />
                        <VolumeControl />
                    </div>

                    <div className="playerFooter">
                        <TimeSlider />
                    </div>

                </div> 
            </div> 
        );
    }
}

export default Player;