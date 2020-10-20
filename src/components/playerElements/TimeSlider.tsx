import React, { Fragment } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '../../redux/store/index'
import { ITrack } from "../../app/definitions/ITrack";
import {TimeCalc} from "../../utils/TimeCalc";
import { playStatus as playStatusConst } from './../../app/constants/playStatus';
import { setTimesliderUpdate } from "./../../redux/actions/playActions";

function TimeSlider() {

    const playStatus: string = useSelector((state: IRootState) => state.playState.playStatus)
    const selectedTrack: ITrack = useSelector((state: IRootState) => state.playState.selectedTrack)
    const playedPercent: number = useSelector((state: IRootState) => state.playState.playedPercent)
    const playedTime: number = useSelector((state: IRootState) => state.playState.playedTime)
    const dispatch: Function = useDispatch()

    const onInputChange = (ev:any) => {
        if(playStatus === playStatusConst.STOPPED) {
            return;
        }
        let value: number = ev.target.value > 99.5 ? 99.5 : ev.target.value
        dispatch(setTimesliderUpdate(value))
    }
    return (
        <Fragment>
            <div className="playerFooterLeft">{ TimeCalc.getFormattedTime(playedTime) }</div>
            <div className="playerFooterCenter">
                <input onChange={onInputChange} className="timeSlider" type="range" min="0" max="100" value={playedPercent} step="0.1" />
            </div>
            <div className="playerFooterRight">{ TimeCalc.getFormattedTime(selectedTrack.duration) }</div>
        </Fragment>
    );
}

export default TimeSlider
