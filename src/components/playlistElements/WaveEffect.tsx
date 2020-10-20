import React, { ReactElement } from "react";
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store/index'
import { playStatus as playStatusConst } from './../../app/constants/playStatus';

function WaveEffect(): ReactElement {

    const playStatus: string = useSelector( (state: IRootState) => state.playState.playStatus)
    const style:Object = playStatus !== playStatusConst.PLAYING ? {display:"none"} : {}

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

export default WaveEffect
