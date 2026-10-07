import OpenAI from "openai";
import {config} from "../../../../config/env";
import { EmbeddingGenerateParams, EmbeddingGenerateResult} from "../embedding.types";
import { EmbeddingService } from "../embedding.service";

export class OpenAIEmbeddingService implements EmbeddingService {
    
    private readonly client: OpenAI;

    constructor(){
        this.client = new OpenAI({
            apiKey: config.ai.openaiApiKey,
        });
    };

    // Generate Embedding
    async generate(params: EmbeddingGenerateParams): Promise<EmbeddingGenerateResult>{
        
        const response = await this.client.embeddings.create({
            model: "text-embedding-3-small",
            input: params.text,
        });

        return {
            embedding: response.data[0].embedding,
        };
    };
}