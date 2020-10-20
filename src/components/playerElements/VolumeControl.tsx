import React, { useState, MouseEvent } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../redux/store/index'
import { setVolume } from "./../../redux/actions/playActions";

enum OpenState {
    unset,
    closed,
    open,
}

function VolumeControl() {

    const [openState, setOpenState] = useState<OpenState>(OpenState.unset);
    const volume: number = useSelector((state: IRootState) => state.playState.volume)
    const dispatch: Function = useDispatch()

    const onInputChange = (ev:any) => {
        dispatch(setVolume(ev.target.value))
    }

    function onThumbClick(ev:MouseEvent) {
        const curOpenState =  (openState === OpenState.unset || openState === OpenState.closed) ? OpenState.open : OpenState.closed
        setOpenState(curOpenState)
    }

    let volControlClassName:string = "volumeControl"
    let thumbClassName:string = "openThumb"

    if(openState === OpenState.closed) {
        volControlClassName = "volumeControlOUT"
        thumbClassName = "openThumbOUT"
    }
    else if(openState === OpenState.open) {
        volControlClassName = "volumeControlIN"
        thumbClassName = "openThumbIN"
    }

    const opValue = 0.2 + (volume/2)

    return (
        <div className={volControlClassName}>
            <div onClick={onThumbClick} className={thumbClassName} title="volume setting"></div>
            <div className="innerBox">
                <div className="speaker" style={{opacity:opValue}}></div>
                <div className="volumeSlider" >
                    <input onChange={onInputChange} type="range" min="0" max="1" value={volume} step="0.01" />
                </div>
            </div>
        </div>
    );
}

export default VolumeControl
