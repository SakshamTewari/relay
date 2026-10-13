import { EmbeddingService } from "../infrastructure/ai/embeddings/embedding.service";
import { VectorStoreService } from "../infrastructure/ai/vector-store/vector-store.service";
import { IndexMessageParams } from "../types/message-embedding.types";

export class MessageEmbeddingService {
    constructor(
        private readonly embeddingService: EmbeddingService,
        private readonly vectorStoreService: VectorStoreService
    ){};

    // Index Message
    async indexMessage(params: IndexMessageParams): Promise<void> {
        const result = await this.embeddingService.generate({
            text: params.content,
        });

        await this.vectorStoreService.store({
            messageId: params.messageId,
            embedding: result.embedding,
        });
    };
}