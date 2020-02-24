import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
import { setTrackindex } from "../../redux/actions/playActions";
import { ITrack } from "../../app/definitions/ITrack";
import {TimeCalc} from "../../utils/TimeCalc";

interface IState {
    /* empty */
}
interface IProps {
    index:number,
    track:ITrack,
    trackIndex?: number,
    setTrackindex?: Function,
}

const reduxStore = (store:any) => ({
    trackIndex: store.playState.trackIndex,
});
const actions = (dispatch:any) => ({
    setTrackindex: (index:number) => { dispatch( setTrackindex(index) ) },
});

@(connect(reduxStore, actions) as any)
class PlaylistEntry extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.onItemClick    = this.onItemClick.bind( this );
        this.getTitleNumber = this.getTitleNumber.bind( this );
    }

    private onItemClick( ev:any ) {
        if( this.props.index !== this.props.trackIndex && this.props.setTrackindex ) {
            this.props.setTrackindex( this.props.index );
        }
    }

    private getTitleNumber():string {
        const idx:number = this.props.index+1;
        return idx < 10 ? "0"+idx : "" + idx;
    }

    public render(): ReactElement {

        const className:string = this.props.index === this.props.trackIndex ? "playlistEntryContentSelected" : "playlistEntryContent";

        return (
            <div className="playlistEntry">
                <div className={className} onClick={this.onItemClick}>
                    <div className="topline">
                        <div className="toplineLeft">{this.getTitleNumber()}</div>
                        <div className="toplineCenter">{this.props.track.interpret}</div>
                        <div className="toplineRight">{TimeCalc.getFormattedTime( this.props.track.duration )}</div>
                    </div>
                    <div className="bottomline">
                        <div className="bottomlineLeft"></div>
                        <div className="bottomlineRight">{this.props.track.title}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlaylistEntry;