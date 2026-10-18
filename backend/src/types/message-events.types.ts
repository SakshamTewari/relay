export interface MessageCreatedEvent {
    messageId: string;
    content: string;
};

export type MessageCreatedHandler = (event: MessageCreatedEvent) => Promise<void>;