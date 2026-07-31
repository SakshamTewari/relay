import { FastifyReply, FastifyRequest } from "fastify";
import { ChannelService } from "../services/channel.service";
import { CreatechannelRequest, UpdateChannelRequest, WorkspaceChannelParams, ChannelParams } from "../types/channel";

export class ChannelController {

    constructor(
        private readonly channelService: ChannelService,
    ){};

    // Create Channel
    async createChannel(request: FastifyRequest<{Params: WorkspaceChannelParams, Body: CreatechannelRequest}>, reply: FastifyReply,){
        const channel = await this.channelService.createChannel(request.params.workspaceId, request.body);
        return reply.status(201).send(channel);   
    };
    
    // Get All Channels
    async getChannels(request: FastifyRequest<{Params: WorkspaceChannelParams}>, reply: FastifyReply){
        const channels = await this.channelService.getAllChannels(request.params.workspaceId);
        return reply.status(200).send(channels);
    };

    // Get Channel by ID
    async getChannel(request: FastifyRequest<{Params: ChannelParams}>, reply: FastifyReply){
        const channel = await this.channelService.getChannel(request.params.channelId);
        return reply.status(200).send(channel);
    };

    // Update Channel
    async updateChannel(request: FastifyRequest<{Params: ChannelParams, Body: UpdateChannelRequest}>, reply: FastifyReply){
        const channel = await this.channelService.updateChannel(request.params.channelId, request.body);
        return reply.status(200).send(channel);
    };

    // Delete Channel
    async deleteChannel(request: FastifyRequest<{Params: ChannelParams}>, reply: FastifyReply){
        await this.channelService.deleteChannel(request.params.channelId);
        return reply.status(204).send();
    }
}