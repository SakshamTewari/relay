import { randomUUID } from "crypto";
import { WorkspaceMember } from "../models/workspace-member.model";
import { WorkspaceMemberRepository } from "../repositories/workspace-member.repository";
import { WorkspaceRepository } from "../repositories/workspace.repository";
import { AddWorkspaceMemberRequest, UpdateWorkspaceMemberRequest, WorkspaceMemberParams } from "../types/member";
import { ForbiddenError } from "../errors/forbidden.error";

export class WorkspaceMemberService {

    constructor(
        private readonly workspaceMemberRepository: WorkspaceMemberRepository,
        private readonly workspaceRepository: WorkspaceRepository,
    ){};

    // Add member to workspace
    async addMemberToWorkspace(workspaceId: string, request: AddWorkspaceMemberRequest): Promise<WorkspaceMember> {

        const workspace = await this.workspaceRepository.findWorkspaceById(workspaceId);
        if(!workspace) throw new Error("Workspace not found");

        const existingMember = await this.workspaceMemberRepository.findByWorkspaceAndUser(workspaceId, request.userId);
        if(existingMember) throw new Error("User is already a member of this workspace");

        const newMember: WorkspaceMember = {
            id: randomUUID(),
            workspaceId,
            userId: request.userId,
            role: request.role,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        return await this.workspaceMemberRepository.addMember(newMember);
    };

    // Get All Members of a Workspace
    async getAllMembersOfWorkspace(workspaceId: string): Promise<WorkspaceMember[]> {

         const workspace = await this.workspaceRepository.findWorkspaceById(workspaceId);
        if(!workspace) throw new Error("Workspace not found");

        return await this.workspaceMemberRepository.findMembersByWorkspaceId(workspaceId);
    };

    // Get Member by ID
    async getMemberById(memberId: string): Promise<WorkspaceMember> {

        const member = await this.workspaceMemberRepository.findMemberById(memberId);
        if(!member) throw new Error("Member not found");

        return member;
    };

    // Update Member
    async updateMember(memberId: string, request: UpdateWorkspaceMemberRequest): Promise<WorkspaceMember | null> {

        const member = await this.workspaceMemberRepository.findMemberById(memberId);
        if(!member) throw new Error("Member not found");

        const updatedMember: WorkspaceMember = {
            ...member,
            role: request.role,
            updatedAt: new Date(),
        };

        return await this.workspaceMemberRepository.updateMember(updatedMember);
    };

    // Delete Member
    async deleteMember(memberId: string): Promise<boolean> {

        const member = await this.workspaceMemberRepository.findMemberById(memberId);
        if(!member) throw new Error("Member not found");

        return await this.workspaceMemberRepository.deleteMember(memberId);
    }

    // Check membership of a user
    async requireWorkspaceMember(workspaceId: string, userId: string): Promise<WorkspaceMember> {
        
        const membership = await this.workspaceMemberRepository.findByWorkspaceAndUser(workspaceId, userId);
        if(!membership) throw new ForbiddenError("You are not a member of this workspace", "WORKSPACE_ACCESS_DENIED");

        return membership;
    }

}