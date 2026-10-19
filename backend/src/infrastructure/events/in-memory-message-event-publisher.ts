import { MessageCreatedEventHandler } from "../../handlers/message-created-event-handler";
import { MessageEventPublisher } from "../../interfaces/message-event-publisher.interface";
import { MessageCreatedEvent, MessageCreatedHandler } from "../../types/message-events.types";

export class InMemoryEventPublisher implements MessageEventPublisher {
    
    private readonly handlers: MessageCreatedHandler[] = [];

    // subscribe
    subscribe(handler: MessageCreatedHandler): void {
        this.handlers.push(handler);
    };

    async publishMessageCreated(event: MessageCreatedEvent): Promise<void> {
        await Promise.all(this.handlers.map(handler => handler(event)));
    };
}