import { Event } from "./event";
import { Participant } from "./participant";

enum StatusCode {
    Ok = 'OK',
    NotFound = 'NOT FOUND',
    Fail = 'FAIL'
}

class EventManager {
    private events = new Map<string, Event>();

    addEvent(newEvent: Event): StatusCode {
        if (this.events.has(newEvent.eventId)) return StatusCode.Fail;

        this.events.set(newEvent.eventId, newEvent);
        return StatusCode.Ok;
    }

    updateEvent(updatedEvent: Event): StatusCode {
        const event = this.events.get(updatedEvent.eventId);
        if (!event) return StatusCode.NotFound;

        this.events.set(updatedEvent.eventId, { ...event, ...updatedEvent });
        return StatusCode.Ok;
    }

    deleteEvent(eventId: string) : StatusCode {
        if (!this.events.has(eventId)) return StatusCode.NotFound;

        this.events.delete(eventId);
        return StatusCode.Ok;
    }

    getEvent(eventId: string): { statusCode: StatusCode, event?: Event} {
        const event = this.events.get(eventId);

        if (event) return { statusCode: StatusCode.Ok, event };

        return { statusCode: StatusCode.NotFound };
    }

    getEvents(): Event[] {
        return [...this.events.values()];
    }

    addParticipant(participant: Participant, eventId: string): StatusCode {
        const event = this.events.get(eventId);

        if (event) {
            event.participants.push(participant);
            return StatusCode.Ok;
        }

        return StatusCode.NotFound;
    }

    removeParticipant(participant: Participant, eventId: string): StatusCode {
        const event = this.events.get(eventId);

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