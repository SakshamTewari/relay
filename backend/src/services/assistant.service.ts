import { NotFoundError } from "../errors/not-found.error";
import { LLMService } from "../infrastructure/ai/llm/llm.service";
import { WorkspaceRepository } from "../repositories/workspace.repository";

export class AssistantService {

    constructor(
        private readonly llmService: LLMService,
        private readonly workspaceRepository: WorkspaceRepository
    ){}

    async ask(workspaceId: string, content: string): Promise<string>{

        const workspace = await this.workspaceRepository.findWorkspaceById(workspaceId);
        if(!workspace){
            throw new NotFoundError("Workspace not found", "WORKSPACE_NOT_FOUND");
        }
        
        const response = await this.llmService.generate({
            messages: [
                {
                    role: "system",
                    content: `You are a helpful assistant for Relay. You are assisting the user inside Workspace: ${workspaceId} Workspace name: ${workspace.name}`,
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