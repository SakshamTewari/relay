import { WorkspaceMemberController } from "../controllers/workspace-member.controller";
import { WorkspaceMemberService } from "../services/workspace-member.service";
import { WorkspaceMemberRepository } from "../repositories/workspace-member.repository";
import { WorkspaceRepository } from "../repositories/workspace.repository";

export default function buildWorkspaceMember(){

    const workspaceMemberRespository = new WorkspaceMemberRepository();
    const workspaceRepository = new WorkspaceRepository();
    const workspaceMemberService = new WorkspaceMemberService(workspaceMemberRespository, workspaceRepository);
    const workspaceMemberController = new WorkspaceMemberController(workspaceMemberService);

    return {
        workspaceMemberController,
    }
};