import React, { MouseEvent } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../redux/store/index'
import { setPlaying } from "./../../redux/actions/playActions";
import { skipForward } from "./../../redux/actions/playActions";
import { skipBackward } from "./../../redux/actions/playActions";
import { playStatus as playStatusConst } from './../../app/constants/playStatus';

function ButtonBar() {

    const playStatus: string = useSelector((state: IRootState) => state.playState.playStatus)
    const playButtonName: string = playStatus === playStatusConst.PLAYING ? "pauseButton" : "playButton"
    const dispatch: Function = useDispatch()

    const onButtonClick = (ev:MouseEvent) => {
        if(ev.currentTarget.id === "play") {
            dispatch(setPlaying(playStatus !== playStatusConst.PLAYING))
        }
        else if(ev.currentTarget.id === "backward") {
            dispatch(skipBackward())
        }
        else if(ev.currentTarget.id === "forward") {
            dispatch(skipForward())
        }
    }

    return (
        <div className="buttonBox">
            <button className="backButton" id="backward" onClick={onButtonClick}></button>
            <button className={playButtonName} id="play" onClick={onButtonClick}></button>
            <button className="forwButton" id="forward" onClick={onButtonClick}></button>
        </div>
    );
}

export default ButtonBar
