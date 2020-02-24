import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
import PlaylistEntry from "./playlistElements/PlaylistEntry";
import WaveEffect from "./playlistElements/WaveEffect";
import { ITrack } from "./../app/definitions/ITrack";
import {TimeCalc} from "./../utils/TimeCalc";
import './../css/waveeffect.css';

interface IState {
    /* empty state */
}
interface IProps {
    tracks?: Array<ITrack>,
    trackIndex?:number,
}

const reduxStore = (store:any) => ({
    tracks: store.playState.tracks,
    trackIndex: store.playState.trackIndex,
});
const actions = (dispatch:any) => ({

});

@(connect(reduxStore, actions) as any)
class Playlist extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
    }

    private getPlaylistEntries():Array<ReactElement> {
        const tracks: Array<ITrack> = this.props.tracks || [];
        return tracks.map( (track, index) => <PlaylistEntry key={track.id} index={index} track={track} /> );
    }

    public render(): ReactElement {

        const numberTracks:number = this.props.tracks ? this.props.tracks.length : 0;
        const curTrackNumber:number = this.props.trackIndex! + 1;

        return (
            <div id="playlist">
                <div className="inner">
                    <div className="listEntries">

                        {this.getPlaylistEntries()}

                    </div> 

                    <div className="listFooterBorder"></div>

                    <div className="listFooter">
                        
                        <div className="listFooterLeft">{curTrackNumber}/{numberTracks}</div>

                        <div className="listFooterCenter">
                            <WaveEffect />
                        </div>

                        <div className="listFooterRight">{TimeCalc.getCalculatedFulltime(this.props.tracks!)}</div>
                    
                    </div>

            
                </div> 
            </div> 
        );
    }
}

export default Playlist;