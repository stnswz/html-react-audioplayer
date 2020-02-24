import React, { ReactElement } from "react";
import { connect } from 'react-redux';
import { playStatus } from './../../app/constants/playStatus';

interface IProps {
    playStatus?: string,
}

const reduxStore = (store:any) => ({
    playStatus: store.playState.playStatus,
});

function WaveEffect(props:IProps): ReactElement {

    const style:Object = props.playStatus !== playStatus.PLAYING ? {display:"none"} : {};

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