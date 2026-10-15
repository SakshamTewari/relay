import { MessageCreatedEvent } from "../types/message-events.types";

export interface MessageEventPublisher {
    publishMessageCreated(event: MessageCreatedEvent): Promise<void>;
}