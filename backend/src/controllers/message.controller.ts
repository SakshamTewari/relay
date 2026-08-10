import { FastifyReply, FastifyRequest } from "fastify";
import { MessageService } from "../services/message.service";
import { CreateMessageRequest, UpdateMessageRequest, ChannelMessageParams, MessageParams } from "../types/message";

export class MessageController {

    constructor(
        private readonly messageService: MessageService,
    ){};

    // Create Message
    async createMessage(request: FastifyRequest<{Params: ChannelMessageParams, Body: CreateMessageRequest}>, reply: FastifyReply){
        const userId = "JWT-User-Id"; // Replace with actual user id from JWT token  : request.user?.id
        if(!userId) return reply.code(401).send({message: "Unauthorized"});
        const message = await this.messageService.createMessage(request.params.channelId, userId, request.body);
        return reply.code(201).send(message);
    };

    // Get all Messages by Channel ID
    async getMessagesByChannelId(request: FastifyRequest<{Params: ChannelMessageParams}>, reply: FastifyReply){
        const messages = await this.messageService.getMessagesByChannelId(request.params.channelId);
        return reply.code(200).send(messages);
    };

    // Get Message by ID
    async getMessageById(request: FastifyRequest<{Params: MessageParams}>, reply: FastifyReply){
        const message = await this.messageService.getMessageById(request.params.messageId);
        if(!message){
            return reply.code(404).send({
                message: "Message not found!",
            });
        }
        return reply.status(200).send(message);
    };

    // Update Message
    async updateMessage(request: FastifyRequest<{Params: MessageParams, Body: UpdateMessageRequest}>, reply: FastifyReply){
        const message = await this.messageService.updateMessage(request.params.messageId, request.body);
        if(!message){
            return reply.code(404).send({
                message: "Message not found!",
            });
        }
        return reply.status(200).send(message);
    };

    // Delete Message
    async deleteMessage(request: FastifyRequest<{Params: MessageParams}>, reply: FastifyReply){
        const deletedMessage = await this.messageService.deleteMessage(request.params.messageId);
        if(!deletedMessage){
            return reply.code(404).send({
                message: "Message not found!",
            });
        };
        return reply.status(200).send({ message: "Message deleted successfully!" });
    };
}