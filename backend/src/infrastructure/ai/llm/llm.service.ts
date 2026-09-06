import { LLMGenerateParams, LLMGenerateResult } from "./llm.types";

export interface LLMService {
    generate(params: LLMGenerateParams): Promise<LLMGenerateResult>;
}