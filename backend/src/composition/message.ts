import { MessageController } from "../controllers/message.controller";
import { MessageService } from "../services/message.service";
import { MessageRepository } from "../repositories/message.repository";
import { ChannelRepository } from "../repositories/channel.repository";

export default function buildMessage(){

    const messageRepository = new MessageRepository();
    const channelRepository = new ChannelRepository();
    const messageService = new MessageService(messageRepository, channelRepository);
    const messageController = new MessageController(messageService);

    return {
        messageController
    };

}