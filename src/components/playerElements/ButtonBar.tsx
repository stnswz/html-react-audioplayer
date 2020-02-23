import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
import { setPlaying } from "./../../redux/actions/playActions";
import { skipForward } from "./../../redux/actions/playActions";
import { skipBackward } from "./../../redux/actions/playActions";

interface IState {
    /* empty state */
}
interface IProps {
    isPlaying?: boolean,
    setPlaying?: Function,
    skipForward?: Function,
    skipBackward?: Function,
}

const reduxStore = (store:any) => ({
    isPlaying: store.playState.isPlaying,
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

    private onButtonClick(ev:any) {
        if( ev.target.id === "play" && this.props.setPlaying ) {
            this.props.setPlaying( !this.props.isPlaying );
        }
        else if( ev.target.id === "backward" && this.props.skipBackward ) {
            this.props.skipBackward();
        }
        else if( ev.target.id === "forward" && this.props.skipForward ) {
            this.props.skipForward();
        }
    }

    public render(): ReactElement {

        const playButtonName:string = this.props.isPlaying ? "pauseButton" : "playButton";

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