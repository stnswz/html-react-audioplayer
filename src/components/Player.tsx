import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
import './../css/rangeInput.css';
import { ITrack } from "../app/definitions/ITrack";

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

    constructor(props:IProps) {
        super(props);
        this.state = {
            
        }
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
                        <div className="buttonBox">
                            <div className="backButton"></div>
                            <div className="playButton"></div>
                            <div className="forwButton"></div>
                        </div>
                    </div>

                    <div className="playerFooter">
                        <div className="playerFooterLeft">02:42</div>
                        <div className="playerFooterCenter">
                            <input className="timeSlider" type="range" min="0" max="100" value="0" step="0.1" />
                        </div>
                        <div className="playerFooterRight">04:32</div>
                    </div>

                </div> 
            </div> 
        );
    }
}

export default Player;