import { NotFoundError } from "../errors/not-found.error";
import { LLMService } from "../infrastructure/ai/llm/llm.service";
import { ChannelRepository } from "../repositories/channel.repository";
import { MessageRepository } from "../repositories/message.repository";
import { WorkspaceRepository } from "../repositories/workspace.repository";
import { WorkspaceMessageContext } from "../types/assistant.types";

export class AssistantService {

    constructor(
        private readonly llmService: LLMService,
        private readonly workspaceRepository: WorkspaceRepository,
        private readonly channelRepository: ChannelRepository,
        private readonly messageRepository: MessageRepository
    ){}

    async ask(workspaceId: string, content: string): Promise<string>{

        // Verify workspace exists
        const workspace = await this.workspaceRepository.findWorkspaceById(workspaceId);
        if(!workspace){
            throw new NotFoundError("Workspace not found", "WORKSPACE_NOT_FOUND");
        }
        
        // Find channels belonging to workspace
        const channels = await this.channelRepository.findChannelsByWorkspace(workspaceId);

        // Load messages from those channels
        const workspaceMessages: WorkspaceMessageContext[] = [];

        for(const channel of channels){
            const result = await this.messageRepository.findMessagesByChannelId(channel.id, {limit: 20,});
        
            workspaceMessages.push(...result.data.map((message) => ({
                channelName: channel.name,
                senderId: message.senderId,
                content: message.content,
                createdAt: message.createdAt,
                updatedAt: message.updatedAt
            })));
        };

        // Build context for the LLM
        const workspaceContext = workspaceMessages.map((message) => `[${message.channelName} ${message.content}`).join("\n");

        // Ask LLM
        const response = await this.llmService.generate({
            messages: [
                {
                    role: "system",
                    content: `You are a helpful assistant for Relay. You are assisting the user inside Workspace: ${workspaceId} Workspace name: ${workspace.name} Here is the available workspace conversation history:

                            ${workspaceContext}

                            Use this information to answer the user's question.
                            If the answer cannot be determined from the provided context, say so.`,
                },
                {
                    role: "user",
                    content,
                },
            ],
        });

        return response.content;
    };

}