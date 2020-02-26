import React, { Component, ReactElement, Fragment } from "react";
import { connect } from 'react-redux';
import { setVolume } from "./../../redux/actions/playActions";

interface IState {
    isOpen:boolean,
}
interface IProps {
    volume?: number,
    setVolume?: Function,
}

const reduxStore = (store:any) => ({
    volume: store.playState.volume,
});
const actions = (dispatch:any) => ({
    setVolume: (vol:number) => { dispatch( setVolume(vol) ) },
});

@(connect(reduxStore, actions) as any)
class VolumeControl extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
            isOpen: false,
        }
        this.onInputChange = this.onInputChange.bind(this);
    }

    private onInputChange(ev:any) {
        if( this.props.setVolume ) {
            this.props.setVolume( ev.target.value );
        }
    }

    private onThumbClick(ev:any) {
        this.setState( {isOpen: !this.state.isOpen} );
    }

    public render(): ReactElement {

        return (
            <div className="volumeControl">
                <div onClick={this.onThumbClick} className="openThumb"></div>
                <div className="innerBox">
                    <div className="speaker"></div>
                    <div className="volumeSlider" >
                        <input onChange={this.onInputChange} type="range" min="0" max="1" value={this.props.volume} step="0.01" />
                    </div>
                </div>
            </div>
        );
    }

    /*
            <Fragment>
                <div className="playerFooterLeft">{TimeCalc.getFormattedTime( this.props.playedTime! )}</div>
                <div className="playerFooterCenter">
                    <input onChange={this.onInputChange} className="timeSlider" type="range" min="0" max="100" value={this.props.playedPercent} step="0.1" />
                </div>
                <div className="playerFooterRight">{TimeCalc.getFormattedTime( this.props.selectedTrack!.duration )}</div>
            </Fragment>
    */
}

export default VolumeControl;