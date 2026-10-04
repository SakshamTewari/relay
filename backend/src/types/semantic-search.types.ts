export interface SearchDocument {
    id: string;
    content: string;
};

export interface SearchResult extends SearchDocument {
    score: number;
}