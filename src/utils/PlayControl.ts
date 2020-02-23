import { IPlayState } from "../app/definitions/IPlayState";
import { ITrack } from "../app/definitions/ITrack";

/**
 * PlayControl is a singleton class thats containing the HTMLAudioElement for
 * playing and controling the audio within the player. PlayControl can get imported 
 * everywhere to get access to it. It also has access to the redux store, for
 * getting neccessary data from the store and for dispatching events.
 */
export class PlayControl {

    private static instance: PlayControl;
    private store:any;

    private audio:HTMLAudioElement;
    private intervalId:any;

    private pauseTime:number;

    private constructor() {
        this.audio = new Audio();
        this.intervalId = 0;
        this.pauseTime  = 0;
        this.timerUpdate = this.timerUpdate.bind(this);
        this.audioOnEndedEvent = this.audioOnEndedEvent.bind(this);

        this.audio.onended = this.audioOnEndedEvent;
    }

    static getInstance(): PlayControl {
        if (!PlayControl.instance) {
            PlayControl.instance = new PlayControl();
        }
        return PlayControl.instance;
    }

    public setStore( store:any ) {
        this.store = store;
    }

    private audioOnEndedEvent(ev:any) {
        //const curTrackIndex = this.playControlData.trackIndex;
        //this.trackIndexChanged( curTrackIndex+1 );
        //this.props.onTrackSkipped( this.playControlData.trackIndex );
    }

    private timerUpdate() {
        if( !this.audio.duration || this.audio.duration <= 0 ) return;

        const currentTime = this.audio.currentTime; 
        const duration = this.audio.duration;
        const percent = currentTime * 100 / duration;

        //this._timeSlider.current.playtimeUpdate( percent ); 
        //this._display.current.playtimeUpdate( currentTime ); 
    }

    private getPlayState():IPlayState {
        return this.store.getState().playState;
    }

    public play() {

        const playState:IPlayState = this.getPlayState();

        if( !playState.isPlaying ) {
            const track:ITrack = playState.selectedTrack;
            this.audio.src = track.src;
            this.audio.play();
        }
        else {
            this.audio.play();
            this.audio.currentTime = this.pauseTime;
        }
        
        this.intervalId = setInterval(this.timerUpdate, 50);
    }

    public pause() {

        const playState:IPlayState = this.getPlayState();

        if( playState.isPlaying ) {
            clearInterval( this.intervalId );
            this.pauseTime = this.audio.currentTime;
            this.audio.pause();
        }

        //if(this.state.playState == "paused" ) this.play();
    }


    /*public getStore():any {
        // dispatch / getState().playState
        return this.store;
    }*/

}