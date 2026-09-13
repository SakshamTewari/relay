import { FastifyReply, FastifyRequest } from "fastify";
import { AssistantService } from "../services/assistant.service";
import { AssistantMessageParams, AssistantMessageRequest } from "../types/assistant.types";

export class AssistantController {
    constructor(
        private readonly assistantService:AssistantService
    ){}

    // Send Message
    async sendMessage(request: FastifyRequest<{Params: AssistantMessageParams; Body: AssistantMessageRequest}>, reply: FastifyReply){
        const { content } = request.body;
        const response = await this.assistantService.ask(content);
        return reply.send({
            content: response,
        });
    }
} 