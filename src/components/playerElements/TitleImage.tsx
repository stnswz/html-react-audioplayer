import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store/index'
import { ITrack } from "../../app/definitions/ITrack";

function TitleImage() {

    const [imagesLoaded, setImagesLoaded] = useState(false)
    const tracks: Array<ITrack> = useSelector((state: IRootState) => state.playState.tracks)
    const trackIndex: number = useSelector((state: IRootState) => state.playState.trackIndex)
    const count = useRef(0)

    useEffect(() => {
        for( let i=0; i<tracks.length; i++ ) {
            const img:HTMLImageElement = new Image();
            img.addEventListener('load', imageLoadListener)
            img.addEventListener('error', imageLoadListener)
            img.src = tracks[i].image
        };
    // eslint-disable-next-line 
    }, []);

    function imageLoadListener( ev:any ) {
        const curCount = count.current + 1
        count.current = curCount

        const img:HTMLImageElement = ev.target;
        img.removeEventListener('load', imageLoadListener)
        img.removeEventListener('error', imageLoadListener)

        if( tracks.length === curCount ) {
            setImagesLoaded(true)
        }
    }
    return (
        <div className="titleImageBox">
            {
                imagesLoaded ? 
                <img className="titleImage" src={tracks[trackIndex].image} alt=""></img> : 
                <div className="loadingText">Loading...</div>
            }
        </div>
    );
}
export default TitleImage
