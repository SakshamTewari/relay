export interface Message {
    id: string;
    senderId: string;
    content: string;
    channelId: string;
    createdAt: Date;
    updatedAt: Date;
}