import React, { Component, ReactElement, MouseEvent } from "react";
import { connect } from 'react-redux';
import { setTrackindex } from "../../redux/actions/playActions";
import { ITrack } from "../../app/definitions/ITrack";
import {TimeCalc} from "../../utils/TimeCalc";

interface IState {
    mouseOver: boolean,
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
        this.state = {
            mouseOver: false,
        };

        this.onItemClick    = this.onItemClick.bind( this );
        this.getTitleNumber = this.getTitleNumber.bind( this );
        this.onItemOver = this.onItemOver.bind(this);
        this.onItemOut  = this.onItemOut.bind(this);
    }

    private onItemClick( ev:MouseEvent ) {
        if( this.props.index !== this.props.trackIndex && this.props.setTrackindex ) {
            this.props.setTrackindex( this.props.index );
        }
    }

    private onItemOver( ev:MouseEvent ) {
        this.setState({mouseOver: true});
    }

    private onItemOut( ev:MouseEvent ) {
        this.setState({mouseOver: false});
    }

    private getTitleNumber():string {
        const idx:number = this.props.index+1;
        return idx < 10 ? "0"+idx : "" + idx;
    }

    public render(): ReactElement {

        let className:string = "playlistEntryContent";
        if( this.props.index === this.props.trackIndex ) {
            className = "playlistEntryContentSelected";
        }
        else if( this.state.mouseOver ) {
            className = "playlistEntryContentOver";
        }

        return (
            <div className="playlistEntry">
                <div className={className} onClick={this.onItemClick} onMouseEnter={this.onItemOver} onMouseLeave={this.onItemOut}>
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