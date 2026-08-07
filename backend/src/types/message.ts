export interface CreateMessageRequest {
    content: string;
};

export interface UpdateMessageRequest {
    content: string;
};

export interface ChannelMessageParams {
    channelId: string;
};

export interface MessageParams {
    messageId: string;
};