import { OpenAIService } from "../infrastructure/ai/llm/openai/openai.service";

export function buildAssistant(){
    
    const llmService = new OpenAIService();

    return {
        llmService,
    }
}