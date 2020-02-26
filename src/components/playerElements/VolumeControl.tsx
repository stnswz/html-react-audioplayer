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
        this.onThumbClick = this.onThumbClick.bind(this);
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

        const volControlClassName:string = this.state.isOpen ? "volumeControlIN" : "volumeControlOUT";
        const thumbClassName:string = this.state.isOpen ? "openThumbIN" : "openThumbOUT";
        const opValue = 0.2 + (this.props.volume!/2);

        return (
            <div className={volControlClassName}>
                <div onClick={this.onThumbClick} className={thumbClassName}></div>
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