import { Message } from "../models/message.model";
import { PaginationParams } from "../types/pagination";

export class MessageRepository {

    private readonly messages = new Map<string, Message>;

    constructor() {
        this.messages = new Map<string, Message>();
    };

    // Create Message
    async createMessage(message: Message): Promise<Message>{
        this.messages.set(message.id, message);
        return message;
    };

    // Find Message by ID
    async findMessageById(messageId: string): Promise<Message | null>{
        return this.messages.get(messageId) ?? null;
    };

    // Find Message by Channel ID
    async findMessagesByChannelId(channelId: string, pagination: PaginationParams): Promise<Message[]>{
        const limit = pagination.limit ?? 20;
        const messages = [...this.messages.values()]
                .filter(message => message.channelId === channelId)
                .sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());
        return messages.slice(0, limit);
        
    };

    // Update Message
    async updateMessage(message: Message): Promise<Message | null>{
        if(!this.messages.has(message.id)) return null;
        this.messages.set(message.id, message);
        return message;
    };

    // Delete Message
    async deleteMessage(messageId: string): Promise<boolean>{
        return this.messages.delete(messageId);
    };

}