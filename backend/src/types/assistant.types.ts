import { Workspace } from "../models/workspace.model";

export interface AssistantMessageParams {
    workspaceId: string;
};

export interface AssistantMessageRequest {
    content: string;
}

export interface WorkspaceMessageContext {
    channelName: string;
    senderId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface WorkspaceContext {
    workspace: Workspace;
    messages: WorkspaceMessageContext[];
}