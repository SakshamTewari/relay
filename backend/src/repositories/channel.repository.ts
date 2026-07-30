import { Channel } from "../models/channel.model";

export class ChannelRepository {

    private readonly channels: Map<string, Channel>;

    constructor(){
        this.channels = new Map();
    }

    // Create Channel
    async createChannel(channel: Channel): Promise<Channel> {
        this.channels.set(channel.id, channel);
        return channel;
    };

    // Find Channels by Workspace
    async findChannelsByWorkspace(workspaceId: string): Promise<Channel[]> {
        return [...this.channels.values()].filter(channel => channel.id === workspaceId);
    };

    // Find Channel by ID
    async findChannelById(id: string): Promise<Channel | null> {
        return this.channels.get(id) ?? null;
    };

    // Update Channel
    async updateChannel(channel: Channel): Promise<Channel> {
        this.channels.set(channel.id, channel);
        return channel;
    };

    // Delete Channel
    async deleteChannel(id: string): Promise<boolean> {
        return this.channels.delete(id);
    };
}