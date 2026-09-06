import OpenAI from "openai";
import { config } from "../../../../config/env";
import { LLMGenerateParams, LLMGenerateResult } from "../llm.types";
import { LLMService } from "../llm.service";

export class OpenAIService implements LLMService {
    private readonly client: OpenAI;

    constructor(){
        this.client = new OpenAI({
            apiKey: config.ai.openaiApiKey,
        });
    };

    async generate(params: LLMGenerateParams): Promise<LLMGenerateResult> {
        const response = await this.client.responses.create({
            model: "gpt-5.6-luna",
            input: params.messages,
        });

        return {
            content: response.output_text,
        }
    }
}