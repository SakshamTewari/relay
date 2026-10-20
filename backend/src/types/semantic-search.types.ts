export interface SearchDocument {
    id: string;
    content: string;
    channelId: string;
    workspaceId: string;
};

export interface SearchResult extends SearchDocument {
    score: number;
}