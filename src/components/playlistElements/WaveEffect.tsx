import React, { ReactElement } from "react";
import { connect } from 'react-redux';

interface IProps {
    isPlaying?:boolean,
}

const reduxStore = (store:any) => ({
    isPlaying: store.playState.isPlaying,
});

function WaveEffect(props:IProps): ReactElement {

    const style:Object = !props.isPlaying ? {display:"none"} : {};

    return (
        <div id="waveEffect" style={style}>
            <div className="wave" style={{marginLeft:0}}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );

}

export default connect(reduxStore, null)(WaveEffect);