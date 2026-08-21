import { FastifyInstance } from "fastify";
import { AddWorkspaceMemberRequest, UpdateWorkspaceMemberRequest, WorkspaceMemberParams, MemberParams } from "../types/member";
import { AddWorkspaceMemberSchema, UpdateWorkspaceMemberSchema } from "../schemas/worksapce-member.schema";
import { WorkspaceMemberController } from "../controllers/workspace-member.controller";

export async function workspaceMemberRoutes(app: FastifyInstance, { workspaceMemberController }: { workspaceMemberController: WorkspaceMemberController }) {
  // Add Member
    app.post<{ Params: WorkspaceMemberParams; Body: AddWorkspaceMemberRequest }>("/workspaces/:workspaceId/members",{ schema: AddWorkspaceMemberSchema }, async (request, reply) => {
        return workspaceMemberController.addMembertoWorkspace(request, reply);
    });

    // Get All Members of a Workspace
    app.get<{ Params: WorkspaceMemberParams }>("/workspaces/:workspaceId/members", async (request, reply) => {
        return workspaceMemberController.getAllMembersOfWorkspace(request, reply);
    });

    // Get Member
    app.get<{Params: MemberParams}>("/members/:memberId", async (request, reply) => {
        return workspaceMemberController.getMemberById(request, reply);
    });

    // Update Member
    app.patch<{Params: MemberParams; Body: UpdateWorkspaceMemberRequest}>("/members/:memberId", {schema: UpdateWorkspaceMemberSchema}, async (request, reply) => {
        return workspaceMemberController.updateMember(request, reply);
    });

    // Remove Member
    app.delete<{Params: MemberParams}>("/members/:memberId", async (request, reply) => {
        return workspaceMemberController.deleteMember(request, reply);
    });
}
