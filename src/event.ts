import { Participant } from "./participant";

export interface Event {
    eventId: string;
    name: string;
    description: string;
    location: string;
    startTime: Date;
    endTime: Date;
    participants: Participant[];
}