import { StoredEmbedding, StoreEmbeddingParams } from "./vector-store.types";

export interface VectorStoreService {
    store(params: StoreEmbeddingParams): Promise<void>;

    findMessageById(messageId: string): Promise<StoredEmbedding | null>;
}