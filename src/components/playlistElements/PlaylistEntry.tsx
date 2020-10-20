import React, { useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from '../../redux/store/index'
import { setTrackindex } from "../../redux/actions/playActions";
import { ITrack } from "../../app/definitions/ITrack";
import {TimeCalc} from "../../utils/TimeCalc";

interface IProps {
  index: number,
  track: ITrack
}

function PlaylistEntry(props: IProps) {

    const [mouseOver, setMouseOver] = useState(false)
    const trackIndex: number = useSelector((state: IRootState) => state.playState.trackIndex)
    const dispatch: Function = useDispatch()

    const onItemClick = (ev:MouseEvent) => {
        if( props.index !== trackIndex ) {
            dispatch( setTrackindex(props.index) ) 
        }
    }

    function onItemOver(ev:MouseEvent) {
        setMouseOver(true);
    }

    function onItemOut(ev:MouseEvent) {
        setMouseOver(false);
    }

    function getTitleNumber():string {
        const idx: number = props.index + 1
        return idx < 10 ? "0"+idx : "" + idx
    }

    let className:string = "playlistEntryContent"
    if( props.index === trackIndex ) {
        className = "playlistEntryContentSelected"
    }
    else if( mouseOver ) {
        className = "playlistEntryContentOver"
    }

    return (
        <div className="playlistEntry">
            <div className={className} onClick={onItemClick} onMouseEnter={onItemOver} onMouseLeave={onItemOut}>
                <div className="topline">
                    <div className="toplineLeft">{getTitleNumber()}</div>
                    <div className="toplineCenter">{props.track.interpret}</div>
                    <div className="toplineRight">{TimeCalc.getFormattedTime( props.track.duration )}</div>
                </div>
                <div className="bottomline">
                    <div className="bottomlineLeft"></div>
                    <div className="bottomlineRight">{props.track.title}</div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistEntry
