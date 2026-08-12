import { FastifyInstance } from "fastify";
import { MessageController } from "../controllers/message.controller";
import { CreateMessageRequest, UpdateMessageRequest, ChannelMessageParams, MessageParams } from "../types/message";
import { CreateMessageSchema, UpdateMessageSchema } from "../schemas/message.schema";

export async function messageRoutes(app: FastifyInstance, { messageController }: { messageController: MessageController; },){

    // Create Message
    app.post<{Params: ChannelMessageParams; Body: CreateMessageRequest}>("/channels/:channelId/messages", { schema: CreateMessageSchema }, async (request, reply) => {
        return messageController.createMessage(request, reply);
    });

     // Get Messages by Channel ID
    app.get<{Params: ChannelMessageParams}>("/channels/:channelId/messages", async (request, reply) => {
        return messageController.getMessagesByChannelId(request, reply);
    });

    // Get Message by ID
    app.get<{Params: MessageParams}>("/messages/:messageId", async (request, reply) => {
        return messageController.getMessageById(request, reply);
    });

    // Update Message
    app.patch<{Params: MessageParams; Body: UpdateMessageRequest}>("/messages/:messageId", { schema: UpdateMessageSchema }, async (request, reply) => {
            return messageController.updateMessage(request, reply);
    });

    // Delete Message
    app.delete<{Params: MessageParams}>("/messages/:messageId", async (request, reply) => {
        return messageController.deleteMessage(request, reply);
    });
};