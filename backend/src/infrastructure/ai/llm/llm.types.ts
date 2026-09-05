export interface LLMMessage {
    role: "system" | "user" | "assistant";
    content: string;
};

export interface LLMGenerateParams {
    messages: LLMMessage[];
};

export interface LLMGenerateResult {
    content: string;
} ;