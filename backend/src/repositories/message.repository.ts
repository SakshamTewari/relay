import { NotFoundError } from "../errors/not-found.error";
import { Message } from "../models/message.model";
import { PaginatedResponse, PaginationParams } from "../types/pagination";

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
    async findMessagesByChannelId(channelId: string, pagination: PaginationParams): Promise<PaginatedResponse<Message>>{
        const limit = pagination.limit ?? 20;
        const messages = [...this.messages.values()]
                .filter(message => message.channelId === channelId)
                .sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime());

        let startIndex = 0;
        if(pagination.cursor){
            const cursorIndex = messages.findIndex(message => message.id === pagination.cursor);   // will need to change once we use DB (createdAT + id)
            
            if(cursorIndex !== -1) throw new NotFoundError("Invalid Pagination Error", "INVALID_CURSOR");
            startIndex = cursorIndex + 1;
            
        }
        const page = messages.slice(startIndex, startIndex + limit);
        const nextCursor = page.length === limit ? page[page.length-1].id : null;
        
        return {
            data: page,
            nextCursor,
        };
        
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


/*
OFFSET
"Give me items starting at position N"

CURSOR
"Give me items relative to this known position"
*/