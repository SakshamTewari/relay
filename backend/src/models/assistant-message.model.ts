export type AssistantMessageRole = "user" | "assistant";

export interface AssistantMessage {
    id: string;
    workspaceId: string;
    role: AssistantMessageRole;
    content: string;
    createdAt: Date;
};