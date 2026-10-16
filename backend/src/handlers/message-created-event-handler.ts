import { MessageEmbeddingService } from "../services/message-embedding.service";
import { MessageCreatedEvent } from "../types/message-events.types";

export class MessageCreatedEventHandler {
    constructor(
        private readonly messageEmbeddingService: MessageEmbeddingService
    ){};

    // handle
    async handle(event: MessageCreatedEvent): Promise<void> {
        await this.messageEmbeddingService.indexMessage({
            messageId: event.messageId,
            content: event.content,
        });
    };
}