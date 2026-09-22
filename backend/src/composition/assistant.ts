import { AssistantController } from "../controllers/assistant.controller";
import { LLMService } from "../infrastructure/ai/llm/llm.service";
import { OpenAIService } from "../infrastructure/ai/llm/openai/openai.service";
import { WorkspaceRepository } from "../repositories/workspace.repository";
import { AssistantService } from "../services/assistant.service";

export function buildAssistant(workspaceRepository: WorkspaceRepository){
    
    // const workspaceRepository = new WorkspaceRepository();
    const llmService: LLMService = new OpenAIService();
    const assistantService = new AssistantService(llmService, workspaceRepository);
    const assistantController = new AssistantController(assistantService);

    return {
        assistantController,
    }
}