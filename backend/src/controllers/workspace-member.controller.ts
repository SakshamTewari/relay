import { FastifyReply, FastifyRequest } from "fastify";
import { WorkspaceMemberService } from "../services/workspace-member.service";
import { AddWorkspaceMemberRequest, UpdateWorkspaceMemberRequest, WorkspaceMemberParams, MemberParams } from "../types/member";

export class WorkspaceMemberController {

    constructor(
        private readonly workspaceMemberService: WorkspaceMemberService
    ){};

    // Add Member to Workspace
    async addMembertoWorkspace(request: FastifyRequest<{ Params: WorkspaceMemberParams, Body: AddWorkspaceMemberRequest }>, reply: FastifyReply){
        const member = await this.workspaceMemberService.addMemberToWorkspace(request.params.workspaceId, request.body);
        return reply.status(201).send(member);
    };

    // Get All Members of a Workspace
    async getAllMembersOfWorkspace(request: FastifyRequest<{ Params: WorkspaceMemberParams }>, reply: FastifyReply){
        const members = await this.workspaceMemberService.getAllMembersOfWorkspace(request.params.workspaceId);
        return reply.status(200).send(members);
    };

    // Get Member by ID
    async getMemberById(request: FastifyRequest<{ Params: MemberParams }>, reply: FastifyReply){
        const member = await this.workspaceMemberService.getMemberById(request.params.memberId);
        if(!member) return reply.status(400).send({message: "Member not Found"});
        return reply.status(200).send(member);
    };

    // Update Member
    async updateMember(request: FastifyRequest<{ Params: MemberParams, Body: UpdateWorkspaceMemberRequest }>, reply: FastifyReply){
        const updatedMember = await this.workspaceMemberService.updateMember(request.params.memberId, request.body);
        if(!updatedMember) return reply.status(404).send({ message: "Member not found" });
        return reply.status(200).send(updatedMember);
    };

    // Delete Member
    async deleteMember(request: FastifyRequest<{Params: MemberParams}>, reply: FastifyReply){
        const deletedMember = await this.workspaceMemberService.deleteMember(request.params.memberId);
        if(!deletedMember) return reply.status(404).send({ message: "Member not found"});
        return reply.status(204).send();
    }
    
}