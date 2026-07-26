import { WorkspaceController } from "../controllers/workspace.controller";
import { WorkspaceRepository } from "../repositories/workspace.repository";
import { WorkspaceService } from "../services/workspace.service";

export default function buildWorkspace(){

    const workspaceRepository = new WorkspaceRepository();
    const workspaceService = new WorkspaceService(workspaceRepository);
    const workspaceController = new WorkspaceController(workspaceService);

    return {
        workspaceController,
    };
};