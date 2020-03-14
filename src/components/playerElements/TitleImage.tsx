import React, { Component, ReactElement } from "react";
import { connect } from 'react-redux';
import { ITrack } from "../../app/definitions/ITrack";

interface IState {
    imagesLoaded:boolean,
}
interface IProps {
    tracks?: Array<ITrack>,
    trackIndex?:number,
}

const reduxStore = (store:any) => ({
    tracks: store.playState.tracks,
    trackIndex: store.playState.trackIndex,
});

@(connect(reduxStore, null) as any)
class TitleImage extends Component<IProps, IState> {

    private count:number;

    constructor(props:IProps) {
        super(props);
        this.count = 0;
        this.state = {
            imagesLoaded: false,
        }
        this.imageLoadListener = this.imageLoadListener.bind( this );
    }

    public componentDidMount() {
        const tracks = this.props.tracks || [];
        for( let i=0; i<tracks.length; i++ ) {
            const img:HTMLImageElement = new Image();
            img.addEventListener('load', this.imageLoadListener);
            img.addEventListener('error', this.imageLoadListener);
            img.src = tracks[i].image;
        };
    }

    private imageLoadListener( ev:any ) {
        this.count++;
        const img:HTMLImageElement = ev.target;
        img.removeEventListener('load', this.imageLoadListener);
        img.removeEventListener('error', this.imageLoadListener);

        const tracks = this.props.tracks || [];
        if( tracks.length === this.count ) {
            this.setState( {imagesLoaded: true});
        }
    }

    public render(): ReactElement {
        const tracks = this.props.tracks || [];

        return (
            <div className="titleImageBox">
                {
                    this.state.imagesLoaded ? 
                        <img className="titleImage" src={tracks[this.props.trackIndex!].image} alt=""></img> : 
                        <div className="loadingText">Loading...</div>
                }
            </div>
        );
    }
}

export default TitleImage;