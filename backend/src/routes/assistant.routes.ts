import { FastifyInstance } from "fastify";
import { AssistantController } from "../controllers/assistant.controller";
import { AssistantMessageParams, AssistantMessageRequest } from "../types/assistant.types";
import { AssistantSchema } from "../schemas/assistant.schema";

export async function assistantRoutes(app: FastifyInstance, {assistantController}: {assistantController: AssistantController}){
    
    app.post<{Params: AssistantMessageParams; Body: AssistantMessageRequest}>("/workspaces/:workspaceId/assistant/messages", {schema: AssistantSchema}, async (request, reply) => {
        return assistantController.sendMessage(request, reply);
    })
}