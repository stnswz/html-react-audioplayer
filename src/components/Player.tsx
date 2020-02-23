import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
import ButtonBar from "./playerElements/ButtonBar";
import TimeSlider from "./playerElements/TimeSlider";
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
    //loadWeatherData: (city:string) => { dispatch( loadWeatherData(city) ) },
});

@(connect(reduxStore, actions) as any)
class Player extends Component<IProps, IState> {

    private audio:HTMLAudioElement;
    private intervalId:any;

    constructor(props:IProps) {
        super(props);
        this.state = {
            
        }

        this.audio = new Audio();
        //this.audio.volume = this.state.volume/100;
        this.intervalId = 0;
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
                            <img className="titleImage" src="./pictures/Crossroads.jpg" alt=""></img>
                        </div>

                        <div className="titleBottom">{tracks[trackIndex].title}</div>

                        <ButtonBar />
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