import { StoreEmbeddingParams } from "./vector-store.types";

export interface VectorStoreService {
    store(params: StoreEmbeddingParams): Promise<void>;
}