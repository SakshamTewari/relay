import { ChannelRepository } from "../repositories/channel.repository";
import { WorkspaceRepository } from "../repositories/workspace.repository";
import { Channel } from "../models/channel.model";
import { CreateChannelRequest, UpdateChannelRequest } from "../types/channel";
import { randomUUID } from "node:crypto";

export class ChannelService {

    constructor(
        private readonly channelRepository: ChannelRepository,
        private readonly workspaceRepository: WorkspaceRepository,
    ){}

    // Create Channel
    async createChannel(workspaceId: string, request: CreateChannelRequest ): Promise<Channel> {

        const workspace = await this.workspaceRepository.findWorkspaceById(workspaceId);
        if(!workspace) throw new Error("Workspace not found");

        const channel: Channel = {
            id: randomUUID(),
            workspaceId,
            name: request.name,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        return this.channelRepository.createChannel(channel);
    };

    // Get All Channels
    async getAllChannels(workspaceId: string): Promise<Channel[]> {

        const workspace = await this.workspaceRepository.findWorkspaceById(workspaceId);
        if(!workspace) throw new Error("Workspace not found");

        return this.channelRepository.findChannelsByWorkspace(workspaceId);
    };

    // Get Channel by ID
    async getChannel(channelId: string): Promise<Channel> {

        const channel = await this.channelRepository.findChannelById(channelId);
        if(!channel) throw new Error("Channel Not Found");

        return channel;
    };

    // Update Channel
    async updateChannel(channelId: string, request: UpdateChannelRequest): Promise<Channel> {

        const channel = await this.channelRepository.findChannelById(channelId);
        if(!channel) throw new Error("Channel Not Found");

        channel.name = request.name;
        channel.updatedAt = new Date();

        return this.channelRepository.updateChannel(channel);
    };

    // Delete Channel
    async deleteChannel(channelId: string): Promise<void> {
        
        const deleted = await this.channelRepository.deleteChannel(channelId);
        if(!deleted) throw new Error("Channel Not Found");

    };
}