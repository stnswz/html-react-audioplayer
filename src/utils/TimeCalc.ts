import { ITrack } from "../app/definitions/ITrack";

export class TimeCalc {

    /**
     * Translates the given time from a number to a formatted time string.
     * @param duration 
     */
    public static getFormattedTime( time:number ):string {
        const min = Math.floor(time/60);
        const sec = Math.floor(time % 60);
        const m = min < 10 ? "0"+min : ""+min;
        const s = sec < 10 ? "0"+sec : ""+sec;
        return m + ":" + s;
    }

    /**
     * Calculates the total time of all tracks together in the given track list.
     * @param tracks 
     */
    public static getCalculatedFulltime( tracks:Array<ITrack>):string {
        let time:number = 0;
        for( let i=0; i<tracks.length; i++ ) {
            time += tracks[i].duration;
        }
        return this.getFormattedTime( time );
    }
}