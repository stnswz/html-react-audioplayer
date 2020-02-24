import React, { Component, ReactElement, Fragment } from "react";
import { connect } from 'react-redux';
import { ITrack } from "../../app/definitions/ITrack";
import {TimeCalc} from "../../utils/TimeCalc";
import { playStatus } from './../../app/constants/playStatus';
import { setTimesliderUpdate } from "./../../redux/actions/playActions";

interface IState {
    /** empty */
}
interface IProps {
    playStatus?: string,
    selectedTrack?: ITrack,
    playedPercent?: number,
    playedTime?: number,
    setTimesliderUpdate?: Function,
}

const reduxStore = (store:any) => ({
    playStatus: store.playState.playStatus,
    selectedTrack: store.playState.selectedTrack,
    playedPercent: store.playState.playedPercent,
    playedTime: store.playState.playedTime,
});
const actions = (dispatch:any) => ({
    setTimesliderUpdate: (percent:number) => { dispatch( setTimesliderUpdate(percent) ) },
});

@(connect(reduxStore, actions) as any)
class TimeSlider extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
    }

    private onInputChange(ev:any) {
        if(this.props.playStatus === playStatus.STOPPED) {
            return;
        }

        let value:number = ev.target.value > 99.5 ? 99.5 : ev.target.value;
        if( this.props.setTimesliderUpdate ) {
            this.props.setTimesliderUpdate( value);
        }
    }

    public render(): ReactElement {

        return (
            <Fragment>
                <div className="playerFooterLeft">{TimeCalc.getFormattedTime( this.props.playedTime! )}</div>
                <div className="playerFooterCenter">
                    <input onChange={this.onInputChange} className="timeSlider" type="range" min="0" max="100" value={this.props.playedPercent} step="0.1" />
                </div>
                <div className="playerFooterRight">{TimeCalc.getFormattedTime( this.props.selectedTrack!.duration )}</div>
            </Fragment>
        );
    }
}

export default TimeSlider;