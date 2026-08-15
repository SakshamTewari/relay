export interface AddWorkspaceMemberRequest {
    userId: string;
    role: "owner" | "admin" | "member";
};

export interface UpdateWorkspaceMemberRequest {
    role: "owner" | "admin" | "member";
};

export interface WorkspaceMemberParams {
    workspaceId: string;
};

export interface MemberParams {
    memberId: string;
}