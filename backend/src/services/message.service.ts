import { randomUUID } from "crypto";
import { Message } from "../models/message.model";
import { MessageRepository } from "../repositories/message.repository";
import { ChannelRepository } from "../repositories/channel.repository";
import { CreateMessageRequest, UpdateMessageRequest } from "../types/message";
import { PaginationParams } from "../types/pagination";

export class MessageService {

    constructor(
        private readonly messageRepository: MessageRepository,
        private readonly channelRepository: ChannelRepository,
    ){};

    // Create Message
    async createMessage(channelId: string, userId: string,request: CreateMessageRequest): Promise<Message> {
        const channel = await this.channelRepository.findChannelById(channelId);
        if(!channel) throw new Error("Channel not found");
        const message: Message = {
            id: randomUUID(),
            channelId,
            senderId : userId,
            content: request.content,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        return await this.messageRepository.createMessage(message);
    };

    // Get All Messages by Channel ID
    async getMessagesByChannelId(channelId: string, pagination: PaginationParams): Promise<Message[]> {
        const channel = await this.channelRepository.findChannelById(channelId);
        if(!channel) throw new Error("Channel not found");
        return await this.messageRepository.findMessagesByChannelId(channelId, pagination);

    };

    // Get Message by ID
    async getMessageById(messageId: string): Promise<Message | null> {
        const message = await this.messageRepository.findMessageById(messageId);
        if (!message) return null;
        return message;
    };

    // Update Message
    async updateMessage(messageId: string, request: UpdateMessageRequest): Promise<Message | null> {

        const message = await this.messageRepository.findMessageById(messageId);
        if (!message) throw new Error("Message not found");

        message.content = request.content;
        message.updatedAt = new Date();

        return await this.messageRepository.updateMessage(message);
    };

      // Delete Message
    async deleteMessage(messageId: string): Promise<boolean> {
        return await this.messageRepository.deleteMessage(messageId);
    };
}