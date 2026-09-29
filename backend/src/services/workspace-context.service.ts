import { NotFoundError } from "../errors/not-found.error";
import { ChannelRepository } from "../repositories/channel.repository";
import { MessageRepository } from "../repositories/message.repository";
import { WorkspaceRepository } from "../repositories/workspace.repository";
import { WorkspaceMessageContext, WorkspaceContext } from "../types/assistant.types";

export class WorkspaceContextService {
    constructor(
        private readonly workspaceRepository: WorkspaceRepository,
        private readonly channelRepository: ChannelRepository,
        private readonly messageRepository: MessageRepository,
    ){};

    async getWorkspaceContext(workspaceId: string): Promise<WorkspaceContext>{
        const workspace = await this.workspaceRepository.findWorkspaceById(workspaceId);

        // Verify workspace exists
        if(!workspace) throw new NotFoundError("Workspace not found", "WORKSPACE_NOT_FOUND");

        // Find channels belonging to workspace
        const channels = await this.channelRepository.findChannelsByWorkspace(workspaceId);

        // Load messages from those channels
        const workspaceMessages: WorkspaceMessageContext[] = [];

        for(const channel of channels){
            const result = await this.messageRepository.findMessagesByChannelId(channel.id, {limit: 20});

            workspaceMessages.push(
                ...result.data.map(message => ({
                    channelName: channel.name,
                    senderId: message.senderId,
                    content: message.content,
                    createdAt: message.createdAt,
                    updatedAt: message.updatedAt,
                }))
            );
        }
        return {
            workspace,
            messages: workspaceMessages,
        };
    }
}