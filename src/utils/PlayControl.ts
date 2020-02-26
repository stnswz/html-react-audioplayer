import { IPlayState } from "../app/definitions/IPlayState";
import { ITrack } from "./../app/definitions/ITrack";
import { playStatus } from './../app/constants/playStatus';
import { setPlaying } from "./../redux/actions/playActions";
import { setPlaytimeUpdate } from "./../redux/actions/playActions";
import { setPlayingHasFinished } from "./../redux/actions/playActions";
import { skipForward } from "./../redux/actions/playActions";

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
        this.dispatch = this.dispatch.bind(this);

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
        this.audio.volume = store.getState().playState.volume;
    }

    private getPlayState():IPlayState {
        return this.store.getState().playState;
    }

    private dispatch( dFunc:Function ) {
        this.store.dispatch(dFunc);
    }

    private audioOnEndedEvent(ev:any) {
        const playState:IPlayState = this.getPlayState();
        if( playState.tracks.length-1 === playState.trackIndex ) {
            // The last track has finished playing
            this.stop();
            this.dispatch( setPlayingHasFinished() );
        }
        else {
            this.dispatch( skipForward() );
        }
    }

    private timerUpdate() {
        if( !this.audio.duration || this.audio.duration <= 0 ) return;

        const currentTime = this.audio.currentTime; 
        const duration = this.audio.duration;
        const percent = currentTime * 100 / duration;
        this.dispatch( setPlaytimeUpdate(currentTime, percent) );
    }

    public timeSliderUpdate( percent:number ) {
        if( !this.audio.duration || this.audio.duration <= 0 ) {
            return;
        }

        const playState:IPlayState = this.getPlayState();
        const duration = this.audio.duration;
        const newTime = duration / 100 * percent;
        this.audio.currentTime = newTime;

        this.dispatch( setPlaytimeUpdate(newTime, percent) );

        if( playState.playStatus === playStatus.PAUSED ) {
            this.dispatch( setPlaying(true) );
        }
    }

    public setVolume( vol:number ) {
        this.audio.volume = vol;
    }

    public play() {
        const playState:IPlayState = this.getPlayState();

        if( playState.playStatus === playStatus.STOPPED ) {
            const track:ITrack = playState.selectedTrack;
            this.audio.src = track.src;
            this.audio.play();
            this.intervalId = setInterval(this.timerUpdate, 50);
        }
        else if( playState.playStatus === playStatus.PAUSED ) {
            this.audio.play();
            this.audio.currentTime = this.pauseTime;
            this.intervalId = setInterval(this.timerUpdate, 50);
        }
    }

    public pause() {
        const playState:IPlayState = this.getPlayState();

        if( playState.playStatus === playStatus.PLAYING ) {
            clearInterval( this.intervalId );
            this.pauseTime = this.audio.currentTime;
            this.audio.pause();
        }
    }

    public stop() {
        clearInterval( this.intervalId );
        this.audio.pause();
        this.audio.currentTime = 0;
        this.pauseTime = 0;
    }

}