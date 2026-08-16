export interface WorkspaceMember {
    id: string;
    workspaceId: string;
    userId: string;
    role: "owner" | "admin" | "member";
    createdAt: Date;
    updatedAt: Date;
};