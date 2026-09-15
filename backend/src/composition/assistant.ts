import { AssistantController } from "../controllers/assistant.controller";
import { LLMService } from "../infrastructure/ai/llm/llm.service";
import { OpenAIService } from "../infrastructure/ai/llm/openai/openai.service";
import { AssistantService } from "../services/assistant.service";

export function buildAssistant(){
    
    const llmService: LLMService = new OpenAIService();
    const assistantService = new AssistantService(llmService);
    const assistantController = new AssistantController(assistantService);

    return {
        assistantController,
    }
}