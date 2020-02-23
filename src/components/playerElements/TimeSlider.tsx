import React, { Component, ReactElement, Fragment } from "react";
import { connect } from 'react-redux';
import { ITrack } from "../../app/definitions/ITrack";
import {TimeCalc} from "../../utils/TimeCalc";
//import { loadWeatherData } from "../redux/actions/weatherActions";

interface IState {
    sliderValue:number,
}
interface IProps {
    isPlaying?: boolean,
    selectedTrack?: ITrack,
}

const reduxStore = (store:any) => ({
    isPlaying: store.playState.isPlaying,
    selectedTrack: store.playState.selectedTrack,
});
const actions = (dispatch:any) => ({
    //loadWeatherData: (city:string) => { dispatch( loadWeatherData(city) ) },
});

@(connect(reduxStore, actions) as any)
class TimeSlider extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
            sliderValue:0,
        }
        this.onInputChange = this.onInputChange.bind(this);
    }

    private onInputChange(ev:any) {
        //if(this.props.playState != "playing") return;
        //this.props.timeSliderUpdate( event.target.value );
        this.setState( {sliderValue:ev.target.value} );
    }

    public playtimeUpdate( sliderValue:number ) {
        this.setState( {sliderValue:sliderValue} );
    }

    public render(): ReactElement {

        return (
            <Fragment>
                <div className="playerFooterLeft">02:42</div>
                <div className="playerFooterCenter">
                    <input onInput={this.onInputChange} className="timeSlider" type="range" min="0" max="100" value={this.state.sliderValue} step="0.1" />
                </div>
                <div className="playerFooterRight">{TimeCalc.getDuration( this.props.selectedTrack!.duration )}</div>
            </Fragment>
        );
    }
}

export default TimeSlider;