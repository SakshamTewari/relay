import { FastifyInstance } from "fastify";
import { MessageController } from "../controllers/message.controller";
import { CreateMessageRequest, UpdateMessageRequest, ChannelMessageParams, MessageParams } from "../types/message";
import { CreateMessageSchema, MessageQuerySchema, UpdateMessageSchema } from "../schemas/message.schema";
import { PaginationParams } from "../types/pagination";

export async function messageRoutes(app: FastifyInstance, { messageController }: { messageController: MessageController; },){

    // Create Message
    app.post<{Params: ChannelMessageParams; Body: CreateMessageRequest}>("/channels/:channelId/messages", {onRequest: [app.authenticate], schema: CreateMessageSchema }, async (request, reply) => {
        return messageController.createMessage(request, reply);
    });

     // Get Messages by Channel ID
    app.get<{Params: ChannelMessageParams, Querystring: PaginationParams }>("/channels/:channelId/messages", {onRequest: [app.authenticate], schema: {querystring: MessageQuerySchema}}, async (request, reply) => {
        return messageController.getMessagesByChannelId(request, reply);
    });

    // Get Message by ID
    app.get<{Params: MessageParams}>("/messages/:messageId", {onRequest: [app.authenticate]}, async (request, reply) => {
        return messageController.getMessageById(request, reply);
    });

    // Update Message
    app.patch<{Params: MessageParams; Body: UpdateMessageRequest}>("/messages/:messageId", {onRequest: [app.authenticate], schema: UpdateMessageSchema }, async (request, reply) => {
            return messageController.updateMessage(request, reply);
    });

    // Delete Message
    app.delete<{Params: MessageParams}>("/messages/:messageId", {onRequest: [app.authenticate]}, async (request, reply) => {
        return messageController.deleteMessage(request, reply);
    });
};