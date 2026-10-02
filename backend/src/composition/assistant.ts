import { channel } from "node:diagnostics_channel";
import { AssistantController } from "../controllers/assistant.controller";
import { LLMService } from "../infrastructure/ai/llm/llm.service";
import { OpenAIService } from "../infrastructure/ai/llm/openai/openai.service";
import { ChannelRepository } from "../repositories/channel.repository";
import { MessageRepository } from "../repositories/message.repository";
import { WorkspaceRepository } from "../repositories/workspace.repository";
import { AssistantService } from "../services/assistant.service";
import { WorkspaceContextService } from "../services/workspace-context.service";

export function buildAssistant(workspaceRepository: WorkspaceRepository, channelRepository: ChannelRepository, messageRepository: MessageRepository){
    
    // const workspaceRepository = new WorkspaceRepository();
    const llmService: LLMService = new OpenAIService();
    const workspaceContextService = new WorkspaceContextService(workspaceRepository, channelRepository, messageRepository);
    const assistantService = new AssistantService(llmService, workspaceContextService);
    const assistantController = new AssistantController(assistantService);

    return {
        assistantController,
    }
}