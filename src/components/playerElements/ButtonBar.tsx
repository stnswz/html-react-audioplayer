import React, { Component, ReactElement, MouseEvent } from "react";
import { connect } from 'react-redux';
import { setPlaying } from "./../../redux/actions/playActions";
import { skipForward } from "./../../redux/actions/playActions";
import { skipBackward } from "./../../redux/actions/playActions";
import { playStatus } from './../../app/constants/playStatus';

interface IState {
    /* empty state */
}
interface IProps {
    playStatus?: string,
    setPlaying?: Function,
    skipForward?: Function,
    skipBackward?: Function,
}

const reduxStore = (store:any) => ({
    playStatus: store.playState.playStatus,
});
const actions = (dispatch:any) => ({
    setPlaying: (value:boolean) => { dispatch( setPlaying(value) ) },
    skipForward: () => { dispatch( skipForward() ) },
    skipBackward: () => { dispatch( skipBackward() ) },
});

@(connect(reduxStore, actions) as any)
class ButtonBar extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    private onButtonClick(ev:MouseEvent) {
        if( ev.currentTarget.id === "play" && this.props.setPlaying ) {
            this.props.setPlaying( this.props.playStatus !== playStatus.PLAYING );
        }
        else if( ev.currentTarget.id === "backward" && this.props.skipBackward ) {
            this.props.skipBackward();
        }
        else if( ev.currentTarget.id === "forward" && this.props.skipForward ) {
            this.props.skipForward();
        }
    }

    public render(): ReactElement {

        const playButtonName:string = this.props.playStatus === playStatus.PLAYING ? "pauseButton" : "playButton";

        return (
            <div className="buttonBox">
                <div className="backButton" id="backward" onClick={this.onButtonClick}></div>
                <div className={playButtonName} id="play" onClick={this.onButtonClick}></div>
                <div className="forwButton" id="forward" onClick={this.onButtonClick}></div>
            </div>
        );
    }
}

export default ButtonBar;