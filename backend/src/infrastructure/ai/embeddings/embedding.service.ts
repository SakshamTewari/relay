import { EmbeddingGenerateParams, EmbeddingGenerateResult } from "./embedding.types";

export interface EmbeddingService {
    generate(params: EmbeddingGenerateParams): Promise<EmbeddingGenerateResult>;
}