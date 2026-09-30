import { NotFoundError } from "../errors/not-found.error";
import { LLMService } from "../infrastructure/ai/llm/llm.service";
import { WorkspaceMessageContext } from "../types/assistant.types";
import { WorkspaceContextService } from "./workspace-context.service";

export class AssistantService {

    constructor(
        private readonly llmService: LLMService,
        private readonly workspaceContextService: WorkspaceContextService
    ){};

    async ask(workspaceId: string, content: string): Promise<string>{

        // Build context for the LLM
        const workspaceContext = await this.workspaceContextService.getWorkspaceContext(workspaceId);
        const workspaceMessages = workspaceContext.messages.map((message) =>
                    `[${message.channelName}]` + `[${message.createdAt.toISOString()}]` + `[sender: ${message.senderId}]` + message.content
                    ).join("\n");


        // Ask LLM
        const response = await this.llmService.generate({
            messages: [
                {
                    role: "system",
                    content: `You are a helpful assistant for Relay. You are assisting the user inside Workspace: ${workspaceContext.workspace.name} 
                     Here is the available workspace conversation history:

                            ${workspaceMessages}

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