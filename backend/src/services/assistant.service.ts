import { LLMService } from "../infrastructure/ai/llm/llm.service";

export class AssistantService {

    constructor(
        private readonly llmService: LLMService
    ){}

    async ask(content: string): Promise<string>{
        
        const response = await this.llmService.generate({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant for Relay.",
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