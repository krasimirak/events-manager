import { Event } from "./event";
import { Participant } from "./participant";

enum StatusCode {
    Ok = 'OK',
    NotFound = 'NOT FOUND',
    Fail = 'FAIL'
}

class EventManager {
    private events: Event[] = [];

    addEvent(newEvent: Event): StatusCode {
        if (this.events.some(event => event.eventId === newEvent.eventId)) {
            return StatusCode.Fail;
        }

        this.events.push(newEvent);
        return StatusCode.Ok;
    }

    updateEvent(updatedEvent: Event): StatusCode {
        const index = this.events.findIndex(event => event.eventId === updatedEvent.eventId);

        if (index === -1) return StatusCode.NotFound;

        this.events[index] = updatedEvent;
        return StatusCode.Ok;
    }

    deleteEvent(eventId: string) : StatusCode {
        const index = this.events.findIndex(event => event.eventId === eventId);

        if (index === -1) return StatusCode.NotFound;

        this.events.splice(index, 1);
        return StatusCode.Ok;
    }

    getEvent(eventId: string): { statusCode: StatusCode, event?: Event} {
        const event: Event | undefined = this.events.find(event => event.eventId === eventId);

        if (event) return { statusCode: StatusCode.Ok, event };

        return { statusCode: StatusCode.NotFound };
    }

    listEvents(): Event[] {
        return this.events;
    }

    addParticipant(participant: Participant, eventId: string): StatusCode {
        const event = this.events.find(event => event.eventId === eventId);

        if (event) {
            event.participants.push(participant);
            return StatusCode.Ok;
        }

        return StatusCode.NotFound;
    }

    removeParticipant(participant: Participant, eventId: string): StatusCode {
        const event = this.events.find(event => event.eventId === eventId);

        if (event) {
            const participantIndex = event.participants.findIndex(person => person.email === participant.email);

            if (participantIndex === -1) return StatusCode.NotFound;

            event.participants.splice(participantIndex, 1);
            return StatusCode.Ok;
        }

        return StatusCode.NotFound;
    }
}

const eventManager = new EventManager();
Object.freeze(eventManager);