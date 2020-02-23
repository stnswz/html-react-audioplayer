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

    private constructor() {
        this.audio = new Audio();
        this.audio.onended = this.audioOnEndedEvent;
        this.intervalId = 0;
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

    /*public getStore():any {
        // dispatch / getState().playState
        return this.store;
    }*/

}