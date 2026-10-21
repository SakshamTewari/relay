import { EmbeddingService } from "../infrastructure/ai/embeddings/embedding.service";
import { cosineSimilarity } from "../infrastructure/ai/embeddings/cosine-similarity";
import { SearchDocument, SearchResult } from "../types/semantic-search.types";

export class SemanticSearchService {

    constructor(
        private readonly embeddingService: EmbeddingService
    ){}

    // Search
    async search(query: string, documents: SearchDocument[], workspaceId: string): Promise<SearchResult[]>{

        const queryEmbedding = await this.embeddingService.generate({
            text: query,
        });

        const workspaceDocuments = documents.filter(
            (document) => document.workspaceId === workspaceId
        );

        const results: SearchResult[] = [];

        for(const document of workspaceDocuments){
            const documentEmbedding = await this.embeddingService.generate({
                text: document.content,
            });

            const score = cosineSimilarity(queryEmbedding.embedding, documentEmbedding.embedding);

            results.push({
                ...document,
                score,
            });
        }

        return results.sort((a,b) => b.score - a.score);
    }
}