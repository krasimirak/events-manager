import { Event } from "./event";
import { Participant } from "./participant";

enum StatusCode {
    Ok = 'OK',
    NotFound = 'NOT FOUND',
    Fail = 'FAIL'
}

class EventManager {
    private events = new Map<string, Event>();

    /**
     * Adds a new event to the event manager.
     * @param {Event} newEvent - The event to add.
     * @returns {StatusCode} - The status code indicating the result of the operation.
     * Status code FAIL indicates event already exists in the event manager
     * Status code OK indicates successful addition of the event.
     */
    addEvent(newEvent: Event): StatusCode {
        if (this.events.has(newEvent.eventId)) return StatusCode.Fail;

        this.events.set(newEvent.eventId, newEvent);
        return StatusCode.Ok;
    }

    /**
     * Updates existing event in the event manager.
     * @param {Event} updatedEvent - The updated event
     * @returns {StatusCode} - The status code indicating the result of the operation.
     */
    updateEvent(updatedEvent: Event): StatusCode {
        const event = this.events.get(updatedEvent.eventId);
        if (!event) return StatusCode.NotFound;

        this.events.set(updatedEvent.eventId, { ...event, ...updatedEvent });
        return StatusCode.Ok;
    }

    /**
     * Deletes event from the event manager.
     * @param {string} eventId - Event ID
     * @returns {StatusCode} - The status code indicating the result of the operation.
     */
    deleteEvent(eventId: string) : StatusCode {
        if (!this.events.has(eventId)) return StatusCode.NotFound;

        this.events.delete(eventId);
        return StatusCode.Ok;
    }

    /**
     * Retrieves event by ID.
     * @param {string} eventId - Event ID
     * @returns {{ statusCode: StatusCode, event?: Event }} - Object with status code indicating result of the operation.
     * If the status code is OK the object contains the event.
     */
    getEvent(eventId: string): { statusCode: StatusCode, event?: Event} {
        const event = this.events.get(eventId);

        if (event) return { statusCode: StatusCode.Ok, event };

        return { statusCode: StatusCode.NotFound };
    }

    /**
     * Retrieves all events
     * @returns {Event[]} - Events array
     */
    getEvents(): Event[] {
        return [...this.events.values()];
    }

    /**
     * Adds participant to an event based on the event ID
     * @param {Participant} participant - New participant
     * @param {string} eventId - Event ID
     * @returns {StatusCode} - The status code indicating the result of the operation.
     * Status code FAIL is returned if participant already exists.
     * Status code NOT FOUND indicates event is not found.
     * Status code OK indicates successful adding of participant
     */
    addParticipant(participant: Participant, eventId: string): StatusCode {
        const event = this.events.get(eventId);

        if (event) {
            if (event.participants.some(person => person.email === participant.email)) return StatusCode.Fail;

            event.participants.push(participant);
            return StatusCode.Ok;
        }

        return StatusCode.NotFound;
    }

    /**
     * Removes participant of an event based on the event ID
     * @param {Participant} participant - Participant to remove
     * @param {string} eventId - Event ID
     * @returns {StatusCode} - The status code indicating the result of the operation.
     * Status code NOT FOUND indicates event or participant is not found.
     * Status code OK indicates successful removing of participant
     */
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