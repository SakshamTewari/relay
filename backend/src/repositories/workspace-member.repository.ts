import { WorkspaceMember } from "../models/workspace-member.model";

export class WorkspaceMemberRepository {

    private readonly members: Map<string, WorkspaceMember>;
    
    constructor(){
        this.members = new Map();
    };

    // Create Member
    async createMember(member: WorkspaceMember): Promise<WorkspaceMember>{
        this.members.set(member.id, member);
        return member;
    };

    // Find Member by Id
    async findMemberById(id: string): Promise<WorkspaceMember | null>{
        return this.members.get(id) ?? null;
    };

    // Find Members by Workspace Id
    async findMembersByWorkspaceId(workspaceId: string): Promise<WorkspaceMember[]>{
        return Array.from(this.members.values()).filter(
            member => member.workspaceId === workspaceId,
        );
    };

    // Find by Workspace and User Ids
    async findByWorkspaceAndUser(workspaceId: string, userId: string): Promise<WorkspaceMember | null>{
        return (
            Array.from(this.members.values()).find(
                member => member.workspaceId === workspaceId && member.userId === userId,
            ) ?? null
        );
    };

    // Update Member
    async updateMember(member: WorkspaceMember): Promise<WorkspaceMember | null>{
        if(!this.members.has(member.id)) return null;
        this.members.set(member.id, member);
        return member;
    };

    // Delete Member
    async deleteMember(memberId: string): Promise<boolean>{
        return this.members.delete(memberId);
    }
}