import { FastifyInstance } from "fastify";
import { CreateChannelRequest, UpdateChannelRequest, ChannelParams, WorkspaceChannelParams } from "../types/channel";
import { CreateChannelSchema, UpdateChannelSchema } from "../schemas/channel.schema";
import { ChannelController } from "../controllers/channel.controller";

export async function channelRoutes(app: FastifyInstance, { channelController } : {channelController: ChannelController}){

    // Create Channel
    app.post<{Body: CreateChannelRequest, Params: WorkspaceChannelParams}>("/workspaces/:workspaceId/channels", {schema: CreateChannelSchema}, async (request, reply) => {
        return channelController.createChannel(request, reply);
    });

    // Get All Channels
    app.get<{Params: WorkspaceChannelParams}>("/workspaces/:workspaceId/channels", async (request, reply) => {
        return channelController.getChannels(request, reply);
    });

    // Get Channel by ID
    app.get<{Params: ChannelParams}>("/channels/:channelId", async (request, reply) => {
        return channelController.getChannel(request, reply);
    });

    // Update Channel
    app.patch<{Params: ChannelParams, Body: UpdateChannelRequest}>("/channels/:channelId", {schema: UpdateChannelSchema}, async (request, reply) => {
        return channelController.updateChannel(request, reply);
    })

    // Delete Channel
    app.delete<{Params: ChannelParams}>("/channels/:channelId", async (request, reply) => {
        return channelController.deleteChannel(request, reply);
    })
}