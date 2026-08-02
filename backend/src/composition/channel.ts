import { ChannelController } from "../controllers/channel.controller";
import { ChannelService } from "../services/channel.service";
import { ChannelRepository } from "../repositories/channel.repository";
import { WorkspaceRepository } from "../repositories/workspace.repository";

export default function buildChannel(){

    const channelRepository = new ChannelRepository();
    const workspaceRepository = new WorkspaceRepository();
    const channelService = new ChannelService(channelRepository, workspaceRepository);
    const channelController = new ChannelController(channelService);

    return {
        channelController,
    }
}