import { LLMService } from "../infrastructure/ai/llm/llm.service";

export class AssistantService {

    constructor(
        private readonly llmService: LLMService
    ){}

    async ask(workspaceId: string, content: string): Promise<string>{
        
        const response = await this.llmService.generate({
            messages: [
                {
                    role: "system",
                    content: `You are a helpful assistant for Relay. You are assisting the user inside workspace: ${workspaceId}`,
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