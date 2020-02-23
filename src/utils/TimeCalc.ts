import { ITrack } from "../app/definitions/ITrack";

export class TimeCalc {

    /**
     * Translates the given duration from a number to a formatted string.
     * @param duration 
     */
    public static getDuration( duration:number ):string {
        return "00:00";
    }

    /**
     * Calculates the total time of all tracks together in the given track list.
     * @param tracks 
     */
    public static getCalculatedFulltime( tracks:Array<ITrack>):string {
        return "00:00";
    }
}