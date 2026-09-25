import { randomUUID } from "node:crypto";
import { AssistantMessage } from "../models/assistant-message.model";

export class AssistantMessageRepository {
    private readonly messages: Map<string, AssistantMessage>;

    constructor(){
        this.messages = new Map();
    }

    // Create a new Assistant Message
    async createAssistantMessage(message: AssistantMessage): Promise<AssistantMessage>{
        this.messages.set(message.id, message);
        return message;
    };

    // Find all messages for a workspace
    async findMessagesByWorkspaceId(workspaceId: string): Promise<AssistantMessage[]>{
        return [...this.messages.values()]
            .filter(message => message.workspaceId === workspaceId)
            .sort((a,b) => a.createdAt.getTime() - b.createdAt.getTime()); 
    }
}