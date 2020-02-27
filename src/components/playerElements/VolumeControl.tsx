import React, { Component, ReactElement, MouseEvent, SyntheticEvent } from "react";
import { connect } from 'react-redux';
import { setVolume } from "./../../redux/actions/playActions";

interface IState {
    openState:OpenState,
}
interface IProps {
    volume?: number,
    setVolume?: Function,
}

enum OpenState {
    unset,
    closed,
    open,
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
            openState: OpenState.unset,
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onThumbClick = this.onThumbClick.bind(this);
    }

    private onInputChange(ev:any) {
        if( this.props.setVolume ) {
            this.props.setVolume( ev.target.value );
        }
    }

    private onThumbClick(ev:MouseEvent) {
        const openState = this.state.openState;
        this.setState( {openState: (openState === OpenState.unset || openState === OpenState.closed) ? OpenState.open : OpenState.closed} );
    }

    public render(): ReactElement {
        
        let volControlClassName:string = "volumeControl";
        let thumbClassName:string = "openThumb";

        if(this.state.openState === OpenState.closed) {
            volControlClassName = "volumeControlOUT";
            thumbClassName = "openThumbOUT";
        }
        if(this.state.openState === OpenState.open) {
            volControlClassName = "volumeControlIN";
            thumbClassName = "openThumbIN";
        }

        const opValue = 0.2 + (this.props.volume!/2);

        return (
            <div className={volControlClassName}>
                <div onClick={this.onThumbClick} className={thumbClassName} title="volume setting"></div>
                <div className="innerBox">
                    <div className="speaker" style={{opacity:opValue}}></div>
                    <div className="volumeSlider" >
                        <input onChange={this.onInputChange} type="range" min="0" max="1" value={this.props.volume} step="0.01" />
                    </div>
                </div>
            </div>
        );
    }
}

export default VolumeControl;